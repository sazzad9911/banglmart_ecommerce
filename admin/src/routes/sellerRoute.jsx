import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdCategory,
  MdLocalOffer,
  MdBackupTable,
  MdProductionQuantityLimits,
  MdFeedback,
  MdOutlinePostAdd,
  MdCampaign,
} from "react-icons/md";
import ForgetPassword from "views/auth/ForgetPassword";
import { IoSettings } from "react-icons/io5";
import Settings from "views/admin/settings";
import OfferCodes from "views/admin/code";
import Category from "views/admin/category";
import { FaUserCircle } from "react-icons/fa";
import ManageUsers from "views/admin/manageUser";
import Variants from "views/admin/variants";
import Product from "views/admin/product";
import { IoIosFlash } from "react-icons/io";
import Flash from "views/admin/flash";
import FeedBack from "views/admin/feedback";
import POS from "views/admin/pos";
import AddProduct from "views/admin/product/AddProduct";
import EditProduct from "views/admin/product/EditProduct";
import OrderDetails from "views/admin/pos/OrderDetails";
import ChatScreen from "views/admin/feedback/ChatScreen";
import Campaign from "views/admin/campaign";
import AddCampaign from "views/admin/campaign/AddProduct";
import AddCampaignProduct from "views/admin/campaign/AddCampaignProduct";
import CampaignProduct from "views/admin/campaign/CampaignProduct";
import OptionList from "views/admin/category/OptionList";
import CategoryList from "views/admin/category/CategoryList";

const sellerRoutes = [
  {
    name: "Main Dashboard",
    layout: "/panel/seller",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Category",
    layout: "/panel/seller",
    path: "category",
    icon: <MdCategory className="h-6 w-6" />,
    component: <Category />,
  },
  {
    name: "Category",
    layout: "/panel/seller/",
    path: "category/:id",
    icon: <MdCategory className="h-6 w-6" />,
    component: <CategoryList />,
  },
  {
    name: "Category",
    layout: "/panel/seller/",
    path: "category/option/:id",
    icon: <MdCategory className="h-6 w-6" />,
    component: <OptionList />,
  },
  {
    name: "Manage Accounts",
    layout: "/panel/seller",
    path: "accounts",
    icon: <FaUserCircle className="h-6 w-6" />,
    component: <ManageUsers />,
  },
  {
    name: "Specialization & Variants",
    layout: "/panel/seller",
    path: "variants",
    icon: <MdBackupTable className="h-6 w-6" />,
    component: <Variants />,
  },
  {
    name: "Product",
    layout: "/panel/seller",
    path: "product",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: <Product />,
  },
  {
    name: "Product",
    layout: "/panel/seller/",
    path: "product/add",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: <AddProduct />,
  },
  {
    name: "Product",
    layout: "/panel/seller/",
    path: "product/edit",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: <EditProduct />,
  },

  {
    name: "Flash Sell",
    layout: "/panel/seller",
    path: "flash",
    icon: <IoIosFlash className="h-6 w-6" />,
    component: <Flash />,
  },
  {
    name: "Campaign",
    layout: "/panel/seller",
    path: "campaign",
    icon: <MdCampaign className="h-6 w-6" />,
    component: <Campaign />,
  },
  {
    name: "Campaign",
    layout: "/panel/seller/",
    path: "campaign/:id",
    icon: <MdCampaign className="h-6 w-6" />,
    component: <CampaignProduct />,
  },
  {
    name: "Campaign",
    layout: "/panel/seller/",
    path: "campaign/add/:id",
    icon: <MdCampaign className="h-6 w-6" />,
    component: <AddCampaignProduct />,
  },
  {
    name: "Campaign",
    layout: "/panel/seller/",
    path: "campaign/new/:id",
    icon: <MdCampaign className="h-6 w-6" />,
    component: <AddCampaign />,
  },
  {
    name: "FeedBack",
    layout: "/panel/seller",
    path: "feed-back",
    icon: <MdFeedback className="h-6 w-6" />,
    component: <FeedBack />,
  },
  {
    name: "FeedBack",
    layout: "/panel/seller/",
    path: "feed-back/view",
    icon: <MdFeedback className="h-6 w-6" />,
    component: <ChatScreen />,
  },

  {
    name: "Order Management",
    layout: "/panel/seller",
    path: "pos",
    icon: <MdOutlinePostAdd className="h-6 w-6" />,
    component: <POS />,
  },
  {
    name: "Order Management",
    layout: "/panel/seller/",
    path: "pos/:id",
    icon: <MdOutlinePostAdd className="h-6 w-6" />,
    component: <OrderDetails />,
  },
  {
    name: "Offer Codes",
    layout: "/panel/seller",
    path: "codes",
    icon: <MdLocalOffer className="h-6 w-6" />,
    component: <OfferCodes />,
  },
  {
    name: "Sign In",
    layout: "/panel/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Forget Password",
    layout: "/panel/auth",
    path: "forget-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <ForgetPassword />,
  },
];
export default sellerRoutes;
