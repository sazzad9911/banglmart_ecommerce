
import { createBrowserRouter } from "react-router-dom";
import ScrollToTopOnRouteChange from "../components/ScrollToTopOnRouteChange";
import Main from "../layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Categories from "../pages/Categories/Categories";
import Products from "../pages/Products/Products";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import TermsConditions from "../pages/Home/TermsConditions/TermsConditions";
import SellerPolicy from "../pages/SellerPolicy/SellerPolicy";
import CancellationPolicy from "../pages/CancellationPolicy/CancellationPolicy";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import ReturnPolicy from "../pages/ReturnPolicy/ReturnPolicy";
import Faq from "../pages/Faq/Faq";
import Blog from "../pages/Blog/Blog";
import SupportPolicy from "../pages/SupportPolicy/SupportPolicy";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import Cart from "../pages/Cart/Cart";
import AddDeliveryAddressForm from "../pages/AddAddress/AddAddress";
import SellerForm from "../pages/SellerForm/SellerForm";
import AllSeller from "../pages/AllSeller/AllSeller";
import FlashSalePage from "../pages/FlashSale/FlashSale";
import BrandPage from "../pages/BrandPage/BrandPage";
import ShopPage from "../pages/ShopPage/ShopPage";
import TrackOrder from "../pages/TrackOrder/TrackOrder";
import Support from "../pages/Support/Support";
import BargainingProductsPage from "../pages/BargainingProductsPage/BargainingProductsPage";
import Profile from "../pages/Profile/Profile";
import NotificationPage from "../pages/NotificationPage/NotificationPage";
import ForYouProductsPage from "../pages/ForYouProductsPage/ForYouProductsPage";
import BrandProductsPage from "../pages/BrandProductsPage/BrandProductsPage";
import VariousProductsPage from "../pages/VariousProducts/VariousProducts";
import SignUpWithPhone from "../pages/PhoneAuthentication/PhoneAuthentication";
import Search from "../pages/search/Search";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTopOnRouteChange />
        <Main />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/category",
        element: <Categories></Categories>,
      },
      {
        path: "/products/:id/:query",
        element: <Products></Products>,
      },
      {
        path: "/search/:query",
        element: <Search></Search>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/registration",
        element: <SignUp></SignUp>,
      },
      {
        path: "/termsConditions",
        element: <TermsConditions></TermsConditions>,
      },
      {
        path: "/sellerPolicy",
        element: <SellerPolicy></SellerPolicy>,
      },
      {
        path: "/cancellationPolicy",
        element: <CancellationPolicy></CancellationPolicy>,
      },
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/returnPolicy",
        element: <ReturnPolicy></ReturnPolicy>,
      },
      {
        path: "/faq",
        element: <Faq></Faq>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/supportPolicy",
        element: <SupportPolicy></SupportPolicy>,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "/addDeliveryAddress",
        element: <AddDeliveryAddressForm></AddDeliveryAddressForm>,
      },
      {
        path: "/seller-form",
        element: (
          <PrivateRoute>
            <SellerForm></SellerForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-seller",
        element: <AllSeller></AllSeller>,
      },
      {
        path: "/flash-sell",
        element: <FlashSalePage></FlashSalePage>,
      },
      {
        path: "/brands",
        element: <BrandPage></BrandPage>,
      },
      {
        path: "/shop-page",
        element: <ShopPage></ShopPage>,
      },
      {
        path: "/track-order",
        element: (
          <PrivateRoute>
            <TrackOrder></TrackOrder>
          </PrivateRoute>
        ),
      },
      {
        path: "/support",
        element: <Support></Support>,
      },
      {
        path: "/bargaining-products",
        element: <BargainingProductsPage></BargainingProductsPage>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/notifications",
        element: <NotificationPage></NotificationPage>,
      },
      {
        path: "/for-you-product-page",
        element: <ForYouProductsPage></ForYouProductsPage>,
      },
      {
        path: "/brand-product-page",
        element: <BrandProductsPage></BrandProductsPage>,
      },
      {
        path: "/various-products-page",
        element: <VariousProductsPage></VariousProductsPage>,
      },
      {
        path: "/signUp-phone-page",
        element: <SignUpWithPhone></SignUpWithPhone>,
      },
    ],
  },
]);
