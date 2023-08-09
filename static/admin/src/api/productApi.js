import axios from "axios"
import { url } from "./authApi"

export const getAllProduct=async(userId)=>{
    const res=await axios.get(`${url}/product/getAll?userId=${userId}`)
    return res.data
}
export const addProduct=async(form,token)=>{
    const res=await axios.post(`${url}/product/add`,form,{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const deleteProductApi=async(productId,token)=>{
    const res=await axios.delete(`${url}/product/delete?productId=${productId}`,{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}