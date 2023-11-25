import FlashSaleBanner from "../../../components/FlashSaleBanner";
import BargainingProducts from "../BargainingProducts/BargainingProducts";
import BestSellers from "../BestSellers/BestSellers";
import BestSelling from "../BestSelling/BestSelling";
import FlashSale from "../FlashSale/FlashSale";
import NewProducts from "../NewProducts/NewProducts";
import TopBannerSection from "../TopBannerSection/TopBannerSection";
import TopProducts from "../TopProducts/TopProducts";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ForYouProducts from "../ForYouProduct/ForYouProduct";
import Campaign from "../Campaign/Campaign";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <TopBannerSection></TopBannerSection>
      <Campaign></Campaign>
      <FlashSaleBanner></FlashSaleBanner>
      <div className="container mx-auto ">
        <FlashSale></FlashSale>
        <NewProducts></NewProducts>
        <ForYouProducts></ForYouProducts>
        <BestSelling></BestSelling>
        <BargainingProducts></BargainingProducts>
      </div>
      <FlashSaleBanner></FlashSaleBanner>
      <div className="container mx-auto">
        <TopProducts></TopProducts>
        {user?.role === 2 ? (
          ""
        ) : (
          <div id="main" className="mt-4 rounded-md">
            <motion.div
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              }}
            >
              <Link to="/seller-form" id="animatedButton">
                <h1 className="z-10 text-CardColor">Be A Seller</h1>
              </Link>
            </motion.div>
          </div>
        )}
        <BestSellers />
      </div>
    </div>
  );
};

export default Home;
