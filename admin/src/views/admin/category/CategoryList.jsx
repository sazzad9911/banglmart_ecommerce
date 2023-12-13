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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FloatButton from "components/floatButton";
import { storeSubCategory } from "api/category";
import { storeSearch } from "reducers/search";

export default function CategoryList({ onBack }) {
  const subCategory = useSelector((state) => state.subCategory);
  const alert = useAlert();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [SubCategoryList, setSubCategoryList] = useState();
  const search = useSelector((s) => s.search);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editSubCategory, setEditSubCategory] = useState();
  const { id } = useParams();
  const categoryList = useSelector((state) => state.category);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname.substring(0, pathname.lastIndexOf("/") + 1));

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
    setSubCategoryList(subCategory?.filter((d) => d.categoryId == id));
    // console.log(subCategory.filter((d) => d.categoryId == id));
  }, [search, subCategory?.length, subCategory, id]);
  useEffect(() => {
    dispatch(storeSearch(""));
  }, [pathname]);

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
      <div className=" gap-2 py-3 ">
        <div className=" mt-2 overflow-y-auto rounded-md border-2 p-4 lg:mt-0">
          <div className="my-2 text-2xl font-bold">
            {categoryList?.filter((d) => d.id.match(id))[0]?.name}
          </div>
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
                <Td
                  onClick={() => {
                    navigate(
                      `${pathname.substring(
                        0,
                        pathname.lastIndexOf("/") + 1
                      )}option/${e.data.id}`
                    );
                  }}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  {e.data.name}
                </Td>
                <Td>
                  <div className="flex gap-4">
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
                      className="rounded-full bg-red-300 p-2"
                    >
                      <AiFillDelete size={20} />
                    </div>
                    <div
                      onClick={() => {
                        setEditSubCategory(e.data.id);
                        onOpen();
                      }}
                      className="rounded-full bg-gray-300 p-2"
                    >
                      <AiFillEdit size={20} />
                    </div>
                  </div>
                </Td>
              </Tr>
            )}
          />
          <FloatButton onClick={() => onOpen()} />
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setEditSubCategory("");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <EditSub categoryId={id} onClose={onClose} id={editSubCategory} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onClose();
                setEditSubCategory("");
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
const EditSub = ({ id, onClose, categoryId }) => {
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
  const addSubCategory = async () => {
    onClose();
    if (!categoryId || !subCategoryName || !user) {
      return alert.info("All fields are required");
    }
    dispatch(setLoading(true));
    try {
      const res = await storeSubCategory(
        subCategoryName,
        categoryId,
        user.token
      );
      dispatch(setLoading(false));
      dispatch(setChange(res));
      alert.success("Category added");
      setSubCategoryName("");
      setSubCategory("");
    } catch (e) {
      dispatch(setLoading(false));
      alert.error("Something went wrong!");
    }
  };
  return (
    <div>
      <h1 className="headLine">{id ? "Edit" : "Add"} Sub Category</h1>
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
        <Button
          onClick={id ? editMainCategory : addSubCategory}
          className="mt-4"
          colorScheme="blue"
        >
          Save
        </Button>
      </FormControl>
    </div>
  );
};
