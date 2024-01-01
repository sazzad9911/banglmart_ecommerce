import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { acceptOrder, cancelOrder, checkOut, completeOrder, confirmBkashPayment, confirmPayment, courierOrder, createOrder, getOrder, getSellerOrders, getTotalSells, getUserOrders, paidOrder, refundOrder, rejectOrder } from "../functions/orderFunction.js";
import bkashMiddleware from "../middleware/bkashMiddleware.js";

const order = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

order.route("/create").post([verifyUser,bkashMiddleware],createOrder);
order.route("/check-out").post(verifyUser,checkOut);
order.route("/user").get(verifyUser,getUserOrders);
order.route("/seller").get(verifyUser,getSellerOrders);
order.route("/get/:id").get(getOrder);
//order state
order.route("/paid/:id").get(paidOrder);
order.route("/courier/:id").get(courierOrder);
order.route("/refund/:id").get(refundOrder);
order.route("/complete/:id").get(completeOrder);
order.route("/cancel/:id").get(cancelOrder);
order.route("/reject/:id").get(rejectOrder);
order.route("/accept/:id").get(acceptOrder);
order.route("/acceptPay").get(confirmPayment);
order.route("/acceptBkashPay/:token/:id/:url/:amount/:bToken").get(confirmBkashPayment);
order.route("/acceptPay").post(confirmPayment);
order.route("/total-sells").get(verifyUser,getTotalSells)
export default order;
