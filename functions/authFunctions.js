import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import IP from "ip";
import { v4 } from "uuid";
import fs from "fs/promises";
import { getLogoLink, randomNumber, sendSingleSms } from "./main.js";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide email and password" });
    return;
  }
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const result = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    const token = jwt.sign({ id: result.id, email }, process.env.AUTH_TOKEN);
    res.status(StatusCodes.OK).json({ user: result, token: token });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};

const signUp = async (req, res) => {
  const { email, password, name, role, phone, address, birthday, gender } =
    req.body;
  if (!email || !password || !name) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide email, password and name at most" });
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        role: role,
        phone: phone,
        address: address,
        birthday: birthday,
        gender: gender,
        uid: userCredential?.user.uid,
      },
    });
    const token = jwt.sign({ id: user.id, email }, process.env.AUTH_TOKEN);
    res.status(StatusCodes.OK).json({ user: user, token: token });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const sendOTP = async (req, res) => {
  const { phone } = req.body;
  const code = randomNumber(6);

  try {
   const data= await sendSingleSms(
      phone,
      `Your Banglamart verification code is ${code}`
    );
    if(data.status_code!=200){
      return res.status(StatusCodes.BAD_GATEWAY).json({ message:data.error_message });
    }
    const token = jwt.sign(
      { code: code, phone: phone },
      process.env.AUTH_TOKEN,
      { expiresIn: 60 }
    );
    return res.status(StatusCodes.OK).json({ token: token,data:data });
  } catch (e) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: e.message });
  }
};
const verifyOTP = async (req, res) => {
  const { token,otp } = req.body;
  if(!token||!otp){
    return res.status(StatusCodes.BAD_REQUEST).json({ message:"Token and otp are required"})
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_TOKEN);
    if(decoded.code!=otp){
      return res.status(StatusCodes.EXPECTATION_FAILED).json({ message: "Invalid OTP" });
    }
    const newToken = jwt.sign(
      { code: decoded.code, phone: decoded.phone },
      process.env.AUTH_TOKEN,
      { expiresIn: 86400 }
    );
    return res.status(StatusCodes.OK).json({ token: newToken });
  } catch (e) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: e.message });
  }
};

const signUpWithPhone = async (req, res) => {
  const {
    email,
    password,
    name,
    role,
    address,
    birthday,
    gender,
    token,
  } = req.body;
  if ( !password || !name || !token) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please provide phone, password, name and token at most",
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.AUTH_TOKEN);
    const uid = v4();
    await fs.writeFile(
      `OTP/${decoded.phone}.txt`,
      JSON.stringify({
        password: password,
        phone: decoded.phone,
        uid: uid,
      })
    );
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        role: role,
        phone: decoded.phone,
        address: address,
        birthday: birthday,
        gender: gender,
        uid: uid,
      },
    });
    const token = jwt.sign(
      { id: user.id, phone:decoded.phone, password },
      process.env.AUTH_TOKEN
    );
    res.status(StatusCodes.OK).json({ user: user, token: token });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const signInWithPhone = async (req, res) => {
  const { password, phone } = req.body;
  if (!phone || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please provide phone, password",
    });
    return;
  }
  try {
    const data = await fs.readFile(`OTP/${phone}.txt`, {
      encoding: "utf8",
      flag: "r",
    });
    data = JSON.parse(data);
    if (!data.phone.match(phone) || !data.password.match(password)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid password",
      });
    }
    const user = await prisma.users.findUnique({
      where: {
        phone: data.phone,
      },
    });
    const token = jwt.sign(
      { id: user.id, phone, password },
      process.env.AUTH_TOKEN
    );
    res.status(StatusCodes.OK).json({ user: user, token: token });
  } catch (err) {
    if(err.code==="ENOENT"){
      return res.status(StatusCodes.EXPECTATION_FAILED).json({ message: "Invalid phone number" });
    }
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const resetPhonePassword=async(req,res)=>{
  const {token,newPassword}=req.body;
  try{
    const decoded = jwt.verify(token, process.env.AUTH_TOKEN);
    const user = await prisma.users.findUnique({
      where: {
        phone: decoded.phone,
      },
    });
    await fs.writeFile(
      `OTP/${decoded.phone}.txt`,
      JSON.stringify({
        password: newPassword,
        phone: decoded.phone,
        uid: user.uid,
      })
    );
    res.status(StatusCodes.OK).json({ message:"Reset successful. Please login" });
  }catch(e){
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
}

const getUser = async (req, res) => {
  const id = req?.user?.id;
  if (!id) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "No user logged in" });
    return;
  }
  try {
    //console.log(email)
    const result = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });
    res.status(StatusCodes.OK).json({ user: result });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
const emailVerification = async (req, res) => {
  const currentUser = auth?.currentUser;
  if (!currentUser) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "No user logged in" });
    return;
  }
  try {
    //console.log(email)
    await sendEmailVerification(currentUser);
    res.status(StatusCodes.OK).json({ message: "Email verification sent!" });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
const resetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide an email" });
    return;
  }
  try {
    //console.log(email)
    await sendPasswordResetEmail(auth, email);
    res.status(StatusCodes.OK).json({ message: "Password reset email sent!" });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
const thirdPartySignIn = async (req, res) => {
  const { uid, email, name, image, role, birthday, gender, phone, address } =
    req.body;
  if (!uid) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide uid" });
    return;
  }
  if (!email & !phone) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide email/phone" });
    return;
  }
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      const newUser = await prisma.users.create({
        data: {
          name: name,
          email: email,
          image: image,
          uid: uid,
          role,
          birthday,
          gender,
          phone,
          address,
        },
      });
      const token = jwt.sign({ id: newUser.id, email }, process.env.AUTH_TOKEN);
      res.status(StatusCodes.OK).json({
        user: newUser,
        token: token,
      });
    } else {
      const token = jwt.sign({ id: user.id, email }, process.env.AUTH_TOKEN);
      res.status(StatusCodes.OK).json({
        user: user,
        token: token,
      });
    }
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
const updateUser = async (req, res) => {
  const { name, email, role, phone, address, birthday, gender } = req.body;
  const { id } = req.user;
  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide id at most" });
    return;
  }
  try {
    if (req.file) {
      const { path } = await getLogoLink(req, res);
      const user = await prisma.users.update({
        where: {
          id: id,
        },
        data: {
          name,
          role,
          phone,
          address: address ? JSON.parse(address) : undefined,
          birthday,
          gender,
          image: path,
        },
      });
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.AUTH_TOKEN
      );
      res.status(StatusCodes.OK).json({ user: user, token: token });
    }
    const user = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        name,
        role,
        phone,
        address: address ? JSON.parse(address) : undefined,
        birthday,
        gender,
      },
    });
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_TOKEN
    );
    res.status(StatusCodes.OK).json({ user: user, token: token });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
const getAllUser = async (req, res) => {
  const { name } = req.query;
  try {
    const result = await prisma.users.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    const sort = result.filter((user) =>
      user.name
        .toLocaleLowerCase()
        .includes(name ? name.toLocaleLowerCase() : "")
    );
    res.status(StatusCodes.OK).json({ data: sort });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const registerSeller = async (req, res) => {
  const { id, email } = req.user;
  const { shopName, shopAddress } = req.body;
  if (!shopName || !shopAddress) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide shopName, ShopAddress at most" });
    return;
  }
  try {
    const seller = await prisma.seller.create({
      data: {
        shopAddress,
        shopName,
        userId: id,
      },
    });
    const user = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        role: 2,
      },
    });
    const token = jwt.sign({ id: user.id, email }, process.env.AUTH_TOKEN);
    res.status(StatusCodes.OK).json({ user: user, token: token });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const acceptSellerRequest = async (req, res) => {
  const { id, email } = req.user;
  const { sellerId } = req.body;
  if (!sellerId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "sellerId is required for accept" });
  }
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        id: sellerId,
      },
    });
    if (!Boolean(seller)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "No request found in that record." });
    }
    const user = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        role: 2,
      },
    });
    res.status(StatusCodes.OK).json({ message: "Requested accepted." });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const checkSeller = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "userId is required for check" });
  }
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        userId: userId,
      },
    });
    res.status(StatusCodes.OK).json({ data: seller });
  } catch (err) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err.message });
  }
};
const setVisitor = async (req, res) => {
  const { randomId, uid } = req.body;
  const deviceName = req.headers["user-agent"];
  const ip = req.ip;

  if (!deviceName || !randomId || !ip) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide deviceName,randomId,ip" });
  }
  try {
    const check = await prisma.visitors.findUnique({
      where: {
        randomId: randomId,
      },
    });
    if (check) {
      const info = await prisma.visitors.update({
        data: {
          deviceName: deviceName,
          ip: ip,
          uid: uid,
          date: new Date(),
        },
        where: {
          randomId: randomId,
        },
      });
      return res.status(StatusCodes.OK).json({ data: info });
    }
    const info = await prisma.visitors.create({
      data: {
        deviceName: deviceName,
        randomId: randomId,
        ip: ip,
        uid: uid,
        date: new Date(),
      },
    });
    return res.status(StatusCodes.OK).json({ data: info });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
const getVisitor = async (req, res) => {
  const { randomId } = req.params;

  if (!randomId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide randomId" });
  }
  try {
    const check = await prisma.visitors.findUnique({
      where: {
        randomId: randomId,
      },
    });
    return res.status(StatusCodes.OK).json({ data: check });
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
const updateStatus = async (userId, socketId) => {
  const user = await prisma.users.update({
    data: {
      active: true,
      socketId: socketId ? socketId : null,
    },
    where: {
      id: userId,
    },
  });
  //console.log(`join ${socketId}`)
  return user;
};
const disconnectedUser = async (socketId) => {
  const user = await prisma.users.updateMany({
    data: {
      active: false,
    },
    where: {
      socketId: socketId,
    },
  });
  //console.log(socketId);
  return user;
};
export {
  signIn,
  signUp,
  getUser,
  resetPassword,
  emailVerification,
  thirdPartySignIn,
  updateUser,
  getAllUser,
  checkSeller,
  setVisitor,
  getVisitor,
  updateStatus,
  disconnectedUser,
  signUpWithPhone,
  sendOTP,
  verifyOTP,
  signInWithPhone,
  resetPhonePassword
};
