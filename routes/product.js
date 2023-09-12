import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import {
  activeProduct,
  addProduct,
  deleteProduct,
  getAllProduct,
  getBargainingProduct,
  getForYou,
  getProductByBrand,
  getProductByOption,
  getProductBySeller,
  getTop,
  getTopSell,
  inactiveProduct,
  updateProduct,
} from "../functions/productFunctions.js";
import {
  addFlashSellProduct,
  createFlashSell,
  deleteFlashSellProduct,
  getFlashSell,
  getFlashSellProduct,
} from "../functions/flashSellFunction.js";

const product = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

product.route("/getAll").get(getAllProduct);
//Flash
product.route("/get/flash").get(getFlashSell);
product
  .route("/create/flash")
  .post([verifyUser, upload.single("banner")], createFlashSell);
product.route("/get/flash/product").get(getFlashSellProduct);
product.route("/create/flash/product").post(verifyUser, addFlashSellProduct);
product.route("/delete/flash/product").delete(deleteFlashSellProduct);
//Home page
product.route("/get/top").get(getTop);
product.route("/get/top/sell").get(getTopSell);
product.route("/get/for-you").get(getForYou);
product.route("/getProductByOption").get(getProductByOption);
product.route("/get-brand-product").get(getProductByBrand);
product.route("/get-seller-product").get(getProductBySeller);
product.route("/get-bargaining").get(getBargainingProduct);


//product api
product
  .route("/update")
  .put([verifyUser, upload.single("thumbnail")], updateProduct);
product.route("/delete").delete(verifyUser, deleteProduct);
product
  .route("/add")
  .post([verifyUser, upload.single("thumbnail")], addProduct);
product.route("/active/:productId").get(verifyUser, activeProduct);
product.route("/inactive/:productId").get(verifyUser, inactiveProduct);

export default product;
