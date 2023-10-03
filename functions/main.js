import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import sharp from "sharp";
import path from 'path'
import {fileURLToPath} from 'url';
import {v1} from 'uuid';
import axios from "axios";
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
      .resize({ width: 580, height: 720 })
      .png()
      .toFile(__dirname + `/images/${req.file.originalname}`);
    return {path:`/images/${req.file.originalname}`}
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export const getProductVariants = async (req, res) => {

  if(!req.file){
    return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid file"})
  }
 
  try {
    await sharp(req.file.buffer)
      .resize({ width: 580, height: 720 })
      .png()
      .toFile(__dirname + `/images/${req.file.originalname}`);
    return {path:`/images/${req.file.originalname}`}
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export const getBannerImageLink = async (req, res) => {

  if(!req.file){
    return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid file"})
  }
 
  try {
    await sharp(req.file.buffer)
      .resize({ width: 1200, height: 500 })
      .png()
      .toFile(__dirname + `/images/${req.file.originalname}`);
    return {path:`/images/${req.file.originalname}`}
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export const getLogoLink = async (req, res) => {

  if(!req.file){
    return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid file"})
  }
 
  try {
    await sharp(req.file.buffer)
      .resize({ width: 500, height: 500 })
      .png()
      .toFile(__dirname + `/images/logo${req.file.originalname}`);
    return {path:`/images/logo${req.file.originalname}`}
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export const sendSingleSms=async(phone,message)=>{
  const uid=randomNumber(12)
  //console.log(uid);
  const res=await axios.get(`${process.env.DOMAIN}/api/v3/send-sms?api_token=${process.env.API_TOKEN}&sid=${process.env.SID}&msisdn=88${phone}&sms=${message}&csms_id=${uid}`)
  return res.data
}
function randomNumber(length) {
  var text = "";
  var possible = "123456789";
  for (var i = 0; i < length; i++) {
    var sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup == i ? "0" : possible.charAt(sup);
  }
  return Number(text);
}
export { main, getInfo, storeInfo, uploadImage,getImageToUrl,randomNumber };
