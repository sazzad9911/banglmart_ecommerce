import { getApi } from 'api/api'
import Nothing from 'components/Nothing'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from 'reducers/isLoading'
import ContactCard from './ContactCard'

export default function ContactUs() {
  const [data,setData]=useState()
  const dispatch=useDispatch() 
  const [change,setChange]=useState(false)

  useEffect(()=>{
    fetch()
  },[change])
  const fetch=async()=>{
    dispatch(setLoading(true))
    try{
      const res=await getApi("/support/get")
      dispatch(setLoading(false))
      setData(res.data.data)
    }catch(e){
      dispatch(setLoading(false))
      console.error(e.message)
    }
    

  }
  return (
    <div  className='p-4'>
      {data?.map((doc,i)=>(
        <ContactCard setChange={setChange} data={doc} key={i}/>
      ))}
      {data?.length===0&&(<Nothing/>)}
    </div>
  )
}
