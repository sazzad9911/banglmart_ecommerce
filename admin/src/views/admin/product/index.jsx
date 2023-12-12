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
import AddProduct from "./AddProduct";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AiOutlineHolder } from "react-icons/ai";
import { url } from "api/authApi";
import { setLoading } from "reducers/isLoading";
import { deleteProductApi } from "api/productApi";
import { useEffect } from "react";
import EditProduct from "./EditProduct";
import { setChange } from "reducers/change";
import { postApi } from "api/api";
import { getAllProduct } from "api/productApi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Product() {
  const [search, setSearch] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState();
  const [productList, setProductList] = useState();
  const [selectProduct, setSelectProduct] = useState();
  const [addProduct, setAddProduct] = useState();
  const change = useSelector((state) => state.change);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const allProduct = useSelector((state) => state.product);
  //console.log(product?.data?.length);

  // useEffect(() => {
  //   if (search) {
  //     console.log(search);
  //     return setProductList(
  //       allProduct?.data?.filter((d) =>
  //         d.title.toLowerCase().includes(search.toLowerCase())
  //       )
  //     );
  //   }
    
  //   setProductList(product?.data);
  // }, [search, product]);
  useEffect(() => {
    fetching2();
  }, [change,page,search]);
  const fetching2 = async () => {
    dispatch(setLoading(true));
    setProductList(null)
    const product = await getAllProduct(user?.user?.id,page?page:1,10,search);
    setProduct(product)
    setProductList(product.data)
    dispatch(setLoading(false));
  };
  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(setLoading(true));
        const res = await deleteProductApi(id, user.token);
        dispatch(setLoading(false));
        dispatch(setChange(res));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const duplicateProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to duplicate this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#01C14A",
      confirmButtonText: "Yes, duplicate it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(setLoading(true));
        postApi(
          "/product/duplicate",
          {
            productId: id,
          },
          user.token
        )
          .then((res) => {
            dispatch(setLoading(false));
            dispatch(setChange(res));
            Swal.fire(
              "Success!",
              "Your product has been duplicated.",
              "success"
            );
          })
          .catch((e) => {
            dispatch(setLoading(false));
            console.log(e.response.data.message);
          });
      }
    });
  };

  

  return (
    <div className="dark:text-white">
      
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
        length={product?.length}
        head={
          <Tr>
            <Th>Index</Th>
            <Th>Name</Th>
            <Th>Thumbnail</Th>
            <Th>Shop/Brand</Th>
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
                  alt="img"
                  crossOrigin="anonymous"
                  className="h-10 w-10"
                  src={`${url}${e.data.thumbnail}`}
                />
              </Td>
              <Td>
                {e.data.seller
                  ? e.data.seller.shopName
                  : e.data.brand.brandName}
              </Td>
              <Td className="text-[#000]">
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton isActive={isOpen} as={Button}>
                        <AiOutlineHolder />
                      </MenuButton>

                      <MenuList>
                        <MenuItem onClick={() => duplicateProduct(e.data.id)}>
                          Duplicate
                        </MenuItem>
                        <MenuItem onClick={() => deleteProduct(e.data.id)}>
                          Delete
                        </MenuItem>
                        <Link to={`${location.pathname}/edit?id=${e.data.id}`}>
                          <MenuItem>Edit</MenuItem>
                        </Link>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Td>
            </Tr>
          );
        }}
      />
      <FloatButton onClick={() => navigate(`${location.pathname}/add`)} />
    </div>
  );
}
const style = {
  borderColor: "#ABB2B9",
};
