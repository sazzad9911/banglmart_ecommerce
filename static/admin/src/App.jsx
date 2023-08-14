import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import useLoader from "hooks/useLoader";
import { ThreeCircles } from "react-loader-spinner";
import { setUser } from "reducers/user";
import { ChakraProvider } from "@chakra-ui/react";
import SellerLayout from "layouts/seller";
import BrandLayout from "layouts/brand";
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
      <Provider store={store}>
        <Views />
      </Provider>
    </ChakraProvider>
  );
};

const Views = () => {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      fetching2();
      fetching();

      fetching3();
      fetching4();
      fetching5()
    }
  }, [user, isLoading]);

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
    const res = await getVariant(user.user.id);
    dispatch(setVariant(res.data));
  };
  const fetching5 = async () => {
    const res = await getFlashSellApi();
    dispatch(setFlashSell(res.data));
  };
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Routes>
        {!user && <Route path="auth/*" element={<AuthLayout />} />}
        {/* {user && <Route path="seller/*" element={<SellerLayout />} />} */}
        {user && user?.user?.role == 4 && (
          <Route path="admin/*" element={<AdminLayout />} />
        )}
        {user && user?.user?.role == 4 && (
          <Route path="/" element={<Navigate to="/admin" replace />} />
        )}

        {user && user?.user?.role == 3 && (
          <Route path="brand/*" element={<BrandLayout />} />
        )}
        {user && user?.user?.role == 3 && (
          <Route path="/" element={<Navigate to="/brand" replace />} />
        )}

        {user && user?.user?.role == 2 && (
          <Route path="seller/*" element={<SellerLayout />} />
        )}
        {user && user?.user?.role == 2 && (
          <Route path="/" element={<Navigate to="/seller" replace />} />
        )}

        {!user && <Route path="*" element={<Navigate to="/auth" replace />} />}
      </Routes>

      {isLoading && (
        <div className=" fixed top-0 left-0 bottom-0 right-0 z-10 flex h-[100vh] w-[100vw] items-center justify-center bg-[#61616148]">
          <Loader />
        </div>
      )}
    </AlertProvider>
  );
};
export default App;
export const Loader = () => {
  return (
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
  );
};
