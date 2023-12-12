import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import Category from "views/admin/category";

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
  MdProductionQuantityLimits,
  MdBackupTable,
  MdFeedback,
  MdOutlinePostAdd,
  MdLocalOffer,
  MdSupportAgent,
  MdCampaign,
} from "react-icons/md";
import ForgetPassword from "views/auth/ForgetPassword";
import Product from "views/admin/product";
import Variants from "views/admin/variants";
import { AiOutlinePayCircle, AiOutlineShopping } from "react-icons/ai";
import Offers from "views/admin/offers";
import Flash from "views/admin/flash";
import Coins from "views/admin/coins";
import { IoIosFlash } from "react-icons/io";
import { FaBitcoin, FaPager, FaUserCircle } from "react-icons/fa";
import Quantity from "views/admin/quantity";
import FeedBack from "views/admin/feedback";
import ManageUsers from "views/admin/manageUser";
import POS from "views/admin/pos";
import OfferCodes from "views/admin/code";
import Settings from "views/admin/settings";
import { FcSettings } from "react-icons/fc";
import { IoSettings } from "react-icons/io5";
import ManageAdds from "views/admin/adds";
import ContactUs from "views/admin/contact";
import AddProduct from "views/admin/product/AddProduct";
import EditProduct from "views/admin/product/EditProduct";
import OrderDetails from "views/admin/pos/OrderDetails";
import ChatScreen from "views/admin/feedback/ChatScreen";
import Campaign from "views/admin/campaign";
import CampaignProduct from "views/admin/campaign/CampaignProduct";
import AddCampaign from "views/admin/campaign/AddProduct";
import AddCampaignProduct from "views/admin/campaign/AddCampaignProduct";

const adminRoutes = [
  {
    name: "Main Dashboard",
    layout: "/panel/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Category",
    layout: "/panel/admin",
    path: "category",
    icon: <MdCategory className="h-6 w-6" />,
    component: <Category />,
  },
  {
    name: "Manage Accounts",
    layout: "/panel/admin",
    path: "accounts",
    icon: <FaUserCircle className="h-6 w-6" />,
    component: <ManageUsers />,
  },
  {
    name: "Specialization & Variants",
    layout: "/panel/admin",
    path: "variants",
    icon: <MdBackupTable className="h-6 w-6" />,
    component: <Variants />,
  },
  {
    name: "Product",
    layout: "/panel/admin",
    path: "product",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: <Product />,
  },
  {
    name: "Product",
    layout: "/panel/admin/",
    path: "product/add",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: <AddProduct />,
  },
  {
    name: "Product",
    layout: "/panel/admin/",
    path: "product/edit",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: <EditProduct />,
  },

  {
    name: "Flash Sell",
    layout: "/panel/admin",
    path: "flash",
    icon: <IoIosFlash className="h-6 w-6" />,
    component: <Flash />,
  },
  {
    name: "Campaign",
    layout: "/panel/admin",
    path: "campaign",
    icon: <MdCampaign className="h-6 w-6" />,
    component: <Campaign />,
  },
  {
    name: "Campaign",
    layout: "/panel/admin/",
    path: "campaign/:id",
    icon: <MdCampaign className="h-6 w-6" />,
    component: <CampaignProduct />,
  },
  {
    name: "Campaign",
    layout: "/panel/admin/",
    path: "campaign/add/:id",
    icon: <MdCampaign className="h-6 w-6" />,
    component: <AddCampaignProduct />,
  },
  {
    name: "Campaign",
    layout: "/panel/admin/",
    path: "campaign/new/:id",
    icon: <MdCampaign className="h-6 w-6" />,
    component: <AddCampaign />,
  },
  {
    name: "FeedBack",
    layout: "/panel/admin",
    path: "feed-back",
    icon: <MdFeedback className="h-6 w-6" />,
    component: <FeedBack />,
  },
  {
    name: "FeedBack",
    layout: "/panel/admin/",
    path: "feed-back/view",
    icon: <MdFeedback className="h-6 w-6" />,
    component: <ChatScreen />,
  },
  
  {
    name: "Order Management",
    layout: "/panel/admin",
    path: "pos",
    icon: <MdOutlinePostAdd className="h-6 w-6" />,
    component: <POS />,
  },
  {
    name: "Order Management",
    layout: "/panel/admin/",
    path: "pos/:id",
    icon: <MdOutlinePostAdd className="h-6 w-6" />,
    component: <OrderDetails />,
  },
  {
    name: "Offer Codes",
    layout: "/panel/admin",
    path: "codes",
    icon: <MdLocalOffer className="h-6 w-6" />,
    component: <OfferCodes />,
  },
  {
    name: "Ads & Pages",
    layout: "/panel/admin",
    path: "pages",
    icon: <FaPager className="h-6 w-6" />,
    component: <ManageAdds />,
  },
  {
    name: "User Contacts",
    layout: "/panel/admin",
    path: "contacts",
    icon: <MdSupportAgent className="h-6 w-6" />,
    component: <ContactUs />,
  },
  {
    name: "Settings",
    layout: "/panel/admin",
    path: "settings",
    icon: <IoSettings className="h-6 w-6" />,
    component: <Settings />,
  },

  // {
  //   name: "NFT Marketplace",
  //   layout: "/panel/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/panel/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Profile",
  //   layout: "/panel/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
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
    path: "phone-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <ForgetPassword />,
  },
];
export default adminRoutes;
