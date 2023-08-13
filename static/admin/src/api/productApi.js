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
export const updateProduct=async(form,token)=>{
    const res=await axios.put(`${url}/product/update`,form,{
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
export const getVariant=async(userId)=>{
    const res=await axios.get(`${url}/variant/getVariant?userId=${userId}`)
    return res.data
}
export const getColor=async()=>{
    const res=await axios.get(`${url}/variant/getColor`)
    return res.data
}
export const getSize=async()=>{
    const res=await axios.get(`${url}/variant/getSize`)
    return res.data
}
export const addSize=async(title,cm,token)=>{
    const res=await axios.post(`${url}/variant/addSize`,{
        title,
        cm
    },{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const addColorApi=async(title,color,token)=>{
    const res=await axios.post(`${url}/variant/addColor`,{
        title,
        color
    },{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const deleteSizeApi=async(sizeId,token)=>{
    const res=await axios.delete(`${url}/variant/deleteSize?sizeId=${sizeId}`,{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const deleteColorApi=async(colorId,token)=>{
    const res=await axios.delete(`${url}/variant/deleteColor?colorId=${colorId}`,{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const addVariantApi=async(form,token)=>{
    const res=await axios.post(`${url}/variant/addVariant`,form,{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const updateVariantApi=async(form,token)=>{
    const res=await axios.put(`${url}/variant/updateVariant`,form,{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const deleteVariantApi=async(variantId,token)=>{
    const res=await axios.delete(`${url}/variant/deleteVariant?variantId=${variantId}`,{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const updateQuantityApi=async(data,token)=>{
    const res=await axios.put(`${url}/product/updateQuantity`,data,{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const addOffersApi=async(data,token)=>{
    const res=await axios.post(`${url}/product/addOffers`,data,{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}