import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrandSlider = () => {
  const [brandData, setBrandData] = useState(null);

  const brand = useSelector((state) => state.brand.brand.data);
  useEffect(() => {
    setBrandData(brand);
  }, [brand]);

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    slidesToShow: 7,
    slidesToScroll: 3,
    initialSlide: 0,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {brandData
          ? brandData?.map((data, i) => (
              <div key={i} className="">
                <BrandCart data={data} />
              </div>
            ))
          : ""}
      </Slider>
    </div>
  );
};

export default BrandSlider;

import { Link } from "react-router-dom";

const BrandCart = ({ data }) => {
  const encodedData = encodeURIComponent(JSON.stringify(data));

  const [hover, setHover] = useState(false);
  const url = "https://banglamartecommerce.com.bd";

  return (
    <Link to={`/brand-product-page?data=${encodedData}`}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className=" bg-CardColor cursor-pointer group rounded-xl relative overflow-hidden border border-BorderColor hover:border-MainColor hover:shadow-md h-[120px] w-[120px] lg:w-[95px] lg:h-[95px] xl:w-[125px] xl:h-[125px] 2xl:w-[145px] 2xl:h-[145px]"
      >
        <div className="inset-0 absolute  group-hover:scale-110 ease-in-out duration-300">
          <img
            src={`${url}${data?.brandIcon}`}
            className="object-fill h-full w-full "
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
              className={`p-1 flex justify-center ${
                hover ? "text-CardColor underline" : "text-SubTextColor"
              } `}
            >
              <p className="font-semibold  line-clamp-1">{data?.brandName}</p>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};
