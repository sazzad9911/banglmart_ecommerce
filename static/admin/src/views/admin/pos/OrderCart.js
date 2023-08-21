import React from "react";

export default function OrderCart({onClick}) {
  return (
    <div onClick={onClick} className="hover:bg-gray-50 my-3 rounded-md bg-white p-4">
      <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-2">
        <div className="col-span-2 flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
          />
          <div className="ml-4">
            <p>Md Sazzad Hossain</p>
            <p className="text-gray-400">+8801761143991</p>
          </div>
        </div>
        <div className="col-span-2 flex items-center">
          <img
            className="h-10 w-10"
            src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNoaXJ0fGVufDB8fDB8fHww&w=1000&q=80"
          />
          <div className="ml-4">
            <p className="line-clamp-1">T shirt for men</p>
            <p>11 July 2023</p>
          </div>
        </div>
        <div>
          <p className="font-bold">Status</p>
          <p className="text-green-300 font-medium text-[16px]">Pending</p>
        </div>
      </div>
    </div>
  );
}
