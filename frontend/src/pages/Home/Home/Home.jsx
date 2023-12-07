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
import logo from "../../../logo.png"
import { Helmet } from "react-helmet";
const hostname="https://banglamartecommerce.com.bd"

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Helmet>
        <title>Banglamart Ecommerce- Home</title>
        <meta name="title" content="Banglamart Ecommerce- Home"></meta>
        <meta name="description" content="Banglamart is the operator of the eCommerce platform intended to provide food, grocery, classifieds, accounting, and inventory solutions. The company platform provides a wide range of food, grocery, electronics, clothing, and other similar products, enabling customers to access all products on one platform." />
        <meta name="keywords" content="shop, shoping, bangla, banglamart, ecommerce, bm, banglamartecommerce, store, seller, buy"></meta>
        <meta
          name="msapplication-TileImage"
          content={hostname+logo}
        ></meta>

        <meta property="og:site_name" content="Banglamart E-commerce"></meta>
        <meta property="og:title" content="Banglamart E-commerce"></meta>
        {/* <meta
          property="og:description"
          content="The best photo studio for your events"
        /> */}

        <meta
          property="og:image"
          content={hostname+logo}
        ></meta>

        <meta property="og:type" content="ecommerce"></meta>
        <meta property="og:image:type" content="image/jpeg"></meta>
        <meta property="og:image:width" content="300"></meta>
        <meta property="og:image:height" content="300"></meta>

        <meta
          property="og:url"
          content={hostname+window.location.pathname+window.location.search}
        ></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="Banglamart E-commerce" />
        <meta name="twitter:image:alt" content="Alt text for image"></meta>
      </Helmet>
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
