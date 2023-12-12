import { Avatar } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function UserCard({data}) {
  
  const [user,setUser]=useState()
  const allUser=useSelector(state=>state.allUser)
  useEffect(()=>{
    setUser(allUser?.filter(user=>user.id===data?.userId)[0])
    //console.log(allUser?.filter(user=>user.id===data?.userId)[0]);
  },[data?.userId,allUser])
    return (
        <div className={`bg-gray-300 p-2 flex text-gray-900  items-center  rounded-md my-2`}>
            <Avatar name="Sazzad Hossain" />
          <div className='ml-2'>
            <div>
              <span>{user?.name} </span>
            </div>
            <div>
              <span>Phone/Email : </span>{user?user.phone||user.email:null}
            </div>
            {data?.used&&(<span>Used</span>)}
          </div>
        
        </div>
      );
}
