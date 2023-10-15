import admin from "../admin.js";
import prisma from "./prisma.js";

export const sendNotification=async(title,message,userId,orderId,reviewId,commentId)=>{
    try{
      const user=await prisma.users.findUnique({
        where:{
          id:userId
        }
      })
    const messages = {
        notification: {
          title: title,
          body: message
        },
        token: user.pushToken,
        
      };
    const notification=  await prisma.notifications.create({
        data:{
          title:title,
          message:message,
          userId:user.id,
          orderId:orderId||undefined,
          commentId:commentId||undefined,
          reviewId:reviewId||undefined
        }
      })
    const res=  await admin.messaging().send(messages)
    return notification
    }catch(e){
      console.error(e.message);
    }
}