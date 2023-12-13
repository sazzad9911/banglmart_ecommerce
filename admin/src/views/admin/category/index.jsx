import {
  FormControl,
  Input,
  FormLabel,
  Select,
  InputGroup,
  InputRightElement,
  Button,
  useDisclosure,
  Avatar,
  ButtonGroup,
  useFocusEffect,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineDown,
  AiOutlineHolder,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import CategoryList from "./CategoryList";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { storeCategory } from "api/category";
import { setLoading } from "reducers/isLoading";
import { storeSubCategory } from "api/category";
import { storeOption } from "api/category";
import Pagination from "layouts/pagination";
import { deleteCategory } from "api/category";
import { getCategory } from "api/category";
import { setCategory } from "reducers/category";
import Swal from "sweetalert2";
import { setChange } from "reducers/change";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { putApi } from "api/api";
import { url } from "api/authApi";
import { useLocation, useNavigate, useParams, useRoutes } from "react-router-dom";
import FloatButton from "components/floatButton";
import { storeSearch } from "reducers/search";

export default function Category() {
  const [page, setPage] = useState(0);
  const [categoryId, setCategoryId] = useState();
  const [name, setName] = useState();
  const [icon, setIcon] = useState();
  const [subCategory, setSubCategory] = useState();
  const [subCategoryName, setSubCategoryName] = useState();
  const [option, setOption] = useState();
  const [optionName, setOptionName] = useState();
  const categoryList = useSelector((state) => state.category);
  const subCategoryList = useSelector((state) => state.subCategory);
  const [subCategories, setSubCategories] = useState();
  const user = useSelector((state) => state.user);
  const [Category, setCategories] = useState();
  const search = useSelector((s) => s.search);
  const isLoading = useSelector((state) => state.isLoading);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editCategoryId, setEditCategoryId] = useState();
  const [editCategoryName, setEditCategoryName] = useState();
  const [editCategoryIcon, setEditCategoryIcon] = useState();
  const [editCategoryIconVal, setEditCategoryIconVal] = useState();
  const { pathname } = useLocation();
  const inpRef = useRef();
  const navigate=useNavigate()
  //params.search
  useEffect(() => {
    if (search) {
      return setCategories(
        categoryList.filter((d) =>
          d.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    setCategories(categoryList);
  }, [search, isLoading, categoryList]);
  // useFocusEffect(()=>{
  //   dispatch(storeSearch(""))
  // })
  useEffect(() => {
    dispatch(storeSearch(""));
  }, [pathname]);

  const addMainCategory = async () => {
    // console.log(editCategoryName);
    if (!editCategoryName || !editCategoryIcon) {
      return alert.info("All fields are required");
    }
    dispatch(setLoading(true));
    const f = new FormData();
    f.append("name", editCategoryName);
    f.append("icon", editCategoryIcon);
    try {
      const res = await storeCategory(f, user?.token);
      dispatch(setLoading(false));
      dispatch(setChange(res));
      alert.success("Category added");

      onClose();
      setEditCategoryIcon("");
      setEditCategoryName();
    } catch (e) {
      dispatch(setLoading(false));
      alert.error("Something went wrong!");
    }
  };
  const editMainCategory = async () => {
    onClose();
    if (!editCategoryName || !editCategoryId) {
      return alert.info("All fields are required");
    }
    dispatch(setLoading(true));
    const f = new FormData();
    f.append("name", editCategoryName);
    f.append("icon", editCategoryIcon);
    f.append("id", editCategoryId);
    try {
      const res = await putApi("/category/editCategory", f, user?.token);
      dispatch(setLoading(false));
      dispatch(setChange(res));
      onClose();
      alert.success("Category updated");
      setEditCategoryIcon("");
      setEditCategoryName();
    } catch (e) {
      dispatch(setLoading(false));
      alert.error("Something went wrong!");
    }
  };
 
  
  const deleteItem = async (id) => {
    dispatch(setLoading(true));
    try {
      const res = await deleteCategory(id, user.token);
      //const res = await getCategory();
      //dispatch(setCategory(res.data));
      dispatch(setLoading(false));
      dispatch(setChange(res));
      alert.success("Category deleted");
    } catch (e) {
      alert.error("This category is using!");
      dispatch(setLoading(false));
    }
  };
  if (categoryId) {
    return <CategoryList id={categoryId} onBack={setCategoryId} />;
  }
  return (
    <div className="mt-4 gap-2 py-3 dark:text-[#fff] ">
      <div className=" mt-2 overflow-y-auto rounded-md border-2 p-4 lg:mt-0">
        {/* <h1 className="headLine">Category List</h1>
        <InputGroup className="mt-4" style={style}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          <InputRightElement>
            <FaSearch />
          </InputRightElement>
        </InputGroup> */}

        <Pagination
          itemsPerPage={10}
          data={Category}
          head={
            <Tr>
              <Th>No.</Th>
              <Th>Image and Name</Th>
              <Th>Action</Th>
            </Tr>
          }
          ROW={(e) => (
            <Tr>
              <Td>{e.index + 1}</Td>
              <Td className="flex items-center">
                <Avatar className="mr-2" src={`${url}${e.data.icon}`} />
                <p
                  className="cursor-pointer text-blue-400 hover:underline"
                  onClick={() =>navigate(`${pathname}/${e.data.id}`) }
                >
                  {e.data.name}
                </p>
              </Td>
              <Td className=" ">
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteItem(e.data.id);
                        }
                      });
                    }}
                    className="rounded-full bg-red-300 p-2"
                  >
                    <AiFillDelete />
                  </div>
                  <div
                    onClick={() => {
                      setEditCategoryId(e.data.id);
                      setEditCategoryName(e.data.name);
                      setEditCategoryIconVal(e.data.icon);
                      onOpen();
                    }}
                    className="rounded-full bg-gray-400 p-2"
                  >
                    <AiFillEdit />
                  </div>
                </div>
              </Td>
            </Tr>
          )}
        />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setEditCategoryIcon();
          setEditCategoryName();
          setEditCategoryId();
          setEditCategoryIconVal();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editCategoryId ? "Edit" : "Add"} Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex w-full justify-center">
              <Avatar
                alt="icon"
                className="my-2"
                src={
                  editCategoryIcon
                    ? URL.createObjectURL(editCategoryIcon)
                    : `${url}${editCategoryIconVal}`
                }
              />
            </div>
            <FormLabel className="mt-4">Category Title</FormLabel>
            <Input
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              style={style}
              placeholder="Category Name"
            />
            <FormLabel className="mt-4">Category Icon</FormLabel>
            <Button
              onClick={() => {
                inpRef.current?.click();
              }}
              colorScheme="blue"
              className="w-full"
              leftIcon={<AiOutlinePlus />}
            >
              Add Icon
            </Button>
            <Input
              ref={inpRef}
              className="hidden"
              onChange={(e) =>
                setEditCategoryIcon(e.target.files[e.target.files.length - 1])
              }
              type="file"
              style={style}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={!editCategoryId ? addMainCategory : editMainCategory}
              colorScheme={"blue"}
              mr={3}
            >
              Save
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onClose();
                setEditCategoryIcon();
                setEditCategoryName();
                setEditCategoryId();
                setEditCategoryIconVal();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FloatButton onClick={() => onOpen()} />
    </div>
  );
}
const style = {
  borderColor: "#ABB2B9",
};
