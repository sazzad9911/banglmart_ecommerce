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
export default function Variants() {
  const VARIANT = useSelector((state) => state.variant);
  const COLORS = useSelector((state) => state.color);
  const SIZE = useSelector((state) => state.size);
  const user = useSelector((state) => state.user);
  const [addClick, setAddClick] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addColor, setAddColor] = useState(true);
  const [color, setColor] = useState();
  const [size, setSizes] = useState();
  const dispatch = useDispatch();
  const alert = useAlert();
  const isLoading = useSelector((state) => state.isLoading);
  const [variantId, setVariantId] = useState();
  const [AllVariants, setAllVariants] = useState();
  const [List, setList] = useState([]);
  const product = useSelector((state) => state.product);
  const [editClick, setEditClick] = useState();
  useEffect(() => {
    if (product && product.data) {
      let arr = [];
      product?.data?.map((doc, i) => {
        arr.push({
          value: doc.id,
          label: doc.title,
        });
      });
      setList(arr);
    }
  }, [product]);
  useEffect(() => {
    if (variantId) {
      setAllVariants(VARIANT?.filter((d) => d.productId === variantId?.value));
    } else {
      setAllVariants(VARIANT);
    }
  }, [variantId, VARIANT]);

  const storeColor = async () => {
    onClose();
    if (!color || !color?.title || !color?.color) {
      return alert.info("All fields are required");
    }
    dispatch(setLoading(true));
    try {
      await addColorApi(color.title, color.color, user.token);
      dispatch(setLoading(false));
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
      await addSize(size.title, size.cm, user.token);
      dispatch(setLoading(false));
      alert.success("Size added");
    } catch (e) {
      alert.error("Something went wrong");
    }
  };
  const deleteVariant = async (id) => {
    dispatch(setLoading(true));
    await deleteVariantApi(id, user.token);
    dispatch(setLoading(false));
  };

  if (!VARIANT || !COLORS || !SIZE) {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (addClick) {
    return (
      <AddVariant
        colors={COLORS}
        size={SIZE}
        onClose={() => setAddClick(false)}
      />
    );
  }
  if (editClick) {
    return (
      <EditVariant
        data={editClick}
        colors={COLORS}
        size={SIZE}
        onClose={() => setEditClick(false)}
      />
    );
  }
  return (
    <div className="lg:grid lg:grid-cols-5 gap-4 p-4 dark:text-[#fff]">
      <div className=" lg:col-span-3">
        <h2 className="headLine mb-4">Your Product Variants</h2>
        <Select
          className="basic-single text-[#000]"
          classNamePrefix="select"
          defaultValue={List[List.indexOf(variantId)]}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={List}
          onChange={setVariantId}
        />
        <Pagination
          data={AllVariants}
          itemsPerPage={10}
          head={
            <Tr>
              <Th>Product Name</Th>
              <Th>Color</Th>
              <Th>Size</Th>
              <Th>Picture</Th>
              <Th>Menu</Th>
            </Tr>
          }
          ROW={(e) => {
            return (
              <Tr>
                <Td>{e.data.product.title}</Td>
                <Td>
                  <div
                    style={{
                      backgroundColor: e.data.color.color,
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                    }}
                  />
                </Td>

                <Td>{e.data.size.title}</Td>
                <Td>
                  <img
                    crossOrigin="anonymous"
                    className="h-10 w-10"
                    src={`${url}${e.data.image}`}
                  />
                </Td>
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
                                  deleteVariant(e.data.id)
                                    .then((res) => {
                                      Swal.fire(
                                        "Deleted!",
                                        "Your file has been deleted.",
                                        "success"
                                      );
                                    })
                                    .catch((e) => {
                                      dispatch(setLoading(false));
                                      Swal.fire(
                                        "Ops!",
                                        "Something went wrong.",
                                        "error"
                                      );
                                    });
                                }
                              });
                            }}
                          >
                            Delete
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setEditClick(e.data);
                            }}
                          >
                            Edit
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
      </div>
      <div className="col-span-2">
        <div className="m-2">
          <ColorTable
            onDelete={(id) => {
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
                  dispatch(setLoading(true))
                  try {
                    await deleteColorApi(id, user.token)
                    Swal.fire(
                      "Deleted!",
                      "Your color has been deleted.",
                      "success"
                    );
                    dispatch(setLoading(false))
                  } catch (e) {
                    Swal.fire(
                      "Ops!",
                      "This color is now using.",
                      "error"
                    );
                    dispatch(setLoading(false))
                  }
                }
              });
            }}
            onClick={() => {
              setAddColor(true);
              onOpen();
            }}
            columnsData={colorHeaders}
            tableData={COLORS}
          />
        </div>
        <div className="m-2">
          <SizeTable onDelete={(id) => {
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
                  dispatch(setLoading(true))
                  try {
                    await deleteSizeApi(id, user.token)
                    Swal.fire(
                      "Deleted!",
                      "Your size has been deleted.",
                      "success"
                    );
                    dispatch(setLoading(false))
                  } catch (e) {
                    Swal.fire(
                      "Ops!",
                      "This size is now using.",
                      "error"
                    );
                    dispatch(setLoading(false))
                  }
                }
              });
            }}
            onClick={() => {
              setAddColor(false);
              onOpen();
            }}
            columnsData={sizeHeaders}
            tableData={SIZE}
          />
        </div>
      </div>
      <FloatButton onClick={() => setAddClick(true)} />
      <ModalComponent
        size={"xl"}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        title={addColor ? "Add Color" : "Add Size"}
        component={
          addColor ? (
            <AddColor onChange={setColor} />
          ) : (
            <AddSize onChange={setSizes} />
          )
        }
        onClick={addColor ? storeColor : storeSize}
      />
    </div>
  );
}
