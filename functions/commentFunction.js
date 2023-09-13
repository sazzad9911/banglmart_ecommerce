import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma.js";
import { getLogoLink } from "./main.js";

export const createComment = async (req, res) => {
    const {message,productId}=req.body;
    const {id}=req.user;
    if(!message||!productId){
      return res.status(StatusCodes.BAD_REQUEST).json({message:"All field are require"})
    }
    try {
      if(req.file){
        const {path}=await getLogoLink(req,res)
        const comment = await prisma.comments.create({
          data:{
            message,
            image:path,
            userId:id,
            productId,
          
          }
        });
        res.status(StatusCodes.OK).json({ data: comment });
      }else{

      }
      
    } catch (e) {
      res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
    }
  };