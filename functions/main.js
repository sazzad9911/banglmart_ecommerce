import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import sharp from "sharp";
import path from 'path'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Your api is correct",
  });
};
const getInfo = async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(StatusCodes.OK).json(allUsers);
};
const storeInfo = async (req, res) => {
  if (
    !req.body.email &&
    !req.body.password &&
    !req.body.address &&
    !req.body.age
  ) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please fill all fields",
    });
    res.end();
  }

  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      age: req.body.age,
    },
  });

  res.status(StatusCodes.OK).json({
    message: "User created",
  });
  res.end();
};
const uploadImage = async (req, res) => {

  if(!req.file){
    return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid file"})
  }
 
  try {
    await sharp(req.file.buffer)
      .resize({ width: 800, height: 400 })
      .png()
      .toFile(__dirname + `/images/${req.file.originalname}`);
    res.status(StatusCodes.OK).json({path:`images/${req.file.originalname}`});
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
const getImageToUrl = async (req, res) => {

  if(!req.file){
    return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid file"})
  }
 
  try {
    await sharp(req.file.buffer)
      .resize({ width: 50, height: 50 })
      .png()
      .toFile(__dirname + `/images/icon/${req.file.originalname}`);
    return {path:`/images/icon/${req.file.originalname}`}
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export const getProductThumbnail = async (req, res) => {

  if(!req.file){
    return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid file"})
  }
 
  try {
    await sharp(req.file.buffer)
      .resize({ width: 180, height: 225 })
      .png()
      .toFile(__dirname + `/images/${req.file.originalname}`);
    return {path:`/images/${req.file.originalname}`}
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export { main, getInfo, storeInfo, uploadImage,getImageToUrl };
