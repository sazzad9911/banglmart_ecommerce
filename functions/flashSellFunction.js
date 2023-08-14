import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getBannerImageLink, getProductThumbnail } from "./main.js";

export const getFlashSell = async (req, res) => {
  try {
    const flash = await prisma.flashSell.findMany({
      where: {
        endAt: {
          gt: new Date(),
        },
      },
      include: {
        product: true,
      },
    });
    res.status(StatusCodes.OK).json({ data: flash });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const createFlashSell = async (req, res) => {
  const { startAt, endAt, title, flashSellId } = req.body;
  if (!startAt || !endAt || !title) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }
  if (flashSellId && req.file) {
    try {
      const { path } = await getBannerImageLink(req, res);
      const flash = await prisma.flashSell.update({
        data: {
          startAt: new Date(startAt),
          endAt: new Date(endAt),
          title,
          banner: path,
        },
        where: {
          id: flashSellId,
        },
      });
      res.status(StatusCodes.OK).json({ data: flash });
    } catch (e) {
      res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
    }
  } else if (!flashSellId && req.file) {
    try {
      const { path } = await getBannerImageLink(req, res);
      const flash = await prisma.flashSell.create({
        data: {
          startAt: new Date(startAt),
          endAt: new Date(endAt),
          title,
          banner: path,
        },
      });
      res.status(StatusCodes.OK).json({ data: flash });
    } catch (e) {
      res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
    }
  } else if (flashSellId && !req.file) {
    try {
      const flash = await prisma.flashSell.update({
        data: {
          startAt: new Date(startAt),
          endAt: new Date(endAt),
          title,
        },
        where: {
          id: flashSellId,
        },
      });
      res.status(StatusCodes.OK).json({ data: flash });
    } catch (e) {
      res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
    }
  } else {
    try {
      const { path } = await getBannerImageLink(req, res);
      const flash = await prisma.flashSell.create({
        data: {
          startAt: new Date(startAt),
          endAt: new Date(endAt),
          title,
          banner: path,
        },
      });
      res.status(StatusCodes.OK).json({ data: flash });
    } catch (e) {
      res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
    }
  }
};
export const addFlashSellProduct = async (req, res) => {
  const {
    offer,
    percentage,
    minSell,
    quantity,
    deliveryFree,
    flashSellId,
    productId,
  } = req.body;
  const { id } = req.user;
  if (!flashSellId || !productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }
  try {
    const flash = await prisma.flashSellProduct.create({
      data: {
        offer: offer ? parseInt(offer) : undefined,
        percentage: Boolean(percentage),
        minSell: minSell ? parseInt(minSell) : undefined,
        quantity: quantity ? parseInt(quantity) : undefined,
        deliveryFree: Boolean(deliveryFree),
        flashSellId,
        productId,
        userId: id,
      },
    });
    res.status(StatusCodes.OK).json({ data: flash });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getFlashSellProduct = async (req, res) => {
  const { flashSellId } = req.query;

  if (!flashSellId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }
  try {
    const flash = await prisma.flashSellProduct.findMany({
      where: {
        flashSellId: flashSellId,
      },
      include:{
        product:true
      }
    });
    res.status(StatusCodes.OK).json({ data: flash });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const deleteFlashSellProduct = async (req, res) => {
  const { productId } = req.query;

  if (!productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }
  try {
    const flash = await prisma.flashSellProduct.delete({
      where: {
        id: productId,
      },
    });
    res.status(StatusCodes.OK).json({ data: flash });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
