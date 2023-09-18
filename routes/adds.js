import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { closeAdd, closeAllAdds, createAdds, createBanner, createSlider, getAdds } from "../functions/addsFunction.js";

const adds = express.Router();

adds.route("/create").post(upload.single("image"),createAdds);
adds.route("/close").put(closeAdd)
adds.route("/closeAll").put(closeAllAdds)
adds.route("/get").get(getAdds)
adds.route("/create/slider").post(upload.single("image"),createSlider);
adds.route("/create/banner").post(upload.single("image"),createBanner);
adds.route("/delete/slider").delete(createAdds);


export default adds;
