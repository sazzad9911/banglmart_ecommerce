import { useState, useEffect, useContext } from "react";
import {
  AiFillPhone,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBell,
  AiOutlineComment,
} from "react-icons/ai";
import LanguageToggle from "../../../components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import Burger from "./Nav/Burger";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import {
  TbListDetails,
  TbLogout2,
  TbTruckDelivery,
  TbUserShield,
} from "react-icons/tb";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { PiSmileySadLight } from "react-icons/pi";
import { deleteApi, getApi } from "../../../apis";
import { FaCoins } from "react-icons/fa";
const Header = () => {
  const { user, logOut, cart,language } = useContext(AuthContext);
  const url = "https://api.banglamartecommerce.com.bd";
  const navigate=useNavigate()
  // console.log(user);
  const from = location.state?.from?.pathname || "/";

  const { t } = useTranslation();

  const handleLogOut = () => {
    logOut();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Log Out successfully.",
      showConfirmButton: false,
      timer: 1500,
    });
    Navigate(from, { replace: true });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reLoad, setReLoad] = useState(null);
  useEffect(() => {
    if (searchQuery.length > 0) {
      setLoading(true);

      getApi(`/product/search?query=${searchQuery}&limit=10`, null)
        .then((results) => {
          setSearchResults(results.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [searchQuery, reLoad]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = (e) => {
    setReLoad(e.timeStamp);
    navigate(`/search/${searchQuery}`)
    setSearchQuery("");
  };
  const handleSearchClose = () => {
    setSearchQuery("");
  };

  const [scrollingDown, setScrollingDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingDown(currentScrollY > prevScrollY && currentScrollY > 150);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  const headerOpacity = scrollingDown ? 0 : 1;
  const handlePhoneClick = () => {
    window.location.href = "tel:+8809649110110";
  };
  const [countMessage, setCountMessage] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    getApi("/message/unread", token).then((res) => {
      setCountMessage(res.data.data);
    });
  }, []);
  return (
    <div className="pt-[120px] md:pt-[150px] lg:pt-[175px]">
      <div
        className={`fixed ${scrollingDown?"top-[-180px]":"top-0"} left-0 w-full z-30 shadow-lg shadow-SubTextColor`}
        style={{  transition: "top 0.5s" }}
      >
        {/* number Section  */}
        <div className=" bg-CardColor border-b-BorderColor hidden border-b-[1px]  md:block">
          <div className="container mx-auto p-2">
            <div className="flex justify-between">
              <div className="-ml-1">
                <LanguageToggle></LanguageToggle>
              </div>
              <div className="flex items-center">
                <AiFillPhone className=" text-SubTextColor" />
                <p
                  onClick={handlePhoneClick}
                  className="cursor-pointer text-SubTextColor lg:mr-0"
                >
                  {t("header.number")}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* search logo section  */}
        <div className="bg-CardColor border-b-BorderColor border-b-[1px]">
          <div className="container mx-auto p-1">
            <div className="flex items-center justify-between ">
              <div className=" h-16 w-16 rounded-full lg:h-20 lg:w-20">
                <Link className="" to="/">
                  <img
                    className="h-16 w-16 lg:h-20 lg:w-20 "
                    src="https://i.ibb.co/GPpX7Bd/banglamart-logo.png"
                    alt=""
                  />
                </Link>
              </div>
              {/* search  */}
              <div>
                <div className="relative mr-2 ml-2 w-[220px] rounded-full shadow-sm shadow-[#b6b6b6] md:mr-0 md:ml-0 sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px]">
                  <input
                    className="focus:border-MainColor outline-MainColor w-full rounded-full py-2 pl-4 pr-4 focus:outline-1"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={`${language? 'Search...':'সার্চ...'}`}
                  />

                  <div className="bg-MainColor absolute inset-y-0 right-0 flex items-center justify-center rounded-r-full pl-3 pr-3 rounded-e-lg">
                    <motion.button
                      onClick={handleSearch}
                      whileHover={{ scale: 1.4 }}
                      whileTap={{ scale: 0.8 }}
                      className=""
                    >
                      <AiOutlineSearch className="text-CardColor text-[25px]  " />
                    </motion.button>
                  </div>
                </div>
                {searchQuery && (
                  <div className="mr-2 ml-2 md:mr-0 md:ml-0 search-results absolute bg-BorderColor z-10 w-[220px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] p-2 rounded-md text-SubTextColor max-h-[400px] lg:max-h-[500px] overflow-y-auto">
                    <h1 className="text-center bg-CardColor rounded">
                    {language ? 'Products':'পণ্য'}
                    </h1>
                    {loading ? (
                      <div className="flex justify-center items-center p-10">
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="xl"
                        />
                      </div>
                    ) : searchResults?.length > 0 ? (
                      searchResults?.map((product) => (
                        <SearchProductCart
                          key={product.id}
                          product={product}
                          handleSearchClose={handleSearchClose}
                        ></SearchProductCart>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center mt-4">
                        <PiSmileySadLight className="text-SubTextColor text-4xl"></PiSmileySadLight>
                        <p className="text-SubTextColor">{language ? 'No result found':'কিছু খুজে পাওয়া জাইনি'}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* <button className="flex items-center ml-5 relative hover:border hover:border-BorderColor p-1 border border-CardColor rounded-md">
                  <AiOutlineHeart className="text-[30px] text-SubTextColor" />
                  <div className="">
                    <div className="absolute flex justify-center right-[60px] -top-2 text-[10px] bg-MainColor text-CardColor rounded-full h-5 w-5 items-center">
                      10
                    </div>
                    <p className=" text-SubTextColor">Wishlist</p>
                  </div>
                </button> */}
              <div className="flex items-center">
                <div className="md:flex hidden">
                  {user ? (
                    <Menu>
                      <MenuButton className="hover:border-BorderColor border-CardColor relative ml-2 md:flex hidden items-center rounded-md border hover:border ">
                        <AiOutlineComment className="text-SubTextColor text-[30px]" />
                        <div>
                          {countMessage > 0 ? (
                            <div className="bg-MainColor text-CardColor absolute right-[15px] -top-3 flex h-5 w-5 items-center justify-center rounded-full text-[10px]">
                              {countMessage}
                            </div>
                          ) : null}
                        </div>
                      </MenuButton>
                      <MenuList bg="#ecf8f8">
                        <ConversationList user={user} />
                      </MenuList>
                    </Menu>
                  ) : null}
                </div>
                <Link
                  to="/notifications"
                  className="hover:border-BorderColor border-CardColor relative ml-2 md:flex hidden items-center rounded-md border hover:border "
                >
                  <AiOutlineBell className="text-SubTextColor text-[30px]" />
                  <div>
                    <div className="bg-MainColor text-CardColor absolute right-[12px] -top-3 flex h-5 w-5 items-center justify-center rounded-full text-[10px]">
                      1
                    </div>
                  </div>
                </Link>
                <Link
                  to="/cart"
                  className="hover:border-BorderColor border-CardColor relative ml-2 md:flex hidden items-center rounded-md border hover:border mr-2"
                >
                  <AiOutlineShoppingCart className="text-SubTextColor text-[30px]" />
                  <div>
                    <div className="bg-MainColor text-CardColor absolute right-[35px] -top-3 flex h-5 w-5 items-center justify-center rounded-full text-[10px]">
                      {user ? (cart?.length > 9 ? "9+" : cart?.length) : "0"}
                    </div>
                    <p className=" text-SubTextColor">{language ? 'Cart':'ঝুরি'}</p>
                  </div>
                </Link>

                {user ? (
                  <Menu>
                    <MenuButton>
                      <Avatar
                        bg="teal.500"
                        icon={<AiOutlineUser fontSize="1.5rem" />}
                        size="md"
                        name={user?.name}
                        src={`${url}${user?.image}`}
                      />
                    </MenuButton>
                    <MenuList>
                      <h2 className="text-center text-SubTextColor">
                        Welcome {user?.name}
                      </h2>
                      <MenuGroup title="Profile">
                        <MenuItem>
                          <Link
                            className="text-SubTextColor flex items-center"
                            to="/profile"
                          >
                            <CgProfile className="text-[18px] text-SubTextColor mr-2" />

                            <h3 className="hover:underline">{language ? 'Profile':'প্রফাইল'}</h3>
                            <FaCoins className="ml-4 mr-1 text-[16px] text-[#ffdb3a]" />
                            <p className="text-[#ffdb3a]">{user?.coin}</p>
                          </Link>
                        </MenuItem>
                        {user?.role === 2 ? (
                          <MenuItem>
                            <a
                              className="text-SubTextColor flex items-center"
                              href="https://admin.banglamartecommerce.com.bd/"
                              target="blank"
                            >
                              <TbUserShield className="text-[18px] text-SubTextColor mr-2" />
                              <h3 className="hover:underline">{language ? 'Admin Panel':'এডমিন পেনেল'}</h3>
                            </a>
                          </MenuItem>
                        ) : (
                          ""
                        )}
                        <MenuItem>
                          <Link
                            className="text-SubTextColor flex items-center"
                            to="/track-order"
                          >
                            <TbListDetails className="text-[18px] text-SubTextColor mr-2" />

                            <h3 className="hover:underline">{language ? 'My Orders':'মাই অরডার'}</h3>
                          </Link>
                        </MenuItem>
                        {/* <MenuItem>
                          <Link
                            className="text-SubTextColor flex items-center"
                            to="/track-order"
                          >
                            <TbBrandMessenger className="text-[18px] text-SubTextColor mr-2" />

                            <h3 className="hover:underline">Conversation</h3>
                          </Link>
                        </MenuItem> */}
                        <MenuItem>
                          <Link
                            className="text-SubTextColor flex items-center"
                            to="/addDeliveryAddress"
                          >
                            <TbTruckDelivery className="text-[18px] text-SubTextColor mr-2" />
                            <h3 className="hover:underline">
                            {language ? 'Delivery Address':'ডেলিভারি ঠিকানা'}
                            </h3>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link className="text-SubTextColor flex items-center">
                            <TbLogout2 className="text-[18px] text-SubTextColor mr-2" />
                            <h3
                              className="hover:underline"
                              onClick={handleLogOut}
                            >
                            {language ? 'Log Out':'লগ আউট'}
                            </h3>
                          </Link>
                        </MenuItem>
                      </MenuGroup>
                      <MenuGroup title="Help">
                        <MenuItem>
                          <Link to="/support">
                            <h3 className="hover:underline">{language ? 'Support':'যোগাযোগ'}</h3>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/faq">
                            <h3 className="hover:underline">FAQ</h3>
                          </Link>
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                ) : (
                  <Link
                    to="/login"
                    className="hover:border-BorderColor border-CardColor w-[75px] rounded-md border  hover:border "
                  >
                    <div className="flex items-center justify-between">
                      <AiOutlineUser className="text-SubTextColor text-[30px]" />
                      <p className=" text-SubTextColor">{language ? 'Sign Up':'সাইন আপ'}</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* navigation section  */}
        <div className="bg-CardColor ">
          <div className="container mx-auto p-2">
            {/* Big screen  */}
            <div className=" hidden md:block">
              <div className="flex justify-between">
                <NavLink
                  className="text-SubTextColor hover:underline hover:text-TextColor"
                  to="/"
                >
                  <h2>{t("header.home")}</h2>
                </NavLink>
                <NavLink
                  className="hover:underline text-SubTextColor hover:text-TextColor"
                  to="/category"
                >
                  <h2>{t("header.category")}</h2>
                </NavLink>
                <NavLink
                  className="hover:underline text-SubTextColor hover:text-TextColor"
                  to="/flash-sell"
                >
                  <h2>{t("header.flash")}</h2>
                </NavLink>
                <NavLink
                  className="hover:underline text-SubTextColor hover:text-TextColor"
                  to="/bargaining-products"
                >
                  <h2>{t("header.bargaining")}</h2>
                </NavLink>
                <NavLink
                  className="hover:underline text-SubTextColor hover:text-TextColor"
                  to="/all-seller"
                >
                  <h2>{t("header.seller")}</h2>
                </NavLink>
                {/* <Link className="hover:underline text-SubTextColor hover:text-TextColor" to="/">
                  Affiliating
                </Link> */}

                <NavLink
                  className="hover:underline text-SubTextColor hover:text-TextColor"
                  to="/brands"
                >
                  <h2>{t("header.brand")}</h2>
                </NavLink>
                <NavLink
                  className="hover:underline text-SubTextColor hover:text-TextColor"
                  to="/track-order"
                >
                  <h2>{t("header.track")}</h2>
                </NavLink>
                <NavLink
                  className="hover:underline text-SubTextColor hover:text-TextColor"
                  to="/support"
                >
                  <h2>{t("header.support")}</h2>
                </NavLink>
              </div>
            </div>
            {/* Small screen  */}
            <div className="relative flex items-center justify-between p-1 md:hidden">
              <Burger></Burger>
              <div className="flex items-center">
                <div>
                  {user ? (
                    <Menu>
                      <MenuButton className="hover:border-BorderColor border-CardColor relative ml-2 flex md:hidden items-center rounded-md border hover:border ">
                        <AiOutlineComment className="text-SubTextColor text-[20px]" />
                        <div>
                          {countMessage > 0 && (
                            <div className="bg-MainColor text-CardColor absolute right-[12px] -top-[6px] flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
                              <p className="text-[10px]">{countMessage}</p>
                            </div>
                          )}
                        </div>
                      </MenuButton>
                      <MenuList bg="#ecf8f8">
                        <MenuItem bg="#ecf8f8">
                          <ConversationList useu={user} />
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ) : null}
                </div>
                <Link
                  to="/notifications"
                  className="hover:border-BorderColor border-CardColor relative ml-2 flex md:hidden items-center rounded-md border hover:border "
                >
                  <AiOutlineBell className="text-SubTextColor text-[20px]" />
                  <div>
                    <div className="bg-MainColor text-CardColor absolute right-[12px] -top-[6px] flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
                      <p className="text-[10px]">1</p>
                    </div>
                  </div>
                </Link>
                <Link
                  to="/cart"
                  className="hover:border-BorderColor border-CardColor relative ml-2 flex md:hidden items-center rounded-md border hover:border mr-2"
                >
                  <AiOutlineShoppingCart className="text-SubTextColor text-[20px]" />
                  <div>
                    <div className="bg-MainColor text-CardColor absolute right-[35px] -top-[6px] flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
                      <p className="p-[1px]">
                        {cart?.length > 9 ? "9+" : cart?.length}
                      </p>
                    </div>
                    <p className=" text-SubTextColor">{language ? 'Cart':'ঝুরি'}</p>
                  </div>
                </Link>
                <LanguageToggle></LanguageToggle>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

const ConversationList = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  // console.log(conversations);
  const [update, setUpdate] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    getApi("/message/get", token).then((res) => {
      setConversations(res.data.data);
    });
  }, [user, update]);

  const handleDeleteConversation = (conversationId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        deleteApi(
          `/message/delete?conversationId=${conversationId}`,
          token
        ).then((res) => {
          setUpdate(res);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
  };
  return (
    <div className="max-h-[300px] overflow-y-auto">
      {conversations.length > 0 ? (
        conversations?.map((conversation, i) => (
          <ConversationCard
            key={i}
            conversation={conversation}
            conversationId={conversation.id}
            productImage={conversation.product.thumbnail}
            lastMessage={conversation?.messages[0]?.message}
            shopName={conversation.product.title}
            handleDeleteConversation={handleDeleteConversation}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center">
          <PiSmileySadLight className="text-SubTextColor text-xl"></PiSmileySadLight>
          <h3 className="text-SubTextColor">Empty Message</h3>
        </div>
      )}
    </div>
  );
};

const ConversationCard = ({
  productImage,
  lastMessage,
  shopName,
  handleDeleteConversation,
  conversationId,
  conversation,
}) => {
  const { handleMessageShow } = useContext(AuthContext);

  const url = "https://api.banglamartecommerce.com.bd";
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-CardColor border-[1px] border-MainColor rounded-lg shadow-md p-2 m-2 flex items-center justify-between w-[300px] md:w-[400px] cursor-pointer"
    >
      <div
        onClick={() => handleMessageShow(conversation)}
        className="flex items-center"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={`${url}${productImage}`}
            className="h-16 w-16 rounded-full"
            alt="Sender"
          />
        </div>
        <div className="">
          <div className="font-semibold line-clamp-1">{shopName}</div>
          {lastMessage ? (
            <div className="text-gray-600 w-36 line-clamp-1 ">
              {lastMessage}
            </div>
          ) : (
            "start conversation!"
          )}
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={() => handleDeleteConversation(conversationId)}
        className="bg-SubTextColor p-1 rounded-full"
      >
        <MdDeleteForever className="text-xl text-[#ff3e3e]"></MdDeleteForever>
      </motion.div>
    </motion.div>
  );
};

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";
import { MdDeleteForever } from "react-icons/md";

const SearchProductCart = ({ product, handleSearchClose }) => {
  // console.log(product);

  const url = "https://api.banglamartecommerce.com.bd";
  const navigate=useNavigate()
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

  return (
    <div onClick={()=>{
      handleSearchClose()
      navigate(`/productDetails/${product?.id}`)
    }} >
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="m-1 lg:m-3 bg-CardColor p-1 rounded shadow shadow-MainColor"
      >
        <div className="flex items-center">
          <div className="mt-1 mb-1">
            <img
              src={`${url}${product?.thumbnail}`}
              className="object-cover rounded w-12 h-12 lg:w-20 lg:h-20"
            />
          </div>
          <div className="pl-2 ">
            <Link
              onClick={handleSearchClose}
              to={`/productDetails/${product?.id}`}
              className={`relative hover:underline break-all line-clamp-1 `}
            >
              <h2>{product?.title}</h2>
            </Link>
            <div className="flex flex-wrap">
              <div className="flex flex-wrap mr-2">
                {product?.price > newPrice && (
                  <p className={`relative mr-1 line-through text-MainColor`}>
                    {Math.ceil(product?.price)} ৳
                  </p>
                )}
                <h3 className="text-MainColor font-bold">
                  {Math.ceil(newPrice)} ৳
                </h3>
              </div>
              <Rating
                initialRating={3.5}
                readonly
                emptySymbol={<AiOutlineStar className="text-sm" />}
                fullSymbol={<AiFillStar className="text-sm" />}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
