import React, { useEffect, useState } from "react";
import PieChartAds from "./PieChart";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Pagination from "layouts/pagination";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { url } from "api/authApi";
import { deleteApi } from "api/api";
import { setLoading } from "reducers/isLoading";
import { setChange } from "reducers/change";
import Swal from "sweetalert2";
import Select from "react-select";
import { useAlert } from "react-alert";
import { putApi } from "api/api";
import { postApi } from "api/api";

export default function ManageAdds() {
  const [bannerList, setBannerList] = useState([]);
  const allAds = useSelector((state) => state.allAds);
  const allSlider = useSelector((state) => state.allSlider);
  const product = useSelector((state) => state.product);
  const allBanner = useSelector((state) => state.allBanner);
  const dispatch = useDispatch();
  const [adsValue, setAdsValue] = useState();
  const [products, setProducts] = useState([]);
  const [bannerFile, setBannerFile] = useState();
  const [selectBanner, setSelectBanner] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editBannerId, setEditBannerId] = useState();
  const alert = useAlert();
  //flash
  const [flashTitle, setFlashTitle] = useState();
  const [flashImage, setFlashImage] = useState();
  const [flashId, setFlashId] = useState();
  //slider
  const [sliderTitle, setSliderTitle] = useState();
  const [sliderImage, setSliderImage] = useState();
  const [sliderId, setSliderId] = useState();

  useEffect(() => {
    setProducts([]);
    product?.data?.map((doc) => {
      setProducts((v) => [...v, { label: doc.title, value: doc.id }]);
    });
  }, [product]);

  const addFlashAds = () => {
    if (!flashTitle || !flashImage || !flashId) {
      return alert.info("Please select image, product and title");
    }
    dispatch(setLoading(true));
    const f = new FormData();
    f.append("title", flashTitle);
    f.append("productId", flashId.value);
    f.append("image", flashImage);
    postApi(`/adds/create`, f)
      .then((res) => {
        //setFlashTitle();
        //setFlashImage();
        //setFlashId();
        dispatch(setLoading(false));
        dispatch(setChange(res.data));
        Swal.fire("Saved!", "", "success");
      })
      .catch((e) => {
        dispatch(setLoading(false));
        Swal.fire(e.response.data.message, "", "info");
      });
  };
  const addSlider = () => {
    if (!sliderTitle || !sliderImage || !sliderId) {
      return alert.info("Please select image, product and title");
    }
    dispatch(setLoading(true));
    const f = new FormData();
    f.append("title", sliderTitle);
    f.append("productId", sliderId.value);
    f.append("image", sliderImage);
    postApi(`/adds/create/slider`, f)
      .then((res) => {
        //setSliderTitle();
        //setSliderImage();
        //setSliderId();
        dispatch(setLoading(false));
        dispatch(setChange(res.data));
        Swal.fire("Saved!", "", "success");
      })
      .catch((e) => {
        dispatch(setLoading(false));
        Swal.fire(e.response.data.message, "", "info");
      });
  };
  return (
    <div className=" p-4 dark:text-white ">
      <div className="gap-4  lg:grid lg:grid-cols-2">
        <PieChartAds />
        <div>
          <p className="mediumText mb-4">Landing Page Banner List</p>
          <Pagination
            data={allBanner}
            itemsPerPage={3}
            head={
              <Tr>
                <Th>No</Th>
                <Th>Image</Th>
                <Th>Title</Th>
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
                      crossOrigin={"anonymous"}
                      alt={e.data.title}
                      src={`${url}${e.data.image}`}
                    />
                  </Td>
                  <Td>{e.data.title}</Td>
                  <Td className="text-[#da4646]">
                    <Button
                      onClick={() => {
                        setEditBannerId(e.data.id);
                        return onOpen();
                      }}
                    >
                      <AiOutlineEdit color="#868CFF" size={30} />
                    </Button>
                  </Td>
                </Tr>
              );
            }}
          />
          <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Banner</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  onChange={(e) => setBannerFile(e.currentTarget.files[0])}
                  accept=".png, .jpg, .jpeg"
                  style={style}
                  type="file"
                />
                <p>*Image size between 1300*500 recommended</p>
                <div className="mt-4 text-[#000]">
                  <Select
                    value={selectBanner}
                    name="colors"
                    options={products}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      // console.log(e);
                      setSelectBanner(e);
                    }}
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    if (!bannerFile || !selectBanner || !editBannerId) {
                      setBannerFile();
                      onClose();
                      return alert.info(
                        "Please select image, product and banner"
                      );
                    }
                    dispatch(setLoading(true));
                    const f = new FormData();
                    f.append("productId", selectBanner?.value);
                    f.append("bannerId", editBannerId);
                    f.append("image", bannerFile);
                    putApi(`/adds/update/banner`, f)
                      .then((res) => {
                        setBannerFile();
                        onClose();
                        dispatch(setLoading(false));
                        dispatch(setChange(res.data));
                        Swal.fire("Saved!", "", "success");
                      })
                      .catch((e) => {
                        setBannerFile();
                        onClose();
                        dispatch(setLoading(false));
                        Swal.fire(e.response.data.message, "", "info");
                      });
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className="mt-6 mb-4 gap-4  lg:grid lg:grid-cols-2">
        <div>
          <p className="mediumText mb-4">New Flash Ads</p>
          <Input
            onChange={(e) => setFlashImage(e.target.files[0])}
            accept=".png, .jpg, .jpeg"
            style={style}
            type="file"
          />
          <p>*Image size between 500*500 recommended</p>
          <Input
            value={flashTitle}
            onChange={(e) => setFlashTitle(e.target.value)}
            style={style}
            type="text"
            placeholder="Enter title"
            className="mt-4"
          />
          <div className="mt-4 text-[#000]">
            <Select
              value={flashId}
              name="colors"
              options={products}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => {
                setFlashId(e);
              }}
            />
          </div>

          <Button onClick={addFlashAds} className="mt-4" colorScheme="cyan">
            Add
          </Button>
        </div>

        <div>
          <p className="mediumText mb-4">Flash Ads List</p>
          <Pagination
            data={allAds}
            itemsPerPage={3}
            head={
              <Tr>
                <Th>No</Th>
                <Th>Image</Th>
                <Th>Updated At</Th>
                <Th>Delete</Th>
              </Tr>
            }
            ROW={(e) => {
              return (
                <Tr>
                  <Td>{e.index + 1}</Td>
                  <Td>
                    <img
                      className="h-8 w-8"
                      crossOrigin={"anonymous"}
                      alt={e.data.title}
                      src={`${url}${e.data.image}`}
                    />
                  </Td>
                  <Td>{new Date(e.data.date).toDateString()}</Td>
                  <Td className="text-[#da4646]">
                    <Button
                      onClick={() => {
                        Swal.fire({
                          title: "Do you want to delete the item?",
                          showCancelButton: true,
                          confirmButtonText: "Save",
                          denyButtonText: `Don't save`,
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            dispatch(setLoading(true));
                            deleteApi(`/adds/delete?adsId=${e.data.id}`)
                              .then((res) => {
                                dispatch(setLoading(false));
                                dispatch(setChange(res.data));
                                Swal.fire("Saved!", "", "success");
                              })
                              .catch((e) => {
                                dispatch(setLoading(false));
                                Swal.fire(e.response.data.message, "", "info");
                              });
                          }
                        });
                      }}
                    >
                      <AiOutlineDelete color="#868CFF" size={30} />
                    </Button>
                  </Td>
                </Tr>
              );
            }}
          />
        </div>
      </div>
      <div className="mt-6 mb-4 gap-4  lg:grid lg:grid-cols-2">
        <div>
          <p className="mediumText mb-4">New Slider Ads</p>
          <Input
            onChange={(e) => setSliderImage(e.target.files[0])}
            style={style}
            type="file"
          />
          <p>*Image size between 1300*500 recommended</p>
          <Input
            value={sliderTitle}
            onChange={(e) => setSliderTitle(e.target.value)}
            style={style}
            type="text"
            placeholder="Enter title"
            className="mt-4"
          />
          <div className="mt-4 text-[#000]">
            <Select
              value={sliderId}
              name="colors"
              options={products}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => {
                setSliderId(e);
              }}
            />
          </div>
          <Button onClick={addSlider} className="mt-4" colorScheme="cyan">
            Add
          </Button>
        </div>

        <div>
          <p className="mediumText mb-4">Slider Ads List</p>
          <Pagination
            data={allSlider}
            itemsPerPage={3}
            head={
              <Tr>
                <Th>No</Th>
                <Th>Image</Th>
                <Th>Updated At</Th>
                <Th>Delete</Th>
              </Tr>
            }
            ROW={(e) => {
              return (
                <Tr>
                  <Td>{e.index + 1}</Td>
                  <Td>
                    <img
                      className="h-8 w-8"
                      crossOrigin={"anonymous"}
                      alt={e.data.title}
                      src={`${url}${e.data.image}`}
                    />
                  </Td>
                  <Td>{new Date(e.data.date).toDateString()}</Td>
                  <Td className="text-[#da4646]">
                    <Button
                      onClick={() => {
                        Swal.fire({
                          title: "Do you want to delete the item?",
                          showCancelButton: true,
                          confirmButtonText: "Save",
                          denyButtonText: `Don't save`,
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            dispatch(setLoading(true));
                            deleteApi(
                              `/adds/delete/slider?sliderId=${e.data.id}`
                            )
                              .then((res) => {
                                dispatch(setLoading(false));
                                dispatch(setChange(res.data));
                                Swal.fire("Saved!", "", "success");
                              })
                              .catch((e) => {
                                dispatch(setLoading(false));
                                Swal.fire(e.response.data.message, "", "info");
                              });
                          }
                        });
                      }}
                    >
                      <AiOutlineDelete color="#868CFF" size={30} />
                    </Button>
                  </Td>
                </Tr>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
const style = {
  borderColor: "#D0D0D0",
  backgroundColor: "white",
  color:"black"
};
