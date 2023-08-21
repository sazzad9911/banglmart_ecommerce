import React, { useState } from "react";
import PieChartAds from "./PieChart";
import { Button, Input, Td, Th, Tr } from "@chakra-ui/react";
import Pagination from "layouts/pagination";
import { AiOutlineEdit } from "react-icons/ai";

export default function ManageAdds() {
  const [bannerList, setBannerList] = useState([]);

  return (
    <div className=" p-4 ">
      <div className="gap-4  lg:grid lg:grid-cols-2">
        <PieChartAds />
        <div>
          <p className="mediumText mb-4">Landing Page Ads List</p>
          <Pagination
            data={bannerList}
            itemsPerPage={5}
            head={
              <Tr>
                <Th>No</Th>
                <Th>Image</Th>
                <Th>Updated At</Th>
                <Th>Edit</Th>
              </Tr>
            }
            ROW={(e) => {
              return (
                <Tr>
                  <Td>{e.index + 1}</Td>
                  <Td>{e.data.title}</Td>
                  <Td>
                    {e.data.offers?.length > 0
                      ? `${e.data.offers[0].money} ${
                          e.data.offers[0].percentage ? " %" : " BDT"
                        }`
                      : "0.00"}
                  </Td>
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
      <div className="mt-6 mb-4 gap-4  lg:grid lg:grid-cols-2">
        <div>
          <p className="mediumText mb-4">New Flash Ads</p>
          <Input style={style} type="file" />
          <Button className="mt-4" colorScheme="cyan">
            Add
          </Button>
        </div>

        <div>
          <p className="mediumText mb-4">Flash Ads List</p>
          <Pagination
            data={bannerList}
            itemsPerPage={10}
            head={
              <Tr>
                <Th>No</Th>
                <Th>Image</Th>
                <Th>Updated At</Th>
                <Th>Delete</Th>
              </Tr>
            }
            ROW={(e) => {
              return (
                <Tr>
                  <Td>{e.index + 1}</Td>
                  <Td>{e.data.title}</Td>
                  <Td>
                    {e.data.offers?.length > 0
                      ? `${e.data.offers[0].money} ${
                          e.data.offers[0].percentage ? " %" : " BDT"
                        }`
                      : "0.00"}
                  </Td>
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
