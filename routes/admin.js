import express from "express";
import rateLimiter from "express-rate-limit";
import { englishToBangla, getInfo, main, storeInfo } from "../functions/main.js";
import {
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
import path from "path";
import { fileURLToPath } from "url";

const admin = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const adminFolder=path.join(__dirname, '../static/admin/build');

admin.route("/translate").post(englishToBangla)
export default admin;
