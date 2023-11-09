import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getBannerImageLink } from "./main.js";

export const createCampaign = async (req, res) => {
  const { month, startAt,endAt } = req.body;
  if (!month || !startAt || !endAt) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }

  try {
    const { path } = await getBannerImageLink(req, res);
    const result = await prisma.campaign.create({
      data: {
        durationMonth: parseInt(month),
        startAt: new Date(startAt),
        image: path,
        endAt:new Date(endAt)
      },
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const storeCampaign = async (req, res) => {
  const { offer, percentage, total, campaignId, productId } = req.body;
  // if (!offer || !percentage || !sale || !total || !campaignId || !productId) {
  //   return res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: "All fields are required" });
  // }
  try {
    const result = await prisma.campaignOffer.create({
      data: {
        offer:parseInt(offer),
        percentage:Boolean(percentage),
        total:parseInt(total),
        campaignId,
        productId
      },
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};
export const upcomingCampaign=async(req, res) => {
  try {
    const data=await prisma.campaign.findMany({
      where:{
        startAt:{
          gt:new Date()
        }
      }
    })
    res.status(StatusCodes.OK).json({ data: data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
export const startedCampaign=async(req, res) => {
  try {
    const data=await prisma.campaign.findMany({
      where:{
       AND:[
        {
          startAt:{
            lte:new Date(),
          },
          endAt:{
            gt:new Date()
          }
        }
  
       ]
      }
    })
    res.status(StatusCodes.OK).json({ data: data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
export const getCampaignProduct=async(req, res) => {
  const {id}=req.params;
  try {
    const data=await prisma.campaignOffer.findMany({
      where:{
        campaignId:id
      },
      include:{
        product:true
      }
    })
    res.status(StatusCodes.OK).json({ data: data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
export const campaignProductDelete=async(req, res) => {
  const {id}=req.params;
  try {
    const data=await prisma.campaignOffer.delete({
      where:{
        id:id
      },
    })
    res.status(StatusCodes.OK).json({ data: data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
export const campaignDelete=async(req, res) => {
  const {id}=req.params;
  try {
    const data=await prisma.campaign.delete({
      where:{
        id:id
      },
    })
    res.status(StatusCodes.OK).json({ data: data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
export const updateCampaign = async (req, res) => {
  const { month, startAt,endAt } = req.body;
  const {id}=req.params;
  if (!month || !startAt || !endAt) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }

  try {
    const { path } =req.file? await getBannerImageLink(req, res):{path:undefined}
    const result = await prisma.campaign.update({
      data: {
        durationMonth: parseInt(month),
        startAt: new Date(startAt),
        image: path,
        endAt:new Date(endAt)
      },
      where:{
        id:id
      }
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};