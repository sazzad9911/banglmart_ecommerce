import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import {
  transitions,
  positions,
  Provider as AlertProvider,
  useAlert,
} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import useLoader from "hooks/useLoader";
import { ThreeCircles } from "react-loader-spinner";
import { setUser } from "reducers/user";
import { ChakraProvider } from "@chakra-ui/react";
import SellerLayout from "layouts/seller";
import { extendTheme } from "@chakra-ui/react";
import { getCategory } from "api/category";
import { setCategory } from "reducers/category";
import { getSubCategory } from "api/category";
import { setSubCategory } from "reducers/sub-category";
import { getOptions } from "api/category";
import { setOption } from "reducers/option";
import { getAllProduct } from "api/productApi";
import { setProduct } from "reducers/product";
import { getVariant } from "api/productApi";
import { getColor } from "api/productApi";
import { getSize } from "api/productApi";
import { setColor } from "reducers/multiple";
import { setSize } from "reducers/multiple";
import { setVariant } from "reducers/multiple";
import { getFlashSellApi } from "api/productApi";
import { setFlashSell } from "reducers/multiple";
import { getApi } from "api/api";
import { setAllUser } from "reducers/multiple";
import { setAllBrand } from "reducers/multiple";
import { setAllShop } from "reducers/multiple";
import Nothing from "Nothing";
import SignIn from "views/auth/SignIn";
import ForgetPassword from "views/auth/ForgetPassword";
import socket from "api/socket";
import { setAllAds } from "reducers/multiple";
import { setAllSlider } from "reducers/multiple";
import { setAllBanner } from "reducers/multiple";
import { setAllComments } from "reducers/multiple";
import { setAllConversation } from "reducers/multiple";
import { getToken } from "firebase/messaging";
import { messaging,app } from "./firebase";
import { putApi } from "api/api";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

// 3. extend the theme

const App = () => {
  return (
    <ChakraProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <Provider store={store}>
          <Views />
        </Provider>
      </AlertProvider>
    </ChakraProvider>
  );
};

const Views = () => {
  const isLoading = useSelector((state) => state.isLoading);
  const change = useSelector((state) => state.change);
  const dispatch = useDispatch();
  const oldUser = JSON.parse(localStorage.getItem("user"));
  const alert = useAlert();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (oldUser) {
      dispatch(setUser(oldUser));
      socket.emit("join", {
        user: oldUser?.user,
        id: socket.id,
      });
    }
  }, [oldUser]);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      // fetching2();
      fetching();
      fetching3();
      fetching4();
      fetching5();
      allUser();
      allBrand();
      allShop();
      allAdds();
      allSlider();
      allBanner();
      allComments();
     // allConversation();
    }
  }, [user, change]);
  useEffect(() => {
    if (user) {
      fetching2();
      permissionNotification().catch((err) => {
        alert.error("Failed to send permission notification");
      });
    }
  }, [user]);

  const permissionNotification = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BAGY8xyEozImmuKGGvtxWvsXVj4cf9Xe0Cj_MQdQUS4IbAEBjjZOXF3XcHBMaGfSPhqpuhtHccXAJ_ZXKTo_OoE",
      });
      console.log(token);
      await putApi(
        "/auth/update",
        {
          pushToken: token,
        },
        user.token
      );
    } else {
      alert.error("We are unable to send you notification");
    }
  };

  const fetching = async () => {
    const res = await getCategory();
    dispatch(setCategory(res.data));
    const sub = await getSubCategory();
    dispatch(setSubCategory(sub.data));
    const op = await getOptions();
    dispatch(setOption(op.data));
  };
  const fetching2 = async () => {
    const product = await getAllProduct(user?.user?.id);
    dispatch(setProduct(product));
  };
  const fetching3 = async () => {
    const colors = await getColor(user.user.id);
    dispatch(setColor(colors.data));
    const size = await getSize();
    dispatch(setSize(size.data));
  };
  const fetching4 = async () => {
    const res = await getVariant();
    dispatch(setVariant(res.data));
  };
  const fetching5 = async () => {
    const res = await getFlashSellApi();
    dispatch(setFlashSell(res.data));
  };
  const allUser = async () => {
    const res = await getApi("/auth/getAllUser");
    dispatch(setAllUser(res.data.data));
  };
  const allBrand = async () => {
    const res = await getApi("/store/allBrand");
    dispatch(setAllBrand(res.data.data));
  };
  const allShop = async () => {
    const res = await getApi("/store/allSeller");
    dispatch(setAllShop(res.data.data));
  };
  const allAdds = async () => {
    const res = await getApi("/adds/get-all");
    dispatch(setAllAds(res.data.data));
  };
  const allSlider = async () => {
    const res = await getApi("/adds/get/slider");
    dispatch(setAllSlider(res.data.data));
  };
  const allBanner = async () => {
    const res = await getApi("/adds/get/banner");
    dispatch(setAllBanner(res.data.data));
  };
  const allComments = async () => {
    const res = await getApi("/comment/get", user.token);
    dispatch(setAllComments(res.data.data));
  };
 

  return (
    <div>
      <Routes>
        <Route
          path={`${
            user && user?.user?.role === 4
              ? "/panel/admin/*"
              : user && user?.user?.role === 2
              ? "/panel/seller/*"
              : "/panel/auth/*"
          }`}
          element={
            user && user?.user?.role === 4 ? (
              <AdminLayout />
            ) : user && user?.user?.role === 2 ? (
              <SellerLayout />
            ) : (
              <AuthLayout />
            )
          }
        />
        <Route
          path="/panel"
          element={
            <Navigate
              to={`${
                user && user?.user?.role === 4
                  ? "/panel/admin"
                  : user && user?.user?.role === 2
                  ? "/panel/seller"
                  : "/panel/auth"
              }`}
              replace
            />
          }
        />

        <Route path="*" element={<Nothing />} />
      </Routes>

      {isLoading && (
        <div className=" fixed top-0 left-0 bottom-0 right-0 z-10 flex h-[100vh] w-[100vw] items-center justify-center bg-[#61616148]">
          <Loader />
        </div>
      )}
    </div>
  );
};
export default App;
export const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ThreeCircles
        height="100"
        width="100"
        color="#1833F9"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
};
