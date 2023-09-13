import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { createComment, getComments, getCommentsByProduct, replayComment } from "../functions/commentFunction.js";

const message = express.Router();

message.route("/create").post(verifyUser,createComment);
message.route("/replay").put(verifyUser,replayComment);
message.route("/get").get(verifyUser,getComments);
message.route("/get-by-product").get(getCommentsByProduct);
export default message;
