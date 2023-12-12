import {
  FormControl,
  Input,
  FormLabel,
  Select,
  InputGroup,
  InputRightElement,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Header from "components/headers";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "layouts/pagination";
import { useAlert } from "react-alert";
import { setLoading } from "reducers/isLoading";
import { deleteOption } from "api/category";
import { deleteCategory } from "api/category";
import { deleteSubCategory } from "api/category";
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

export default function CategoryList({ onBack, id }) {
  const [page, setPage] = useState(0);
  const subCategory = useSelector((state) => state.subCategory);
  const option = useSelector((state) => state.option);
  const [selection, setSelection] = useState();
  const alert = useAlert();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [SubCategoryList, setSubCategoryList] = useState();
  const [search, setSearch] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editSubCategory, setEditSubCategory] = useState();
  const [editOption, setEditOption] = useState();
  

  useEffect(() => {
    if (search) {
      return setSubCategoryList(
        subCategory?.filter(
          (d) =>
            d.name.toLowerCase().includes(search.toLowerCase()) &&
            d.categoryId === id
        )
      );
    }
    setSubCategoryList(subCategory.filter((d) => d.categoryId == id));
   // console.log(subCategory.filter((d) => d.categoryId == id));
  }, [search, subCategory?.length, subCategory,id]);

  const deleteItem = async (id) => {
    dispatch(setLoading(true));
    try {
      const res = await deleteOption(id, user.token);
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
  const deleteCategoryItem = async (id) => {
    dispatch(setLoading(true));
    try {
      const res = await deleteSubCategory(id, user.token);
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

  return (
    <div className="dark:text-[#fff]">
      <Header title={"Category List"} onClick={() => onBack(null)} />
      <div className=" gap-2 py-3 lg:grid lg:grid-cols-2">
        <div className=" mt-2 overflow-y-auto rounded-md border-2 p-4 lg:mt-0">
          <h1 className="headLine mb-3">Sub-Category List</h1>
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
            data={SubCategoryList}
            hidePage={true}
            head={
              <Tr>
                <Th>No.</Th>
                <Th>Name</Th>
                <Th>Action</Th>
              </Tr>
            }
            ROW={(e) => (
              <Tr>
                <Td>{e.index + 1}</Td>
                <Td>{e.data.name}</Td>
                <Td>
                  <div className="flex">
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
                            deleteCategoryItem(e.data.id);
                          }
                        });
                      }}
                      className="rounded-md bg-white p-2"
                    >
                      <AiFillDelete size={20} color="#E74C3C" />
                    </div>
                    <div
                      onClick={() => {
                        setEditSubCategory(e.data.id);
                        setEditOption();
                        onOpen();
                      }}
                      className="ml-2 rounded-md bg-white p-2"
                    >
                      <AiFillEdit size={20} color="#E74C3C" />
                    </div>
                  </div>
                </Td>
              </Tr>
            )}
          />
        </div>
        <div className=" mt-2 overflow-y-auto rounded-md border-2 p-4 lg:mt-0">
          <h1 className="headLine mb-4">Options List</h1>

          <Select
            className=" dark:bg-brandLinear dark:text-[#000]"
            onChange={(e) => setSelection(e.target.value)}
            style={style}
            placeholder="Select Sub- Category"
          >
            {subCategory
              ?.filter((d) => d.categoryId === id)
              .map((doc, i) => (
                <option key={i} value={doc.id}>
                  {doc.name}
                </option>
              ))}
          </Select>
          <Pagination
            itemsPerPage={10}
            hidePage={true}
            data={option.filter((d) => d.subCategoryId === selection)}
            head={
              <Tr>
                <Th>No.</Th>
                <Th>Name</Th>
                <Th>Action</Th>
              </Tr>
            }
            ROW={(e) => (
              <Tr>
                <Td>{e.index + 1}</Td>
                <Td>{e.data.name}</Td>
                <Td>
                  <div className="flex">
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
                      className="rounded-md bg-white p-2"
                    >
                      <AiFillDelete size={20} color="#E74C3C" />
                    </div>
                    <div
                      onClick={() => {
                        setEditSubCategory();
                        setEditOption(e.data.id);
                        onOpen();
                      }}
                      className="ml-2 rounded-md bg-white p-2"
                    >
                      <AiFillEdit size={20} color="#E74C3C" />
                    </div>
                  </div>
                </Td>
              </Tr>
            )}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {editSubCategory ? (
              <EditSub onClose={onClose} id={editSubCategory} />
            ) : (
              <EditOption onClose={onClose} id={editOption} />
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
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
const EditSub = ({ id, onClose }) => {
  const [subCategory, setSubCategory] = useState();
  const [subCategoryName, setSubCategoryName] = useState();
  const alert = useAlert();
  const categoryList = useSelector((state) => state.category);
  const subCategoryList = useSelector((state) => state.subCategory);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    let arr = subCategoryList?.filter((d) => d.id === id);
    if (arr.length > 0) {
      setSubCategory(arr[0].categoryId);
      setSubCategoryName(arr[0].name);
    }
  }, [id]);
  const editMainCategory = async () => {
    onClose();
    if (!subCategoryName || !id) {
      return alert.info("All fields are required");
    }
    dispatch(setLoading(true));
    try {
      const res = await putApi(
        "/category/editSubCategory",
        {
          name: subCategoryName,
          categoryId: subCategory,
          id: id,
        },
        user?.token
      );
      dispatch(setLoading(false));
      dispatch(setChange(res));
      alert.success("Sub Category updated");
    } catch (e) {
      dispatch(setLoading(false));
      alert.error("Something went wrong!");
    }
  };
  return (
    <div>
      <h1 className="headLine">Edit Sub Category</h1>
      <FormControl className="my-6">
        {/* <FormLabel>Select Category</FormLabel>
        <Select
          className=" dark:bg-brandLinear dark:text-[#000]"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          style={style}
          placeholder="Select Category"
        >
          {categoryList?.map((doc, i) => (
            <option key={i} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </Select> */}
        <FormLabel className="mt-4">Sub Category Name</FormLabel>
        <Input
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          placeholder="Sub Category Name"
          type="text"
          style={style}
        />
        <Button onClick={editMainCategory} className="mt-4" colorScheme="blue">
          Save
        </Button>
      </FormControl>
    </div>
  );
};
const EditOption = ({ id, onClose }) => {
  const [subCategory, setSubCategory] = useState();
  const [option,setOption]=useState()
  const [optionName, setOptionName] = useState();
  const alert = useAlert();
  const options = useSelector((state) => state.option);
  const categoryList = useSelector((state) => state.category);
  const subCategoryList = useSelector((state) => state.subCategory);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    let arr = options?.filter((d) => d.id === id);
    if (arr.length > 0) {
      setOption(arr[0].subCategoryId);
      setOptionName(arr[0].name);
    }
  }, [id]);
  const editMainCategory = async () => {
    onClose();
    if (!optionName || !id||!option) {
      return alert.info("All fields are required");
    }
    dispatch(setLoading(true));
    try {
      const res = await putApi(
        "/category/editOption",
        {
          name: optionName,
          subCategoryId: option,
          id: id,
        },
        user?.token
      );
      dispatch(setLoading(false));
      dispatch(setChange(res));
      alert.success("Option updated");
    } catch (e) {
      dispatch(setLoading(false));
      alert.error("Something went wrong!");
    }
  };
  return (
    <div>
      <h1 className="headLine">Edit Options</h1>
          <FormControl className="my-6">
            {/* <FormLabel>Select Category</FormLabel>
            <Select
              className=" dark:bg-brandLinear dark:text-[#000]"
              onChange={(e) => {
                setSubCategory(
                  subCategoryList?.filter((d) => d.categoryId == e.target.value)
                );
              }}
              style={style}
              placeholder="Select Category"
            >
              {categoryList?.map((doc, i) => (
                <option key={i} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </Select> */}
            <FormLabel className="mt-4">Select Sub Category</FormLabel>
            <Select
              className=" dark:bg-brandLinear dark:text-[#000]"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              style={style}
              placeholder="Select Sub-Category"
            >
              {subCategoryList?.map((doc, i) => (
                <option key={i} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </Select>
            <FormLabel className="mt-4">Option Name</FormLabel>
            <Input
              value={optionName}
              onChange={(e) => setOptionName(e.target.value)}
              placeholder="Option Name"
              type="text"
              style={style}
            />
            <Button onClick={editMainCategory} className="mt-4" colorScheme="blue">
              Save
            </Button>
          </FormControl>
    </div>
  );
};
