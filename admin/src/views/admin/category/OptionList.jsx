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
import { storeOption } from "api/category";
import { storeSearch } from "reducers/search";

export default function OptionList({ onBack }) {
  const subCategory = useSelector((state) => state.subCategory);
  const option = useSelector((state) => state.option);
  const [selection, setSelection] = useState();
  const alert = useAlert();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [SubCategoryList, setSubCategoryList] = useState();
  const search = useSelector((s) => s.search);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editSubCategory, setEditSubCategory] = useState();
  const [editOption, setEditOption] = useState();
  const { id } = useParams();
  const categoryList = useSelector((state) => state.category);
  const navigate = useNavigate();
  const {pathname}=useLocation()

  useEffect(() => {
    if (search) {
      return setSubCategoryList(
        option?.filter(
          (d) =>
            d.name.toLowerCase().includes(search.toLowerCase()) &&
            d.subCategoryId === id
        )
      );
    }
    setSubCategoryList(option?.filter((d) => d.subCategoryId == id));
    // console.log(subCategory.filter((d) => d.categoryId == id));
  }, [search, option?.length, option, id]);
  useEffect(() => {
    dispatch(storeSearch(""));
  }, [pathname]);
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

  return (
    <div className="dark:text-[#fff]">
      <div className=" gap-2 py-3 ">
        <div className=" mt-2 overflow-y-auto rounded-md border-2 p-4 lg:mt-0">
          <div className="my-2 text-2xl font-bold">
            {subCategory?.filter((d) => d.id.match(id))[0]?.name}
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
                <Td>{e.data.name}</Td>
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
                            deleteItem(e.data.id);
                          }
                        });
                      }}
                      className="rounded-full bg-red-300 p-2"
                    >
                      <AiFillDelete size={20} />
                    </div>
                    <div
                      onClick={() => {
                        setEditOption(e.data.id);
                        onOpen();
                      }}
                      className="rounded-full bg-gray-400 p-2"
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
          setEditOption("");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <EditOption subCategoryId={id} onClose={onClose} id={editOption} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onClose();
                setEditOption("");
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

const EditOption = ({ id, onClose, subCategoryId }) => {
  const [subCategory, setSubCategory] = useState();
  const [option, setOption] = useState();
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
    if (!optionName || !id || !option) {
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
      setOptionName("");
      setOption("");
    } catch (e) {
      dispatch(setLoading(false));
      alert.error("Something went wrong!");
    }
  };
  const addOptions = async () => {
    onClose();
    if (!option || !optionName) {
      return alert.info("All fields are required");
    }
    dispatch(setLoading(true));
    try {
      const res = await storeOption(optionName, option, user?.token);
      dispatch(setLoading(false));
      dispatch(setChange(res));
      alert.success("Category added");
      setOptionName("");
      setOption("");
    } catch (e) {
      dispatch(setLoading(false));
      alert.error("Something went wrong!");
    }
  };
  return (
    <div>
      <h1 className="headLine">{id ? "Edit" : "Add"} Options</h1>
      <FormControl className="my-6">
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
        <Button
          onClick={id ? editMainCategory : addOptions}
          className="mt-4"
          colorScheme="blue"
        >
          Save
        </Button>
      </FormControl>
    </div>
  );
};
