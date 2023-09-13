import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getLogoLink } from "./main.js";

export const createReview = async (req, res) => {
  const { message, rate, productId, sellerId, brandId } = req.body;
  const { id } = req.user;
  if (!message || !productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const review = await prisma.reviews.create({
      data: {
        message,
        userId: id,
        productId,
        sellerId,
        brandId,
        rate: rate && parseFloat(rate),
      },
    });
    res.status(StatusCodes.OK).json({ data: review });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getReview = async (req, res) => {
  const { id } = req.user;
  try {
    const review = await prisma.reviews.findMany({
      where: {
        userId: id,
      },
    });
    res.status(StatusCodes.OK).json({ data: review });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getReviewByProduct = async (req, res) => {
  const { productId } = req.query;
  if(!productId){
    return res.status(StatusCodes.BAD_GATEWAY).json({ message:"Product Id is required"});
  }
  try {
    const review = await prisma.reviews.findMany({
      where: {
        productId: productId,
      },
    });
    res.status(StatusCodes.OK).json({ data: review });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
