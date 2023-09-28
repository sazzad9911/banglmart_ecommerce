import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { createCouponCode, createMemberCode, createPromoCode, deleteCouponCode, deleteMemberCode, deletePromoCode, getCouponCode, getMemberCode, getPromoCode, verifyCouponCode, verifyMemberCode, verifyPromoCode } from "../functions/codesFunction.js";

const codes = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

codes.route("/create-promo-code").post(verifyUser,createPromoCode);
codes.route("/get-promo-code").get(verifyUser,getPromoCode);
codes.route("/delete-promo-code").delete(verifyUser,deletePromoCode);
codes.route("/verify-promo-code").get(verifyUser,verifyPromoCode);

codes.route("/create-coupon-code").post(verifyUser,createCouponCode);
codes.route("/delete-coupon-code").delete(verifyUser,deleteCouponCode);
codes.route("/verify-coupon-code").get(verifyUser,verifyCouponCode);
codes.route("/get-coupon-code").get(verifyUser,getCouponCode);

codes.route("/create-member-code").post(verifyUser,createMemberCode);
codes.route("/delete-member-code").delete(verifyUser,deleteMemberCode);
codes.route("/verify-member-code").get(verifyUser,verifyMemberCode);
codes.route("/get-member-code").get(verifyUser,getMemberCode);
export default codes;
