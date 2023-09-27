import express from "express";
import rateLimiter from "express-rate-limit";
import { getInfo, main, storeInfo } from "../functions/main.js";
import {
  checkSeller,
  emailVerification,
  getAllUser,
  getUser,
  getVisitor,
  resetPassword,
  resetPhonePassword,
  sendOTP,
  setVisitor,
  signIn,
  signInWithPhone,
  signUp,
  signUpWithPhone,
  thirdPartySignIn,
  updateUser,
  verifyOTP,
} from "../functions/authFunctions.js";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { signInWithPhoneNumber } from "firebase/auth";

const authentication = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});
const authLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: "Too many requests from this IP, please try again after 5 minutes",
});
authentication.route("/signIn").post(apiLimiter,signIn);
authentication.route("/signUp").post(apiLimiter, signUp);
authentication.route("/update").put([verifyUser,upload.single("image")], updateUser);
authentication.route("/getUser").get(verifyUser, getUser);
authentication.route("/sendVerification").get(apiLimiter, emailVerification);
authentication.route("/resetEmail").post(apiLimiter, resetPassword);
authentication.route("/thirdPartySignIn").post(apiLimiter, thirdPartySignIn);
authentication.route("/getAllUser").get(getAllUser);
authentication.route("/checkSellerRequest").get(checkSeller);
authentication.route("/visitor").post(setVisitor);
authentication.route("/get/visitor/:randomId").get(getVisitor);

authentication.route("/sign-up-with-phone").post(authLimiter, signUpWithPhone);
authentication.route("/send-otp").post(authLimiter, sendOTP);
authentication.route("/verify-otp").post(authLimiter, verifyOTP);
authentication.route("/sign-in-with-phone").post(authLimiter, signInWithPhone);
authentication.route("/forget-phone-password").post(authLimiter, resetPhonePassword);
export default authentication;
