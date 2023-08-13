import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
  InputRightAddon,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useAlert } from "react-alert";
import { setLoading } from "reducers/isLoading";
import { addProduct } from "api/productApi";
import Header from "components/headers";
import Select from "react-select";
import { addVariantApi } from "api/productApi";
import { url } from "api/authApi";
import { updateVariantApi } from "api/productApi";

export default function EditVariant({
  onClose,
  addProducts,
  colors,
  size,
  data,
}) {
  const [picture, setPicture] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [submit, setSubmit] = useState(false);
  const [productList, setProductList] = useState([]);
  const product = useSelector((state) => state.product);
  const [SIZE, setSize] = useState([]);
  const [COLORS, setColors] = useState([]);
  const [productId, setProductId] = useState({
    value: data.product.id,
    label: data.product.title,
  });
  const [colorId, setColorId] = useState({
    value: data.color.id,
    label: data.color.title,
  });
  const [sizeId, setSizeId] = useState({
    value: data.size.id,
    label: data.size.title,
  });

  useEffect(() => {
    if (product) {
      product?.data?.map((doc) => {
        setProductList((val) => [...val, { value: doc.id, label: doc.title }]);
      });
    }
  }, []);
  useEffect(() => {
    if (colors) {
      colors?.map((doc) => {
        setColors((val) => [...val, { value: doc.id, label: doc.title }]);
      });
    }
  }, []);
  useEffect(() => {
    if (size) {
      size?.map((doc) => {
        setSize((val) => [...val, { value: doc.id, label: doc.title }]);
      });
    }
  }, []);

  const addNewProduct = async () => {
    if (!colorId || !sizeId || !productId ) {
      return setSubmit(true);
    }

    dispatch(setLoading(true));
    try {
      const form = new FormData();
      form.append("colorId", colorId.value);
      form.append("sizeId", sizeId.value);
      form.append("productId", productId.value);
      picture&&form.append("image", picture);
      form.append("variantId", data.id);
      await updateVariantApi(form, user.token);
      onClose();
      dispatch(setLoading(false));
      //addProducts();
      Swal.fire("Success", "Product update successful", "success");
    } catch (e) {
      // onClose();
      dispatch(setLoading(false));
      Swal.fire("Ops!", "Something went wrong", "error");
    }
  };
  return (
    <div className="dark:text-[#fff]">
      <Header onClick={onClose} title={"Edit Variant"} />
      <h2 className="mediumText mb-2">Select Product</h2>
      <div>
        <Select
          className="basic-single text-[#000]"
          classNamePrefix="select"
          defaultValue={productId}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={productList}
          onChange={setProductId}
        />

        {submit && !productId && (
          <div className="text-red-500">Select category!</div>
        )}
      </div>
      <h2 className="mediumText mt-4 mb-2">Product Color</h2>
      <div>
        <Select
          className="basic-single text-[#000]"
          classNamePrefix="select"
          defaultValue={colorId}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={COLORS}
          onChange={setColorId}
        />

        {submit && !colorId && (
          <div className="text-red-500">Select color!</div>
        )}
      </div>
      <h2 className="mediumText mt-4 mb-2">Product Size</h2>
      <div>
        <Select
          className="basic-single text-[#000]"
          classNamePrefix="select"
          defaultValue={sizeId}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={SIZE}
          onChange={(e) => {
            setSizeId(e);
          }}
        />

        {submit && !sizeId && <div className="text-red-500">Select size!</div>}
      </div>
      <div>
        <h2 className="mediumText mt-4 mb-2">
          Product Thumbnail (Ratio 350*400)
        </h2>
        <InputGroup>
          <Input
            isInvalid={submit && !picture}
            onChange={(e) =>
              setPicture(e.target.files[e.target.files.length - 1])
            }
            style={style}
            type="file"
            accept="image/jpeg,image/png"
            placeholder="Product thumbnail"
          />
          <InputRightAddon>
          <img className="w-8 h-8" crossOrigin="anonymous" src={`${url}${data.image}`}/>
          </InputRightAddon>
        </InputGroup>
        {submit && !picture && (
          <div className="text-red-500">Product thumbnail is required!</div>
        )}
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={addNewProduct} colorScheme="blue">
          Save
        </Button>
        <Button onClick={onClose} className="ml-4" colorScheme="red">
          Close
        </Button>
      </div>
    </div>
  );
}
const style = {
  borderColor: "#D0D0D0",
  backgroundColor: "white",
};
