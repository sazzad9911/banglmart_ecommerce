import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { createConversation, deleteConversation, getConversation, getMessage, getSingleConversation, getUnRead, sendMessage } from "../functions/messageFunnction.js";

const message = express.Router();

message.route("/create").post(verifyUser,createConversation);
message.route("/get").get(verifyUser,getConversation);
message.route("/get/:id").get(getSingleConversation);
message.route("/delete").delete(verifyUser,deleteConversation);
message.route("/send").post([verifyUser,upload.single("image")],sendMessage);
message.route("/chats").get(verifyUser,getMessage);
message.route("/unread").get(verifyUser,getUnRead);
export default message;
