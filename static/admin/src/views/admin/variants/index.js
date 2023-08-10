import React, { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
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
const colorHeaders = [
  {
    Header: "NAME",
    accessor: "title",
  },
  {
    Header: "COLOR",
    accessor: "color",
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
];
export default function Variants() {
  const [VARIANT, setVariant] = useState();
  const [COLORS, setColors] = useState([]);
  const [SIZE, setSize] = useState([]);
  const user = useSelector((state) => state.user);
  const [addClick, setAddClick] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addColor, setAddColor] = useState(true);
  const [color, setColor] = useState();
  const [size, setSizes] = useState();
  const dispatch = useDispatch();
  const alert = useAlert();
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    fetch();
  }, [COLORS,VARIANT,SIZE]);
  const fetch = async () => {
    
    try {
      const res = await getVariant(user.user.id);
      setVariant(res.data);
      const colors = await getColor(user.user.id);
      setColors(colors.data);
      const size = await getSize();
      setSize(size.data);
      dispatch(setLoading(false));
      //console.log(size.data);
    } catch (e) {
      console.log(e.message);
      dispatch(setLoading(false));
    }
  };
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
  if (addClick) {
    return (
      <AddVariant
        colors={COLORS}
        size={SIZE}
        onClose={() => setAddClick(false)}
      />
    );
  }
  return (
    <div className=" grid grid-cols-3 gap-4 p-4">
      <div className=" col-span-2">
        <h2 className="headLine mb-4">Your Product Variants</h2>
        <Pagination
          data={VARIANT}
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
                <Td>
                  <Menu>
                    {({ isOpen }) => (
                      <>
                        <MenuButton isActive={isOpen} as={Button}>
                          <AiOutlineHolder />
                        </MenuButton>

                        <MenuList>
                          <MenuItem>Delete</MenuItem>
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
      </div>
      <div>
        <div className="m-2">
          <ColorTable
            onClick={() => {
              setAddColor(true);
              onOpen();
            }}
            columnsData={colorHeaders}
            tableData={COLORS}
          />
        </div>
        <div className="m-2">
          <SizeTable
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
