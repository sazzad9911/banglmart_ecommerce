import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getBannerImageLink, getLogoLink } from "./main.js";

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
        addId: addId,
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
      arr.push({ addId: d, visitorsId: visitorId });
    });
    const visit = await prisma.adds_visitors.createMany({
      data: arr,
      skipDuplicates: true,
    });
    res.status(StatusCodes.OK).json({ data: visit });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getAdds = async (req, res) => {
  const { visitorId } = req.query;
  if (!visitorId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid visitor id" });
  }
  try {
    const visit = await prisma.adds.findMany({
      where: {
        NOT: {
          visitors: {
            some: {
              visitorsId: visitorId,
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
export const createSlider = async (req, res) => {
  const { title, productId } = req.body;
  if (!title || !productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const { path } = await getBannerImageLink(req, res);
    const adds = await prisma.slider.create({
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
export const deleteSlider = async (req, res) => {
  const { sliderId } = req.query;
  if (!sliderId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const adds = await prisma.slider.delete({
      where: {
        id: sliderId,
      },
    });
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getSlider = async (req, res) => {
  try {
    const adds = await prisma.slider.findMany({});
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const createBanner = async (req, res) => {
  const { title, productId } = req.body;
  if (!title || !productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const { path } = await getBannerImageLink(req, res);
    const adds = await prisma.banner.create({
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
export const updateBanner = async (req, res) => {
  const { bannerId, title, productId } = req.body;
  if (!bannerId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const { path } = req.file
      ? await getBannerImageLink(req, res)
      : { path: null };
    const adds = await prisma.banner.update({
      data: {
        title,
        image: path ? path : undefined,
        productId,
      },
      where: {
        id: bannerId,
      },
    });
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const deleteBanner = async (req, res) => {
  const { bannerId } = req.query;
  if (!bannerId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are require" });
  }
  try {
    const adds = await prisma.banner.delete({
      where: {
        id: bannerId,
      },
    });
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getBanner = async (req, res) => {
  try {
    const adds = await prisma.banner.findMany({});
    res.status(StatusCodes.OK).json({ data: adds });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
