import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { addColor, addSize, addVariant, deleteColor, deleteSize, deleteVariant, getColor, getSize, getVariant } from "../functions/variantsFunction.js";

const variants = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

variants.route("/addColor").post(verifyUser,addColor);
variants.route("/deleteColor").delete(verifyUser,deleteColor);
variants.route("/addSize").post(verifyUser,addSize);
variants.route("/deleteSize").delete(verifyUser,deleteSize);
variants.route("/addVariant").post([verifyUser,upload.single("image")],addVariant);
variants.route("/deleteVariant").post(verifyUser,deleteVariant);
variants.route("/getColor").get(getColor);
variants.route("/getSize").get(getSize);
variants.route("/getVariant").get(getVariant);

export default variants;
