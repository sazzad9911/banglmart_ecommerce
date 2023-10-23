
import { auth } from "../firebase.js";
import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { getImageToUrl } from "./main.js";

const getAllCategory = async (req, res) => {
  try {
    const result = await prisma.category.findMany({
      include:{
        subCategory:true
      },
      orderBy:{
        name:"asc"
      }
    })
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const getSubCategory = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const result = await prisma.subCategory.findMany({
      where:{
        categoryId:categoryId?categoryId:undefined
      }
    })
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const getOptions = async (req, res) => {
  const { subCategoryId } = req.query;
  // if (!subCategoryId) {
  //   return res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: "Ops! subCategoryId is required" });
  // }
  try {
    const result = await prisma.options.findMany({
      where: {
        subCategoryId: subCategoryId?subCategoryId:undefined,
      },
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const storeCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Name need to store data" });
  }
  try {
    const { path } = await getImageToUrl(req, res);

    const result = await prisma.category.create({
      data: {
        name,
        icon:path,
      },
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
export const editCategory = async (req, res) => {
  const { name,id } = req.body;
  if (!name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Name need to store data" });
  }
  try {
    const { path } = req.file?await getImageToUrl(req, res):{path:undefined}

    const result = await prisma.category.update({
      data: {
        name,
        icon:path,
      },
      where:{
        id:id
      }
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const storeSubCategory = async (req, res) => {
  const { name, categoryId } = req.body;
  if (!name || !categoryId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Name and categoryId need to store data" });
  }
  try {
    const result = await prisma.subCategory.create({
      data: {
        name,
        categoryId,
      },
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
export const editSubCategory = async (req, res) => {
  const { name, categoryId,id } = req.body;
  if (!name || !categoryId||!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Name and categoryId need to store data" });
  }
  try {
    const result = await prisma.subCategory.update({
      data: {
        name,
        categoryId,
      },
      where:{
        id:id
      }
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const storeOption = async (req, res) => {
  const { name, subCategoryId } = req.body;
  if (!name || !subCategoryId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Name and categoryId need to store data" });
  }
  try {
    const result = await prisma.options.create({
      data: {
        name,
        subCategoryId,
      },
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
export const editOption = async (req, res) => {
  const { name, subCategoryId,id } = req.body;
  if (!name || !subCategoryId||!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Name and categoryId need to store data" });
  }
  try {
    const result = await prisma.options.update({
      data: {
        name,
        subCategoryId,
      },
      where:{
        id:id
      }
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const deleteOption = async (req, res) => {
  const { optionId } = req.body;
  if (!optionId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Ops! optionId is required" });
  }
  try {
    const result = await prisma.options.delete({
      where: {
        id: optionId,
      },
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const deleteSubCategory = async (req, res) => {
  const { subCategoryId } = req.body;
  if (!subCategoryId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Ops! subCategoryId is required" });
  }
  try {
    const result = await prisma.subCategory.delete({
      where: {
        id: subCategoryId,
      },
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const deleteCategory = async (req, res) => {
  const { categoryId } = req.body;
  if (!categoryId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Ops! categoryId is required" });
  }
  try {
    const result = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
export {
  getAllCategory,
  getOptions,
  storeCategory,
  storeOption,
  storeSubCategory,
  deleteCategory,
  deleteOption,
  deleteSubCategory,
  getSubCategory
};
