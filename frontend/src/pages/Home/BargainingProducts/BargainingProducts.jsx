import { Link } from "react-router-dom";
import FlashSaleBanner from "../../../components/FlashSaleBanner";
import { useEffect, useState } from "react";
// import Rating from "react-rating";
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// import { BsFillCartCheckFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { useSelector } from "react-redux";
import EmptyContent from "../../../components/EmptyContent";
import { useTranslation } from "react-i18next";
// import { postApi } from "../../../apis";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../../providers/AuthProvider";

const BargainingProducts = () => {
  const { t } = useTranslation();
  const [bargainingProducts, setBargainingProducts] = useState([]);
  const data = useSelector(
    (state) => state.bargainingProducts.bargainingProducts?.data
  );
  useEffect(() => {
    setBargainingProducts(data);
  }, [data]);
  // console.log(bargainingProducts);
  return (
    <div className=" mt-4 lg:mt-8 m-1 lg:m-0 bg-[#440a96] rounded-lg p-4">
      <div className="flex pl-5 md:pl-10 pb-2 pt-2 justify-between items-center">
        <div className="border-b-[3px] border-b-MainColor ">
          <h1 className="text-CardColor">{t("header.bargaining")}</h1>
        </div>
        <Link
          to="/bargaining-products"
          className="mr-5 md:mr-10 pb-1 pt-1 pl-2 pr-2 md:pl-3 md:pr-3 bg-MainColor rounded-full text-CardColor shadow-lg hover:bg-MainColorHover text-sm"
        >
          {t("viewMore.viewMore")}
        </Link>
      </div>
      <FlashSaleBanner
        bannerURL={
          "https://i.ibb.co/HPzrRX1/Building-a-Discount-Strategy-From-Scratch-Beware-of-Bargain-Hunters-linkedin.png"
        }
      ></FlashSaleBanner>
      <div className="">
        <div className="flex overflow-x-auto scrollbar-hide gap-4 snap-x pt-5">
          {bargainingProducts?.length > 0 ? (
            bargainingProducts?.map((product, i) => (
              <Cart2 product={product} key={i} />
            ))
          ) : (
            <div className="mx-auto">
              <EmptyContent text="No Bargaining Product Available!"></EmptyContent>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BargainingProducts;

const Cart2 = ({ product }) => {
  const { t } = useTranslation();
  const [isSm, setIsSm] = useState(window.innerWidth >= 640 );
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
  // const { user,setCartUpdate } = useContext(AuthContext);
  // const navigate = useNavigate();
  // TODO
  const url = "https://api.banglamartecommerce.com.bd";

  const [hover, setHover] = useState(false);
  // const [heartIconHover, setHeartIconHover] = useState(false);
  // const [cartIconHover, setCartIconHover] = useState(false);

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
  //         setCartUpdate(res.data)
  //       })
  //       .catch((error) => {
  //         console.log(error.response.data.message);
  //       });
  //   } else {
  //     Swal.fire('Please LogIn')
  //     navigate('/login')
  //   }
  // };
  return (
    <Link
      to={`/productDetails/${product?.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex-shrink-0 ${isSm || "w-[40%]"} ${
        isSm && "w-[16%]"
      } snap-start cursor-pointer group aspect-[230/310]  rounded-xl relative overflow-hidden border border-BorderColor hover:border-MainColor`}
    >
      <div className="inset-0 bg-CardColor absolute w-full h-full group-hover:scale-110 ease-in-out duration-300">
        <img
          src={`${url}${product?.thumbnail}`}
          className="object-fill w-full h-full pb-10 p-4"
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
              <p
                className={`relative font-semibold ${
                  hover ? "text-CardColor" : "text-[#f84545]"
                } `}
              >
                {product?.price} ৳
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
    </Link>
  );
};
