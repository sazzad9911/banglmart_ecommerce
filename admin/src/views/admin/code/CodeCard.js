import React from "react";
import { AiFillDelete } from "react-icons/ai";

export default function CodeCard({ selected, onClick, data, user, onDelete,code,date }) {
  if (user) {
    return (
      <div
        className={`${
          !selected ? "bg-gray-300" : " bg-brandLinear"
        } my-2  rounded-md  p-2 text-gray-900`}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div>
            <div>
              <span>Code </span>{code}
            </div>
            <div>
              <span>Date </span>
              {new Date(date&&date).toDateString()}
            </div>
          </div>
          <AiFillDelete size={30} onClick={onDelete} />
        </div>
        <div>
            Code Used by <span>Sazzad Hossain</span>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`${
        !selected ? "bg-gray-300" : " bg-brandLinear"
      } my-2 flex items-center justify-between rounded-md cursor-pointer hover:bg-gray-400  p-2 text-gray-900`}
      onClick={onClick}
    >
      <div>
        <div>
          <span>Code </span>{code}
        </div>
        <div>
          <span>Date </span>
          {new Date(date&&date).toDateString()}
        </div>
      </div>
      <AiFillDelete size={30} onClick={onDelete} />
    </div>
  );
}
