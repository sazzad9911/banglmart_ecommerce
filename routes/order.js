import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { checkOut, createOrder, getOrder, getSellerOrders, getUserOrders } from "../functions/orderFunction.js";

const order = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

order.route("/create").post(verifyUser,createOrder);
order.route("/check-out").post(verifyUser,checkOut);
order.route("/user").get(verifyUser,getUserOrders);
order.route("/seller").get(verifyUser,getSellerOrders);
order.route("/get/:id").get(getOrder);

export default order;
