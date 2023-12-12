import { Avatar, Button } from "@chakra-ui/react";
import { url } from "api/authApi";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function MessageCard({ onClick, unread,data }) {
  const allUser = useSelector((state) => state.allUser);
  const [seller,setSeller]=useState(allUser?.filter((d) => d.id === data.senderId)[0])
 // console.log(data);
 if(!seller){
  return <div>Loader....</div>
 }
  return (
    <div
      className={`my-4 flex items-center justify-between rounded-md ${
        unread ? "bg-brandLinear" : ""
      }`}
    >
      <div className="flex items-center">
        <Avatar crossOrigin={'anonymous'}
          className="h-14 w-14 rounded-full"
          alt="te"
          name={seller?.name}
          src={
            `${url}${seller?.image}`
          }
        />
        <div className="mx-2 cursor-pointer">
          <p onClick={onClick} className="hover:underline mediumText line-1">{seller?.name}</p>
          <p className="  line-1 text-gray-400">
            {data.messages.length>0?data.messages[0].message:""}
          </p>
        </div>
      </div>
      <Button onClick={onClick} className="ml-2">
        View
      </Button>
    </div>
  );
}
