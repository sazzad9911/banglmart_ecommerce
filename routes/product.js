import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { acceptProduct, addOffers, addProduct, deleteProduct, getAllProduct, getFlashSell, getForYou, getProductByOption, getTop, getTopSell, updateProduct, updateQuantity } from "../functions/productFunctions.js";

const product = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

product.route("/getAll").get(getAllProduct);
product.route("/get/flash").get(getFlashSell);
product.route("/get/top").get(getTop);
product.route("/get/top/sell").get(getTopSell);
product.route("/get/for-you").get(getForYou);
product.route("/getProductByOption").get(getProductByOption);
product.route("/update").put([verifyUser,upload.single("thumbnail")],updateProduct);
product.route("/delete").delete(verifyUser,deleteProduct);
product.route("/add").post([verifyUser,upload.single("thumbnail")],addProduct);
product.route("/accept").get(verifyUser,acceptProduct);
product.route("/updateQuantity").put(verifyUser,updateQuantity);
product.route("/addOffers").post(verifyUser,addOffers);
export default product;
