import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { createCart,deleteCart,getCart, updateCart } from "../functions/cartFunction.js";

const cart = express.Router();
cart.route("/add").post(verifyUser,createCart);
cart.route("/get").get(verifyUser,getCart);
cart.route("/update").put(verifyUser,updateCart);
cart.route("/delete").delete(verifyUser,deleteCart);
export default cart;
