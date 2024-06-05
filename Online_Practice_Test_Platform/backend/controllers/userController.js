import { catchAsyncError } from "../middlewares/catchAsyncError.js";

import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import bcrypt from "bcryptjs";

// Register controller
export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password, googleId, isGoogleLogin } = req.body;

    let user = await User.findOne({ email });
    if (user && !isGoogleLogin) return next(new ErrorHandler("User Already Exists", 409));
    if (user && isGoogleLogin) return sendToken(res, user, `Welcome Back ${name}`, 201);

    if (!isGoogleLogin && (!email || !password || !name)) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    let hashedPassword = null;
    if (!isGoogleLogin) {
        hashedPassword = await bcrypt.hash(password, 12);
    }

    user = await User.create({
        name,
        email,
        password: hashedPassword,
        googleId,
        isGoogleLogin,
        scores: [],
    });

    sendToken(res, user, "Registered Successfully", 201);

});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new ErrorHandler("Please enter all field", 400));

    const user = await User.findOne({ email, isGoogleLogin: false }).select("+password");

    if (!user) return next(new ErrorHandler("No account found. Please sign up.", 401));

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
        return next(new ErrorHandler("Incorrect Email or Password", 401));

    sendToken(res, user, `Logging Successfully`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .json({
            success: true,
            message: "Logged Out Successfully",
        });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user,
    });
});