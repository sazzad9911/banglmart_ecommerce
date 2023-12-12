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
import { useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";
import moment from "moment";
import { url } from "api/authApi";

export default function AddCampaign() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const [click, setClick] = useState({
    image: null,
    startAt: null,
    endAt: null,
    durationMonth: 1,
  });


  const addNewProduct = async () => {
    if (
      !click.image ||
      !click.startAt ||
      !click.endAt ||
      !click.durationMonth
    ) {
      return;
    }
    if (click.startAt > click.endAt) {
      return Swal.fire("Ops!", "Date are invalid", "info");
    }
    const form = new FormData();
    form.append("image", click.image);
    form.append("startAt", click.startAt);
    form.append("endAt", click.endAt);
    form.append("month", click.durationMonth);
    dispatch(setLoading(true));
    try {
      const res = await postApi("/campaign/create", form, user.token);
      navigate(-1);
      dispatch(setChange(res));
      dispatch(setLoading(false));
      //addProducts();
      Swal.fire("Success", "Product added successful", "success");
    } catch (e) {
      // onClose();
      console.log(e.response.data.message);
      dispatch(setLoading(false));
      Swal.fire("Ops!", "Something went wrong", "error");
    }
  };
  return (
    <div className="dark:text-[#fff]">
      <Header onClick={() => navigate(-1)} title={"Start Campaign"} />
      <div>
        <div className="grid h-[300px] w-full items-center justify-center border">
          {click?.image ? (
            <div>
              <img
                crossOrigin="anonymous"
                className="h-[300px] w-full"
                src={
                  !click?.image?.name
                    ? `${url}${click?.image}`
                    : URL.createObjectURL(click?.image)
                }
                alt={"df"}
              />
            </div>
          ) : (
            <div>
              <Input
                onChange={(e) =>
                  setClick({
                    ...click,
                    image: e.target.files[e.target.files.length - 1],
                  })
                }
                id="pickImage"
                className="hidden"
                type="file"
              />
              <Button
                onClick={() => {
                  document.getElementById("pickImage").click();
                }}
              >
                <AiOutlineUpload color="blue" size={50} />
              </Button>
            </div>
          )}
          {click?.image && (
            <AiOutlineClose
              onClick={() => {
                setClick({ ...click, image: null });
              }}
              size={30}
              className=" absolute  top-[120px] bg-blueSecondary text-white"
            />
          )}
        </div>
        <div className="text-center">Recommended File Size 800*400 px</div>
        <div className="mediumText mt-4 mb-2">Duration in Month</div>
        <Input
          value={click?.durationMonth?.toString()}
          onChange={(e) =>
            setClick({ ...click, durationMonth: e.target.value })
          }
          style={style}
          type="number"
          placeholder={"Duration"}
        />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <div className="mediumText mb-2">Start Time</div>
            <Input
              value={moment(click?.startAt).format("YYYY-MM-DD")}
              onChange={(e) => setClick({ ...click, startAt: e.target.value })}
              style={style}
              type="date"
            />
          </div>
          <div>
            <div className="mediumText mb-2">End Time</div>
            <Input
              value={moment(click?.endAt).format("YYYY-MM-DD")}
              onChange={(e) => setClick({ ...click, endAt: e.target.value })}
              style={style}
              type="date"
            />
          </div>
        </div>
        <Button
          className="mt-6 w-full"
          onClick={addNewProduct}
          colorScheme={
            click.image && click.startAt && click.endAt && click.durationMonth
              ? "cyan"
              : "blackAlpha"
          }
        >
          Add Campaign
        </Button>
      </div>
    </div>
  );
}
const style = {
  borderColor: "#D0D0D0",
  backgroundColor: "white",
};
