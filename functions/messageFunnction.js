import { StatusCodes } from "http-status-codes";
import { io } from "../index.js";
import prisma from "../lib/prisma.js";
import { getLogoLink } from "./main.js";
import { sendNotification } from "../lib/sendNotification.js";

export const createConversation = async (req, res) => {
  const { userId, productId } = req.body;
  const { id } = req.user;
  if (!userId || !productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const conversations = await prisma.conversations.findMany({
      where: {
        senderId: id,
        receiverId: userId,
        productId,
      },
      include:{
        receiver:true
      }
    });
    if(conversations.length>0){
      return res.status(StatusCodes.OK).json({ data: conversations[0] });
    }
    const comment = await prisma.conversations.create({
      data: {
        senderId: id,
        receiverId: userId,
        productId,
      },
      include:{
        receiver:true
      }
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
        OR:[
          {
            receiverId:id
          },
          {
            senderId:id
          }
        ]
      },
      include: {
        receiver: true,
        product: true,
        messages:{
          orderBy:{
            date:"desc"
          },
          take:1
        }
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
export const getSingleConversation = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await prisma.conversations.findUnique({
      where: {
        id:id
      },
      include: {
        receiver: true,
        product: true,
        messages:{
          orderBy:{
            date:"desc"
          },
          take:1
        }
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
  const { conversationId, message ,receiverId} = req.body;

  if (!conversationId||!receiverId) {
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
        receiverId
      },
    });
    await prisma.conversations.update({
      where:{
        id:conversationId,
      },
      data:{
        unread:{increment:1},
        date:new Date()
      }
    })
    io.emit("message", comment)
    await sendNotification(
      `You have New Message`,
      `${message}`,
      receiverId,
      null
    );
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
    const con = await prisma.conversations.update({
      where: {
        id: conversationId,
      },
     data:{
      unread:0
     }
    });
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
export const getUnRead=async (req, res) => {
  const { id } = req.user;

  try {
    const comment = await prisma.conversations.count({
      where: {
        OR:[
          {
            receiverId:id
          },
          {
            senderId:id
          }
        ],
        unread:{
          gt:0
        }
      },
     
    });
    res.status(StatusCodes.OK).json({ data: comment });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};