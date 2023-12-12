import FloatButton from "components/floatButton";
import CardPagination from "layouts/pagination/CardPagination";
import React, { useEffect, useState } from "react";
import CodeCard from "./CodeCard";
import UserCard from "./UserCard";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select as S,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { setLoading } from "reducers/isLoading";
import { postApi } from "api/api";
import Swal from "sweetalert2";
import { getApi } from "api/api";
import NoData from "components/NoData";
import { deleteApi } from "api/api";
import Select from "react-select";

export default function CouponCode() {
  const [selectCard, setSelectCard] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [codeList, setCodeList] = useState();
  const [userList, setUserList] = useState();
  const [price, setPrice] = useState();
  const [percentage, setPercentage] = useState(false);
  const [code, setCode] = useState();
  const dispatch = useDispatch();
  const alert = useAlert();
  const user = useSelector((state) => state.user);
  const [submit, setSubmit] = useState(false);
  const [change, setChange] = useState();
  const product = useSelector((state) => state.product);
  const [selectedUser, setSelectedUser] = useState();

  const addFlashAds = () => {
    if (!price || !code||!selectedUser) {
      setSubmit(true);
      return alert.info("Please select price, users and code");
    }
    dispatch(setLoading(true));
    let arr=[]
    selectedUser.map((d)=>{
      arr.push(d.value)
    })
    postApi(
      `/codes/create-coupon-code`,
      {
        offer: price,
        code: code,
        percentage: percentage ? "sd" : undefined,
        productIDs:arr
      },
      user.token
    )
      .then((res) => {
        setPrice("");
        setCode("");
        setChange(res.data);
        //setFlashImage();
        //setFlashId();
        onClose();
        dispatch(setLoading(false));
        Swal.fire("Saved!", "", "success");
      })
      .catch((e) => {
        onClose();
        dispatch(setLoading(false));
        Swal.fire(e.response.data.message, "", "info");
      });
  };
  useEffect(() => {
    dispatch(setLoading(true));
    getApi("/codes/get-coupon-code", user.token)
      .then((res) => {
        setCodeList(res.data.data);
        //console.log(res.data.data);
        res.data.data?.length > 0? setSelectCard(res.data.data[0]):setSelectCard();
        dispatch(setLoading(false));
      })
      .catch((e) => {
        console.error(e.message);
        dispatch(setLoading(false));
      });
  }, [change]);
  useEffect(() => {
    setUserList([]);
    product?.data?.map((doc) => {
      setUserList((v) => [...v, { label: doc.title, value: doc.id }]);
    });
  }, [product]);

  return (
    <div className="gap-4 lg:grid lg:grid-cols-2 ">
      <div>
        <p className=" headLine">Code List</p>
        <CardPagination
          data={codeList}
          itemsPerPage={9}
          ROW={(d) => (
            <CodeCard
              onDelete={() => {
                Swal.fire({
                  title: "Do you want to delete the item?",
                  showCancelButton: true,
                  confirmButtonText: "Ok",
                  denyButtonText: `Don't save`,
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    dispatch(setLoading(true));
                    deleteApi(
                      `/codes/delete-coupon-code?couponCodeId=${d.data.id}`,
                      user.token
                    )
                      .then((res) => {
                        dispatch(setLoading(false));
                        setChange(res.data);
                        Swal.fire("Deleted!", "", "success");
                      })
                      .catch((e) => {
                        dispatch(setLoading(false));
                        Swal.fire(e.response.data.message, "", "info");
                      });
                  }
                });
              }}
              data={d.data}
              date={d.data.date}
              code={d.data.code}
              onClick={() => setSelectCard(d.data)}
              key={d.index}
              selected={d.data.id === selectCard?.id}
            />
          )}
        />
        {codeList?.length === 0 && <NoData />}
      </div>
      <div>
        <p className=" headLine">User List</p>
        <CardPagination
          data={selectCard?.users}
          itemsPerPage={9}
          ROW={(d) => (
            <UserCard
              data={d.data}
              //onClick={() => setSelectCard(d.data)}
              key={d.index}
              //select={true}
            />
          )}
        />
        {(selectCard?.users?.length === 0||!selectCard) && <NoData />}
      </div>
      <FloatButton onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Coupon Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              isMulti
              value={selectedUser}
              name="Product"
              placeholder="Select some products"
              options={userList}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => {
               // console.log(e);
                setSelectedUser(e);
              }}
            />
            <InputGroup className="mt-4">
              <Input
                isInvalid={submit && !price}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={style}
                type="number"
                
                placeholder="Offer Price"
              />
              <InputRightElement
                style={{
                  width: 150,
                }}
              >
                <S
                  value={percentage ? "Percentage" : "BDT"}
                  onChange={(e) =>
                    setPercentage(
                      e.target.value === "Percentage" ? true : false
                    )
                  }
                  placeholder="BDT"
                >
                  <option value="Percentage">Percentage</option>
                </S>
              </InputRightElement>
            </InputGroup>
            <Input
              isInvalid={submit && !code}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={style}
              type="text"
              placeholder="Unique Code"
              className="mt-4"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addFlashAds}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
const style = {
  borderColor: "#D0D0D0",
  backgroundColor: "white",
  color: "black",
};
