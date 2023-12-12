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
import { url } from "api/authApi";
import FloatButton from "components/floatButton";
import Pagination from "layouts/pagination";
import React, { useEffect, useState } from "react";
import { AiOutlineHolder } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddUser from "./AddUser";
import UserDetails from "./UserDetails";

export default function UserList() {
  const [search, setSearch] = useState();
  const [addClick, setAddClick] = useState(false);
  const [detailsClick, setDetailsClick] = useState(false);
  const allUser=useSelector(state=>state.allUser)
  const [list,setList]=useState()
  useEffect(()=>{
    setList(allUser?.filter(user=>user.name?.toUpperCase().includes(search?search.toUpperCase():"")))
  },[allUser,search])

  if (detailsClick) {
    return <UserDetails data={detailsClick} onClose={()=>setDetailsClick(false)}/>;
  }
  if (addClick) {
    return <AddUser onClose={()=>setAddClick(false)}/>;
  }
  
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
        data={list}
        head={
          <Tr>
            <Th>Index</Th>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Phone/Email</Th>
            <Th>Status</Th>
            <Th>Menu</Th>
          </Tr>
        }
        ROW={(e) => {
          return (
            <Tr>
              <Td>{e.index + 1}</Td>
              <Td>
                <Avatar onError={(e)=>{
                  //console.log(e.message);
                }} name={e.data.name} src={`${url}${e.data.image}`} />
              </Td>
              <Td>{e.data.name}</Td>
              <Td>{e.data.phone||e.data.email}</Td>
              <Td>{e.data.verified?"Active":"Inactive"}</Td>
              <Td className="text-[#000]">
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton isActive={isOpen} as={Button}>
                        <AiOutlineHolder />
                      </MenuButton>

                      <MenuList>
                        <MenuItem onClick={() => {}}>Ban User</MenuItem>
                        <MenuItem onClick={() => {setDetailsClick(true)}}>Details</MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Td>
            </Tr>
          );
        }}
      />
      <FloatButton onClick={() => setAddClick(true)} />
    </div>
  );
}
const style = {
  borderColor: "#ABB2B9",
};
