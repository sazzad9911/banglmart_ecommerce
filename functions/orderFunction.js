import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const createOrder = async (req, res) => {
  const { token, paymentMethod } = req.body;
  const { id } = req.user;

  if (!token || !paymentMethod) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }

  if (paymentMethod === "online") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Payment system is not added yet" });
  }
  try {
    const {
      products,
      subTotal,
      totalDeliveryFee,
      specialMemberOffer,
      specialPromoOffer,
      address,
    } = jwt.verify(token, process.env.AUTH_TOKEN);

    let arr = [];
    products?.map((product) => {
      arr.push({
        buyerId: id,
        productId: product.productId,
        paymentMethod: paymentMethod,
        address: address,
        token: token,
        totalAmount: parseFloat(
          parseFloat(product.totalPrice) + parseFloat(product.deliveryFee)
        ),
        quantity: parseInt(product.quantity),
        deliveryFee: parseFloat(product.deliveryFee),
        colors: product.color,
        sizes: product.size,
        specifications: product.specifications,
        offerPrice: product?.bargaining ? parseFloat(product.totalPrice) : 0,
        couponDiscount: parseFloat(product?.couponDiscount),
        specialMemberOffer: parseFloat(specialMemberOffer / products.length),
        specialPromoOffer: parseFloat(specialPromoOffer / products.length),
        freeCoin: parseInt(product.freeCoin),
      });
    });

    const order = await prisma.orders.createMany({
      data: arr,
    });
    res.status(StatusCodes.OK).json({ data: order });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const checkOut = async (req, res) => {
  const { specialCodeId, promoId, address, cartIds } = req.body;
  const { id } = req.user;

  if (!Array.isArray(cartIds) || !address) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }

  if (
    !address.division ||
    !address.district ||
    !address.subDistrict ||
    !address.union
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid address field" });
  }
  try {
    const extraDeliveryCost = await prisma.delivery_fee.findMany({
      where: {
        division: address.division,
        district: address.district,
        subDistrict: address.subDistrict,
        union: address.union,
      },
    });
    const specialMember = specialCodeId
      ? await prisma.special_member.findUnique({
          where: {
            id: specialCodeId,
          },
        })
      : null;
    const promoCode = promoId
      ? await prisma.promo_code.findUnique({
          where: {
            id: promoId,
          },
        })
      : null;

    const carts = await Promise.all(
      cartIds.map(async (cartId) => {
        return await prisma.cart.findUnique({
          where: {
            id: cartId,
          },
          include: {
            product: true,
            coupon: true,
          },
        });
      })
    );
    let products = [];
    let subTotal = 0;
    let totalDeliveryFee = 0;

    carts.map((doc, i) => {
      const couponDiscount = doc?.coupon
        ? doc.coupon.percentage
          ? (doc.product.price * doc.coupon.offer) / 100
          : doc.coupon.offer
        : 0;
      const offerDiscount = doc?.product?.percentage
        ? (doc.product.offer * doc.product.price) / 100
        : doc?.product?.offer;
      subTotal = (
        parseFloat(subTotal) +
        parseFloat(
          doc?.offerPrice
            ? doc.offerPrice * doc.quantity
            : doc?.product.price * doc?.quantity -
                (offerDiscount * doc?.quantity +
                  couponDiscount +
                  doc?.product.vat * doc.quantity)
        )
      ).toFixed(2);
      totalDeliveryFee = (
        parseFloat(totalDeliveryFee) +
        parseFloat(
          doc.product.deliveryCharge
            ? parseFloat(
                doc.product.deliveryCharge +
                  (extraDeliveryCost > 0 ? extraDeliveryCost[0].fee : 0)
              )
            : 0
        )
      ).toFixed(2);
      products.push({
        productTitle: doc.product.title,
        productImage: doc.product.thumbnail,
        productId: doc.product.id,
        freeCoin: doc.product.freeCoin * doc.quantity,
        sellerId: doc.product.sellerId,
        brandId: doc.product.brandId,
        quantity: doc.quantity,
        color: doc.colors,
        size: doc.sizes,
        specifications: doc.specifications,
        bargaining: doc.offerPrice ? true : false,
        totalPrice: doc.offerPrice
          ? doc.offerPrice * doc.quantity
          : (
              doc.product.price * doc.quantity -
              (offerDiscount * doc.quantity +
                couponDiscount +
                doc.product.vat * doc.quantity)
            ).toFixed(2),
        couponDiscount: doc.offerPrice ? 0 : couponDiscount.toFixed(2),
        offerDiscount: doc.offerPrice
          ? 0
          : (offerDiscount * doc.quantity).toFixed(2),
        deliveryFee: doc.product.deliveryCharge
          ? parseFloat(
              doc.product.deliveryCharge +
                (extraDeliveryCost.length > 0 ? extraDeliveryCost[0].fee : 0)
            ).toFixed(2)
          : 0,
      });
    });
    const specialMemberOffer = specialMember
      ? parseFloat(
          specialMember.percentage
            ? (specialMember.offer * subTotal) / 100
            : specialMember.offer
        )
      : 0;
    const specialPromoOffer = promoCode
      ? parseFloat(
          promoCode.percentage
            ? (promoCode.offer * subTotal) / 100
            : promoCode.offer
        )
      : 0;
    subTotal = (
      parseFloat(subTotal) -
      (specialMemberOffer + specialPromoOffer)
    ).toFixed(2);
    const newToken = jwt.sign(
      {
        products: products,
        subTotal,
        totalDeliveryFee,
        specialMemberOffer,
        specialPromoOffer,
        address,
      },
      process.env.AUTH_TOKEN
    );
    res.status(StatusCodes.OK).json({
      products: products,
      subTotal,
      totalDeliveryFee,
      specialMemberOffer,
      specialPromoOffer,
      token: newToken,
    });
  } catch (e) {
    res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: e.code ? e.message : "Invalid cart IDs" });
  }
};
export const getUserOrders = async (req, res) => {
  const { id } = req.user;
  try {
    const order = await prisma.orders.findMany({
      where: {
        buyerId: id,
      },
      include: {
        product: true,
        buyer: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    res.status(StatusCodes.OK).json({ data: order });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getSellerOrders = async (req, res) => {
  const { id } = req.user;

  try {
    const order = await prisma.orders.findMany({
      where: {
        product: {
          userId: id,
        },
      },
      include: {
        product: true,
        buyer: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    res.status(StatusCodes.OK).json({ data: order });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.orders.findUnique({
      where: {
        id: id,
      },
      include: {
        product: true,
        buyer: true,
      },
    });
    const category = await prisma.category.findUnique({
      where: {
        id: order.product.categoryId,
      },
    });
    const store = order.product.sellerId
      ? await prisma.seller.findUnique({
          where: {
            id: order.product.sellerId,
          },
        })
      : await prisma.brand.findUnique({
          where: {
            id: order.product.brandId,
          },
        });
    res.status(StatusCodes.OK).json({ data: { ...order, category: category,store:store } });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
