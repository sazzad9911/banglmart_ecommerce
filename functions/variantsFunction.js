import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getProductThumbnail, getProductVariants } from "./main.js";

export const addColor = async (req, res) => {
  const { title, color } = req.body;
  if (!color || !title) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Color and title fields are required" });
  }
  try {
    const colors =await prisma.colors.create({
      data: {
        title,
        color,
      },
    });
    res.status(StatusCodes.OK).json({ data: colors });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const deleteColor = async (req, res) => {
  const { colorId } = req.query;
  if (!colorId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "all fields are required" });
  }
  try {
    const colors =await prisma.colors.delete({
      where: {
        id: colorId,
      },
    });
    res.status(StatusCodes.OK).json({ data: colors });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const addSize = async (req, res) => {
  const { title, cm } = req.body;
  if (!cm || !title) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "all fields are required" });
  }
  try {
    const size =await prisma.size.create({
      data: {
        title,
        cm,
      },
    });
    res.status(StatusCodes.OK).json({ data: size });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const deleteSize = async (req, res) => {
  const { sizeId } = req.query;
  if (!sizeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "all fields are required" });
  }
  try {
    const size =await prisma.size.delete({
      where: {
        id: sizeId,
      },
    });
    res.status(StatusCodes.OK).json({ data: size });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const addVariant = async (req, res) => {
  const { colorId, sizeId,productId } = req.body;
  const {id,email}=req.user;
  if (!colorId || !sizeId||!productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "all fields are required" });
  }
  const { path } = await getProductVariants(req, res);
  try {
    const size =await prisma.variants.create({
      data: {
        colorId: colorId,
        sizeId: sizeId,
        image: path,
        productId,
        userId:id
      },
    });
    res.status(StatusCodes.OK).json({ data: size });
  } catch (e) {
    console.log(e.message);
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const deleteVariant = async (req, res) => {
  const { variantId } = req.body;
  if (!variantId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "all fields are required" });
  }
  try {
    const size =await prisma.variants.delete({
      where:{
        id:variantId
      }
    });
    res.status(StatusCodes.OK).json({ data: size });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getVariant = async (req, res) => {
    const { productId,userId } = req.query;
    
    try {
      const variants =await prisma.variants.findMany({
        where:{
          productId:productId?productId:undefined,
          userId:userId?userId:undefined
        },
        include:{
          product:true,
          color:true,
          size:true
        }
      });
      res.status(StatusCodes.OK).json({ data: variants });
    } catch (e) {
      res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
    }
  };
  
  export const getColor = async (req, res) => {

    try {
      const variants =await prisma.colors.findMany({
        
      });
      res.status(StatusCodes.OK).json({ data: variants });
    } catch (e) {
      res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
    }
  };
  export const getSize = async (req, res) => {

    try {
      const variants =await prisma.size.findMany({
        
      });
      res.status(StatusCodes.OK).json({ data: variants });
    } catch (e) {
      res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
    }
  };
  