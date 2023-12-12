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
  Select as S,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useAlert } from "react-alert";
import { setLoading } from "reducers/isLoading";
import { addProduct } from "api/productApi";
import Header from "components/headers";
import Select from "react-select";
import { addVariantApi } from "api/productApi";
import { updateQuantityApi } from "api/productApi";
import { setChange } from "reducers/change";

export default function AddQuantity({data, onClose, addProducts, colors, size }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [submit, setSubmit] = useState(false);
  const [total,setTotal]=useState(data.quantity)
  const [min,setMin]=useState(data.minOrder)



  const addNewProduct = async () => {
    if (!total || !min ) {
      return setSubmit(true);
    }

    dispatch(setLoading(true));
    try {
     const res= await updateQuantityApi({
        minOrder:min,
        quantity:total,
        productId:data.id
      }, user.token);
      onClose();
      dispatch(setChange(res));
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
      <Header onClick={onClose} title={data.title} />

      <h2 className="mediumText mt-10 mb-2">Total Product</h2>
      <div>
        <Input
          isInvalid={submit && !total}
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          style={style}
          type="number"
          placeholder="eg. 100"
        />

        {submit && !total && (
          <div className="text-red-500">Total product required!</div>
        )}
      </div>
      <h2 className="mediumText mt-4 mb-2">Minimum Order</h2>
      <div>
        <Input
          isInvalid={submit && !min}
          value={min}
          onChange={(e) => setMin(e.target.value)}
          style={style}
          type="number"
          placeholder="eg. 100"
        />

        {submit && !min && (
          <div className="text-red-500">Minimum Orde required!</div>
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
