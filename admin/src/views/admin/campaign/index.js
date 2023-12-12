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
import { deleteApi } from "api/api";
import { setChange } from "reducers/change";
import { putApi } from "api/api";
import { useLocation, useNavigate } from "react-router-dom";

export default function Campaign() {
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.isLoading);
  const [productList, setProductList] = useState();
  const [productListRecent, setProductListRecent] = useState();
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const [addClick, setAddClick] = useState();
  const [click,setClick]=useState()
  const navigate=useNavigate()
  const location=useLocation()

  useEffect(() => {
    const fetch = async () => {
      const res = await getApi(`/campaign/upcoming`);
      setProductList(res.data.data);
      const {data} = await getApi(`/campaign/current`);
      setProductListRecent(data.data)
      data.data.length>0?setClick(data.data[0]):res.data.data.length>0?setClick(res.data.data[0]):setClick()
    };
    fetch();
  }, [ ]);
  const start = async () => {
    if (!click.durationMonth ||!click?.startAt || !click?.endAt) {
      return Swal.fire("Ops!", "All fields are required!", "info");
    }
    if (click.startAt > click.endAt) {
      return Swal.fire("Ops!", "Date are invalid", "info");
    }
    dispatch(setLoading(true));
    try {
      const form = new FormData();
      click?.durationMonth&& form.append("month", click?.durationMonth);
      form.append("startAt", click.startAt.toString());
      form.append("endAt", click.endAt.toString());
      click.image?.name && form.append("image", click.image);
      const res = await putApi(`/campaign/update/${click.id}`, form, user.token);
      dispatch(setLoading(false));
      //console.log(res.data.data);
      setClick(res.data.data)
      Swal.fire("Success!", "Campaign updated successfully", "success");
    } catch (e) {
      console.log(e.response.data.message);
      dispatch(setLoading(false));
      Swal.fire("Ops!", "Something went wrong", "error");
    }
  };
  if (!productList||!productListRecent) {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }
 

  return (
    <div className="p-4 dark:text-white">
      {!click ? (
        <div className="mt-[200px] grid items-center justify-center">
          <p className="headLine mb-4 w-full">No Campaign Started!</p>
          <Button onClick={() => navigate(`${location.pathname}/new/${click.id}`)} colorScheme="cyan">
            Start a Campaign
          </Button>
        </div>
      ) : (
        <div className="gap-4 lg:grid lg:grid-cols-2">
          <div>
            <div className="grid h-[300px] w-full items-center justify-center border">
              {click?.image ? (
                <div>
                  <img
                    crossOrigin="anonymous"
                    className="h-[300px] w-full"
                    src={
                      !click?.image?.name ? `${url}${click?.image}` : URL.createObjectURL(click?.image)
                    }
                    alt={"df"}
                  />
                </div>
              ) : (
                <div>
                  <Input
                    onChange={(e) =>
                      setClick({...click,image:e.target.files[e.target.files.length - 1]})
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
                    
                    setClick({...click,image:null})
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
              onChange={(e) => setClick({...click,durationMonth:e.target.value})}
              style={style}
              type="number"
              placeholder={"Duration"}
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="mediumText mb-2">Start Time</div>
                <Input
                  value={moment(click?.startAt).format("YYYY-MM-DD")}
                  onChange={(e) => setClick({...click,startAt:e.target.value})}
                  style={style}
                  type="date"
                />
              </div>
              <div>
                <div className="mediumText mb-2">End Time</div>
                <Input
                  value={moment(click?.endAt).format("YYYY-MM-DD")}
                  onChange={(e) => setClick({...click,endAt:e.target.value})}
                  style={style}
                  type="date"
                />
              </div>
            </div>
            <Button
              className="mt-6 w-full"
              onClick={user.user.role === 4 ? start : null}
              colorScheme={
                click && user.user.role === 4
                  ? "cyan"
                  : "blackAlpha"
              }
            >
              {click ? "Update Campaign" : "Stat Selling"}
            </Button>
            <Button
              className="mt-6 w-full"
              onClick={()=>navigate(`${location.pathname}/${click.id}`)}
              colorScheme={
                click 
                  ? "facebook"
                  : "blackAlpha"
              }
            >
              Campaign Product List
            </Button>
          </div>
          <div >
            <div>
              <div className="mb-3 text-xl">Current Campaign</div>
              {productListRecent ? (
                <Pagination
                  data={productListRecent}
                  itemsPerPage={2}
                  head={
                    <Tr>
                      <Th>No</Th>
                      <Th>Thumbnail</Th>
                      <Th>Duration</Th>
                      <Th>Start Time & End Time</Th>
                      <Th>Delete</Th>
                    </Tr>
                  }
                  ROW={(e) => {
                    return (
                      <Tr onClick={()=>setClick(e.data)} className={`${e.data.id===click?.id&&"bg-gray-400"}`}>
                        <Td>{e.index + 1}</Td>
                        <Td>
                          <img
                            className="h-8 w-8"
                            crossOrigin="anonymous"
                            alt="edf"
                            src={`${url}${e.data.image}`}
                          />
                        </Td>
                        <Td>{e.data.durationMonth} Month</Td>
                        <Td>
                          {new Date(e.data.startAt).toDateString()} -{" "}
                          {new Date(e.data.endAt).toDateString()}
                        </Td>
                        <Td className="text-[#da4646]">
                          <Button
                            onClick={() => {
                              dispatch(setLoading(true));
                              deleteApi(
                                `/campaign/delete/${e.data.id}`,
                                user.token
                              )
                                .then((res) => {
                                  Swal.fire(
                                    "Success",
                                    "Campaign deleted successfully",
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
            <div className="mt-4">
              <div className="mb-3 text-xl">Upcoming Campaign</div>
              {productList ? (
                <Pagination
                  data={productList}
                  itemsPerPage={4}
                  head={
                    <Tr>
                      <Th>No</Th>
                      <Th>Thumbnail</Th>
                      <Th>Duration</Th>
                      <Th>Start Time & End Time</Th>
                      <Th>Delete</Th>
                    </Tr>
                  }
                  ROW={(e) => {
                    return (
                      <Tr onClick={()=>setClick(e.data)} className={`${e.data.id===click?.id&&"bg-gray-400"}`}>
                        <Td>{e.index + 1}</Td>
                        <Td>
                          <img
                            className="h-8 w-8"
                            crossOrigin="anonymous"
                            alt="edf"
                            src={`${url}${e.data.image}`}
                          />
                        </Td>
                        <Td>{e.data.durationMonth} Month</Td>
                        <Td>
                          {new Date(e.data.startAt).toDateString()} -{" "}
                          {new Date(e.data.endAt).toDateString()}
                        </Td>
                        <Td className="text-[#da4646]">
                          <Button
                            onClick={() => {
                              dispatch(setLoading(true));
                              deleteApi(
                                `/campaign/delete/${e.data.id}`,
                                user.token
                              )
                                .then((res) => {
                                  Swal.fire(
                                    "Success",
                                    "Campaign deleted successfully",
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
          </div>
          {click&&user.user.role === 4 && (
            <FloatButton onClick={() =>navigate(`${location.pathname}/new/${click.id}`) } />
          )}
           
        </div>
      )}
    </div>
  );
}
const style = {
  borderColor: "#D0D0D0",
  backgroundColor: "white",
  color: "#000",
};
