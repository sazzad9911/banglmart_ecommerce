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
        quantity: {
          gte: 1,
        },
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
        optionId: optionId,
      },
      include: {
        user: true,
        offers: true,
        coins: true,
        variants: true,
      },
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const updateQuantity = async (req, res) => {
  const { id, email } = req.user;
  const { minOrder, productId, quantity } = req.body;
  //console.log(req.body);
  if (!minOrder || !quantity || !productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }

  try {
    const product = await prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        minOrder: parseInt(minOrder),
        quantity: parseInt(quantity),
      },
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getFlashSell = async (req, res) => {
  try {
    const product = await prisma.products.findMany({
      where: {
        quantity: {
          gte: 10,
        },
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
export const getTop = async (req, res) => {
  try {
    const product = await prisma.products.findMany({
      where: {
        quantity: {
          gte: 10,
        },
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
export const getTopSell = async (req, res) => {
  try {
    const product = await prisma.products.findMany({
      orderBy: {
        createdAt: "desc",
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
export const getForYou = async (req, res) => {
  try {
    const product = await prisma.products.findMany({
      where: {
        quantity: {
          gte: 10,
        },
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
export const addOffers = async (req, res) => {
  const { productId, money, percentage, name,type } = req.body;
  // console.log(productId);
  if (!name || !productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are required" });
  }
  try {
    if (type) {
      const offers = await prisma.offers.update({
        where: {
          productId: productId,
        },
        data: {
          name,
          percentage: Boolean(percentage),
          money: parseInt(money),
        },
      });
      return res.status(StatusCodes.OK).json({ data: offers });
    }
    const offers = await prisma.offers.create({
      data: {
        name,
        percentage: Boolean(percentage),
        money: parseInt(money),
        productId:productId
      },
    });
    res.status(StatusCodes.OK).json({ data: offers });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
