import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { closeAdd, closeAllAdds, createAdds, getAdds } from "../functions/addsFunction.js";

const adds = express.Router();

adds.route("/create").post(createAdds);
adds.route("/close").put(closeAdd)
adds.route("/closeAll").put(closeAllAdds)
adds.route("/get").get(getAdds)

export default adds;
