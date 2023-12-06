import { Avatar } from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";

const BrandShopCart = ({ data }) => {
  const url = "https://api.banglamartecommerce.com.bd";

  return (
    <div className="mt-4 shadow-md shadow-BorderColor">
      <div className="p-2 flex items-center rounded-md bg-CardColor">
        <div className="ml-2 rounded-full border-r border-r-BorderColor">
          <Avatar
            bg="teal.500"
            size="xl"
            name={data?.brandName}
            src={`${url}${data?.brandIcon}`}
             
          />
        </div>
        <div className="flex flex-col p-2 w-[220px] sm:w-[270px] md:w-[280px] lg:w-[300px]">
          <h1 className="text-SubTextColor line-clamp-1">{data?.brandName}</h1>
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
          <p className="text-SubTextColor">{data?.brandAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default BrandShopCart;
