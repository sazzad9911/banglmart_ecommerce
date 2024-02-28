import admin from "../admin.js";
import prisma from "./prisma.js";

export const sendNotification = async (
  title,
  message,
  userId,
  orderId,
  reviewId,
  commentId
) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    const messages = {
      notification: {
        title: title,
        body: message,
      },
      token: user.pushToken,
    };
    const notification = await prisma.notifications.create({
      data: {
        title: title,
        message: message,
        userId: user.id,
        orderId: orderId || undefined,
        commentId: commentId || undefined,
        reviewId: reviewId || undefined,
      },
    });
    const res = await admin.messaging().send(messages);
    return notification;
  } catch (e) {
    console.error(e.message);
  }
};
export const sendNotificationAll = async (title, message) => {
  const users = await prisma.users.findMany({
    where: {
      pushToken: {
        not: null, // Ensure pushToken is not null
      },
    },
    select: {
      pushToken: true,
    },
  });

 // console.log(users);
  // Send the notification to each device individually
  const promises = users.map(async (user) => {
    try {
      await admin.messaging().send({
        notification: {
          title: title,
          body: message,
        },
        token: user.pushToken,
      });
    } catch (error) {
      console.error(error);
    }
  });

  // Wait for all notifications to be sent
  return await Promise.all(promises);
};
