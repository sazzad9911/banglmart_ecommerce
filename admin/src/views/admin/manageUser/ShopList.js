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
import AddShop from "./AddShop";
  
  export default function ShopList() {
    const [search, setSearch] = useState();
    // const [addClick, setAddClick] = useState(false);
    // const [editClick, setEditClick] = useState(false);
    const allShop=useSelector(state=>state.allShop)
    const [all,setAll]=useState(allShop)
    const dispatch=useDispatch()
    const alert=useAlert()
    const user=useSelector(state=>state.user) 

    useEffect(()=>{
      search?setAll(allShop.filter(d=>d.shopName.toUpperCase().includes(search.toUpperCase()))):setAll(allShop)
    },[allShop,search])
  
    
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
              <Th>Name</Th>
              <Th>Outlet</Th>
              <Th>Status</Th>
              <Th>Menu</Th>
            </Tr>
          }
          ROW={(e) => {
            return (
              <Tr>
                <Td>{e.index + 1}</Td>
                <Td>
                  <Avatar referrerPolicy='anonymous' name={e.data.shopName} src={`${url}${e.data.logo}`} />
                </Td>
                <Td>{e.data.shopName}</Td>
                <Td>{e.data.shopAddress}</Td>
                <Td>{e.data.verified?"Verified":"Unverified"}</Td>
                <Td className="text-[#000]">
                  <Menu>
                    {({ isOpen }) => (
                      <>
                        <MenuButton isActive={isOpen} as={Button}>
                          <AiOutlineHolder />
                        </MenuButton>
  
                        <MenuList>
                          <MenuItem onClick={async() => {
                            dispatch(setLoading(true));
                            const data = new FormData();
                            data.append("verified", e.data.verified?"":"1");
                            data.append("sellerId",e.data.id)
                            putApi("/store/updateSeller", data, user.token).then(
                              (res) => {
                                dispatch(setLoading(false));
                                dispatch(setChange(res.data))
                                alert.success("Brand has banned")
                              }
                            ).catch(error=>{
                              dispatch(setLoading(false));
                              alert.error(error.response.data.message)
                            })
                          }}>{e.data.verified?"Ban Shop":"Verify Shop"}</MenuItem>
                          {/* <MenuItem onClick={() => {}}>Delete</MenuItem> */}
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
  