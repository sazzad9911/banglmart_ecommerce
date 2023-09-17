import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getLogoLink } from "./main.js";

export const createAdds = async (req, res) => {
  const { title, productId } = req.body;
  if (!title || !productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const { path } = await getLogoLink(req, res);
    const adds = await prisma.adds.create({
      data: {
        title,
        image: path,
        productId,
      },
    });
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const closeAdd = async (req, res) => {
  const { addId, visitorId } = req.body;
  if (!addId || !visitorId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const visit = await prisma.adds_visitors.create({
      data: {
        addsId: addId,
        visitorsId: visitorId,
      },
    });
    res.status(StatusCodes.OK).json({ data: visit });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const closeAllAdds = async (req, res) => {
  const { addsId, visitorId } = req.body;
  if (!Array.isArray(addsId) || !visitorId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require and addsId array required" });
  }
  try {
    let arr = [];
    addsId.map((d) => {
      arr.push({ addsId: d, visitorsId: visitorId });
    });
    const visit = await prisma.adds_visitors.createMany({
      data: arr,
    });
    res.status(StatusCodes.OK).json({ data: visit });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getAdds = async (req, res) => {
  const { visitorId } = req.query;
  try {
    const visit = await prisma.adds.findMany({
      where: {
        NOT: {
          visitors: {
            some: {
              id: visitorId,
            },
          },
        },
      },
    });
    res.status(StatusCodes.OK).json({ data: visit });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};

