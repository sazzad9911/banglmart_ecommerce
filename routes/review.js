import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { createReview, getReview } from "../functions/reviewFunction.js";

const review = express.Router();

review.route("/create").post(verifyUser,createReview);
review.route("/get").get(verifyUser,getReview);

export default review;
