import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import { campaignDelete, campaignProductDelete, createCampaign, getCampaignProduct, startedCampaign, storeCampaign, upcomingCampaign, updateCampaign } from "../functions/campaignFunction.js";



const campaign = express.Router();

campaign.route("/create").post(upload.single("image"),createCampaign);
campaign.route("/storeCampaign").post(verifyUser,storeCampaign);
campaign.route("/upcoming").get(upcomingCampaign);
campaign.route("/current").get(startedCampaign);
campaign.route("/products/:id").get(getCampaignProduct)
campaign.route("/products/delete/:id").delete(campaignProductDelete)
campaign.route("/delete/:id").delete(campaignDelete)
campaign.route("/update/:id").put(upload.single("image"),updateCampaign);

export default campaign;
