import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";

const comment = express.Router();

comment.route("/create").post(createOrder);

export default comment;
