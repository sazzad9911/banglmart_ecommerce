import express from "express";
import rateLimiter from "express-rate-limit";
import { getInfo, main, storeInfo } from "../functions/main.js";
import {
  checkSeller,
  emailVerification,
  getAllUser,
  getUser,
  resetPassword,
  signIn,
  signUp,
  thirdPartySignIn,
  updateUser,
} from "../functions/authFunctions.js";
import verifyUser from "../middleware/verifyUser.js";

const authentication = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

authentication.route("/signIn").post(apiLimiter,signIn);
authentication.route("/signUp").post(apiLimiter, signUp);
authentication.route("/getUser").get(verifyUser, getUser);
authentication.route("/sendVerification").get(apiLimiter, emailVerification);
authentication.route("/resetEmail").post(apiLimiter, resetPassword);
authentication.route("/thirdPartySignIn").post(apiLimiter, thirdPartySignIn);
authentication.route("/updateUser").put(apiLimiter, updateUser);
authentication.route("/getAllUser").get(getAllUser);
authentication.route("/checkSellerRequest").get(checkSeller);
export default authentication;
