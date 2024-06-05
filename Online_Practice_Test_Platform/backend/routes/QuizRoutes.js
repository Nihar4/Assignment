import express from "express";
import { startQuiz, nextQuestion, generateQuizId } from "../controllers/quizController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Start a new quiz
router.route("/quiz/start").get(isAuthenticated, startQuiz);

// Get the next question
router.route("/quiz/next").post(isAuthenticated, nextQuestion);

router.route("/quiz/id").get(isAuthenticated, generateQuizId);


export default router;
