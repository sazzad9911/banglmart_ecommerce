import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { v1 } from "uuid";
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
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid file" });
  }

  try {
    const name=v1()
    await sharp(req.file.buffer)
      .resize({ width: 800, height: 400 })
      .png()
      .toFile(__dirname + `/images/${name}-${req.file.originalname}`);
    res
      .status(StatusCodes.OK)
      .json({ path: `images/${name}-${req.file.originalname}` });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export const uploadCampaignImage = async (req, res) => {
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid file" });
  }

  try {
    const name=v1()
    await sharp(req.file.buffer)
      .resize({ width: 800, height: 400 })
      .png()
      .toFile(__dirname + `/images/${name}-${req.file.originalname}`);
    return { path: `/images/${name}-${req.file.originalname}` };
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
const getImageToUrl = async (req, res) => {
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid file" });
  }

  try {
    const name=v1()
    await sharp(req.file.buffer)
      .resize({ width: 50, height: 50 })
      .png()
      .toFile(__dirname + `/images/icon/${name}-${req.file.originalname}`);
    return { path: `/images/icon/${name}-${req.file.originalname}` };
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export const getProductThumbnail = async (req, res) => {
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid file" });
  }

  try {
    const name=v1()
    await sharp(req.file.buffer)
      .resize({ width: 580, height: 720 })
      .png()
      .toFile(__dirname + `/images/${name}-${req.file.originalname}`);
    return { path: `/images/${name}-${req.file.originalname}` };
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export const getProductVariants = async (req, res) => {
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid file" });
  }

  try {
    const name=v1()
    await sharp(req.file.buffer)
      .resize({ width: 580, height: 720 })
      .png()
      .toFile(__dirname + `/images/${name}-${req.file.originalname}`);
    return { path: `/images/${name}-${req.file.originalname}` };
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export const getBannerImageLink = async (req, res) => {
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid file" });
  }

  try {
    const name=v1()
    await sharp(req.file.buffer)
      .resize({ width: 1200, height: 500 })
      .png()
      .toFile(__dirname + `/images/${name}-${req.file.originalname}`);
    return { path: `/images/${name}-${req.file.originalname}` };
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export const getLogoLink = async (req, res) => {
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid file" });
  }

  try {
    const name=v1()
    await sharp(req.file.buffer)
      .resize({ width: 500, height: 500 })
      .png()
      .toFile(__dirname + `/images/${name}-${req.file.originalname}`);
    return { path: `/images/${name}-${req.file.originalname}` };
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export const sendSingleSms = async (phone, message) => {
  const uid = randomNumber(12);
  //console.log(uid);
  const res = await axios.get(
    `${process.env.DOMAIN}/api/v3/send-sms?api_token=${process.env.API_TOKEN}&sid=${process.env.SID}&msisdn=88${phone}&sms=${message}&csms_id=${uid}`
  );
  return res.data;
};
function randomNumber(length) {
  var text = "";
  var possible = "123456789";
  for (var i = 0; i < length; i++) {
    var sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup == i ? "0" : possible.charAt(sup);
  }
  return Number(text);
}
export const englishToBangla = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All field are required" });
  }

  const encodedParams = new URLSearchParams();
  encodedParams.set("q", text);
  encodedParams.set("target", "bn");
  encodedParams.set("source", "en");

  const options = {
    method: "POST",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "502ed8c134msh23d0fcbd2979560p1da458jsn7894c6b5c03c",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data);
    res.status(StatusCodes.OK).json(response.data);
  } catch (error) {
    res.status(StatusCodes.EXPECTATION_FAILED).json(error.message);
  }
};
export { main, getInfo, storeInfo, uploadImage, getImageToUrl, randomNumber };
