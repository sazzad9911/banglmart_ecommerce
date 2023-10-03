import { StatusCodes } from "http-status-codes";
import { getErrorMessage } from "../lib/errorCode.js";
import prisma from "../lib/prisma.js";
import { getBannerImageLink, getLogoLink } from "./main.js";

export const createCart = async (req, res) => {
  const { productId, quantity, codeId, colors, sizes, specifications,offerPrice } =
    req.body;
  const { id } = req.user;
  if (!productId || !quantity) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const adds = await prisma.cart.create({
      data: {
        productId,
        userId: id,
        quantity: parseInt(quantity),
        couponId: codeId || undefined,
        colors: colors || undefined,
        sizes: sizes || undefined,
        specifications: specifications|| undefined,
        offerPrice:parseFloat(offerPrice)||undefined,
      },
    });
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    console.log(e.code);
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: getErrorMessage(e) });
  }
};
export const getCart = async (req, res) => {
  const { id } = req.user;

  try {
    const adds = await prisma.cart.findMany({
      where: {
        userId: id,
      },
      include: {
        product: true,
        coupon: true,
      },
    });
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const updateCart = async (req, res) => {
  const { id } = req.user;
  const { quantity, cartId } = req.body;
  if (!quantity || !cartId) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ message: "All fields are required" });
  }
  try {
    const adds = await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        quantity: parseInt(quantity),
      },
    });
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const deleteCart = async (req, res) => {
  const { id } = req.user;
  const { cartId } = req.query;
  if (!cartId) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ message: "All fields are required" });
  }
  try {
    const adds = await prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
