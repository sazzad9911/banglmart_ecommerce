import { Button, Input, Td, Th, Tr } from "@chakra-ui/react";
import { Loader } from "App";
import { postApi } from "api/api";
import { getApi } from "api/api";
import { url } from "api/authApi";
import FloatButton from "components/floatButton";
import Pagination from "layouts/pagination";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineUpload,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "reducers/isLoading";
import Swal from "sweetalert2";
import AddFlashProduct from "./AddProduct";
import { deleteApi } from "api/api";

export default function Flash() {
  const { flashSell, user,isLoading } = useSelector((state) => state);
  const [picture, setPicture] = useState();
  const [productList, setProductList] = useState();
  const [submit, setSubmit] = useState(false);
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();
  const [title, setTitle] = useState();
  const dispatch = useDispatch();
  const [addClick, setAddClick] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getApi(
        `/product/get/flash/product?flashSellId=${flashSell[0].id}`
      );
      setProductList(res.data.data);
    };
    if (flashSell && flashSell.length > 0) {
      fetch();
      setStartAt(moment(flashSell[0].startAt).format("YYYY-MM-DD"));
      setEndAt(moment(flashSell[0].endAt).format("YYYY-MM-DD"));
      setTitle(flashSell[0].title);
      setPicture(`${url}${flashSell[0].banner}`);
    }else{
      setProductList([])
    }
  }, [flashSell,isLoading]);
  const start = async () => {
    if (!picture || !title || !startAt || !endAt) {
      return Swal.fire("Ops!", "All fields are required!", "info");
    }
    if (startAt > endAt) {
      return Swal.fire("Ops!", "Date are invalid", "info");
    }
    dispatch(setLoading(true));
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("startAt", startAt.toString());
      form.append("endAt", endAt.toString());
      picture?.name && form.append("banner", picture);
      flashSell &&
        flashSell.length > 0 &&
        form.append("flashSellId", flashSell[0].id);
      await postApi("/product/create/flash", form, user.token);
      dispatch(setLoading(false));
      Swal.fire("Success!", "Campaign started successfully", "success");
    } catch (e) {
      dispatch(setLoading(false));
      Swal.fire("Ops!", "Something went wrong", "error");
    }
  };
  if (!flashSell) {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (addClick) {
    return (
      <AddFlashProduct data={addClick} onClose={() => setAddClick(null)} />
    );
  }

  return (
    <div className="p-4 ">
      {flashSell && !submit && flashSell.length == 0 ? (
        <div className="mt-[200px] grid items-center justify-center">
          <p className="headLine mb-4 w-full">No Campaign Started!</p>
          <Button onClick={() => setSubmit(true)} colorScheme="cyan">
            Start Campaign
          </Button>
        </div>
      ) : (
        <div className="gap-4 lg:grid lg:grid-cols-2">
          <div>
            <div className="grid h-[300px] w-full items-center justify-center border">
              {picture ? (
                <div>
                  <img
                    crossOrigin="anonymous"
                    className="h-[300px] w-full"
                    src={
                      !picture?.name ? picture : URL.createObjectURL(picture)
                    }
                  />
                </div>
              ) : (
                <div>
                  <Input
                    onChange={(e) =>
                      setPicture(e.target.files[e.target.files.length - 1])
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
              {picture && (
                <AiOutlineClose
                  onClick={() => setPicture(null)}
                  size={30}
                  className=" absolute  top-[120px] bg-blueSecondary text-white"
                />
              )}
            </div>
            <div className="text-center">Recommended File Size 1200*400 px</div>
            <div className="mediumText mt-4 mb-2">Give Title</div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={style}
              placeholder={"Title"}
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="mediumText mb-2">Start Time</div>
                <Input
                  value={startAt}
                  onChange={(e) => setStartAt(e.target.value)}
                  style={style}
                  type="date"
                />
              </div>
              <div>
                <div className="mediumText mb-2">Start Time</div>
                <Input
                  value={endAt}
                  onChange={(e) => setEndAt(e.target.value)}
                  style={style}
                  type="date"
                />
              </div>
            </div>
            <Button
              className="mt-6 w-full"
              onClick={start}
              colorScheme={
                title && picture && startAt && endAt ? "cyan" : "blackAlpha"
              }
            >
              {flashSell?.length > 0 ? "Update Campaign" : "Stat Selling"}
            </Button>
          </div>
          <div>
            {productList ? (
              <Pagination
                data={productList}
                itemsPerPage={7}
                head={
                  <Tr>
                    <Th>No</Th>
                    <Th>Thumbnail</Th>
                    <Th>Offer</Th>
                    <Th>Total</Th>
                    <Th>Edit</Th>
                  </Tr>
                }
                ROW={(e) => {
                  return (
                    <Tr>
                      <Td>{e.index + 1}</Td>
                      <Td>
                        <img
                          className="h-8 w-8"
                          crossOrigin="anonymous"
                          src={`${url}${e.data.product.thumbnail}`}
                        />
                      </Td>
                      <Td>{e.data.offer}{e.data.percentage?"%":"BDT"}</Td>
                      <Td>{e.data.quantity}</Td>
                      <Td className="text-[#da4646]">
                        <Button
                          onClick={() => {
                            dispatch(setLoading(true));
                            deleteApi(
                              `/product/delete/flash/product?productId=${e.data.id}`,
                              user.token
                            )
                              .then((res) => {
                                Swal.fire(
                                  "Success",
                                  "Product deleted successfully",
                                  "success"
                                );
                                dispatch(setLoading(false));
                              })
                              .catch((e) => {
                                Swal.fire(
                                  "Ops!",
                                  "Some thing went wrong",
                                  "error"
                                );
                                dispatch(setLoading(false));
                              });
                          }}
                        >
                          <AiFillDelete color="#F00" size={30} />
                        </Button>
                      </Td>
                    </Tr>
                  );
                }}
              />
            ) : (
              <div className="my-6 grid w-full justify-center">
                <Loader />
              </div>
            )}
          </div>
         {flashSell?.length>0&&( <FloatButton onClick={() => setAddClick(flashSell[0])} />)}
        </div>
      )}
    </div>
  );
}
const style = {
  borderColor: "#D0D0D0",
  backgroundColor: "white",
};
