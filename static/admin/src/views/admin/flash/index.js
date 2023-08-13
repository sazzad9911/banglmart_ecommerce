import { Button, Input, Td, Th, Tr } from "@chakra-ui/react";
import { Loader } from "App";
import Pagination from "layouts/pagination";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineEdit, AiOutlineUpload } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Flash() {
  const flashSell = useSelector((state) => state.flashSell);
  const [picture, setPicture] = useState();

  if (!flashSell) {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="p-4 ">
      {/* {flashSell && flashSell.length == 0 && (
        <div className="mt-[200px] grid items-center justify-center">
          <p className="headLine mb-4 w-full">No Campaign Started!</p>
          <Button colorScheme="cyan">Start Campaign</Button>
        </div>
      )} */}
      <div className="lg:grid lg:grid-cols-2">
        <div>
          <div className="grid h-[300px] w-full items-center justify-center border">
            {picture ? (
              <div>
                <img
                  className="h-[300px] w-full"
                  src={URL.createObjectURL(picture)}
                />
              </div>
            ) : (
              <div>
                <Input
                  onChange={(e) =>
                    setPicture(e.target.files[e.target.files.length - 1])
                  }
                  id="pickImage"
                  className="hidden"
                  type="file"
                />
                <Button
                  onClick={() => {
                    document.getElementById("pickImage").click();
                  }}
                >
                  <AiOutlineUpload color="blue" size={50} />
                </Button>
              </div>
            )}
            {picture && (
              <AiOutlineClose
                onClick={() => setPicture(null)}
                size={30}
                className=" absolute  top-[120px] bg-blueSecondary text-white"
              />
            )}
          </div>
          <div className="text-center">Recommended File Size 1200*400 px</div>
          <div className="mediumText mt-4 mb-2">Give Title</div>
          <Input style={style} placeholder={"Title"} />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="mediumText mb-2">Start Time</div>
              <Input style={style} type="date" />
            </div>
            <div>
              <div className="mediumText mb-2">Start Time</div>
              <Input style={style} type="date" />
            </div>
          </div>
        </div>
        <div>
          <Pagination
            data={[]}
            itemsPerPage={10}
            head={
              <Tr>
                <Th>No</Th>
                <Th>Product Name</Th>
                <Th>Menu</Th>
              </Tr>
            }
            ROW={(e) => {
              return (
                <Tr>
                  <Td>{e.index + 1}</Td>
                  <Td>{e.data.title}</Td>
                  <Td>{e.data.minOrder}</Td>
                  <Td>{e.data.quantity}</Td>
                  <Td className="text-[#da4646]">
                    <Button onClick={() => {}}>
                      <AiOutlineEdit color="#868CFF" size={30} />
                    </Button>
                  </Td>
                </Tr>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
const style = {
  borderColor: "#D0D0D0",
  backgroundColor: "white",
};
