/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import adminRoutes from "routes/adminRoute";
import brandRoutes from "routes/brandRoute";
import sellerRoutes from "routes/sellerRoute";
import { useSelector } from "react-redux";

const Sidebar = ({ open, onClose }) => {
  const user = useSelector((state) => state.user);
 
  return (
    <div
      className={`  sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Bangla <span className="font-medium">Mart</span>
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}
      <div className=" h-[calc(100vh-160px)] overflow-y-auto">
        {user?.user?.role === 4 ? (
          <ul className="mb-auto pt-1">
            <Links routes={adminRoutes.filter((d) => d.layout === "/admin")} />
          </ul>
        ) : user?.user?.role === 3 ? (
          <ul className="mb-auto pt-1">
            <Links routes={brandRoutes.filter((d) => d.layout === "/brand")} />
          </ul>
        ) : (
          <ul className="mb-auto pt-1">
            <Links routes={sellerRoutes.filter((d) => d.layout === "/seller")} />
          </ul>
        )}
        {/* Free Horizon Card */}
        <div className="flex justify-center">
          <SidebarCard />
        </div>
      </div>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
