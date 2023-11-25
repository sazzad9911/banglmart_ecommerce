import { Link } from "react-router-dom";
import "./buttonstyle.css";
import EmptyContent from "../../components/EmptyContent";
import SellerShopCart from "../../components/SellerShopCart";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const AllSeller = () => {
  const {t}=useTranslation()
  const { user } = useContext(AuthContext);
  const AllSellers = useSelector(
    (state) => state.allSellerData.allSeller?.data
  );

  return (
    <div className="m-1 lg:m-0">
      <Helmet>
        <title>All Seller | Banglamart E-commerce</title>
      </Helmet>
      <div className="container mx-auto">
        <div id="main" className="mt-4 mb-4">
          <motion.div
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
          >
            {user?.role === 2 ? (
              <a
                href="https://admin.banglamartecommerce.com.bd/seller/default"
                target="blank"
                id="animatedButton"
              >
                <h1 className="z-10 text-CardColor text-center p-2">
                  {t("allsellerBigBtn")}
                </h1>
              </a>
            ) : (
              <Link to="/seller-form" id="animatedButton">
                <h1 className="z-10 text-CardColor">{t("beAseller")}</h1>
              </Link>
            )}
          </motion.div>
        </div>
        <div className="shadow-xl shadow-BackgroundColor rounded">
          <h1 className=" lg:mt-10 text-SubTextColor">{t("allseller")}</h1>
          <div className="p-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {AllSellers?.length > 0 ? (
              AllSellers?.map((data, i) => (
                <SellerShopCart key={i} data={data} />
              ))
            ) : (
              <EmptyContent text="Currently No Seller Available"></EmptyContent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSeller;
