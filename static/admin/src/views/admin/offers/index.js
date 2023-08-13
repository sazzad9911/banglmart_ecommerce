import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Pagination from "layouts/pagination";
import { getVariant } from "api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { url } from "api/authApi";
import { AiFillEdit, AiOutlineEdit, AiOutlineHolder } from "react-icons/ai";
import FloatButton from "components/floatButton";
import Header from "components/headers";
import { useAlert } from "react-alert";
import { addSize } from "api/productApi";
import { setLoading } from "reducers/isLoading";
import { addColorApi } from "api/productApi";
import Select from "react-select";
import { deleteVariantApi } from "api/productApi";
import Swal from "sweetalert2";
import { Loader } from "App";
import { FaSearch } from "react-icons/fa";
import AddOffer from "./AddOffer";
export default function Offers() {
  const user = useSelector((state) => state.user);
  const [addClick, setAddClick] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [variantId, setVariantId] = useState();
  const [List, setList] = useState([]);
  const product = useSelector((state) => state.product);
  const [editClick, setEditClick] = useState();
  const [productList, setProductList] = useState();
  const [search, setSearch] = useState();
  useEffect(() => {
    if (search) {
      return setProductList(
        product?.data?.filter((d) =>
          d.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    setProductList(product?.data);
  }, [search, product]);

  if (!product) {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (editClick) {
    return <AddOffer data={editClick} onClose={() => setEditClick(null)} />;
  }

  return (
    <div className=" gap-4 p-4 dark:text-[#fff]">
      <div className=" lg:col-span-3">
        <h2 className="headLine mb-4">Your Product Variants</h2>
        <InputGroup className="mt-4" style={style}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          <InputRightElement>
            <FaSearch />
          </InputRightElement>
        </InputGroup>
        <Pagination
          data={productList}
          itemsPerPage={10}
          head={
            <Tr>
              <Th>No</Th>
              <Th>Product Name</Th>
              <Th>Offer Title</Th>
              <Th>Discount Offer</Th>

              <Th>Menu</Th>
            </Tr>
          }
          ROW={(e) => {
            return (
              <Tr>
                <Td>{e.index + 1}</Td>
                <Td>{e.data.title}</Td>
                <Td>{e.data.offers?.length>0?e.data.offers[0].name:"No Offer!"}</Td>
                <Td>{e.data.offers?.length>0?`${e.data.offers[0].money} ${e.data.offers[0].percentage?" %":" BDT"}`:"0.00"}</Td>
                <Td className="text-[#da4646]">
                  <Button onClick={() => setEditClick(e.data)}>
                    <AiOutlineEdit color="#868CFF" size={30} />
                  </Button>
                </Td>
              </Tr>
            );
          }}
        />
      </div>
    </div>
  );
}
const style = {
  borderColor: "#ABB2B9",
};
