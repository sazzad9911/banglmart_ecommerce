import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { closeAdd, closeAllAdds, createAdds, createBanner, createSlider, deleteAds, deleteBanner, deleteSlider, getAddAnalytics, getAdds, getAllAdds, getBanner, getSlider, updateBanner } from "../functions/addsFunction.js";


const adds = express.Router();

adds.route("/create").post(upload.single("image"),createAdds);
adds.route("/close").put(closeAdd)
adds.route("/closeAll").put(closeAllAdds)
adds.route("/get").get(getAdds)
adds.route("/delete").delete(deleteAds)
adds.route("/get-all").get(getAllAdds)
adds.route("/create/slider").post(upload.single("image"),createSlider);
adds.route("/delete/slider").delete(deleteSlider);
adds.route("/get/slider").get(getSlider);
adds.route("/create/banner").post(upload.single("image"),createBanner);
adds.route("/update/banner").put(upload.single("image"),updateBanner);
adds.route("/delete/banner").delete(deleteBanner);
adds.route("/get/banner").get(getBanner);
adds.route("/analytics").get(getAddAnalytics);

export default adds;
