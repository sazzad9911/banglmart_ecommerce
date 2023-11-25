import { Link } from "react-router-dom";
import SellerShopCart from "../../../components/SellerShopCart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import EmptyContent from "../../../components/EmptyContent";
import { useTranslation } from "react-i18next";

const BestSellers = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const sellerData = useSelector(
    (state) => state.allSellerData.allSeller?.data
  );
  useEffect(() => {
    setData(sellerData);
  }, [sellerData]);
  const seller = data?.slice(0, 6);

  return (
    <div className="pb-4 pr-4 mt-4 lg:mt-8 m-1 lg:m-0 bg-CardColor rounded-lg">
      <div className="flex border-b-[1px] border-b-BorderColor pl-5 md:pl-10 pb-2 pt-2 justify-between items-center">
        <div className="border-b-[3px] border-b-MainColor ">
          <h1 className=""> {t("bestSeller.bestSeller")}</h1>
        </div>
        {data?.length > 6 && (
          <Link
            to="all-seller"
            className="mr-5 md:mr-6 pb-1 pt-1 pl-2 pr-2 md:pl-3 md:pr-3 bg-MainColor rounded-full text-CardColor shadow-lg hover:bg-MainColorHover text-sm"
          >
            {t("viewMore.viewMore")}
          </Link>
        )}
      </div>

      {seller ? (
        seller?.length > 0 ? (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pl-5 md:pl-10 pb-2 pt-2">
            {seller?.map((data, i) => (
              <SellerShopCart key={i} data={data} />
            ))}
          </div>
        ) : (
          <EmptyContent There is no seller></EmptyContent>
        )
      ) : (
        <div className="flex justify-center items-center p-10">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      )}
    </div>
  );
};

export default BestSellers;
