import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getBannerImageLink, getLogoLink } from "./main.js";

export const createWish = async (req, res) => {
  const { productId } = req.body;
  const { id } = req.user;
  if (!productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const adds = await prisma.wish.create({
      data: {
        productId,
        userId: id,
      },
    });
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getWish = async (req, res) => {
  const { id } = req.user;

  try {
    const adds = await prisma.wish.findMany({
      where: {
        userId: id,
      },
      include: {
        product: true,
      },
    });
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};

export const deleteWish = async (req, res) => {
  const { id } = req.user;
  const { wishId } = req.query;
  if (!wishId) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ message: "All fields are required" });
  }
  try {
    const adds = await prisma.wish.delete({
      where: {
        id: wishId,
      }
    });
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
