import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";

export const createOrder = async (req, res) => {
  const {
    buyerId,
    productId,
    offerPrice,
    price,
    quantity,
    colors,
    sizes,
    specifications,
    paymentMethod,
    address
  } = req.body;
  const {id}=req.user;

  if (!buyerId || !productId || !price || !quantity||!paymentMethod) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Payment system is not added yet" });
  if(paymentMethod==="online")[
    
  ]
  try {
    const contact = await prisma.orders.create({
      data: {
        buyerId:id,
        productId,
        offerPrice,
        price,
        quantity,
        colors:colors?JSON.parse(colors):undefined,
        sizes:sizes?JSON.parse(sizes):undefined,
        specifications:specifications?JSON.parse(specifications):undefined,
        address:address?JSON.parse(address):undefined,
      },
    });
    res.status(StatusCodes.OK).json({ data: contact });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const checkOut = async (req, res) => {
  const {
    cartId,
    productId,
    couponId,
    price,
    quantity,
    colors,
    sizes,
    specifications,
    paymentMethod,
    address
  } = req.body;
  const {id}=req.user;

  if (!buyerId || !productId || !price || !quantity||!paymentMethod) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Payment system is not added yet" });
  if(paymentMethod==="online")[
    
  ]
  try {
    const contact = await prisma.orders.create({
      data: {
        buyerId:id,
        productId,
        offerPrice,
        price,
        quantity,
        colors:colors?JSON.parse(colors):undefined,
        sizes:sizes?JSON.parse(sizes):undefined,
        specifications:specifications?JSON.parse(specifications):undefined,
        address:address?JSON.parse(address):undefined,
      },
    });
    res.status(StatusCodes.OK).json({ data: contact });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
