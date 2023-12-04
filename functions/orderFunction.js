import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { orderState } from "./state.js";
import admin from "../admin.js";
import { sendNotification } from "../lib/sendNotification.js";
import { v1 } from "uuid";
import { createPayment } from "../lib/amarpay.js";
import path, { join } from "path";
import { fileURLToPath } from "url";
import bkash from "../lib/bkash.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createOrder = async (req, res) => {
  const { token, paymentMethod, redirectUrl } = req.body;
  const { id } = req.user;
  const { bkashToken } = req;
  const siteUrl="https://api.banglamartecommerce.com.bd"

  if (!token || !paymentMethod || !redirectUrl) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  if (paymentMethod === "bkash") {
    try {
      const {
        products,
        subTotal,
        totalDeliveryFee,
        specialMemberOffer,
        specialPromoOffer,
        address,
      } = jwt.verify(token, process.env.AUTH_TOKEN);
      const amount = parseFloat(
        parseFloat(subTotal) + parseFloat(totalDeliveryFee)
      ).toFixed(2);
      let arr = [];
      products.map((d) => {
        arr.push(d.id);
      });
      //http://localhost:1300
      const result = await bkash.createPayment(
        bkashToken,
        amount,
        arr.join(","),
        `${siteUrl}/order/acceptBkashPay/${token}/${id}/${redirectUrl
          ?.split("/")
          .join("_")}/${amount}/${bkashToken}`
      );
      if (result.statusCode == "0000") {
        return res.status(StatusCodes.OK).json({ url: result.bkashURL });
      } else {
        return res
          .status(StatusCodes.BAD_GATEWAY)
          .json({ message: result.statusMessage });
      }
    } catch (e) {
      return res.status(StatusCodes.BAD_GATEWAY).json({ message: e.message });
    }
  }

  if (paymentMethod === "amarpay") {
    try {
      const {
        products,
        subTotal,
        totalDeliveryFee,
        specialMemberOffer,
        specialPromoOffer,
        address,
      } = jwt.verify(token, process.env.AUTH_TOKEN);
      const amount = parseFloat(
        parseFloat(subTotal) + parseFloat(totalDeliveryFee)
      ).toFixed(2);
      const user = await prisma.users.findUnique({
        where: {
          id: id,
        },
      });
      let arr = [];
      products.map((d) => {
        arr.push(d.id);
      });
      const successUrl = `${siteUrl}/order/acceptPay?paymentMethod=${paymentMethod}&token=${token}&id=${id}&url=${redirectUrl}&color=green&name=${
        user.name
      }&title=Payment Success&description=Your payment has accepted. Order has created.&amount=${amount}&contact=${
        user.email || user.phone
      }`;
      const failedUrl = `${siteUrl}/order/acceptPay?url=${redirectUrl}&color=red&name=${
        user.name
      }&title=Payment Failed&description=Your payment has failed. Go to cart.&amount=${amount}&contact=${
        user.email || user.phone
      }`;

      const data = await createPayment(
        amount,
        user.name,
        arr.join(","),
        user.email || "bangla@gmail.com",
        user.phone || "34949292838329",
        successUrl,
        failedUrl,
        failedUrl
      );
      if (data?.result === "true") {
        return res.status(StatusCodes.OK).json({ url: data.payment_url });
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: data });
      }
    } catch (e) {
      return res.status(StatusCodes.BAD_GATEWAY).json({ message: e.message });
    }
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

    await Promise.all(
      products.map(async (product) => {
        let title = "You have new order!";
        let text = `You have new order request for the product ${product.productTitle}`;
        const order = await prisma.orders.create({
          data: {
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
            offerPrice: product?.bargaining
              ? parseFloat(product.totalPrice)
              : 0,
            couponDiscount: parseFloat(product?.couponDiscount),
            specialMemberOffer: parseFloat(
              specialMemberOffer / products.length
            ),
            specialPromoOffer: parseFloat(specialPromoOffer / products.length),
            freeCoin: parseInt(product.freeCoin),
          },
        });
        await prisma.cart.delete({
          where: {
            id: product.id,
          },
        });
        await sendNotification(title, text, product.userId, order.id);
      })
    );
    return res.status(StatusCodes.OK).json({ url: redirectUrl });
    //res.redirect(redirectUrl)
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
            : doc?.product.price * doc?.quantity +
                ((doc?.product.vat * doc?.product.price) / 100) * doc.quantity -
                (offerDiscount * doc?.quantity + couponDiscount)
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
        userId: doc.product.userId,
        id: doc.id,
        quantity: doc.quantity,
        color: doc.colors,
        size: doc.sizes,
        specifications: doc.specifications,
        bargaining: doc.offerPrice ? true : false,
        totalPrice: doc.offerPrice
          ? doc.offerPrice * doc.quantity
          : doc?.product.price * doc?.quantity +
          ((doc?.product.vat * doc?.product.price) / 100) * doc.quantity -
          (offerDiscount * doc?.quantity + couponDiscount).toFixed(2),
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
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
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
      : await prisma.brands.findUnique({
          where: {
            id: order.product.brandId,
          },
        });
    res
      .status(StatusCodes.OK)
      .json({ data: { ...order, category: category, store: store } });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const acceptOrder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  try {
    const order = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        status: orderState[1],
      },
      include: {
        product: true,
      },
    });
    await sendNotification(
      `Order Accepted`,
      `Your order ${order.product.title} has accepted by seller`,
      order.buyerId,
      order.id
    );
    res.status(StatusCodes.OK).json({ data: order });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const rejectOrder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  try {
    const order = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        status: orderState[2],
      },
    });
    await sendNotification(
      `Order Rejected!`,
      `Your order ${order.product.title} has reject by seller`,
      order.buyerId,
      order.id
    );
    res.status(StatusCodes.OK).json({ data: order });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const cancelOrder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  try {
    const isOrder = await prisma.orders.findUnique({
      where: {
        id: id,
      },
    });
    if (isOrder.status != orderState[0]) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "You can not cancel the order. The order has been accepted. Please contact the seller",
      });
    }
    const order = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        status: orderState[3],
      },
    });
    await sendNotification(
      `Order Cancelled!`,
      `Your order ${order.product.title} has cancelled by seller`,
      order.buyerId,
      order.id
    );
    res.status(StatusCodes.OK).json({ data: order });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const completeOrder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  try {
    const isOrder = await prisma.orders.findUnique({
      where: {
        id: id,
      },
    });
    if (!isOrder.paid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Payment is pending." });
    }
    const order = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        status: orderState[4],
      },
    });
    res.status(StatusCodes.OK).json({ data: order });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const refundOrder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  try {
    const isOrder = await prisma.orders.findUnique({
      where: {
        id: id,
      },
    });
    if (isOrder.status != orderState[4]) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid refund policy" });
    }
    const order = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        status: orderState[5],
      },
    });
   
    res.status(StatusCodes.OK).json({ data: order });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const courierOrder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  try {
    const isOrder = await prisma.orders.findUnique({
      where: {
        id: id,
      },
    });
    if (isOrder.status != orderState[1]) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Order has not accepted yet" });
    }
    const order = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        status: orderState[6],
      },
    });
    await sendNotification(
      `Order is On the way!`,
      `Your order ${order.product.title} has shifted into courier by seller`,
      order.buyerId,
      order.id
    );
    res.status(StatusCodes.OK).json({ data: order });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const paidOrder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Some field are missing" });
  }
  try {
    const isOrder = await prisma.orders.findUnique({
      where: {
        id: id,
      },
    });
    if (isOrder.status != orderState[6]) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Order has not send to courier yet" });
    }
    const order = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        paid: true,
      },
    });
    res.status(StatusCodes.OK).json({ data: order });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const confirmPayment = async (req, res) => {
  const {
    token,
    paymentMethod,
    id,
    url,
    name,
    color,
    title,
    description,
    amount,
    contact,
  } = req.query;
  try {
    if (id && token) {
      const payment = await prisma.payment.create({
        data: {
          paymentMethod: paymentMethod,
          amount: parseFloat(amount),
          sku: id,
        },
      });
      const {
        products,
        subTotal,
        totalDeliveryFee,
        specialMemberOffer,
        specialPromoOffer,
        address,
      } = jwt.verify(token, process.env.AUTH_TOKEN);

      await Promise.all(
        products.map(async (product) => {
          let title = "You have new order!";
          let text = `You have new order request for the product ${product.productTitle}`;
          const order = await prisma.orders.create({
            data: {
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
              offerPrice: product?.bargaining
                ? parseFloat(product.totalPrice)
                : 0,
              couponDiscount: parseFloat(product?.couponDiscount),
              specialMemberOffer: parseFloat(
                specialMemberOffer / products.length
              ),
              specialPromoOffer: parseFloat(
                specialPromoOffer / products.length
              ),
              freeCoin: parseInt(product.freeCoin),
              paid: true,
              paymentId: payment.id,
            },
          });
          await prisma.cart.delete({
            where: {
              id: product.id,
            },
          });
          await sendNotification(title, text, product.userId, order.id);
        })
      );
    }
    res.render(path.join(__dirname, "views/success"), {
      url: url,
      name: name,
      color: color,
      title: title,
      description: description,
      amount: amount,
      contact: contact,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
export const confirmBkashPayment = async (req, res) => {
  const { token, id, url, amount, bToken } = req.params;
  const { paymentID, status } = req.query;
  try {
    if (status === "success") {
      const result = await bkash.executePayment(bToken, paymentID);
      if (result.statusCode != "0000") {
        return res.send(`<div>
        <p>Some thing is went wrong</p>
        <a href="https://${url}">Back to Home</a>
        </div>`);
      }
      const payment = await prisma.payment.create({
        data: {
          paymentID: paymentID,
          trxID: result?.trxID,
          paymentMethod: "bkash",
          amount: parseFloat(amount),
          sku: id,
        },
      });
      if (id && token) {
        const {
          products,
          subTotal,
          totalDeliveryFee,
          specialMemberOffer,
          specialPromoOffer,
          address,
        } = jwt.verify(token, process.env.AUTH_TOKEN);

        await Promise.all(
          products.map(async (product) => {
            let title = "You have new order!";
            let text = `You have new order request for the product ${product.productTitle}`;
            const order = await prisma.orders.create({
              data: {
                buyerId: id,
                productId: product.productId,
                paymentMethod: "bkash",
                address: address,
                token: token,
                totalAmount: parseFloat(
                  parseFloat(product.totalPrice) +
                    parseFloat(product.deliveryFee)
                ),
                quantity: parseInt(product.quantity),
                deliveryFee: parseFloat(product.deliveryFee),
                colors: product.color,
                sizes: product.size,
                specifications: product.specifications,
                offerPrice: product?.bargaining
                  ? parseFloat(product.totalPrice)
                  : 0,
                couponDiscount: parseFloat(product?.couponDiscount),
                specialMemberOffer: parseFloat(
                  specialMemberOffer / products.length
                ),
                specialPromoOffer: parseFloat(
                  specialPromoOffer / products.length
                ),
                freeCoin: parseInt(product.freeCoin),
                paid: true,
                paymentId: payment.id,
              },
            });
            await prisma.cart.delete({
              where: {
                id: product.id,
              },
            });
            await sendNotification(title, text, product.userId, order.id);
          })
        );
      }
    }
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    res.render(path.join(__dirname, "views/success"), {
      url: `${url.split("_").join("/")}`,
      name: user.name,
      color: status == "success" ? "green" : "red",
      title: status == "success" ? "Payment Success" : "Payment Failed",
      description:
        status == "success"
          ? "Your payment has accepted by merchant"
          : "Your payment has failed of some restrictions",
      amount: amount,
      contact: user.email || user.phone,
    });
  } catch (error) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: error.message });
  }
};
