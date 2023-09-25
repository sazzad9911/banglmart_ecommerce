import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getLogoLink } from "./main.js";

export const createComment = async (req, res) => {
  const { message, productId } = req.body;
  const { id } = req.user;
  if (!message || !productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    if (req.file) {
      const { path } = await getLogoLink(req, res);
      const comment = await prisma.comments.create({
        data: {
          message,
          image: path,
          userId: id,
          productId,
        },
      });
      res.status(StatusCodes.OK).json({ data: comment });
    } else {
      const comment = await prisma.comments.create({
        data: {
          message,
          userId: id,
          productId,
        },
      });
      res.status(StatusCodes.OK).json({ data: comment });
    }
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const replayComment = async (req, res) => {
  const { message, commentId } = req.body;
  if (!message || !commentId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const comment = await prisma.comments.update({
      data: {
        replay:message,
      },
      where:{
        id:commentId
      }
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getComments = async (req, res) => {
  const { id } = req.user;
  try {
    const comment = await prisma.comments.findMany({
      where:{
        userId:id
      },
      include:{
        user:true,
        product:true
      },
      orderBy:{
        date:"desc"
      }
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getCommentsByProduct = async (req, res) => {
  const { productId } = req.query;
  if(!productId){
    return res.status(StatusCodes.BAD_GATEWAY).json({ message:"Product Id is required"});
  }
  try {
    const comment = await prisma.comments.findMany({
      where:{
        productId:productId
      },
      include:{
        user:true
      },
      orderBy:{
        date:"desc"
      }
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};