import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getLogoLink } from "./main.js";

export const createConversation = async (req, res) => {
  const { userId, productId } = req.body;
  const { id } = req.user;
  if (!userId || !productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const comment = await prisma.conversations.create({
      data: {
        senderId: id,
        receiverId: userId,
        productId,
      },
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getConversation = async (req, res) => {
  const { id } = req.user;
  try {
    const comment = await prisma.conversations.findMany({
      where: {
        senderId: id,
      },
      include: {
        receiver: true,
        product: true,
      },
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const deleteConversation = async (req, res) => {
  const { id } = req.user;
  const { conversationId } = req.query;
  if (!conversationId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid request" });
  }
  try {
    const comment = await prisma.conversations.delete({
      where: {
        id: conversationId,
      },
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const sendMessage = async (req, res) => {
  const { id } = req.user;
  const { conversationId, message } = req.body;

  if (!conversationId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid request" });
  }
  if (!message && !req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid message" });
  }
  try {
    const { path } = req.file ? await getLogoLink(req, res) : { path: null };
    const comment = await prisma.messages.create({
      data: {
        message,
        conversationId,
        image: path ? path : undefined,
      },
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getMessage = async (req, res) => {
  const { id } = req.user;
  const { conversationId } = req.query;

  if (!conversationId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid request" });
  }

  try {
    const comment = await prisma.messages.findMany({
      where: {
        conversationId: conversationId,
      },
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
