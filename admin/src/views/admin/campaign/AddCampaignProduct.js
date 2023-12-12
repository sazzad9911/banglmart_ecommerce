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
import { postApi } from "api/api";
import { setChange } from "reducers/change";
import { useNavigate, useParams } from "react-router-dom";

export default function AddCampaignProduct() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [submit, setSubmit] = useState(false);
  const [productList, setProductList] = useState([]);
  const product = useSelector((state) => state.product);
 
  const [values, setValues] = useState({
    productId: null,
    minOrder: 1,
    total: 1,
    offer: 0,
    percentage: "fixed",
    freeDelivery: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      product?.data?.map((doc) => {
        setProductList((val) => [...val, { value: doc.id, label: doc.title }]);
      });
    }
  }, []);

  const addNewProduct = async () => {
    if (!values.productId || !values.offer||!values.offer) {
      return;
    }
   
    dispatch(setLoading(true));
    try {
      const res = await postApi(
        "/campaign/storeCampaign",
        {
          offer: values.offer,
          percentage: values.percentage=="percentage"?"fasf":undefined,
          total: values.total,
          campaignId: id,
          productId: values.productId,
          freeDelivery: values.freeDelivery ? "gft" : undefined,
          minOrder:values.minOrder
        },
        user.token
      );
      navigate(-1);
      dispatch(setChange(res));
      dispatch(setLoading(false));
      //addProducts();
      Swal.fire("Success", "Product added successful", "success");
    } catch (e) {
      // onClose();
      
      dispatch(setLoading(false));
      Swal.fire("Ops!", e.response.data.message, "error");
    }
  };
  return (
    <div className="dark:text-[#fff]">
      <Header onClick={() => navigate(-1)} title={"Campaign Product"} />
      <h2 className="mediumText mb-2">Select Product</h2>
      <div>
        <Select
          className="basic-single text-[#000]"
          classNamePrefix="select"
          defaultValue={values.productId}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={productList}
          onChange={v=>setValues({...values,productId:v.value})}
        />

      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="mediumText mt-4 mb-2">Minimum Order</h2>
          <div>
            <Input
              type="number"
             
              value={values.minOrder}
              onChange={(e) => setValues({...values,minOrder:e.target.value})}
              style={style}
              placeholder="eg. 10"
            />
          </div>
        </div>
        <div>
          <h2 className="mediumText mt-4 mb-2">Total Product</h2>
          <div>
            <Input
              type="number"
              value={values.total}
              onChange={(e) => setValues({...values,total:e.target.value})}
              style={style}
              placeholder="eg. 10"
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="mediumText mb-2 mt-4">Discount Price</h2>
        <InputGroup>
          <Input
            value={values.offer}
            onChange={(e) => setValues({...values,offer:e.target.value})}
            style={style}
            type="number"
            placeholder="Discount price"
          />
          <InputRightElement
            style={{
              width: 150,
            }}
          >
            <S value={values.percentage} onChange={(e) => setValues({...values,percentage:e.target.value})}>
              <option value={"fixed"}>Fixed</option>
              <option value={"percentage"}>Percentage %</option>
            </S>
          </InputRightElement>
        </InputGroup>
       
      </div>
      <div className="my-6 flex items-center">
        <div className="mediumText mr-10">Delivery Free </div>
        <Switch
          size={"lg"}
          isChecked={values.freeDelivery}
          onChange={() => setValues({...values,freeDelivery:!values.freeDelivery})}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={addNewProduct} colorScheme={
            values.offer&&values.productId&&values.offer?"blue":"blackAlpha"
        }>
          Save
        </Button>
        <Button onClick={() => navigate(-1)} className="ml-4" colorScheme="red">
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
