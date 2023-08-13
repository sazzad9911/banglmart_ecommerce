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
  MdCategory,MdProductionQuantityLimits,MdBackupTable, MdFeedback, MdOutlinePostAdd, MdLocalOffer, MdSupportAgent
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

const adminRoutes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Category",
    layout: "/admin",
    path: "category",
    icon: <MdCategory className="h-6 w-6" />,
    component: <Category />,
  },
  {
    name: "Product",
    layout: "/admin",
    path: "product",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: < Product/>,
  },
  {
    name: "Product Variants",
    layout: "/admin",
    path: "variants",
    icon: <MdBackupTable className="h-6 w-6" />,
    component: < Variants/>,
  },
  {
    name: "Product Quantity",
    layout: "/admin",
    path: "quantity",
    icon: <AiOutlineShopping className="h-6 w-6" />,
    component: < Quantity/>,
  },
  {
    name: "Product Offers",
    layout: "/admin",
    path: "offers",
    icon: <AiOutlinePayCircle className="h-6 w-6" />,
    component: < Offers/>,
  },
  {
    name: "Manage Coins",
    layout: "/admin",
    path: "coins",
    icon: <FaBitcoin className="h-6 w-6" />,
    component: < Coins/>,
  },
  {
    name: "Flash Sell",
    layout: "/admin",
    path: "flash",
    icon: <IoIosFlash className="h-6 w-6" />,
    component: < Flash/>,
  },
  {
    name: "FeedBack",
    layout: "/admin",
    path: "feed-back",
    icon: <MdFeedback className="h-6 w-6" />,
    component: < FeedBack/>,
  },
  {
    name: "Manage Accounts",
    layout: "/admin",
    path: "accounts",
    icon: <FaUserCircle className="h-6 w-6" />,
    component: < ManageUsers/>,
  },
  {
    name: "POS Management",
    layout: "/admin",
    path: "pos",
    icon: <MdOutlinePostAdd className="h-6 w-6" />,
    component: < POS/>,
  },
  {
    name: "Offer Codes",
    layout: "/admin",
    path: "codes",
    icon: <MdLocalOffer className="h-6 w-6" />,
    component: < OfferCodes/>,
  },
  {
    name: "Adds & Pages",
    layout: "/admin",
    path: "pages",
    icon: <FaPager className="h-6 w-6" />,
    component: < ManageAdds/>,
  },
  {
    name: "User Contacts",
    layout: "/admin",
    path: "contacts",
    icon: <MdSupportAgent className="h-6 w-6" />,
    component: < ContactUs/>,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "settings",
    icon: <IoSettings className="h-6 w-6" />,
    component: < Settings/>,
  },
  
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Forget Password",
    layout: "/auth",
    path: "forget-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <ForgetPassword />,
  },
  
];
export default adminRoutes;
