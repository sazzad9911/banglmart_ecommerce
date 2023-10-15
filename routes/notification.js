import express from "express";
import rateLimiter from "express-rate-limit";
import verifyUser from "../middleware/verifyUser.js";
import upload from "../lib/upload.js";
import prisma from "../lib/prisma.js";
import { StatusCodes } from "http-status-codes";

const readNotification=async (req, res) => {
    const {id}=req.user;
   try{
    const notification=await prisma.notifications.findMany({
        where:{
            userId:id
        },
        orderBy:{
            date:"desc"
        },
        include:{
            order:true,
            comments:true,
            reviews:true
        }
    })
    await prisma.notifications.updateMany({
        where:{
            userId:id
        },
        data:{
            read:true
        }
    })
    return res.status(StatusCodes.OK).json({data:notification})
   }catch(e){
    return res.status(StatusCodes.EXPECTATION_FAILED).json({message:e.message})
   }

}
const UnreadNotification=async (req, res) => {
    const {id}=req.user;
   try{
    const notification=await prisma.notifications.count({
        where:{
            userId:id,
            read:false,
        },
        orderBy:{
            date:"desc"
        }
    })
   
    return res.status(StatusCodes.OK).json({data:notification})
   }catch(e){
    return res.status(StatusCodes.EXPECTATION_FAILED).json({message:e.message})
   }

}
const notification = express.Router();


notification.route("/read").get(verifyUser,readNotification)
notification.route("/unRead").get(verifyUser,UnreadNotification)


export default notification;
