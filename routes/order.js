import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";

const order = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

//order.route("/create").post(createSupport);

export default order;
