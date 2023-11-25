import { Avatar } from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";
import { Link, useLocation } from "react-router-dom";
import { url } from "../apis";
import { useTranslation } from "react-i18next";

const SellerShopCart = ({ data }) => {
  const { t } = useTranslation();
  const encodedData = encodeURIComponent(JSON.stringify(data));
 // console.log(data);
  const location = useLocation();
  return (
    <div className="mt-4 shadow-md shadow-BorderColor">
      <div className="p-2 flex items-center rounded-md bg-CardColor">
        <div className="ml-2 rounded-full border-r border-r-BorderColor">
          <Avatar
            bg="teal.500"
            size="xl"
            name={data?.shopName}
            src={`${url}${data?.logo}`}
          />
        </div>
        <div className="flex flex-col p-2 w-[220px] sm:w-[270px] md:w-[280px] lg:w-[300px]">
          <h1 className="text-SubTextColor line-clamp-1">{data?.shopName}</h1>
          <div className="mt-1">
            <Rating
              initialRating={4.5}
              readonly
              emptySymbol={
                <AiOutlineStar className="text-BorderColor text-[14px]" />
              }
              fullSymbol={
                <AiFillStar className="text-BorderColor text-[14px]" />
              }
            />
          </div>
          {location.pathname === "/shop-page" ? (
            <p className="text-SubTextColor">{data.shopAddress}</p>
          ) : (
            <Link
              to={`/shop-page?data=${encodedData}`}
              className="pl-3 pr-3 pt-1 pb-1 rounded-full text-CardColor bg-MainColor hover:bg-MainColorHover shadow-md shadow-[#77ddfc] text-center"
            >
              {t("visitStore.visitStore")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerShopCart;
