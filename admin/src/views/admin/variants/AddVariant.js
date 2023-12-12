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
  InputGroup,
  Input,
  InputRightElement,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useAlert } from "react-alert";
import { setLoading } from "reducers/isLoading";
import { addProduct } from "api/productApi";
import Header from "components/headers";
import Select from "react-select";
import { addVariantApi } from "api/productApi";
import { setChange } from "reducers/change";

export default function AddVariant({ onClose, addProducts,colors,size }) {
  const [picture, setPicture] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [submit, setSubmit] = useState(false);
  const [productList, setProductList] = useState([]);
  const product = useSelector((state) => state.product);
  const [SIZE,setSize]=useState([])
  const [COLORS,setColors]=useState([])
  const [productId,setProductId]=useState()
  const [colorId,setColorId]=useState()
  const [sizeId,setSizeId]=useState()
 

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
    if (
      !colorId ||
      !sizeId ||
      !productId ||
      !picture
    ) {
      return setSubmit(true);
    }
    
    dispatch(setLoading(true));
    try {
      const form = new FormData();
      form.append("colorId", colorId.value);
      form.append("sizeId", sizeId.value);
      form.append("productId", productId.value);
      form.append("image", picture);
     const res= await addVariantApi(form, user.token);
      onClose();
      dispatch(setChange(res))
      dispatch(setLoading(false));
      //addProducts();
      Swal.fire("Success", "Product added successful", "success");
    } catch (e) {
     // onClose();
      dispatch(setLoading(false));
      Swal.fire("Ops!", "Something went wrong", "error");
    }
  };
  return (
    <div className="dark:text-[#fff]">
      <Header onClick={onClose} title={"Add Variant"} />
      <h2 className="mediumText mb-2">Select Product</h2>
      <div>
        <Select
          className="basic-single text-[#000]"
          classNamePrefix="select"
          defaultValue={productList[productList.indexOf(productId)]}
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
          defaultValue={productList[productList.indexOf(colorId)]}
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
          defaultValue={productList[productList.indexOf(sizeId)]}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={SIZE}
          onChange={e=>{
            setSizeId(e)
          }}
        />

        {submit && !sizeId && (
          <div className="text-red-500">Select size!</div>
        )}
      </div>
      <div>
        <h2 className="mediumText mt-4 mb-2">Product Thumbnail (Ratio 350*400)</h2>
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
  backgroundColor:"white"
};
