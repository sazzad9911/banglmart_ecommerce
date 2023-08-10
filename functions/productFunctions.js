import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getProductThumbnail } from "./main.js";

export const addProduct = async (req, res) => {
  const { id, email } = req.user;
  const {
    categoryId,
    subCategoryId,
    optionId,
    price,
    title,
    description,
    verified,
    sellerId,
    brandId,
    coin,
  } = req.body;
  if (
    !categoryId ||
    !subCategoryId ||
    !optionId ||
    !price ||
    !title ||
    !description
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  try {
    const { path } = await getProductThumbnail(req, res);

    const product = await prisma.products.create({
      data: {
        price: parseInt(price),
        title,
        description,
        thumbnail: path,
        verified: Boolean(verified),
        userId: id,
        sellerId,
        brandId,
        categoryId: categoryId,
        subCategoryId,
        optionId,
        coin: Boolean(coin),
      },
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getAllProduct = async (req, res) => {
  const { userId } = req.query;
  try {
    const product = await prisma.products.findMany({
      where: {
        userId: userId ? userId : undefined,
      },
      include: {
        user: true,
        offers: true,
        coins: true,
      },
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const updateProduct = async (req, res) => {
  const { id, email } = req.user;
  const {
    categoryId,
    subCategoryId,
    optionId,
    price,
    title,
    description,
    productId,
    coin,
  } = req.body;
  //console.log(req.body);
  if (
    !categoryId ||
    !subCategoryId ||
    !optionId ||
    !price ||
    !title ||
    !description ||
    !productId
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  if (!req.file) {
    try {
      const product = await prisma.products.update({
        where: {
          id: productId,
        },
        data: {
          categoryId,
          subCategoryId,
          optionId,
          price: parseInt(price),
          title,
          description,
          userId: id,
          coin: Boolean(coin),
        },
      });
      res.status(StatusCodes.OK).json({ data: product });
    } catch (e) {
      res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
    }
  } else {
    try {
      const { path } = await getProductThumbnail(req, res);
      const product = await prisma.products.update({
        where: {
          id: productId,
        },
        data: {
          categoryId,
          subCategoryId,
          optionId,
          price: parseInt(price),
          title,
          description,
          userId: id,
          thumbnail: path,
          coin: Boolean(coin),
        },
      });
      res.status(StatusCodes.OK).json({ data: product });
    } catch (e) {
      res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
    }
  }
};
export const deleteProduct = async (req, res) => {
  const { productId } = req.query;
  try {
    const product = await prisma.products.delete({
      where: {
        id: productId,
      },
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const acceptProduct = async (req, res) => {
  const { productId } = req.query;
  try {
    const product = await prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        verified: true,
      },
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getProductByOption = async (req, res) => {
  const { optionId } = req.query;
  try {
    const product = await prisma.products.findMany({
      where: {
        optionId:optionId
      },
      include: {
        user: true,
        offers: true,
        coins: true,
        variants:true
      },
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};