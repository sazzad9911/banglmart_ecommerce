import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { createSupport, getSupport, replaySupport } from "../functions/supportFunction.js";

const support = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

support.route("/create").post(createSupport);
support.route("/get").get(getSupport);
support.route("/replay").post(replaySupport);

export default support;
