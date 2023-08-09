import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  InputGroup,
  Input,
  InputRightElement,
  useDisclosure,
  Button,
  Select,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Pagination from "layouts/pagination";
import { FaSearch } from "react-icons/fa";
import FloatButton from "components/floatButton";
import ModalLayout from "layouts/modal";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AddProduct from "./AddProduct";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AiOutlineHolder } from "react-icons/ai";
import { url } from "api/authApi";
import { setLoading } from "reducers/isLoading";
import { deleteProductApi } from "api/productApi";
import { useEffect } from "react";

export default function Product() {
  const [search, setSearch] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const product = useSelector((state) => state.product);
  const [productList, setProductList] = useState();

  useEffect(() => {
    if (search) {
      return setProductList(
        product?.data?.filter((d) =>
          d.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    setProductList(product?.data);
  }, [search]);
  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(setLoading(true));
        await deleteProductApi(id, user.token);
        dispatch(setLoading(false));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const addProduct = async () => {};
  const updateProduct = async () => {};

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={"Add Product"}
      component={
        <>
          <div className="headLine">All Product</div>
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
            data={productList}
            head={
              <Tr>
                <Th>Index</Th>
                <Th>Name</Th>
                <Th>Thumbnail</Th>
                <Th>Publisher</Th>
                <Th>Menu</Th>
              </Tr>
            }
            ROW={(e) => {
              return (
                <Tr>
                  <Td>{e.index + 1}</Td>
                  <Td>{e.data.title}</Td>
                  <Td>
                    <img
                      crossOrigin="anonymous"
                      className="h-10 w-10"
                      src={`${url}${e.data.thumbnail}`}
                    />
                  </Td>
                  <Td>{e.data.user.name}</Td>
                  <Td>
                    <Menu>
                      {({ isOpen }) => (
                        <>
                          <MenuButton isActive={isOpen} as={Button}>
                            <AiOutlineHolder />
                          </MenuButton>

                          <MenuList>
                            <MenuItem onClick={() => deleteProduct(e.data.id)}>
                              Delete
                            </MenuItem>
                            <MenuItem>Edit</MenuItem>
                          </MenuList>
                        </>
                      )}
                    </Menu>
                  </Td>
                </Tr>
              );
            }}
          />
          <FloatButton onClick={onOpen} />
        </>
      }
      modal={<AddProduct onClose={onClose} />}
    />
  );
}
const style = {
  borderColor: "#ABB2B9",
};
