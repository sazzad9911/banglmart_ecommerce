import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import { deleteCategory, deleteOption, deleteSubCategory, getAllCategory, getOptions, getSubCategory, storeCategory, storeOption, storeSubCategory } from "../functions/categoryFunctions.js";
import upload from "../lib/upload.js";

const category = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

category.route("/getAll").get(getAllCategory);
category.route("/getSubCategory").get(getSubCategory);
category.route("/getOptions").get(getOptions);
category.route("/createCategory").post([verifyUser,upload.single("icon")],storeCategory);
category.route("/createSubCategory").post(verifyUser,storeSubCategory);
category.route("/createOption").post(verifyUser,storeOption);
category.route("/deleteCategory").delete(verifyUser,deleteCategory);
category.route("/deleteSubCategory").delete(verifyUser,deleteSubCategory);
category.route("/deleteOption").delete(verifyUser,deleteOption);
export default category;
