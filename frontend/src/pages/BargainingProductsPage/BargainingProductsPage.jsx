import { PiSmileySadLight } from "react-icons/pi";
import FlashSaleBanner from "../../components/FlashSaleBanner";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useContext } from "react";
import {
  AiFillStar,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineStar,
} from "react-icons/ai";
// import { BsFillCartCheckFill} from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Grid,
  Skeleton,
  SkeletonText,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { Paginated } from "@makotot/paginated";
import { useTranslation } from "react-i18next";
// import Swal from "sweetalert2";
// import { postApi } from "../../apis";
// import { AuthContext } from "../../providers/AuthProvider";
import { AuthContext } from './../../providers/AuthProvider';

const BargainingProductsPage = () => {
  const { language } = useContext(AuthContext);
  const {t}=useTranslation()
  const [bargainingProducts, setBargainingProducts] = useState(null);
  const data = useSelector(
    (state) => state.bargainingProducts.bargainingProducts?.data
  );
  useEffect(() => {
    setBargainingProducts(data);
  }, [data]);

  const itemsPerPage = 24; // Number of items per page
  const [currentPage, updateCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    const totalPage = Math.ceil(bargainingProducts?.length / itemsPerPage);
    setTotalPage(totalPage);
  }, [bargainingProducts]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = bargainingProducts?.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto">
      <FlashSaleBanner
        bannerURL={
          "https://i.ibb.co/HPzrRX1/Building-a-Discount-Strategy-From-Scratch-Beware-of-Bargain-Hunters-linkedin.png"
        }
      ></FlashSaleBanner>
      <div className="mt-4">
        <h1 className="">{t("header.bargaining")}</h1>
        <div className="mt-4 m-1 ">
          <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {bargainingProducts ? (
              bargainingProducts?.length > 0 ? (
                currentProducts?.map((product, i) => (
                  <ProductCart product={product} key={i}></ProductCart>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center mt-1">
                  <PiSmileySadLight className="text-SubTextColor text-4xl"></PiSmileySadLight>
                  <h1 className="text-SubTextColor">{language?'No Product Available':'পণ্য নেই'}</h1>
                </div>
              )
            ) : (
              <Box padding="6" boxShadow="lg" bg="#FAD7A0">
                <Skeleton height="200px" />
                <SkeletonText
                  mt="4"
                  noOfLines={3}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            )}
          </div>
          {/* Pagination */}
          <div className=" m-4">
            {totalPage ? (
              <Paginated
                currentPage={currentPage}
                totalPage={totalPage}
                siblingsSize={1}
                boundarySize={1}
              >
                {({
                  pages,
                  currentPage,
                  hasPrev,
                  hasNext,
                  getFirstBoundary,
                  getLastBoundary,
                  isPrevTruncated,
                  isNextTruncated,
                }) => (
                  <Grid
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    gridTemplateColumns="min-content 1fr min-content"
                    gridGap={2}
                  >
                    <Stack direction="row">
                      {hasPrev() && (
                        <Button
                          size="sm"
                          leftIcon={
                            <AiOutlineDoubleLeft className="text-[14px]" />
                          }
                          colorScheme="blue"
                          onClick={() => updateCurrentPage(currentPage - 1)}
                        >
                          Prev
                        </Button>
                      )}
                    </Stack>
                    <Center>
                      <Stack direction="row">
                        {getFirstBoundary().map((boundary) => (
                          <Button
                            size="sm"
                            key={boundary}
                            colorScheme="blue"
                            variant="outline"
                            onClick={() => updateCurrentPage(boundary)}
                          >
                            {boundary}
                          </Button>
                        ))}
                        {isPrevTruncated && <span>...</span>}
                        {pages.map((page) => {
                          return page === currentPage ? (
                            <Button
                              size="sm"
                              key={page}
                              colorScheme="blue"
                              variant="solid"
                            >
                              {page}
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              key={page}
                              colorScheme="blue"
                              variant="outline"
                              onClick={() => updateCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          );
                        })}

                        {isNextTruncated && <span>...</span>}
                        {getLastBoundary().map((boundary) => (
                          <Button
                            size="sm"
                            key={boundary}
                            colorScheme="blue"
                            variant="outline"
                            onClick={() => updateCurrentPage(boundary)}
                          >
                            {boundary}
                          </Button>
                        ))}
                      </Stack>
                    </Center>

                    <Stack direction="row">
                      {hasNext() && (
                        <Button
                          size="sm"
                          rightIcon={<AiOutlineDoubleRight className="text-" />}
                          colorScheme="blue"
                          onClick={() => updateCurrentPage(currentPage + 1)}
                        >
                          Next
                        </Button>
                      )}
                    </Stack>
                  </Grid>
                )}
              </Paginated>
            ) : (
              <div className="flex justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BargainingProductsPage;

const ProductCart = ({ product }) => {
  const {t}=useTranslation()

  const url = "https://banglamartecommerce.com.bd";

  const [hover, setHover] = useState(false);
  // const [heartIconHover, setHeartIconHover] = useState(false);
  // const [cartIconHover, setCartIconHover] = useState(false);
  const [newPrice, setNewPrice] = useState(product?.price);

  function calculatePercentage(value, percentage) {
    return (value * percentage) / 100;
  }

  useEffect(() => {
    if (product?.percentage) {
      const percentageValue = calculatePercentage(
        product?.price,
        product?.offer
      );
      setNewPrice(product?.price - percentageValue);
    } else {
      setNewPrice(product?.price - product?.offer);
    }
  }, [product]);

  // const handleAddToCart = (id, minOrder) => {
  //   if (user) {
  //     const token = localStorage.getItem("token");
  //     postApi(
  //       "/cart/add",
  //       {
  //         productId: id,
  //         quantity: minOrder,
  //       },
  //       token
  //     )
  //       .then((res) => {
  //         Swal.fire({
  //           position: "top-end",
  //           icon: "success",
  //           title: "Add to Cart successfully.",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //         setCartUpdate(res.data);
  //       })
  //       .catch((error) => {
  //         console.log(error.response.data.message);
  //       });
  //   } else {
  //     Swal.fire("Please LogIn");
  //     navigate("/login");
  //   }
  // };
  return (
    <Link to={`/productDetails/${product?.id}`}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          //router.push(product.href);
        }}
        className="w-[95%] cursor-pointer group aspect-[20/25] rounded-xl relative overflow-hidden border border-BorderColor hover:border-MainColor hover:shadow-lg"
      >
        <div className="inset-0 absolute w-full h-full group-hover:scale-110 ease-in-out duration-300">
          {/* TODO  */}
          <img
            src={`${url}${product?.thumbnail}`}
            className="object-fill w-full h-full"
          />
        </div>
        <div
          className={`absolute bottom-0 w-full ${
            hover ? "bg-MainColor" : "bg-[#ffffffd7]"
          }`}
        >
          <div className="pl-2 pt-1 pb-1 flex justify-between items-center pr-2">
            <div>
              <div className="flex flex-wrap">
                {product?.price > newPrice && (
                  <p className={`relative mr-1 line-through text-MainColor  ${
                    hover && "text-SubTextColor"
                  }`}>
                    {product?.price.toFixed()} ৳
                  </p>
                )}
                <p
                  className={`relative font-semibold ${
                    hover ? "text-CardColor" : "text-[#f84545]"
                  } `}
                >
                  {newPrice.toFixed()} ৳
                </p>
              </div>
              <Rating
                initialRating={3.5}
                readonly
                emptySymbol={
                  <AiOutlineStar
                    className={` text-[14px] ${
                      hover ? "text-BorderColor" : "text-MainColor"
                    }`}
                  />
                }
                fullSymbol={
                  <AiFillStar
                    className={` text-[14px] ${
                      hover ? "text-BorderColor" : "text-MainColorHover"
                    }`}
                  />
                }
              />
              <Link
                to={`/productDetails/${product?.id}`}
                className={`relative hover:underline break-all line-clamp-1 ${
                  hover ? "text-CardColor line-clamp-none" : "text-TextColor"
                } `}
              >
                {product?.title}
              </Link>
            </div>
            <div className="flex flex-col">
              {/* <button
                onMouseEnter={() => setHeartIconHover(true)}
                onMouseLeave={() => setHeartIconHover(false)}
                className=" mb-1"
              >
                {heartIconHover ? (
                  <div
                    className="tooltip tooltip-info tooltip-left"
                    data-tip="Add Wishlist"
                  >
                    <BsFillHeartFill
                      className={` text-[20px] ${
                        heartIconHover && "text-CardColor"
                      }`}
                    />
                  </div>
                ) : (
                  <AiOutlineHeart
                    className={`text-[20px] ${
                      hover ? "text-CardColor" : "text-SubTextColor"
                    } `}
                  />
                )}
              </button> */}
              {/* <button
                onClick={() => handleAddToCart(product?.id, product?.minOrder)}
                onMouseEnter={() => setCartIconHover(true)}
                onMouseLeave={() => setCartIconHover(false)}
                className=""
              >
                {cartIconHover ? (
                  <div
                    className="tooltip tooltip-info tooltip-left"
                    data-tip="Add Cart"
                  >
                    <BsFillCartCheckFill
                      className={` text-[20px] ${
                        cartIconHover && "text-CardColor"
                      }`}
                    />
                  </div>
                ) : (
                  <AiOutlineShoppingCart
                    className={`text-[20px] ${
                      hover ? "text-CardColor" : "text-SubTextColor"
                    } `}
                  />
                )}
              </button> */}
            </div>
          </div>
        </div>
        {product?.percentage ? (
          <div
            style={{
              clipPath:
                "polygon(29% 0, 68% 28%, 39% 26%, 56% 53%, 27% 40%, 32% 68%, 0 29%)",
            }}
            className="absolute flex flex-col  bg-[#fc3e3e] shadow-md shadow-[#f59090] top-0 h-24 w-24"
          >
            <span className="ml-5 mt-[6px] text-CardColor font-semibold text-[10px]">
            {t("off")}
            </span>
            <span className="text-[12px] font-semibold ml-[10px] text-CardColor bg-[#fc3e3e]">
              {product?.offer}%
            </span>
          </div>
        ) : (
          product?.offer && (
            <div className="absolute flex items-center justify-center bg-CardColor shadow-md shadow-[#f59090] rounded-r-full top-2 p-1">
              <span className="font-semibold text-[10px] text-[#fc3e3e] mr-1">
              {t("off")}
              </span>
              <span className="pl-[2px] pr-[2px] text-[14px] font-semibold text-CardColor bg-[#fc3e3e] rounded-r-full">
                -{product?.offer}৳
              </span>
            </div>
          )
        )}
        {product?.freeDelivery ? (
          <div className="absolute flex items-center justify-center bg-CardColor shadow-lg rounded-l-full top-2 p-1 right-0">
            <TbTruckDelivery className="text-MainColor text-[25px] ml-1 mr-1"></TbTruckDelivery>

            <p className="text-sm text-CardColor p-1 bg-MainColor rounded-full">
            {t("off")}
            </p>
          </div>
        ) : (
          <div className="absolute flex items-center justify-center bg-CardColor shadow-lg rounded-l-full top-2 p-1 right-0">
            <TbTruckDelivery className="text-MainColor text-[25px] ml-1 mr-1"></TbTruckDelivery>

            <p className="text-sm text-CardColor p-1 bg-MainColor rounded-full">
              {product?.deliveryCharge} ৳
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};
