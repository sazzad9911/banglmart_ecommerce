import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { createCampaign, getCampaignProduct, startedCampaign, storeCampaign, upcomingCampaign } from "../functions/campaignFunction.js";



const campaign = express.Router();

campaign.route("/create").post(upload.single("image"),createCampaign);
campaign.route("/storeCampaign").post(storeCampaign);
campaign.route("/upcoming").get(upcomingCampaign);
campaign.route("/current").get(startedCampaign);
campaign.route("/products/:id").get(getCampaignProduct)

export default campaign;
