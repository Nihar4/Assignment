import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
    path: "./config/config.env",
});
const app = express();

// Using Middlewares
app.use(express.json());
app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
    })
);
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        // origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);


import user from "./routes/UserRoutes.js";
import quiz from "./routes/QuizRoutes.js";

app.use("/api/v1", user);
app.use("/api/v1", quiz);



export default app;

app.get("/", (req, res) =>
    res.send(
        `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
    )
);

app.use(ErrorMiddleware);


