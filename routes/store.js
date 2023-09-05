import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { addBrand, addShop, AllBrand, AllShop, deleteBrand, deleteShop, sellerRequest, updateBrand, updateShop } from "../functions/storeFunction.js";

const store = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

store.route("/addSeller").post([verifyUser, upload.single("logo")], addShop);
store.route("/request-seller").post([verifyUser, upload.single("logo")], sellerRequest);
store.route("/allSeller").get(AllShop);
store.route("/updateSeller").put([verifyUser, upload.single("logo")], updateShop);
store.route("/deleteSeller").delete(verifyUser, deleteShop);
store.route("/addBrand").post([verifyUser, upload.single("logo")], addBrand);
store.route("/updateBrand").put([verifyUser, upload.single("logo")], updateBrand);
store.route("/deleteBrand").delete(verifyUser, deleteBrand);
store.route("/allBrand").get(AllBrand);

export default store;
