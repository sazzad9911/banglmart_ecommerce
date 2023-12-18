import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Header from "../pages/Shared/Header/Header";
import Footer from "../pages/Shared/Footer/Footer";
import PopUpAdd from "../components/PopUpAdd";
import { useDispatch } from "react-redux";
import { fetchDivisions } from "../services/actions/divisionActions";
import { fetchDistricts } from "../services/actions/districtAction";
import { fetchUpazilas } from "../services/actions/upazilaAction";
import { fetchUnions } from "../services/actions/unionAction";
import { fetchAllCategories } from "../services/actions/allCategoriesAction";
import { fetchFlashSell } from "../services/actions/flashSellCheckAction";
import { fetchAllSellerData } from "../services/actions/allSellerAction";
import { useContext } from "react";
import { AuthContext } from "./../providers/AuthProvider";
import init from "./../visitor";
import { fetchBargainingProducts } from "../services/actions/bargainingProductAction";
import { fetchForYouProducts } from "../services/actions/forYouProductAction";
import { fetchBestSellingProducts } from "../services/actions/bestSellingAction";
import { fetchNewProducts } from "./../services/actions/newProductsAction";
import { fetchTopProducts } from "./../services/actions/topProductsAction";
import { fetchBrand } from "../services/actions/brandAction";
import socket from "./../socket";
import Chat from "../components/Chat";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebase.config";
import { putApi } from "../apis";
import MessengerCustomerChat from "react-messenger-customer-chat";
import logo from "../logo.png";
import { Helmet } from "react-helmet";
const hostname="https://banglamartecommerce.com.bd"

const Main = () => {
  const { user } = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState(true);
  const [adds, setAdds] = useState(false);

  useEffect(() => {
    fetch();

    user &&
      socket.emit("join", {
        user: user,
        id: socket.id,
      });
  }, [user]);

  const fetch = async () => {
    const data = await init(user?.uid);
    localStorage.setItem("visitorId", data?.id);
  };

  // data load
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDivisions());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchDistricts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchUpazilas());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchUnions());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllSellerData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchBargainingProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchForYouProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchBestSellingProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchNewProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchBrand());
  }, [dispatch]);

  // isFlash sell available or not
  useEffect(() => {
    dispatch(fetchFlashSell());
  }, [dispatch]);

  const permissionNotification = async () => {
    const uToken = localStorage.getItem("token");
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BAGY8xyEozImmuKGGvtxWvsXVj4cf9Xe0Cj_MQdQUS4IbAEBjjZOXF3XcHBMaGfSPhqpuhtHccXAJ_ZXKTo_OoE",
      });
      // console.log(token);
      await putApi(
        "/auth/update",
        {
          pushToken: token,
        },
        uToken
      );
    } else {
      alert.error("We are unable to send you notification");
    }
  };

  useEffect(() => {
    if (user) {
      permissionNotification().catch(() => {
        alert.error("Failed to send permission notification");
      });
    }
  }, [user]);
  return (
    <div>
      <Helmet>
        <title>Banglamart Ecommerce- Home</title>
        <meta name="title" content="Banglamart Ecommerce- Home"></meta>
        <meta name="description" content="Banglamart is the operator of the eCommerce platform intended to provide food, grocery, classifieds, accounting, and inventory solutions. The company platform provides a wide range of food, grocery, electronics, clothing, and other similar products, enabling customers to access all products on one platform." />
        <meta name="keywords" content="shop, shoping, bangla, banglamart, ecommerce, bm, banglamartecommerce, store, seller, buy"></meta>
        <meta
          name="msapplication-TileImage"
          content={hostname+logo}
        ></meta>

        <meta property="og:site_name" content="Banglamart E-commerce"></meta>
        <meta property="og:title" content="Banglamart E-commerce"></meta>
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
      <div className={`${adds ? "h-screen overflow-y-hidden" : ""}`}>
        <div className={`${adds ? "block" : "hidden"}`}>
          <PopUpAdd setAdds={setAdds}></PopUpAdd>
        </div>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
        <Chat></Chat>
        <Messenger></Messenger>
        <ScrollToTop />
      </div>
    </div>
  );
};

export default Main;
const Messenger = () => {
  return (
    <MessengerCustomerChat
      pageId="100400156313605"
      appId="3431963443781979"
     
    />
    // <div className="h-10 w-10 bg-MainColor"></div>
  );
};
