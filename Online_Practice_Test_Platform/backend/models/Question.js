import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answers: [
        {
            text: {
                type: String,
                required: true,
            },
            isCorrect: {
                type: Boolean,
                required: true,
            },
        },
    ],
    difficulty: {
        type: Number,
        required: true,
    },
    tag: { type: String },
});

export const Question = mongoose.model("Question", questionSchema);
