import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { acceptProduct, addProduct, deleteProduct, getAllProduct, updateProduct } from "../functions/productFunctions.js";

const product = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

product.route("/getAll").get(getAllProduct);
product.route("/update").put([verifyUser,upload.single("thumbnail")],updateProduct);
product.route("/delete").delete(verifyUser,deleteProduct);
product.route("/add").post([verifyUser,upload.single("thumbnail")],addProduct);
product.route("/accept").get(verifyUser,acceptProduct);
export default product;
