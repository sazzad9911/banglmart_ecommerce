import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import Slider from "react-slick/lib/slider";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
// import Rating from "react-rating";
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { BsFillCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import ProductCart from "../../../components/ProductCart";
import { useTranslation } from "react-i18next";
// import { postApi } from "../../../apis";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../../providers/AuthProvider";

const ForYouProducts = () => {
  const [products, setProducts] = useState(null);
  const { t } = useTranslation();
  const data = useSelector(
    (state) => state.forYouProducts.forYouProducts?.data
  );
  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <div className=" mt-4 lg:mt-8 m-1 lg:m-0 bg-CardColor rounded-lg">
      <div className="flex border-b-[1px] border-b-BorderColor pl-5 md:pl-10 pb-2 pt-2 justify-between items-center">
        <div className="border-b-[3px] border-b-MainColor ">
          <h1 className="">  {t("forYou.forYou")}</h1>
        </div>
        {products?.length > 10 && (
          <Link
            to="/for-you-product-page"
            className="mr-5 md:mr-10 pb-1 pt-1 pl-2 pr-2 md:pl-3 md:pr-3 bg-MainColor rounded-full text-CardColor shadow-lg hover:bg-MainColorHover text-sm"
          >
            {t("viewMore.viewMore")}
          </Link>
        )}
      </div>
      {products ? (
        <div className="pl-5 md:pl-10 pr-5 md:pr-10 pt:3 md:pt-5 pb-3 md:pb-5">
          <ProductShowSlider products={products}></ProductShowSlider>
        </div>
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
  );
};

export default ForYouProducts;

const ProductShowSlider = ({ products }) => {
 
  // console.log(products);
  const totalSlides = products?.length || 1;
  const [mainSlider, setMainSlider] = useState();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isSm, setIsSm] = useState(window.innerWidth >= 640);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 640) {
        setIsSm(false);
      } else {
        setIsSm(true);
      }
    };

    // Initialize the screen size on component mount
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const goNext = () => {
    mainSlider?.slickNext();
  };
  const goPrev = () => {
    mainSlider?.slickPrev();
  };

  const sliderSettings = {
    arrows: false,
    infinite: false,
    dots: false,
    speed: 200,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    touchThreshold: 4,
    focusOnSelect: true,
    beforeChange: (current, next) => setCurrentSlide(next + 1),
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1535,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="flex justify-center">
      <div className="container ">
        {isSm && (
          <div className="p-cat-slider relative">
            <div className="relative w-full h-full">
              <span
                onClick={goNext}
                className="w-8 flex aspect-square text-CardColor shadow-lg rounded-full bg-MainColor hover:bg-MainColorHover -right-[6px] top-1/2 justify-center items-center absolute z-10 cursor-pointer -translate-y-1/2 "
              >
                <HiOutlineChevronRight />
              </span>
              <span
                onClick={goPrev}
                className="w-8 flex aspect-square shadow-sm text-CardColor hover:bg-MainColorHover rounded-full bg-MainColor -left-4 top-1/2 justify-center items-center absolute z-10 cursor-pointer -translate-y-1/2"
              >
                <HiOutlineChevronLeft />
              </span>

              <Slider
                ref={(slider1) => setMainSlider(slider1)}
                {...sliderSettings}
              >
                {products?.map((product, i) => (
                  <ProductCart
                    product={product.productInfo}
                    key={i}
                  ></ProductCart>
                ))}
              </Slider>
            </div>
          </div>
        )}

        {!isSm && (
          <div className="flex overflow-x-auto no-scrollbar gap-3 snap-x pt-5">
            {products?.map((product, i) => (
              <Cart2 product={product?.productInfo} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Cart2 = ({ product }) => {
  const { t } = useTranslation();
  const url = "https://banglamartecommerce.com.bd";
  // const { user, setCartUpdate } = useContext(AuthContext);
  // const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  // const [heartIconHover, setHeartIconHover] = useState(false);
  // const [cartIconHover, setCartIconHover] = useState(false);
  const [newPrice, setNewPrice] = useState(product?.price);

  function calculatePercentage(value, percentage) {
    return (value * percentage) / 100;
  }

  useEffect(() => {
    if (product.percentage) {
      const percentageValue = calculatePercentage(
        product?.price,
        product.offer
      );
      setNewPrice(product?.price - percentageValue);
    } else {
      setNewPrice(product?.price - product.offer);
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
    <Link
      to={`/productDetails/${product?.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex-shrink-0 w-[45%] snap-start cursor-pointer group aspect-[228/400] bg-CardColor rounded-xl relative overflow-hidden border border-BorderColor hover:border-MainColor"
    >
      <div className="inset-0 absolute w-full h-full group-hover:scale-110 ease-in-out duration-300">
        <img
          src={`${url}${product?.thumbnail}`}
          className="object-cover w-full h-full pb-10 p-4"
        />
      </div>
      <div
        className={`absolute bottom-0 w-full ${
          hover ? "bg-MainColor " : "bg-[#ffffffd7]"
        }`}
      >
        <div className="pl-2 pt-1 pb-1 flex justify-between items-center pr-2">
          <div>
            <div className="flex">
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
            {/* <Rating
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
            /> */}
            <Link
              to={`/productDetails/${product?.id}`}
              className={`relative line-clamp-1 break-all hover:underline ${
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
      {product.percentage && (
        <div className="absolute flex items-center justify-center bg-CardColor shadow-lg rounded-r-full top-2 p-1">
          <p className="text-xs text-[#fc3e3e] mr-1">{t("off")}</p>
          <p className="text-sm text-CardColor p-1 bg-[#fc3e3e] rounded-full">
            {product.offer}%
          </p>
        </div>
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
    </Link>
  );
};
