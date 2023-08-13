import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getProductThumbnail } from "./main.js";

export const getFlashSell = async (req, res) => {
  try {
    const flash = await prisma.flashSell.findMany({
      where: {
        endAt: {
          gt: new Date(),
        },
      },
      include: {
        product: true,
      },
    });
    res.status(StatusCodes.OK).json({ data: flash });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
