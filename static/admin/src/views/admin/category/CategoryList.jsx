import {
  FormControl,
  Input,
  FormLabel,
  Select,
  InputGroup,
  InputRightElement,
  Button,
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
import { AiFillDelete } from "react-icons/ai";
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
    setSubCategoryList(subCategory.filter((d) => d.categoryId === id));
  }, [search, subCategory?.length]);

  const deleteItem = async (id) => {
    dispatch(setLoading(true));
    try {
      await deleteOption(id, user.token);
      //const res = await getCategory();
      //dispatch(setCategory(res.data));
      dispatch(setLoading(false));
      alert.success("Category deleted");
    } catch (e) {
      alert.error("Something went wrong!");
      dispatch(setLoading(false));
    }
  };
  const deleteCategoryItem = async (id) => {
    dispatch(setLoading(true));
    try {
      await deleteSubCategory(id, user.token);
      //const res = await getCategory();
      //dispatch(setCategory(res.data));
      dispatch(setLoading(false));
      alert.success("Category deleted");
    } catch (e) {
      alert.error("Something went wrong!");
      dispatch(setLoading(false));
    }
  };
  return (
    <>
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
                  <Button
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
                          deleteCategoryItem(e.data.id).then((res) => {
                            Swal.fire(
                              "Deleted!",
                              "Your file has been deleted.",
                              "success"
                            );
                          });
                        }
                      });
                    }}
                    leftIcon={<AiFillDelete size={20} color="#E74C3C" />}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            )}
          />
        </div>
        <div className=" mt-2 overflow-y-auto rounded-md border-2 p-4 lg:mt-0">
          <h1 className="headLine mb-4">Options List</h1>

          <Select
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
                  <Button
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
                          deleteItem(e.data.id).then((res) => {
                            Swal.fire(
                              "Deleted!",
                              "Your file has been deleted.",
                              "success"
                            );
                          });
                        }
                      });
                    }}
                    leftIcon={<AiFillDelete size={20} color="#E74C3C" />}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            )}
          />
        </div>
      </div>
    </>
  );
}
const style = {
  borderColor: "#ABB2B9",
};
