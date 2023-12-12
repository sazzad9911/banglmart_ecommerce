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
  Switch,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useAlert } from "react-alert";
import { setLoading } from "reducers/isLoading";
import { addProduct } from "api/productApi";
import Header from "components/headers";
import Select from "react-select";
import { addVariantApi } from "api/productApi";
import { addOffersApi } from "api/productApi";
import { setChange } from "reducers/change";

export default function AddOffer({ data, onClose, addProducts, colors, size }) {
  const [picture, setPicture] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [submit, setSubmit] = useState(false);
  const [productList, setProductList] = useState([]);
  const product = useSelector((state) => state.product);
  const [productId, setProductId] = useState(data.id);
  const [select, setSelect] = useState(
    data.offers.length > 0 && data.offers[0].percentage ? "Percentage" : "Fixed"
  );
  const [price, setPrice] = useState(
    data.offers.length > 0 ? data.offers[0].money : ""
  );
  const [title, setTitle] = useState(
    data.offers.length > 0 ? data.offers[0].name : ""
  );
  const [free, setFree] = useState(
    data.offers.length > 0 ? data.offers[0].deliveryFree : false
  );

  useEffect(() => {
    if (product) {
      product?.data?.map((doc) => {
        setProductList((val) => [...val, { value: doc.id, label: doc.title }]);
      });
    }
  }, []);

  const addNewProduct = async () => {
    if (!productId || !title || !price) {
      return setSubmit(true);
    }

    dispatch(setLoading(true));
    try {
      const res = await addOffersApi(
        {
          type: data.offers?.length > 0 ? data.id : undefined,
          name: title,
          money: price,
          percentage: select === "Fixed" ? undefined : price,
          productId: productId,
          deliveryFree: free ? "ssfsf" : undefined,
        },
        user.token
      );
      onClose();
      dispatch(setChange(res));
      dispatch(setLoading(false));
      //addProducts();
      Swal.fire("Success", "Offer added successful", "success");
    } catch (e) {
      // onClose();
      dispatch(setLoading(false));
      Swal.fire("Ops!", "Something went wrong", "error");
    }
  };
  return (
    <div className="dark:text-[#fff]">
      <Header onClick={onClose} title={data?.title} />

      <h2 className="mediumText mt-6 mb-2">Offer title</h2>
      <div>
        <Input
          isInvalid={submit && !title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={style}
          placeholder="Offer Title"
        />

        {submit && !title && <div className="text-red-500">Select color!</div>}
      </div>
      <div>
        <h2 className="mediumText mb-2 mt-4">Discount Price</h2>
        <InputGroup>
          <Input
            isInvalid={submit && !price}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={style}
            type="number"
            placeholder="Discount price"
          />
          <InputRightElement
            style={{
              width: 200,
            }}
          >
            <S value={select} onChange={(e) => setSelect(e.target.value)}>
              <option value="Fixed">Fixed</option>
              <option value="Percentage">Percentage %</option>
            </S>
          </InputRightElement>
        </InputGroup>
        {submit && !price && (
          <div className="text-red-500">Product price is required!</div>
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
