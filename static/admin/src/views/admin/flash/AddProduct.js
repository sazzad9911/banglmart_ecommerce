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
import { postApi } from "api/api";

export default function AddFlashProduct({
  onClose,
  addProducts,
  colors,
  size,
  data,
}) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [submit, setSubmit] = useState(false);
  const [productList, setProductList] = useState([]);
  const product = useSelector((state) => state.product);
  const [productId, setProductId] = useState();
  const [select, setSelect] = useState("Fixed");
  const [price, setPrice] = useState();
  const [min, setMin] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [free,setFree]=useState(false)

  useEffect(() => {
    if (product) {
      product?.data?.map((doc) => {
        setProductList((val) => [...val, { value: doc.id, label: doc.title }]);
      });
    }
  }, []);

  const addNewProduct = async () => {
    if (!productId || !price) {
      return setSubmit(true);
    }

    dispatch(setLoading(true));
    try {
      await postApi(
        "/product/create/flash/product",
        {
          flashSellId: data.id,
          productId: productId.value,
          offer:price,
          percentage:select==="Fixed"?undefined:"edfwd",
          minSell:min,
          quantity:quantity,
          deliveryFree:free?"ewewe":undefined,
        },
        user.token
      )
      onClose();
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
      <Header onClick={onClose} title={"Product Flash Sell"} />
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="mediumText mt-4 mb-2">Minimum Order</h2>
          <div>
            <Input
              type="number"
              isInvalid={submit && !min}
              value={min}
              onChange={(e) => setMin(e.target.value)}
              style={style}
              placeholder="eg. 10"
            />

            {submit && !min && (
              <div className="text-red-500">Select Minimum Order</div>
            )}
          </div>
        </div>
        <div>
          <h2 className="mediumText mt-4 mb-2">Total Product</h2>
          <div>
            <Input
              type="number"
              isInvalid={submit && !quantity}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={style}
              placeholder="eg. 10"
            />

            {submit && !quantity && (
              <div className="text-red-500">Select Total Product!</div>
            )}
          </div>
        </div>
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
              width: 150,
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
      <div className="my-6 flex items-center">
        <div className="mediumText mr-10">Delivery Free </div>
        <Switch size={"lg"} isChecked={free} onChange={()=>setFree(e=>(!e))}/>
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
