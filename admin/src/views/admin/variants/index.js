import React, { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Pagination from "layouts/pagination";
import { getVariant } from "api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { url } from "api/authApi";
import { AiOutlineHolder } from "react-icons/ai";
import AddVariant from "./AddVariant";
import FloatButton from "components/floatButton";
import Header from "components/headers";
import { getColor } from "api/productApi";
import { getSize } from "api/productApi";
import ColorTable from "./components/ColorTable";
import SizeTable from "./components/SizeTable";
import { SketchPicker } from "react-color";
import ModalComponent from "components/ModalComponent";
import AddColor from "./components/AddColor";
import AddSize from "./components/AddSize";
import { useAlert } from "react-alert";
import { addSize } from "api/productApi";
import { setLoading } from "reducers/isLoading";
import { addColorApi } from "api/productApi";
import Select from "react-select";
import { deleteVariantApi } from "api/productApi";
import Swal from "sweetalert2";
import { Loader } from "App";
import EditVariant from "./EditVariant";
import { deleteColorApi } from "api/productApi";
import { deleteSizeApi } from "api/productApi";
import { setChange } from "reducers/change";
import Specification from "./components/Specificition";
import AddSpecification from "./components/AddSpecification";
import { addVariantApi } from "api/productApi";
import { postApi } from "api/api";
import { MdDelete } from "react-icons/md";
import { BsPlusCircle } from "react-icons/bs";
const colorHeaders = [
  {
    Header: "NAME",
    accessor: "title",
  },
  {
    Header: "COLOR",
    accessor: "color",
  },
  {
    Header: "ACTION",
    accessor: "id",
  },
];
const sizeHeaders = [
  {
    Header: "NAME",
    accessor: "title",
  },
  {
    Header: "SIZE(CM.)",
    accessor: "cm",
  },
  {
    Header: "ACTION",
    accessor: "id",
  },
];
const specificationHeader = [
  {
    Header: "TITLE",
    accessor: "title",
  },
  {
    Header: "DETAILS",
    accessor: "details",
  },
  {
    Header: "ACTION",
    accessor: "id",
  },
];
export default function Variants() {
  const VARIANT = useSelector((state) => state.variant);
  const COLORS = useSelector((state) => state.color);
  const SIZE = useSelector((state) => state.size);
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [add, setAdd] = useState(true);
  const [color, setColor] = useState();
  const [size, setSizes] = useState();
  const [specification, setSpecification] = useState();
  const dispatch = useDispatch();
  const alert = useAlert();

  const storeColor = async () => {
    onClose();
    if (!color || !color?.title || !color?.color) {
      return alert.info("All fields are required");
    }
    dispatch(setLoading(true));
    try {
      const res = await addColorApi(color.title, color.color, user.token);
      dispatch(setLoading(false));
      dispatch(setChange(res));
      alert.success("Color added");
    } catch (e) {
      alert.error("Something went wrong");
    }
  };
  const storeSize = async () => {
    onClose();
    if (!size || !size?.title || !size?.cm) {
      return alert.info("All fields are required");
    }
    dispatch(setLoading(true));
    try {
      const res = await addSize(size.title, size.cm, user.token);
      dispatch(setLoading(false));
      dispatch(setChange(res));
      alert.success("Size added");
    } catch (e) {
      alert.error("Something went wrong");
    }
  };
  //problem area---
  const storeSpecification = async () => {
    if (!specification || !specification?.title || !specification?.details) {
      return alert.info("All fields are required");
    }
    dispatch(setLoading(true));
    try {
      const res = await addVariantApi(
        {
          title: specification.title,
          details: specification.details,
        },
        user.token
      );
      dispatch(setLoading(false));
      dispatch(setChange(res));
      onClose();
      alert.success("Specification added");
    } catch (e) {
      dispatch(setLoading(false));
      alert.error("Something went wrong");
    }
  };

  if (!VARIANT || !COLORS || !SIZE) {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" p-4 dark:text-[#fff] ">
      <h2 className="mediumText mb-4">
        Add your product Specification and variants to show your product actual
        details
      </h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="">
          <Pagination
            itemsPerPage={5}
            data={COLORS}
            head={
              <Tr>
                <Th>Index</Th>
                <Th>Title</Th>
                <Th>Color</Th>
                <Th>Delete</Th>
              </Tr>
            }
            ROW={(e) => {
              return (
                <Tr>
                  <Td>{e.index + 1}</Td>
                  <Td>{e.data.title}</Td>
                  <Td>
                    <div
                      className={`h-8 w-8 rounded-full bg-[${e.data.color}]`}
                    />
                  </Td>

                  <Td className="text-[#000]">
                    <MdDelete
                      onClick={() => {
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
                            try {
                              const res = await deleteColorApi(
                                e.data.id,
                                user.token
                              );
                              Swal.fire(
                                "Deleted!",
                                "Your color has been deleted.",
                                "success"
                              );
                              dispatch(setChange(res));
                              dispatch(setLoading(false));
                            } catch (e) {
                              Swal.fire(
                                "Ops!",
                                "This color is now using.",
                                "error"
                              );
                              dispatch(setLoading(false));
                            }
                          }
                        });
                      }}
                      color="red"
                      size={25}
                    />
                  </Td>
                </Tr>
              );
            }}
            children={
              <BsPlusCircle
                color="blue"
                size={30}
                onClick={() => {
                  setAdd("color");
                  onOpen();
                }}
              />
            }
          />
        </div>
        <div className="">
          <Pagination
            itemsPerPage={5}
            data={SIZE}
            head={
              <Tr>
                <Th>Index</Th>
                <Th>Title</Th>
                <Th>Size</Th>
                <Th>Delete</Th>
              </Tr>
            }
            ROW={(e) => {
              return (
                <Tr>
                  <Td>{e.index + 1}</Td>
                  <Td>{e.data.title}</Td>
                  <Td>{e.data.cm}</Td>

                  <Td className="text-[#000]">
                    <MdDelete
                      onClick={() => {
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
                            try {
                              const res = await deleteSizeApi(
                                e.data.id,
                                user.token
                              );
                              Swal.fire(
                                "Deleted!",
                                "Your size has been deleted.",
                                "success"
                              );
                              dispatch(setChange(res));
                              dispatch(setLoading(false));
                            } catch (e) {
                              Swal.fire(
                                "Ops!",
                                "This size is now using.",
                                "error"
                              );
                              dispatch(setLoading(false));
                            }
                          }
                        });
                      }}
                      color="red"
                      size={25}
                    />
                  </Td>
                </Tr>
              );
            }}
            children={
              <BsPlusCircle
                color="blue"
                size={30}
                onClick={() => {
                  setAdd("size");
                  onOpen();
                }}
              />
            }
          />
        </div>
        <div className="">
          <Pagination
            itemsPerPage={5}
            data={VARIANT}
            head={
              <Tr>
                <Th>Index</Th>
                <Th>Title</Th>
                <Th>Details</Th>
                <Th>Delete</Th>
              </Tr>
            }
            ROW={(e) => {
              return (
                <Tr>
                  <Td>{e.index + 1}</Td>
                  <Td>{e.data.title}</Td>
                  <Td>{e.data.details}</Td>

                  <Td className="text-[#000]">
                    <MdDelete
                      onClick={() => {
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
                            try {
                              const res = await deleteVariantApi(
                                e.data.id,
                                user.token
                              );
                              Swal.fire(
                                "Deleted!",
                                "Your specification has been deleted.",
                                "success"
                              );
                              dispatch(setChange(res));
                              dispatch(setLoading(false));
                            } catch (e) {
                              Swal.fire(
                                "Ops!",
                                "This specification is now using.",
                                "error"
                              );
                              dispatch(setLoading(false));
                            }
                          }
                        });
                      }}
                      color="red"
                      size={25}
                    />
                  </Td>
                </Tr>
              );
            }}
            children={
              <BsPlusCircle
                color="blue"
                size={30}
                onClick={() => {
                  setAdd("specification");
                  onOpen();
                }}
              />
            }
          />
        </div>
      </div>
      <ModalComponent
        size={"xl"}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        title={
          add === "color"
            ? "Add Color"
            : add === "size"
            ? "Add Size"
            : "Add Specification"
        }
        component={
          add === "color" ? (
            <AddColor onChange={setColor} />
          ) : add === "size" ? (
            <AddSize onChange={setSizes} />
          ) : (
            <AddSpecification onChange={setSpecification} />
          )
        }
        onClick={
          add === "color"
            ? storeColor
            : add === "size"
            ? storeSize
            : storeSpecification
        }
      />
    </div>
  );
}
