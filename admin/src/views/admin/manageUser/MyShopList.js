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
  useDisclosure,
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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { deleteApi } from "api/api";
import Swal from "sweetalert2";

export default function MyShopList() {
  const [search, setSearch] = useState();
  // const [addClick, setAddClick] = useState(false);
  const [editClick, setEditClick] = useState(false);
  const allShop = useSelector((state) => state.allShop);
  const [all, setAll] = useState(allShop);
  const dispatch = useDispatch();
  const alert = useAlert();
  const user = useSelector((state) => state.user);
  const [myShop, setMyShop] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (allShop) {
      const shop = allShop.filter((item) => item.userId.match(user.user.id));
      setMyShop(shop);
    }
  }, [allShop]);
  useEffect(() => {
    search
      ? setAll(
          myShop.filter((d) =>
            d.shopName.toUpperCase().includes(search.toUpperCase())
          )
        )
      : setAll(myShop);
  }, [myShop, search]);

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
                <Avatar
                  referrerPolicy="anonymous"
                  name={e.data.shopName}
                  src={`${url}${e.data.logo}`}
                />
              </Td>
              <Td>{e.data.shopName}</Td>
              <Td>{e.data.shopAddress}</Td>
              <Td>{e.data.verified ? "Verified" : "Unverified"}</Td>
              <Td className="text-[#000]">
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton isActive={isOpen} as={Button}>
                        <AiOutlineHolder />
                      </MenuButton>

                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            setEditClick(e.data);
                            onOpen();
                          }}
                        >
                          Edit Shop
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            Swal.fire({
                              title: "Do you want to delete the item?",
                              showCancelButton: true,
                              confirmButtonText: "Ok",
                              denyButtonText: `Don't save`,
                            }).then((result) => {
                              /* Read more about isConfirmed, isDenied below */
                              if (result.isConfirmed) {
                                dispatch(setLoading(true));
                                deleteApi(
                                  `/store/deleteSeller?sellerId=${e.data.id}`,
                                  user.token
                                )
                                  .then((res) => {
                                    dispatch(setLoading(false));
                                    dispatch(setChange(res.data));
                                    alert.success(
                                      "Brand has deleted successfully"
                                    );
                                  })
                                  .catch((error) => {
                                    dispatch(setLoading(false));
                                    alert.error(error.response.data.message);
                                  });
                              }
                            });
                          }}
                        >
                          Delete Shop
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
      <FloatButton onClick={() => onOpen()} />
      <Modal
        size={"2xl"}
        colorScheme={"blue"}
        isOpen={isOpen}
        onClose={() => {
          setEditClick(undefined);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody className="mt-5">
            <AddShop
              onClose={() => {
                setEditClick(undefined);
                onClose();
              }}
              data={editClick}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                setEditClick(undefined);
                onClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
const style = {
  borderColor: "#ABB2B9",
};
