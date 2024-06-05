import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Question } from "../models/Question.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import mongoose from "mongoose";


let questionHistory = {};
let tagUsageCount = {};
let userResponses = {};
let quizIdMapping = {};

const tags = ["arithmetic", "algebra", "geometry", "fractions", "calculus"];
const maxQuestionsPerTag = 4;

const getRandomTag = (userId) => {
    if (!tagUsageCount[userId]) {
        tagUsageCount[userId] = {};
        tags.forEach(tag => {
            tagUsageCount[userId][tag] = 0;
        });
    }
    const availableTags = tags.filter(tag => tagUsageCount[userId][tag] < maxQuestionsPerTag);

    if (availableTags.length === 0) {
        throw new ErrorHandler("No more available tags with questions remaining.", 400);
    }

    const randomIndex = Math.floor(Math.random() * availableTags.length);
    const selectedTag = availableTags[randomIndex];
    tagUsageCount[userId][selectedTag]++;
    return selectedTag;
};

const getNextQuestion = async (userId) => {
    let correctAnswers = 0;

    userResponses[userId].forEach(response => {
        const question = questionHistory[userId][response.questionId];
        if (question.answers[response.selectedAnswer].isCorrect) {
            correctAnswers++;
        }
    });

    const correctRatio = correctAnswers / userResponses[userId].length;
    let difficulty;

    if (correctRatio >= 0.75) {
        difficulty = 3;
    } else if (correctRatio >= 0.5) {
        difficulty = 2;
    } else {
        difficulty = 1;
    }
    const questionIds = Array.from(Object.keys(questionHistory[userId]));

    const newQuestion = await Question.aggregate([
        {
            $addFields: {
                objectIdAsString: { $toString: "$_id" }
            }
        }, {
            $match: {
                tag: getRandomTag(userId),
                difficulty,
                objectIdAsString: { $nin: questionIds }
            }
        },
        { $sample: { size: 1 } }
    ]);

    if (newQuestion.length > 0) {
        questionHistory[userId][newQuestion[0]._id] = newQuestion[0];
        return newQuestion[0];
    } else {
        throw new ErrorHandler("No more questions available for this difficulty level.", 404);
    }
};

export const startQuiz = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { quizId } = req.query;
        if (quizIdMapping[userId] !== quizId) {
            return res.status(500).json({
                success: false,
                message: "Wrong Quiz Id"
            })
        }
        questionHistory[userId] = {};
        userResponses[userId] = [];
        tagUsageCount[userId] = null;

        const newQuestion = await Question.aggregate([
            { $match: { tag: getRandomTag(userId), difficulty: 2 } },
            { $sample: { size: 1 } }
        ]);
        if (newQuestion.length > 0) {
            questionHistory[userId][newQuestion[0]._id] = newQuestion[0];
        }
        res.status(200).json({
            success: true,
            question: {
                _id: newQuestion[0]._id,
                question: newQuestion[0].question,
                answers: newQuestion[0].answers.map(a => a.text),
                tag: newQuestion[0].tag,
                no: userResponses[userId].length + 1
            }
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const nextQuestion = catchAsyncError(async (req, res, next) => {
    const { questionId, selectedAnswer } = req.body;
    const userId = req.user._id;

    if (!questionId || selectedAnswer === undefined) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    userResponses[userId].push({ questionId, selectedAnswer });

    if (userResponses[userId].length == 20) {
        const quizStats = {};
        const allQue = [];

        tags.forEach(tag => {
            quizStats[tag] = { easy: [0, 0], medium: [0, 0], hard: [0, 0], correct: 0 };
        });
        userResponses[userId].forEach(response => {
            const question = questionHistory[userId][response.questionId];
            let temp = question;
            temp.selectAns = response.selectedAnswer;
            temp.correctAns = question.answers.findIndex(answer => answer.isCorrect);
            allQue.push(temp);
            quizStats[question.tag][difficultyToString(question.difficulty)][0]++;
            if (question.answers[response.selectedAnswer].isCorrect) {
                quizStats[question.tag].correct++;
                quizStats[question.tag][difficultyToString(question.difficulty)][1]++;
            }
        });

        const AllStats = {
            quizStats: quizStats,
            allQue: allQue
        }

        req.user.quizStats = AllStats;
        req.user.quizGiven = true;
        await req.user.save();

        return res.status(200).json({
            success: true,
            complete: true,
            message: "Quiz completed successfully",
            quizStats,
        });
    }

    try {
        const newQuestion = await getNextQuestion(userId);

        res.status(200).json({
            success: true,
            submit: userResponses[userId].length == 19,
            question: {
                _id: newQuestion._id,
                question: newQuestion.question,
                answers: newQuestion.answers.map(a => a.text),
                tag: newQuestion.tag,
                no: userResponses[userId].length + 1
            }
        });
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error.message, 500));
    }
});

export const generateQuizId = (req, res, next) => {
    const userId = req.user._id;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let quizId = "";
    for (let i = 0; i < 10; i++) {
        quizId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if (quizIdMapping[userId]) {
        res.status(500).json({
            success: false,
            message: "You Have Already Taken The Quiz"
        });
    }
    else {
        quizIdMapping[userId] = quizId;

        res.status(200).json({
            success: true,
            quizId
        });
    }
};

const difficultyToString = (difficulty) => {
    switch (difficulty) {
        case 1:
            return 'easy';
        case 2:
            return 'medium';
        case 3:
            return 'hard';
        default:
            return '';
    }
};