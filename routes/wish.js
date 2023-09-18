import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { createWish, deleteWish, getWish } from "../functions/wishFunctions.js";

const wish = express.Router();
wish.route("/add").post(verifyUser,createWish);
wish.route("/get").get(verifyUser,getWish);
wish.route("/delete").delete(verifyUser,deleteWish);
export default wish;
