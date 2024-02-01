import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { createConversation, deleteConversation, getConversation, getMessage, getSingleConversation, getUnRead, sendMessage } from "../functions/messageFunnction.js";
import { getGame, getGameList } from "../functions/gamesFunction.js";

const games = express.Router();

games.route("/get").get(getGameList);
games.route("/get/game/:id").get(getGame);
export default games;
