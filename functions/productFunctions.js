import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getProductThumbnail, getProductVariants } from "./main.js";

export const addProduct = async (req, res) => {
  const { id, email } = req.user;
  const {
    price,
    coin,
    title,
    description,
    quantity,
    minOrder,
    freeCoin,
    offer,
    percentage,
    freeDelivery,
    fixedPrice,
    colors,
    sizes,
    specifications,
    images,
    storeId,
    categoryId,
    subCategoryId,
    optionId,
    storeType,
    deliveryCharge,
    vat,
  } = req.body;
  if (
    !price ||
    !title ||
    !description ||
    !quantity ||
    !minOrder ||
    !storeId ||
    !storeType
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
        coin: Boolean(coin),
        title,
        description,
        thumbnail: path,
        quantity: parseInt(quantity),
        minOrder: parseInt(minOrder),
        freeCoin: freeCoin && parseInt(freeCoin),
        offer: offer && parseInt(offer),
        percentage: Boolean(percentage),
        freeDelivery: Boolean(freeDelivery),
        fixedPrice: Boolean(fixedPrice),
        colors: colors && JSON.parse(colors),
        sizes: sizes && JSON.parse(sizes),
        specifications: specifications && JSON.parse(specifications),
        images: images && JSON.parse(images),
        sellerId: storeType === "Shop" ? storeId : null,
        brandId: storeType === "Brand" ? storeId : null,
        userId: id,
        categoryId,
        subCategoryId,
        optionId,
        deliveryCharge: deliveryCharge ? parseInt(deliveryCharge) : 0,
        vat: parseInt(vat),
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
      orderBy: {
        createdAt: "desc",
      },
      include: {
        seller: true,
        brand: true,
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
    price,
    coin,
    title,
    description,
    quantity,
    minOrder,
    freeCoin,
    offer,
    percentage,
    freeDelivery,
    fixedPrice,
    colors,
    sizes,
    specifications,
    images,
    storeId,
    categoryId,
    subCategoryId,
    optionId,
    storeType,
    productId,
    deliveryCharge,
    vat,
  } = req.body;
  if (
    !price ||
    !title ||
    !description ||
    !quantity ||
    !minOrder ||
    !storeId ||
    !storeType ||
    !productId
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  try {
    if (req.file) {
      const { path } = await getProductThumbnail(req, res);

      const product = await prisma.products.update({
        data: {
          price: parseInt(price),
          coin: Boolean(coin),
          title,
          description,
          thumbnail: path,
          quantity: parseInt(quantity),
          minOrder: parseInt(minOrder),
          freeCoin: freeCoin && parseInt(freeCoin),
          offer: offer && parseInt(offer),
          percentage: Boolean(percentage),
          freeDelivery: Boolean(freeDelivery),
          fixedPrice: Boolean(fixedPrice),
          colors: colors && JSON.parse(colors),
          sizes: sizes && JSON.parse(sizes),
          specifications: specifications && JSON.parse(specifications),
          images: images && JSON.parse(images),
          sellerId: storeType === "Shop" ? storeId : null,
          brandId: storeType === "Brand" ? storeId : null,
          userId: id,
          categoryId,
          subCategoryId,
          optionId,
          deliveryCharge: deliveryCharge ? parseInt(deliveryCharge) : 0,
          vat: vat ? parseInt(vat) : undefined,
        },
        where: {
          id: productId,
        },
      });
      return res.status(StatusCodes.OK).json({ data: product });
    }

    const product = await prisma.products.update({
      data: {
        price: parseInt(price),
        coin: Boolean(coin),
        title,
        description,
        quantity: parseInt(quantity),
        minOrder: parseInt(minOrder),
        freeCoin: freeCoin && parseInt(freeCoin),
        offer: offer && parseInt(offer),
        percentage: Boolean(percentage),
        freeDelivery: Boolean(freeDelivery),
        fixedPrice: Boolean(fixedPrice),
        colors: colors && JSON.parse(colors),
        sizes: sizes && JSON.parse(sizes),
        specifications: specifications && JSON.parse(specifications),
        images: images && JSON.parse(images),
        sellerId: storeType === "Shop" ? storeId : null,
        brandId: storeType === "Brand" ? storeId : null,
        userId: id,
        categoryId,
        subCategoryId,
        optionId,
        deliveryCharge: deliveryCharge ? parseInt(deliveryCharge) : 0,
        vat: vat ? parseInt(vat) : undefined,
      },
      where: {
        id: productId,
      },
    });
    return res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
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
export const activeProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are required" });
  }
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
export const inactiveProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are required" });
  }
  try {
    const product = await prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        verified: false,
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
        verified: true,
      },
      orderBy: {
        createdAt: "desc",
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
      orderBy: {
        reviews: {
          _count: "desc",
        },
      },
      include:{
        reviews:true
      },
      take: 50,
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
        orders: {
          _count: "desc",
        },
      },
      include:{
        reviews:true
      },
      take: 50,
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getForYou = async (req, res) => {
  const { visitorId } = req.query;
  if (!visitorId) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ message: "Visitor id is required" });
  }

  try {
    const product = await prisma.product_visitors.findMany({
      where: {
        visitorsId: visitorId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        productInfo: true,
      },
    });
    if (product.length < 6) {
      const product = await prisma.product_visitors.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          productInfo: true,
        },
        take: 50,
      });
      return res.status(StatusCodes.OK).json({ data: product });
    }

    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getNew = async (req, res) => {
  try {
    const product = await prisma.products.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        reviews:true
      },
      take: 50,
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const addOffers = async (req, res) => {
  const { productId, money, percentage, name, type, deliveryFree } = req.body;
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
          deliveryFree: Boolean(deliveryFree),
        },
      });
      return res.status(StatusCodes.OK).json({ data: offers });
    }
    const offers = await prisma.offers.create({
      data: {
        name,
        percentage: Boolean(percentage),
        money: parseInt(money),
        productId: productId,
        deliveryFree: Boolean(deliveryFree),
      },
    });
    res.status(StatusCodes.OK).json({ data: offers });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};

export const getProductByBrand = async (req, res) => {
  const { brandId } = req.query;
  if (!brandId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some fields are required" });
  }
  try {
    const product = await prisma.products.findMany({
      where: {
        brandId: brandId,
        brand: {
          verified: true,
        },
        verified: true,
      },
      // include: {
      //   user: true,
      //   seller: true,
      //   brand: true,
      //   comments: true,
      //   reviews: true,
      // },
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getProductBySeller = async (req, res) => {
  const { sellerId } = req.query;
  if (!sellerId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some fields are required" });
  }
  try {
    const product = await prisma.products.findMany({
      where: {
        sellerId: sellerId,
        seller: {
          verified: true,
        },
        verified: true,
      },
      // include: {
      //   user: true,
      //   seller: true,
      //   brand: true,
      //   comments: true,
      //   reviews: true,
      // },
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getBargainingProduct = async (req, res) => {
  try {
    const product = await prisma.products.findMany({
      where: {
        fixedPrice: false,
        verified: true,
      },
      // include: {
      //   user: true,
      //   seller: true,
      //   brand: true,
      //   comments: true,
      //   reviews: true,
      // },
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getProductDetails = async (req, res) => {
  const { productId, visitorId } = req.query;
  if (!visitorId || !productId) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ message: "Visitor id and product id is required" });
  }
  try {
    const check = await prisma.product_visitors.findMany({
      where: {
        visitorsId: visitorId,
        productsId: productId,
      },
    });
    if (check && check.length === 0) {
      await prisma.product_visitors.create({
        data: {
          visitorsId: visitorId,
          productsId: productId,
        },
      });
    }
    const product = await prisma.products.findUnique({
      where: {
        id: productId,
        verified: true,
      },
      include: {
        user: true,
        seller: true,
        brand: true,
        comments: true,
        reviews: true,
      },
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const search = async (req, res) => {
  const {
    query,
    byCategory,
    bySubCategory,
    byOption,
    byPriceFrom,
    byPriceTo,
    byColor,
    bySize,
    bySpecification,
    byBrad,
    bySeller
  } = req.query;
  
  try {
    const check = await prisma.products.findMany({
      where: {
        categoryId: byCategory||undefined,
        subCategoryId: bySubCategory||undefined,
        optionId:byOption||undefined,
        title:{
          contains:query
        },
        price:{
          gte:byPriceFrom?parseInt(byPriceFrom):undefined,
          lte:byPriceTo?parseInt(byPriceTo):undefined
        },
        brandId:byBrad||undefined,
        sellerId:bySeller||undefined
        
      },
    });
    //const result=check.filter(d=>d.colors.map(s=>s.))
    
    res.status(StatusCodes.OK).json({ data: check });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
