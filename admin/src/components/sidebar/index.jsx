/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import adminRoutes from "routes/adminRoute";
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

      <div className="w-full">
        <div className={`mx-[56px] mt-[50px] flex items-center`}>
          <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
            Bangla <span className="font-medium">Mart</span>
          </div>
        </div>
        <div className="mt-6 w-full text-center text-xl">E-commerce</div>
      </div>
      <div className="mt-[20px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}
      <div className=" h-[calc(100vh-160px)]  overflow-y-auto">
        {user?.user?.role === 4 ? (
          <ul className="mb-auto pt-1">
            <Links
              onClose={onClose}
              routes={adminRoutes.filter((d) => d.layout === "/panel/admin")}
            />
          </ul>
        ) : (
          <ul className="mb-auto pt-1">
            <Links
              onClose={onClose}
              routes={sellerRoutes.filter((d) => d.layout === "/panel/seller")}
            />
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
