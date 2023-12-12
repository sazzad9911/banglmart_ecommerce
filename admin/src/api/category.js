import axios from "axios"
import { url } from "./authApi"

export const getCategory=async()=>{
    const res=await axios.get(`${url}/category/getAll`)
    return res.data
}
export const getSubCategory=async()=>{
    const res=await axios.get(`${url}/category/getSubCategory`)
    return res.data
}
export const getOptions=async(subCategoryId)=>{
    const res=await axios.get(`${url}/category/getOptions`)
    return res.data
}
export const storeCategory=async(formData,token)=>{
    const res=await axios.post(`${url}/category/createCategory`,formData,{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const storeSubCategory=async(name,categoryId,token)=>{
    //console.log(token);
    const res=await axios.post(`${url}/category/createSubCategory`,{
        name:name,
        categoryId:categoryId
    },{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const storeOption=async(name,subCategoryId,token)=>{
    const res=await axios.post(`${url}/category/createOption`,{
        name,
        subCategoryId
    },{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const deleteCategory=async(categoryId,token)=>{
    const res=await axios.delete(`${url}/category/deleteCategory`,{
        data:{categoryId:categoryId},
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const deleteSubCategory=async(subCategoryId,token)=>{
    const res=await axios.delete(`${url}/category/deleteSubCategory`,{
        data:{subCategoryId:subCategoryId},
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}
export const deleteOption=async(optionId,token)=>{
    const res=await axios.delete(`${url}/category/deleteOption`,{
        data:{optionId:optionId},
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data
}