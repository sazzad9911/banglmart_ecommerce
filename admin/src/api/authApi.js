import axios from "axios"
//const url = "https://api.banglamartecommerce.com.bd";
const url = "http://localhost:1300";

const signIn=async(email,password)=>{
    const res=await axios.post(`${url}/auth/signIn`,{
        email:email,
        password:password
    })
    return res
}
const checkSellerRequest=async(userId,token)=>{
    const res=await axios.post(`${url}/auth/checkSellerRequest?userId=${userId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return res
}

export {url,signIn,checkSellerRequest}