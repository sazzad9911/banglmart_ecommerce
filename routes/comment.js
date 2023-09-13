import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { createComment, getComments, getCommentsByProduct, replayComment } from "../functions/commentFunction.js";

const comment = express.Router();

comment.route("/create").post([verifyUser,upload.single("image")],createComment);
comment.route("/replay").put(verifyUser,replayComment);
comment.route("/get").get(verifyUser,getComments);
comment.route("/get-by-product").get(getCommentsByProduct);
export default comment;
