import { StatusCodes } from "http-status-codes";
import { getErrorMessage } from "../lib/errorCode.js";
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
  const prv = await prisma.seller.findMany({
    where: {
      userId: id,
      verified:false
    },
  });

  if(prv&&prv.length>0){
    return res.status(StatusCodes.BAD_GATEWAY).json({
      message: "Your Seller is not authorized"
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
      message: getErrorMessage(err),
    });
  }
};
export const sellerRequest = async (req, res) => {
  const { shopName, shopAddress, categories } = req.body;
  const { id } = req.user;

  if (!shopName || !shopAddress) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }
  const user = await prisma.users.findUnique({
    where: {
      id: id,
      NOT: {
        role: 1,
      },
    },
  });
  if(user){
    return res.status(StatusCodes.FORBIDDEN).json({
      message: "You have already requested for seller",
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
      },
    });
    const user = await prisma.users.update({
      data: {
        role: 2,
      },
      where: {
        id: id,
      },
    });
    return res.status(StatusCodes.OK).json({
      data: shop,
      user: user,
    });
  } catch (err) {
    return res.status(StatusCodes.EXPECTATION_FAILED).json({
      message: err.message,
    });
  }
};
export const updateShop = async (req, res) => {
  const { shopName, shopAddress, categories, verified, sellerId } = req.body;


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
  const { sellerId } = req.query;

  if (!sellerId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }
  try {
    const shop = await prisma.seller.delete({
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
export const AllShop = async (req, res) => {
  const { userId, verified } = req.query;
  try {
    const shop = await prisma.seller.findMany({
      where: {
        userId: userId ? userId : undefined,
        verified:verified? Boolean(verified):undefined,
      },
      include: {
        user: true,
      },
      orderBy:{
        createdAt:"desc"
      }
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
export const addBrand = async (req, res) => {
  const { brandName, brandAddress, categories, verified } = req.body;
  const { id } = req.user;

  if (!brandName || !brandAddress) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }
  const { path } = await getLogoLink(req, res);
  try {
    const shop = await prisma.brands.create({
      data: {
        brandName,
        brandAddress,
        categories: categories ? JSON.parse(categories) : undefined,
        brandIcon: path,
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
export const updateBrand = async (req, res) => {
  const { brandName, brandAddress, categories, verified, brandId } = req.body;
  const { id } = req.user;

  if (!brandId ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }

  try {
    if (req.file) {
      const { path } = await getLogoLink(req, res);
      const shop = await prisma.brands.update({
        data: {
          brandName,
          brandAddress,
          categories: categories ? JSON.parse(categories) : undefined,
          brandIcon: path,
          userId: id,
          verified: Boolean(verified),
        },
        where: {
          id: brandId,
        },
      });
      return res.status(StatusCodes.OK).json({
        data: shop,
      });
    }
    const shop = await prisma.brands.update({
      data: {
        brandName,
        brandAddress,
        categories: categories ? JSON.parse(categories) : undefined,
        userId: id,
        verified: Boolean(verified),
      },
      where: {
        id: brandId,
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
export const deleteBrand = async (req, res) => {
  const { brandId } = req.query;

  if (!brandId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }
  try {
    const shop = await prisma.brands.delete({
      where: {
        id: brandId,
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
export const AllBrand = async (req, res) => {
  const { userId, verified } = req.query;
  try {
    const shop = await prisma.brands.findMany({
      where: {
        userId: userId ? userId : undefined,
        verified: verified? Boolean(verified):undefined,
      },
      include: {
        user: true,
      },
      orderBy:{
        createdAt:"desc"
      }
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
