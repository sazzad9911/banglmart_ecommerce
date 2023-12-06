import { useState } from "react";
import { Link } from "react-router-dom";

const BrandCart = ({ data }) => {
  const encodedData = encodeURIComponent(JSON.stringify(data));
  // console.log(data);
  const [hover, setHover] = useState(false);
  const url = "https://api.banglamartecommerce.com.bd";

  return (
    <Link to={`/brand-product-page?data=${encodedData}`}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-[95%] bg-CardColor cursor-pointer group aspect-[25/20] rounded-xl relative overflow-hidden border border-BorderColor hover:border-MainColor hover:shadow-md"
      >
        <div className="inset-0 absolute w-full aspect-[20/14] group-hover:scale-110 ease-in-out duration-300">
          <img
            src={`${url}${data?.brandIcon}`}
            className="object-fill w-full aspect-[20/14]"
          />
        </div>
        <div
          className={`absolute bottom-0 w-full ${
            hover ? "bg-MainColor" : "bg-[#fffffff8]"
          }`}
        >
          <div className="">
            <Link
              to={`/brand-product-page?data=${encodedData}`}
              className={`p-1 flex font-semibold justify-center ${
                hover ? "text-CardColor underline" : "text-SubTextColor"
              } `}
            >
              {data?.brandName}
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BrandCart;
