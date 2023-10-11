import { StatusCodes } from "http-status-codes";
import { getErrorMessage } from "../lib/errorCode.js";
import prisma from "../lib/prisma.js";
import { getLogoLink } from "./main.js";

export const createPromoCode = async (req, res) => {
  const { code, offer, percentage } = req.body;
  const { id } = req.user;
  if (!code || !offer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const comment = await prisma.promo_code.create({
      data: {
        code,
        offer: parseInt(offer),
        percentage: Boolean(percentage),
        userId: id,
      },
      
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: getErrorMessage(e) });
  }
};
export const getPromoCode = async (req, res) => {
  const { id } = req.user;
  try {
    const comment = await prisma.promo_code.findMany({
      where: {
        userId: id,
      },
      include:{
        users:true
      }
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const deletePromoCode = async (req, res) => {
  const { promoCodeId } = req.query;

  if (!promoCodeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const comment = await prisma.promo_code.delete({
      where: {
        id: promoCodeId,
      },
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const verifyPromoCode = async (req, res) => {
  const { code } = req.query;
  const { id } = req.user;
  if (!code) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const codes = await prisma.promo_code.findUnique({
      where: {
        code: code,
      },
    });
    if (!codes) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid code" });
    }
    const comment = await prisma.promo_code_user.findMany({
      where: {
        codeId: codes.id,
        userId: id,
      },
    });
    if (comment.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Code Already used" });
    }
    const user = await prisma.promo_code_user.create({
      data: {
        userId: id,
        codeId: codes.id,
      },
    });
    res.status(StatusCodes.OK).json({ code:codes });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const createCouponCode = async (req, res) => {
  const { code, offer, percentage, productIDs } = req.body;
  const { id } = req.user;
  if (!code || !offer || !Array.isArray(productIDs)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const comment = await prisma.coupon_code.create({
      data: {
        code,
        offer: parseInt(offer),
        percentage: Boolean(percentage),
        userId: id,
      },
    });
    let arr = [];
    productIDs.map((doc, i) => {
      arr.push({
        codeId: comment.id,
        productId: doc,
      });
    });
    const products = await prisma.coupon_code_products.createMany({
      data: arr,
      skipDuplicates: true,
    });
    res.status(StatusCodes.OK).json({ data: comment, products });
  } catch (e) {
    res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: getErrorMessage(e) });
  }
};
export const deleteCouponCode = async (req, res) => {
  const { couponCodeId } = req.query;

  if (!couponCodeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const comment = await prisma.coupon_code.delete({
      where: {
        id: couponCodeId,
      },
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const verifyCouponCode = async (req, res) => {
  const { code, productId } = req.query;
  const { id } = req.user;
  if (!code || !productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const codes = await prisma.coupon_code.findUnique({
      where: {
        code: code,
      },
    });
    if (!codes) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid coupon code" });
    }
    const users = await prisma.coupon_code_users.findMany({
      where: {
        codeId: codes.id,
        userId: id,
      },
    });
    if (users.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Code Already used" });
    }
    const products = await prisma.coupon_code_products.findMany({
      where: {
        codeId: codes.id,
        productId: productId,
      },
    });
    if (products.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "This code is invalid for this product" });
    }
    const user = await prisma.coupon_code_users.create({
      data: {
        userId: id,
        codeId: codes.id,
      },
    });
    res.status(StatusCodes.OK).json({ code:codes });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const createMemberCode = async (req, res) => {
  const { code, offer, percentage, userIDs } = req.body;
  const { id } = req.user;
  if (!code || !offer || !Array.isArray(userIDs)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const comment = await prisma.special_member.create({
      data: {
        code,
        offer: parseInt(offer),
        percentage: Boolean(percentage),
        userId: id,
      },
    });
    let arr = [];
    userIDs.map((doc, i) => {
      arr.push({
        codeId: comment.id,
        userId: doc,
      });
    });
    const users = await prisma.special_member_users.createMany({
      data: arr,
      skipDuplicates: true,
    });
    res.status(StatusCodes.OK).json({ data: comment, users });
  } catch (e) {
    console.log(e.code);
    res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: getErrorMessage(e) });
  }
};
export const deleteMemberCode = async (req, res) => {
  const { memberCodeId } = req.query;

  if (!memberCodeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const comment = await prisma.special_member.delete({
      where: {
        id: memberCodeId,
      },
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const verifyMemberCode = async (req, res) => {
  const { code } = req.query;
  const { id } = req.user;
  if (!code) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const codes = await prisma.special_member.findUnique({
      where: {
        code: code,
      },
    });
    if (!codes) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid code" });
    }
    const users = await prisma.special_member_users.findMany({
      where: {
        codeId: codes.id,
        userId: id,
      },
    });
    if (users.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "This code is not valid for you" });
    }
    let used = users.filter((u) => u.used);
    if (used.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "This code has already used" });
    }
    const user = await prisma.special_member_users.updateMany({
      where: {
        userId: id,
        codeId: codes.id,
      },
      data: {
        used: true,
      },
    });
    res.status(StatusCodes.OK).json({ code: codes });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getCouponCode = async (req, res) => {
  const { id } = req.user;
  try {
    const comment = await prisma.coupon_code.findMany({
      where: {
        userId: id,
      },
      include:{
        users:true
      }
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getMemberCode = async (req, res) => {
  const { id } = req.user;
  try {
    const comment = await prisma.special_member.findMany({
      where: {
        userId: id,
      },
      include:{
        users:true
      }
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
