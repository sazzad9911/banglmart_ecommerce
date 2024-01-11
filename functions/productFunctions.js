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
export const duplicateProduct = async (req, res) => {
  const { id, email } = req.user;
  const { productId } = req.body;
  if (!productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  try {
    const data = await prisma.products.findUnique({
      where: {
        id: productId,
      },
    });
    const product = await prisma.products.create({
      data: {
        ...data,
        id: undefined,
        createdAt: undefined,
      },
    });
    res.status(StatusCodes.OK).json({ data: product });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getAllProduct = async (req, res) => {
  const { userId, page, perPage, search } = req.query;

  try {
    if (search) {
      const p = await prisma.products.findMany({
        where: {
          userId: userId ? userId : undefined,
          title: {
            contains: search,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          seller: true,
          brand: true,
        },

        take: page && perPage ? parseInt(perPage) : undefined,
        skip:
          page && perPage
            ? (parseInt(page) - 1) * parseInt(perPage)
            : undefined,
      });
      const length = await prisma.products.count({
        where: {
          userId: userId ? userId : undefined,
          title: {
            contains: search,
          },
        }
      });
     console.log(length);
      return res.status(StatusCodes.OK).json({ data: p, length: length });
    }
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
      take: page && perPage ? parseInt(perPage) : undefined,
      skip:
        page && perPage ? (parseInt(page) - 1) * parseInt(perPage) : undefined,
    });

    const length = await prisma.products.count({
      where: {
        userId: userId ? userId : undefined,
      },
    });
    res.status(StatusCodes.OK).json({ data: product, length });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    //console.log(id);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid id" });
  }
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: id,
      },
      include: {
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
      include: {
        reviews: true,
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
      include: {
        reviews: true,
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
      include: {
        reviews: true,
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
  const { brandId, page, perPage } = req.query;
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
      take: page && perPage ? parseInt(perPage) : undefined,
      skip:
        page && perPage ? (parseInt(page) - 1) * parseInt(perPage) : undefined,
    });
    const length = await prisma.products.count({
      where: {
        brandId: brandId,
        brand: {
          verified: true,
        },
        verified: true,
      },
    });
    res.status(StatusCodes.OK).json({ data: product, length });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getProductBySeller = async (req, res) => {
  const { sellerId, page, perPage } = req.query;
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
      take: page && perPage ? parseInt(perPage) : undefined,
      skip:
        page && perPage ? (parseInt(page) - 1) * parseInt(perPage) : undefined,
    });
    const length = await prisma.products.count({
      where: {
        sellerId: sellerId,
        seller: {
          verified: true,
        },
        verified: true,
      },
    });
    res.status(StatusCodes.OK).json({ data: product, length });
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
    bySeller,
    limit,
    page,
    perPage,
  } = req.query;

  try {
    const check = await prisma.products.findMany({
      where: {
        categoryId: byCategory || undefined,
        subCategoryId: bySubCategory || undefined,
        optionId: byOption || undefined,
        OR: [
          {
            option: {
              name: {
                contains: query,
              },
            },
          },
          {
            subCategory: {
              name: query,
            },
          },
          {
            title: {
              contains: query,
            },
          },
        ],
        price: {
          gte: byPriceFrom ? parseInt(byPriceFrom) : undefined,
          lte: byPriceTo ? parseInt(byPriceTo) : undefined,
        },
        brandId: byBrad || undefined,
        sellerId: bySeller || undefined,
      },
      take:
        page && perPage
          ? parseInt(perPage)
          : limit
          ? parseInt(limit)
          : undefined,
      skip:
        page && perPage ? (parseInt(page) - 1) * parseInt(perPage) : undefined,
    });
    let result = [];
    check.map((d) => {
      d.colors?.map((e) => {
        if (e.label.match(byColor)) {
          result.push(d);
        }
      });
      bySize &&
        d.sizes?.map((s) => {
          if (
            s.label.match(bySize.split(":")[0]) &&
            s.value.match(bySize.split(":")[1])
          ) {
            console.log(bySize.split(":")[0]);
            result.push(d);
          }
        });
    });

    res
      .status(StatusCodes.OK)
      .json({ data: byColor || bySize ? result : check });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const searchFilter = async (req, res) => {
  const { query, byCategory, bySubCategory, byOption } = req.query;

  try {
    const check = await prisma.products.findMany({
      where: {
        categoryId: byCategory || undefined,
        subCategoryId: bySubCategory || undefined,
        optionId: byOption || undefined,
        OR: [
          {
            option: {
              name: {
                contains: query,
              },
            },
          },
          {
            subCategory: {
              name: query,
            },
          },
          {
            title: {
              contains: query,
            },
          },
        ],
      },
      include: {
        category: true,
        subCategory: true,
        option: true,
        seller: true,
        brand: true,
      },
    });
    let category = [];
    let subCategory = [];
    let option = [];
    let seller = [];
    let brand = [];
    let color = [];
    let size = [];
    let minPrice = 43955677;
    let maxPrice = 0;
    check.map((doc) => {
      category.push(doc.category);
      subCategory.push(doc.subCategory);
      option.push(doc.option);
      doc.seller && seller.push(doc.seller);
      doc.brand && brand.push(doc.brand);
      doc?.colors?.map((col) => {
        color.push(col);
      });
      doc?.sizes?.map((sz) => {
        size.push(sz);
      });
      const productPrice = doc.price;
      if (productPrice < minPrice) {
        minPrice = productPrice;
      }
      if (productPrice > maxPrice) {
        maxPrice = productPrice;
      }
    });
    //const result=check.filter(d=>d.colors.map(s=>s.))

    res.status(StatusCodes.OK).json({
      category: [
        ...new Map(category.map((item) => [item["id"], item])).values(),
      ],
      subCategory: [
        ...new Map(subCategory.map((item) => [item["id"], item])).values(),
      ],
      option: [...new Map(option.map((item) => [item["id"], item])).values()],
      seller: [...new Map(seller.map((item) => [item["id"], item])).values()],
      brand: [...new Map(brand.map((item) => [item["id"], item])).values()],
      color: [...new Map(color.map((item) => [item["value"], item])).values()],
      size: [...new Map(size.map((item) => [item["value"], item])).values()],
      minPrice,
      maxPrice,
    });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}
