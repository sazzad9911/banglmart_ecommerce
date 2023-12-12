import { Button } from "@chakra-ui/react";
import { url } from "api/authApi";
import React from "react";

export default function OrderCart({ onClick,data }) {
  return (
    <div
      onClick={onClick}
      className="my-3 rounded-md bg-white p-4 dark:bg-gray-800 "
    >
      <div className="grid grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2 flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={`${url}${data?.buyer.image}`}
          />
          <div className="ml-4">
            <p>{data?.buyer?.name}</p>
            <p className="text-gray-400">{data?.buyer.phone||data?.buyer.email}</p>
          </div>
        </div>
        <div className=" hidden lg:flex lg:col-span-2 items-center">
          <img
            className="h-10 w-10"
            src={`${url}${data?.product.thumbnail}`}
          />
          <div className="ml-4">
            <p className="line-clamp-1">{data?.product?.title}</p>
            <p>{new Date(data?.date).toDateString()}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="mr-4">
            <p className="font-bold">Status</p>
            <p className="text-[16px] font-medium text-green-300">{data?.status}</p>
          </div>
          <Button>View</Button>
        </div>
      </div>
    </div>
  );
}
