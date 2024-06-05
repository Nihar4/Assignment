import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const scoreSchema = new mongoose.Schema({
    testDate: {
        type: Date,
        default: Date.now,
    },
    score: {
        type: Number,
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        select: false,
    },
    googleId: {
        type: String,
        unique: true,
    },
    isGoogleLogin: {
        type: Boolean,
        default: false,
    },
    quizStats: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    quizGiven: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


export const User = mongoose.model("User", userSchema);
