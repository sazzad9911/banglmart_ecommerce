import { Helmet } from "react-helmet";
import ProductCart from "../../components/ProductCart";
import SellerShopCart from "../../components/SellerShopCart";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PiSmileySadLight } from "react-icons/pi";
import { getApi } from "../../apis";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const ShopPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedData = queryParams.get("data");
  const data = JSON.parse(decodeURIComponent(encodedData));
  const [productData, setProductData] = useState(null);
  // console.log(productData);

  useEffect(() => {
    const token = localStorage.getItem("token");

    getApi(`/product/get-seller-product?sellerId=${data?.id}`, token)
      .then((res) => {
        setProductData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container mx-auto bg-CardColor lg:mt-4 mt-2">
      <Helmet>
        <title>Shop | Banglamart E-commerce</title>
      </Helmet>
      <div className="flex justify-center border-b-[1px] border-b-BorderColor p-4">
        <SellerShopCart data={data}></SellerShopCart>
      </div>
      <div className="p-4">
        <h1 className="text-SubTextColor pb-4">Products</h1>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {productData ? (
            productData?.length > 0 ? (
              productData?.map((product, i) => (
                <ProductCart product={product} key={i}></ProductCart>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center mt-1">
                <PiSmileySadLight className="text-SubTextColor text-4xl"></PiSmileySadLight>
                <h1 className="text-SubTextColor">No Product Available</h1>
              </div>
            )
          ) : (
            <Box padding="6" boxShadow="lg" bg="#FAD7A0">
              <Skeleton height="200px" />
              <SkeletonText
                mt="4"
                noOfLines={3}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
