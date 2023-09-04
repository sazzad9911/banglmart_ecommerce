import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getLogoLink } from "./main.js";

export const addShop = async (req, res) => {
  const { shopName, shopAddress, categories, verified } = req.body;
  const { id } = req.user;

  if (!shopName || !shopAddress) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }
  const { path } = await getLogoLink(req, res);
  try {
    const shop = await prisma.seller.create({
      data: {
        shopName,
        shopAddress,
        categories: categories ? JSON.parse(categories) : undefined,
        logo: path,
        userId: id,
        verified: Boolean(verified),
      },
    });
    return res.status(StatusCodes.OK).json({
      data: shop,
    });
  } catch (err) {
    return res.status(StatusCodes.EXPECTATION_FAILED).json({
      message: err.message,
    });
  }
};
export const updateShop = async (req, res) => {
  const { shopName, shopAddress, categories, verified, sellerId } = req.body;
  const { id } = req.user;

  if (!sellerId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }

  try {
    if (req.file) {
      const { path } = await getLogoLink(req, res);
      const shop = await prisma.seller.update({
        data: {
          shopName,
          shopAddress,
          categories: categories ? JSON.parse(categories) : undefined,
          logo: path,
          userId: id,
          verified: Boolean(verified),
        },
        where: {
          id: sellerId,
        },
      });
      return res.status(StatusCodes.OK).json({
        data: shop,
      });
    }
    const shop = await prisma.seller.update({
      data: {
        shopName,
        shopAddress,
        categories: categories ? JSON.parse(categories) : undefined,
        userId: id,
        verified: Boolean(verified),
      },
      where: {
        id: sellerId,
      },
    });
    return res.status(StatusCodes.OK).json({
      data: shop,
    });
  } catch (err) {
    return res.status(StatusCodes.EXPECTATION_FAILED).json({
      message: err.message,
    });
  }
};
export const deleteShop = async (req, res) => {
    const { sellerId } = req.body;
    
    if (!sellerId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "All fields are required",
      });
    }
  
    try {
      if (req.file) {
        const { path } = await getLogoLink(req, res);
        const shop = await prisma.seller.update({
          data: {
            shopName,
            shopAddress,
            categories: categories ? JSON.parse(categories) : undefined,
            logo: path,
            userId: id,
            verified: Boolean(verified),
          },
          where: {
            id: sellerId,
          },
        });
        return res.status(StatusCodes.OK).json({
          data: shop,
        });
      }
      const shop = await prisma.seller.update({
        data: {
          shopName,
          shopAddress,
          categories: categories ? JSON.parse(categories) : undefined,
          userId: id,
          verified: Boolean(verified),
        },
        where: {
          id: sellerId,
        },
      });
      return res.status(StatusCodes.OK).json({
        data: shop,
      });
    } catch (err) {
      return res.status(StatusCodes.EXPECTATION_FAILED).json({
        message: err.message,
      });
    }
  };
