import { useContext, useEffect, useRef, useState } from "react";
import {
  AiFillStar,
  AiOutlineLine,
  AiOutlinePlus,
  AiOutlineSend,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  CloseButton,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { BiSolidSend } from "react-icons/bi";
import { TbUserCheck, TbUserQuestion } from "react-icons/tb";
import Scrollbars from "react-custom-scrollbars";
import Rating from "react-rating";
import { MdAdd, MdOutlineDisabledByDefault, MdRemove } from "react-icons/md";
import Swal from "sweetalert2";
import { getApi, postApi } from "../../apis";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation } from "react-router";
import ReviewSection from "../../components/ReviewSection";
import { PiSmileySadLight } from "react-icons/pi";
import socket from "../../socket";
import ImageZoom from "react-image-zooom";
import logo from "../../logo.png"
const hostname="https://banglamartecommerce.com.bd"

const ProductDetails = () => {
  const { user, setCartUpdate, language } = useContext(AuthContext);

  const [messageShow, setMessageShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [product, setProductDetails] = useState(null);
  const [shopDetails, setShopDetails] = useState(null);
  // console.log(product);
  const url = "https://api.banglamartecommerce.com.bd";
  useEffect(() => {
    const visitorId = localStorage.getItem("visitorId");
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${url}/product/details?visitorId=${visitorId}&productId=${id}`
        );
        const data = await response.json();
        setProductDetails(data.data);
        if (data.data.brand != null) {
          const encodedData = encodeURIComponent(
            JSON.stringify(data.data.brand)
          );
          setShopDetails(encodedData);
        } else if (data.data.seller != null) {
          const encodedData = encodeURIComponent(
            JSON.stringify(data.data.seller)
          );

          setShopDetails(encodedData);
        }
      } catch (error) {
        console.error("Error fetching instructor classes:", error);
      }
    };

    fetchProductDetails();
  }, [id]);
  // console.log(product);
  // console.log(user);
  const [formData, setFormData] = useState("");
  const [allMessages, setAllMessages] = useState(null);
  const [conversation, setConversation] = useState(null);

  const sendMessage = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const from = new FormData();
    from.append("conversationId", conversation.id);
    from.append("message", formData);
    // from.append("image")
    from.append("receiverId", product.user.id);
    postApi("/message/send", from, token);
    setFormData("");
  };

  const handleMessageShow = () => {
    if (!user) {
      return navigate("/login");
    }
    const token = localStorage.getItem("token");
    postApi(
      "/message/create",
      {
        userId: product?.user?.id,
        productId: id,
      },
      token
    ).then((res) => {
      setMessageShow(!messageShow);
      const id = res.data.data.id;

      setConversation(res.data.data);
      getApi(`/message/chats?conversationId=${id}`, token).then((res) => {
        setAllMessages(res.data.data);
      });
    });
  };
  const handleAddMessage = (event) => {
    if (event.conversationId === conversation?.id) {
      setAllMessages((res) => [...res, event]);
    }
  };

  useEffect(() => {
    socket.on("message", (event) => {
      handleAddMessage(event, conversation);
    });
  }, [conversation]);

  const [minOrder, setQuantity] = useState(null);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    let actualAmount = product?.price;

    if (product?.percentage) {
      actualAmount -= (product?.offer / 100) * actualAmount;
    } else if (product?.offer > 0) {
      actualAmount -= product?.offer;
    }

    // if (product?.vat > 0) {
    //   actualAmount += (product?.vat / 100) * actualAmount;
    // }

    setTotalPrice(actualAmount);

    setQuantity(product?.minOrder);
  }, [product]);

  // calculation portion

  const handleIncrease = () => {
    const newQuantity = minOrder + 1;
    // const newPrice = newQuantity * totalPrice;
    setQuantity(newQuantity);
  };

  const handleDecrease = () => {
    if (minOrder > product?.minOrder) {
      const newQuantity = minOrder - 1;
      // const newPrice = newQuantity * totalPrice;
      setQuantity(newQuantity);
    }
  };
  const [codeId, setCodeId] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [color, setColor] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  const [selectedSize, setSelectedSize] = useState(null);
  const [size, setSize] = useState(null);
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  const [selectedSpecification, setSelectedSpecification] = useState(null);
  const [specification, setSpecification] = useState(null);
  const handleSpecificationChange = (specification) => {
    setSelectedSpecification(specification);
  };
  const isColorAvailable = product?.colors && product.colors.length > 0;
  const isSizeAvailable = product?.sizes && product.sizes.length > 0;
  const isSpecificationAvailable =
    product?.specifications && product.specifications.length > 0;

  const isColorSelected = !!color;
  const isSizeSelected = !!size;
  const isSpecificationSelected = !!specification;

  const isAddToCartEnabled =
    (!isColorAvailable || (isColorAvailable && isColorSelected)) &&
    (!isSizeAvailable || (isSizeAvailable && isSizeSelected)) &&
    (!isSpecificationAvailable ||
      (isSpecificationAvailable && isSpecificationSelected));

  // console.log(selectedSpecification);
  const handleAddToCart = () => {
    if (user) {
      if (isAddToCartEnabled) {
        const token = localStorage.getItem("token");
        postApi(
          "/cart/add",
          {
            productId: id,
            quantity: minOrder,
            codeId: codeId,
            offerPrice: offerPrice,
            colors: selectedColor,
            sizes: selectedSize,
            specifications: selectedSpecification,
          },
          token
        )
          .then((res) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Add to Cart successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            setCartUpdate(res.data);
          })
          .catch((error) => {
            console.log(error.response.data.message);
            // console.log(error);
          });
      } else {
        Swal.fire(
          "Please select Color, Size, Specification before adding to cart"
        );
      }
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  // const htmlContent = `<figure>
  //     <table>
  //       <tbody>
  //         ${product?.description}
  //       </tbody>
  //     </table>
  //   </figure>`;
  const htmlContent = `${product?.description}`;
  const [comment, setComment] = useState("");
  const [updateComment, setUpdateComment] = useState();
  const [getComment, setGetComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  // console.log(reviewsData);
  const handleSubmitComment = () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("message", comment);
    data.append("image", null);
    data.append("productId", id);

    const token = localStorage.getItem("token");
    postApi("/comment/create", data, token)
      .then((res) => {
        setComment("");
        setUpdateComment(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getApi(`/comment/get-by-product?productId=${id}`)
      .then((res) => {
        setGetComment(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, updateComment]);

  useEffect(() => {
    getApi(`/review/get-by-product?productId=${id}`)
      .then((res) => {
        setReviewsData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleOfferPriceChange = (e) => {
    setOfferPrice(e.target.value);
  };
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponOffer, setCouponOffer] = useState(null);

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleOfferPrice = () => {
    // console.log('function working...');
  };
  // console.log(id);
  const applyCouponCode = (e) => {
    e.preventDefault();
    setCouponLoading(true);
    const token = localStorage.getItem("token");
    getApi(
      `/codes/verify-coupon-code?code=${couponCode}&productId=${id}`,
      token
    )
      .then((res) => {
        setCodeId(res.data.code.id);
        res.data.code;
        setCouponOffer(res.data.code);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Coupon offer added to this product",
          showConfirmButton: false,
          timer: 1500,
        });
        handleAddToCart();
        setCouponLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Coupon code invalid",
          showConfirmButton: false,
          timer: 1000,
        });
        setCouponLoading(false);
      });
  };

  const scrollbarsRef = useRef();

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToBottom();
    }
  };

  // Scroll to the bottom when the component mounts
  useEffect(() => {
    scrollToBottom();
  }, []);

  // Scroll to the bottom whenever new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);
  //console.log(logo);

  const shareUrl = `https://banglamartecommerce.com.bd/productDetails/${id}`;
  if (product == null) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }
  return (
    <div className="container mx-auto mt-4">
      <Helmet>
        <title>{product?.title}</title>
        <meta name="title" content={product?.title}></meta>
        <meta name="keywords" content=""></meta>
        <meta
          name="msapplication-TileImage"
          content={hostname+logo}
        ></meta>

        <meta property="og:site_name" content="Banglamart E-commerce"></meta>
        <meta property="og:title" content={product?.title}></meta>
        {/* <meta
          property="og:description"
          content="The best photo studio for your events"
        /> */}

        <meta
          property="og:image"
          content={hostname+logo}
        ></meta>

        <meta property="og:type" content="ecommerce"></meta>
        <meta property="og:image:type" content="image/jpeg"></meta>
        <meta property="og:image:width" content="300"></meta>
        <meta property="og:image:height" content="300"></meta>

        <meta
          property="og:url"
          content={hostname+window.location.pathname+window.location.search}
        ></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="Banglamart E-commerce" />
        <meta name="twitter:image:alt" content="Alt text for image"></meta>
      </Helmet>
      {/* product details  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-CardColor p-4">
        <div className="">
          <ImageShow product={product}></ImageShow>
        </div>
        <div>
          <div className="border-b border-b-BorderColor p-4">
            <h1 className="">{product?.title}</h1>
            <div>
              {" "}
              <Rating
                initialRating={3.5}
                readonly
                emptySymbol={
                  <AiOutlineStar className="text-[14px] text-BorderColor" />
                }
                fullSymbol={
                  <AiFillStar className="text-[14px] text-MainColor" />
                }
              />
            </div>
          </div>
          <div className="border-b border-b-BorderColor flex flex-wrap items-center p-4">
            {product?.brand && (
              <div className="mt-2 mb-2 mr-2">
                <p className="text-SubTextColor">
                  {language ? "Sold by:" : "বিক্রেতা:"}
                </p>
                <h3 className="text-TextColor">
                  {product?.brand?.brandName}
                  <span className="badge badge-md border-[1px] border-BorderColor">
                    {language ? "brand" : "ব্রান্ড"}
                  </span>
                </h3>
              </div>
            )}
            {product?.seller && (
              <div className="mt-2 mb-2 mr-2">
                <p className="text-SubTextColor">
                  {language ? "Sold by:" : "বিক্রেতা:"}
                </p>
                <h3 className="text-TextColor">{product?.seller?.shopName}</h3>
              </div>
            )}

            <motion.button
              onClick={handleMessageShow}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              className="ml-4 mr-4 pl-3 pr-3 pt-2 pb-2 bg-[#d2eefd] rounded-full shadow-md"
            >
              <p className="text-MainColor">
                {language ? "Message Seller" : "বিক্রেতা কে ম্যাসেজ দিন"}
              </p>
            </motion.button>
            {/* message section  */}
            <div
              className={`bg-CardColor z-10 pb-4 rounded-t-xl bottom-0 w-[280px] lg:right-32 fixed ${
                messageShow
                  ? "transition-all transform translate-y-0"
                  : "transition-all transform translate-y-full"
              } ease-in-out duration-700 shadow-2xl shadow-SubTextColor`}
            >
              <div className="flex justify-end text-SubTextColor">
                <CloseButton onClick={handleMessageShow} size="md" />
              </div>
              <div className="border border-BorderColor flex justify-center p-2 shadow-lg shadow-TextColor ">
                <div>
                  <div className="flex">
                    <img
                      src={`${url}${product?.thumbnail}`}
                      className="h-16 w-16 rounded-full"
                      alt=""
                    />
                    <div>
                      <p className="text-MainColor">{product?.title}</p>
                      <p className="text-[#ff3838]">
                        {totalPrice?.toFixed(1)} ৳
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Scrollbars
                style={{ height: 350 }}
                renderThumbVertical={({ style }) => (
                  <div
                    style={{
                      ...style,
                      width: 3,
                      backgroundColor: "#5dade2",
                      borderRadius: 4,
                    }}
                  />
                )}
                ref={scrollbarsRef}
              >
                <div className="p-3 ">
                  {allMessages?.map((message, i) => (
                    <div key={i}>
                      {/* chat start  */}
                      <div
                        className={`chat ${
                          user.id === message.receiverId
                            ? "chat-start"
                            : "chat-end"
                        } `}
                      >
                        <div className="chat-image avatar">
                          <Avatar
                            size="sm"
                            name={
                              user.id === message.receiverId
                                ? conversation?.receiver?.name
                                : user.name
                            }
                            src={`${url}${
                              user.id === message.receiverId
                                ? conversation?.receiver?.image
                                : user.image
                            }`}
                          />
                        </div>
                        <div className="text-xs chat-header flex flex-col  text-SubTextColor ">
                          <p>
                            {user.id === message.receiverId
                              ? conversation?.receiver?.name
                              : user.name}
                          </p>
                          <time className=" ">
                            {new Date(message?.date).toLocaleString()}
                          </time>
                        </div>
                        <div className="chat-bubble">{message.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Scrollbars>

              <div className="pt-2 pl-3">
                <form onSubmit={sendMessage} className="flex items-center">
                  <input
                    type="text"
                    name="message"
                    value={formData}
                    onChange={(e) => setFormData(e.target.value)}
                    placeholder="Type Message..."
                    className="border p-2 pl-4 rounded-full focus:outline-none focus:ring focus:border-blue-500 resize-none"
                  ></input>
                  {formData === "" ? (
                    <button
                      disabled
                      className="ml-2 text-[18px] bg-CardColor rounded-full border border-SubTextColor h-8 w-8 "
                    >
                      <AiOutlineSend className="text-SubTextColor ml-2"></AiOutlineSend>
                    </button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.8 }}
                      type="submit"
                      className="ml-2 text-[18px] bg-CardColor rounded-full border border-MainColor h-8 w-8 "
                    >
                      <AiOutlineSend className="text-MainColor ml-2"></AiOutlineSend>
                    </motion.button>
                  )}
                </form>
              </div>
            </div>
            {/* message section end  */}
            {product?.brand && (
              <Link to={`/brand-product-page?data=${shopDetails}`} className="">
                <img
                  src={`${url}${product?.brand?.brandIcon}`}
                  className="h-16 w-16 rounded-full"
                />
              </Link>
            )}
            {product?.seller && (
              <Link to={`/shop-page?data=${shopDetails}`}>
                <img
                  src={`${url}${product?.seller?.logo}`}
                  className="h-16 w-16 rounded-full"
                />
              </Link>
            )}
          </div>

          <div className="border-b border-b-BorderColor flex flex-wrap p-4 gap-2">
            <div className="flex flex-col ml-2 mr-2">
              {product?.colors && (
                <p>{language ? "Select Color:" : "কালার সিলেক্ট"}</p>
              )}
              <RadioGroup onChange={setColor} value={color}>
                <Stack>
                  {product?.colors?.map((color, i) => {
                    const backgroundColor = color?.value;
                    return (
                      <Radio
                        value={color.value}
                        key={i}
                        className="text-SubTextColor "
                        onClick={() => handleColorChange(color)}
                      >
                        <div className="p-[1px] bg-[#e7e5e5] rounded-full shadow-sm shadow-MainColorHover">
                          <div
                            style={{ backgroundColor: backgroundColor }}
                            className="m-1 mr-1 h-5 w-5 rounded-full"
                          ></div>
                        </div>
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </div>
            <div className="flex flex-col ml-2 mr-2">
              {product?.sizes && (
                <p className="mr-1">
                  {language ? "Select Size:" : "সাইজ সিলেক্ট"}
                </p>
              )}

              <RadioGroup onChange={setSize} value={size}>
                <Stack>
                  {product?.sizes?.map((size, i) => {
                    return (
                      <Radio
                        value={size.value}
                        key={i}
                        className="text-SubTextColor "
                        onClick={() => handleSizeChange(size)}
                      >
                        <p className="font-bold mr-[2px]">
                          {size.label} : {size.value}
                        </p>
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </div>
            <div className="flex flex-col ml-2 mr-2">
              {product?.specifications && (
                <p className="mr-1 ">
                  {language ? "Specifications:" : "স্পেসিফিকেশন্স:"}
                </p>
              )}

              <RadioGroup onChange={setSpecification} value={specification}>
                <Stack>
                  {product?.specifications?.map((specification, i) => {
                    return (
                      <Radio
                        value={specification.value}
                        key={i}
                        className="text-SubTextColor "
                        onClick={() => handleSpecificationChange(specification)}
                      >
                        <p className="text-SubTextColor">
                          {specification.label} : {specification.value}
                        </p>
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap border-b border-b-BorderColor">
            <div className=" p-4">
              {product?.price && (
                <p className="text-SubTextColor">
                  {language ? "Old Price:" : "আগের মূল্য:"}
                  <span className="line-through text-[18px] text-MainColor ml-2">
                    {product?.price} ৳
                  </span>
                  {language ? "/pc" : "/পিচ"}
                </p>
              )}
              <p className="text-SubTextColor">
                {language ? "Current Price:" : "বর্তমান মূল্য:"}
                <span className="text-[18px] text-MainColor ml-2 font-semibold">
                  {totalPrice?.toFixed(1)} ৳
                </span>
                {language ? "/pc" : "/পিচ"}
              </p>
            </div>
            {product?.fixedPrice || (
              <div className="relative m-2">
                <label className="block text-MainColor text-sm font-semibold mb-1">
                  {language ? "Offer Your Price" : "আপনি কত টাকা দিতে চান"}
                </label>
                <input
                  type="number"
                  className="shadow appearance-none border rounded-r-full w-full py-2 px-3 text-SubTextColor leading-tight focus:outline-MainColor"
                  placeholder="Enter your Price"
                  value={offerPrice}
                  onChange={handleOfferPriceChange}
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="text-sm absolute text-CardColor top-[25px] right-0 rounded-r-full bg-MainColor p-2"
                  onClick={handleOfferPrice}
                >
                  {language ? "Offer" : "অফার"}
                </motion.button>
              </div>
            )}
          </div>
          <div className="border-b border-b-BorderColor p-4 flex items-center">
            <p className="mr-4 text-SubTextColor">
              {language ? "Quantity:" : "পরিমান"}
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              onClick={handleDecrease}
              className="mr-4 rounded-full bg-[#d2eefd] p-2 shadow-sm hover:shadow-md"
            >
              <AiOutlineLine className=" text-SubTextColor" />
            </motion.button>
            <h1 className="mr-4 text-TextColor">{minOrder}</h1>
            {minOrder == product?.quantity ? (
              <button
                disabled
                className="mr-4 rounded-full bg-[#e9a093] p-2 shadow-sm hover:shadow-md"
              >
                <MdOutlineDisabledByDefault className=" text-CardColor" />
              </button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                onClick={handleIncrease}
                className="mr-4 rounded-full bg-[#d2eefd] p-2 shadow-sm hover:shadow-md"
              >
                <AiOutlinePlus className=" text-TextColor" />
              </motion.button>
            )}

            <p className="mr-4 text-SubTextColor">
              (<span>{product?.quantity}</span>){" "}
              {language ? "available:" : "অবশিষ্ট"}
            </p>
          </div>
          <div className="p-4">
            {product?.fixedPrice && (
              <div className="flex justify-around flex-wrap gap-4">
                <form onSubmit={applyCouponCode}>
                  <div className="relative">
                    <label className="block text-SubTextColor text-sm font-bold mb-1">
                      {language ? " Apply Coupon Code" : "কুপন কোড দিন"}
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded-full w-full py-2 px-3 text-SubTextColor leading-tight focus:outline-MainColor"
                      placeholder={
                        language ? "Enter Coupon Code" : "কুপন কোড দিন"
                      }
                      value={couponCode}
                      onChange={handleCouponCodeChange}
                      required
                    />
                    {couponOffer ? (
                      couponOffer?.percentage ? (
                        <p className="text-TextColor">
                          {language ? "Discount:" : "অফার"} {couponOffer.offer}%
                        </p>
                      ) : (
                        <p className="text-TextColor">
                          {language ? "Discount:" : "অফার"} {couponOffer.offer}
                          tk
                        </p>
                      )
                    ) : (
                      <p className="text-xs text-[#ff6868]">
                        {language
                          ? "*Apply coupon code to get a discount"
                          : "কুপন কোড ব্যাবহার করে অফার নিন"}
                      </p>
                    )}
                    {couponLoading ? (
                      <div
                        type="submit"
                        className="text-sm flex justify-center items-center absolute text-CardColor top-[25px] right-0 rounded-r-full bg-MainColor p-2"
                      >
                        <span className="loading loading-spinner loading-sm"></span>
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        type="submit"
                        className="text-sm absolute text-CardColor top-[25px] right-0 rounded-r-full bg-MainColor p-2"
                      >
                        {language ? "Apply" : "এপ্লাই"}
                      </motion.button>
                    )}
                  </div>
                </form>
                {/* <div className=" w-52">
                <div className="flex justify-between">
                  <p className="text-SubTextColor">Product Price:</p>
                  <p className="text-SubTextColor">{newPrice?.toFixed()} ৳</p>
                </div>
                {product?.percentage > 0 && (
                  <div className="flex justify-between">
                    <p className="text-SubTextColor">
                      Discount ({product?.offer}%)
                    </p>
                    <p className="text-SubTextColor">
                      -{discount?.toFixed()} ৳
                    </p>
                  </div>
                )}
                {product?.vat > 0 && (
                  <div className="flex justify-between">
                    <p className="text-SubTextColor">Vat ({product?.vat}%)</p>
                    <p className="text-SubTextColor">+{vat?.toFixed()} ৳</p>
                  </div>
                )}
                {!product?.freeDelivery && (
                  <div className="flex justify-between">
                    <p className="text-SubTextColor">Delivery Charge</p>
                    <p className="text-SubTextColor">
                      +{product?.deliveryCharge} ৳
                    </p>
                  </div>
                )}
                {!product?.percentage && product?.offer > 0 && (
                  <div className="flex justify-between">
                    <p className="text-SubTextColor">Discount</p>
                    <p className="text-SubTextColor">-{product?.offer} ৳</p>
                  </div>
                )}
                <div className="flex items-center justify-between border-t-SubTextColor border-t-[1px]">
                  <p className="text-TextColor">Total Price:</p>
                  <h1 className="text-MainColor">{finalPrice?.toFixed()} ৳</h1>
                </div>
              </div> */}
              </div>
            )}
            <div className="pt-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                className="pl-3 pr-3 pt-2 pb-2 bg-[#d2eefd] rounded-full shadow-sm hover:shadow-md flex items-center justify-center"
              >
                <p>
                  <AiOutlineShopping className="text-MainColor  mr-1" />
                </p>
                <p className="text-MainColor">
                  {language ? "Add to cart" : "ঝুরিতে যুক্ত করুন"}
                </p>
              </motion.button>
              {isAddToCartEnabled ? (
                <Link
                  to="/cart"
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  className="pl-3 pr-3 pt-2 pb-2 bg-MainColor rounded-full shadow-sm hover:shadow-md flex items-center justify-center"
                >
                  <p>
                    <AiOutlineShoppingCart className="text-CardColor  mr-1" />
                  </p>
                  <p className="text-CardColor">
                    {language ? "Buy Now" : "কিনুন"}
                  </p>
                </Link>
              ) : (
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  className="pl-3 pr-3 pt-2 pb-2 bg-MainColor rounded-full shadow-sm hover:shadow-md flex items-center justify-center"
                >
                  <p>
                    <AiOutlineShoppingCart className="text-CardColor  mr-1" />
                  </p>
                  <p className="text-CardColor">
                    {language ? "Buy Now" : "কিনুন"}
                  </p>
                </motion.button>
              )}

              {/* <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                className="pl-3 pr-3 pt-2 pb-2 bg-[#d2eefd] rounded-full shadow-sm hover:shadow-md flex items-center justify-center"
              >
                <p>
                  <AiOutlineShopping className="text-MainColor  mr-1" />
                </p>
                <p className="text-MainColor">Add to wishlist</p>
              </motion.button> */}
            </div>
            <p className="text-SubTextColor">
              Refund:{" "}
              <span className="ml-2 text-MainColor hover:text-MainColorHover">
                <Link to="/cancellationPolicy">Cash Back</Link>
              </span>{" "}
              <span className="ml-2 text-MainColor hover:text-MainColorHover">
                <Link to="/termsConditions">View Policy</Link>
              </span>
            </p>
            <div className="mt-4 flex justify-center items-center">
              <p className="text-SubTextColor mr-2">Share:</p>
              <div className="flex ">
                <FacebookShareButton url={shareUrl}>
                  <FacebookIcon className="h-10 w-10 rounded-full ml-2" />
                </FacebookShareButton>
                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon className="h-10 w-10 rounded-full ml-2" />
                </WhatsappShareButton>
                <FacebookMessengerShareButton url={shareUrl}>
                  <FacebookMessengerIcon className="h-10 w-10 rounded-full ml-2" />
                </FacebookMessengerShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Reviews  */}
      <div>
        <div className=" mt-4 lg:mt-8 m-1 lg:m-0 bg-CardColor rounded-lg">
          <div className="flex border-b-[1px] border-b-BorderColor pl-5 md:pl-10 pb-2 pt-2 justify-between items-center">
            <div className="border-b-[3px] border-b-MainColor ">
              <h1 className="">{language ? "Reviews" : "রিভিউ"}</h1>
            </div>
          </div>
          <div className="pl-5 md:pl-10 pr-5 md:pr-10 pt:3 md:pt-5 pb-3 md:pb-5">
            {reviewsData?.length > 0 ? (
              <Accordion allowMultiple>
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton
                          _expanded={{ bg: "#5dade2", color: "white" }}
                        >
                          <Box as="span" flex="1" textAlign="left">
                            <h1>
                              {language ? "Customer Reviews" : "ক্রেতার রিভিউ"}
                            </h1>
                          </Box>
                          {isExpanded ? (
                            <MdRemove fontSize="18px" />
                          ) : (
                            <MdAdd fontSize="18px" />
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <ReviewSection reviews={reviewsData} />
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <PiSmileySadLight className="text-SubTextColor text-4xl"></PiSmileySadLight>
                <h1 className="text-SubTextColor">No Reviews</h1>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* descriptions  */}
      <div>
        <div className=" mt-4 lg:mt-8 m-1 lg:m-0 bg-CardColor rounded-lg">
          <div className="flex border-b-[1px] border-b-BorderColor pl-5 md:pl-10 pb-2 pt-2 justify-between items-center">
            <div className="border-b-[3px] border-b-MainColor ">
              <h1 className="">{language ? "Descriptions" : "ডেসক্রিপশন"}</h1>
            </div>
          </div>
          <div className="pl-5 md:pl-10 pr-5 md:pr-10 pt:3 md:pt-5 pb-3 md:pb-5">
            <h1 className="text-center">{product?.title}</h1>
            <h1
              className=""
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            ></h1>
          </div>
        </div>
      </div>

      <div>
        <div className=" mt-4 lg:mt-8 m-1 lg:m-0 bg-CardColor rounded-lg">
          <div className="flex border-b-[1px] border-b-BorderColor pl-5 md:pl-10 pb-2 pt-2 justify-between items-center">
            <div className="border-b-[3px] border-b-MainColor ">
              <h1 className="">{language ? "Comments" : "কোমেন্টস"}</h1>
            </div>
          </div>
          {user ? (
            <div className="pl-5 md:pl-10 pr-5 md:pr-10 pt:3 md:pt-5 pb-3 md:pb-5">
              <div className="flex justify-between items-center w-full p-4 mt-4 border border-gray-300 rounded-lg">
                <input
                  type="text"
                  placeholder="Ask a Question..."
                  value={comment}
                  className="w-full outline-none"
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={handleSubmitComment}
                  className={`bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 ${
                    !comment || isLoading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={!comment || isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0112 4v4h4a8 8 0 01-8 8v-4H6z"
                      ></path>
                    </svg>
                  ) : (
                    <BiSolidSend
                      className={`text-2xl ${
                        !comment || isLoading ? "" : "text-MainColor"
                      }`}
                    ></BiSolidSend>
                  )}
                </button>
              </div>
              {getComment ? (
                getComment?.length > 0 ? (
                  getComment.map((c, i) => (
                    <div key={i} className="border-b border-b-[#ece8e8] m-4">
                      <div className="flex items-center p-1">
                        <div className="mr-4">
                          <TbUserQuestion className="text-3xl text-MainColor"></TbUserQuestion>
                        </div>
                        <div className="">
                          <p className="text-[16px] font-semibold">
                            {c?.message}
                          </p>
                          <p className="text-SubTextColor text-[12px] font-mono">
                            Ask by- {c?.user.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center p-1">
                        <div className="mr-4">
                          <TbUserCheck className="text-3xl text-MainColor"></TbUserCheck>
                        </div>
                        <div className="border-l-2 border-l-BorderColor ml-2 pl-1">
                          {c?.replay ? (
                            <div>
                              <h2 className="text-SubTextColor">{c?.replay}</h2>
                              <p className="text-SubTextColor">
                                Authentic Reply by seller
                              </p>
                            </div>
                          ) : (
                            <h3 className="text-SubTextColor">
                              Seller did not response yet. Please Wait!
                            </h3>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center mt-1">
                    <PiSmileySadLight className="text-SubTextColor text-4xl"></PiSmileySadLight>
                    <h1 className="text-SubTextColor">No Queries</h1>
                  </div>
                )
              ) : (
                <div className="flex justify-center items-center p-10">
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </div>
              )}
            </div>
          ) : (
            <h2 className="text-SubTextColor pl-5 md:pl-10 pr-5 md:pr-10 pt:3 md:pt-5 pb-3 md:pb-5">
              {language ? "Please" : "প্লিজ"}{" "}
              <Link
                to="/login"
                state={{ from: location }}
                replace
                className="text-MainColor font-bold cursor-pointer hover:underline"
              >
                {language ? "Login" : "লগইন"}
              </Link>{" "}
              {language ? "to write & see comments" : "করুন দেখার জন্য"}{" "}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

const ImageShow = ({ product }) => {
  const url = "https://api.banglamartecommerce.com.bd";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };
  // let img =
  return (
    <div className="flex flex-col  items-center">
      <div className="mb-4 z-10">
        {product?.images ? (
          <ImageZoom
            src={`${url}${product?.images[currentImageIndex]}`}
            alt="A image to apply the ImageZoom plugin"
            zoom="260"
          />
        ) : (
          <ImageZoom
            src={`${url}${product?.thumbnail}`}
            alt="A image to apply the ImageZoom plugin"
            zoom="260"
          />
        )}
      </div>
      <div className="flex flex-wrap space-x-4">
        {product?.images?.map((image, index) => (
          <img
            key={index}
            src={`${url}${image}`}
            alt={`Product ${index + 1}`}
            className={`cursor-pointer h-16 w-16 border-[3px] ${
              currentImageIndex === index
                ? "border-MainColor"
                : "border-SubTextColor"
            }`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
