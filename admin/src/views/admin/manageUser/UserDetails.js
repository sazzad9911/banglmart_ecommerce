import { Avatar } from "@chakra-ui/react";
import Header from "components/headers";
import React from "react";

export default function UserDetails({ onClose }) {
  return (
    <div>
      <Header onClick={onClose} title={"User Details"} />
      <div className="mt-24  p-8 shadow">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {" "}
          <div className="order-last mt-20 grid grid-cols-3 text-center md:order-first md:mt-0">
            {" "}
            <div>
              {" "}
              <p className="text-xl font-bold text-gray-700">22</p>{" "}
              <p className="text-gray-400">Bought</p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-xl font-bold text-gray-700">89</p>{" "}
              <p className="text-gray-400">Comments</p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="relative">
            {" "}
            <div className="absolute inset-x-0 top-0 mx-auto -mt-24 flex h-48 w-48 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 shadow-2xl">
              <Avatar
                size="2xl"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              />
            </div>{" "}
          </div>{" "}
          <div className="mt-32 flex justify-between space-x-8 md:mt-0 md:justify-center">
            <button className="transform rounded bg-red-400 py-2 px-4 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg">
              {" "}
              Ban User
            </button>{" "}
            <button className="transform rounded bg-gray-700 py-2 px-4 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg">
              {" "}
              Message
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-20 border-b pb-12 text-center">
          {" "}
          <h1 className="text-4xl font-medium text-gray-700">
            Jessica Jones, <span className="font-light text-gray-500">27</span>
          </h1>{" "}
          <p className="mt-3 font-light text-gray-600">Bucharest, Romania</p>{" "}
          <p className="mt-8 text-gray-500">
            Solution Manager - Creative Tim Officer
          </p>{" "}
          <p className="mt-2 text-gray-500">University of Computer Science</p>{" "}
        </div>{" "}
        <div className="mt-12 flex flex-col justify-center">
          {" "}
          <p className="text-center font-light text-gray-600 lg:px-16">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>{" "}
          <button className="mt-4 py-2 px-4  font-medium text-indigo-500">
            {" "}
            Show more
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
