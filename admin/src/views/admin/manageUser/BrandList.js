import {
  Avatar,
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
} from "@chakra-ui/react";
import { putApi } from "api/api";
import { url } from "api/authApi";
import FloatButton from "components/floatButton";
import Pagination from "layouts/pagination";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { AiOutlineHolder } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setChange } from "reducers/change";
import { setLoading } from "reducers/isLoading";
import AddBrand from "./AddBrand";

export default function BrandList() {
  const [search, setSearch] = useState();
  // const [addClick, setAddClick] = useState(false);
  // const [editClick, setEditClick] = useState(false);
  const allBrand = useSelector((state) => state.allBrand);
  const user = useSelector((state) => state.user);
  const [all, setAll] = useState(allBrand);
  const dispatch = useDispatch();
  const alert=useAlert()

  useEffect(() => {
    search
      ? setAll(
          allBrand.filter((d) =>
            d.brandName.toUpperCase().includes(search.toUpperCase())
          )
        )
      : setAll(allBrand);
  }, [allBrand, search]);
 
  return (
    <div>
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
        itemsPerPage={10}
        data={all}
        head={
          <Tr>
            <Th>Index</Th>
            <Th>Logo</Th>
            <Th>Brand Name</Th>
            <Th>Head Office</Th>
            <Th>Status</Th>
            <Th>Menu</Th>
          </Tr>
        }
        ROW={(e) => {
          return (
            <Tr>
              <Td>{e.index + 1}</Td>
              <Td>
                <Avatar
                  name={e.data.brandName}
                  src={`${url}${e.data.brandIcon}`}
                />
              </Td>
              <Td>{e.data.brandName}</Td>
              <Td>{e.data.brandAddress}</Td>
              <Td>{e.data.verified?"Verified":"Banned"}</Td>
              <Td className="text-[#000]">
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton isActive={isOpen} as={Button}>
                        <AiOutlineHolder />
                      </MenuButton>

                      <MenuList>
                        <MenuItem
                          onClick={async () => {
                            dispatch(setLoading(true));
                            const data = new FormData();
                            data.append("verified", e.data.verified?"":"1");
                            data.append("brandId",e.data.id)
                            putApi("/store/updateBrand", data, user.token).then(
                              (res) => {
                                dispatch(setLoading(false));
                                dispatch(setChange(res.data))
                                alert.success("Brand has banned")
                              }
                            ).catch(error=>{
                              dispatch(setLoading(false));
                              alert.error(error.response.data.message)
                            })
                          }}
                        >
                          {e.data.verified?"Ban Brand":"Verify Brand"}
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Td>
            </Tr>
          );
        }}
      />
      {/* <FloatButton onClick={() => setAddClick(true)} /> */}
    </div>
  );
}
const style = {
  borderColor: "#ABB2B9",
};
