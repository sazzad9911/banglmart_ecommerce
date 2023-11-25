import { useEffect, useState } from "react";
import { getApi, url } from "../../../apis";
import CampaignCard from "../../../components/CampaignCard";

import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ProductShowSlider from "../../../components/ProductShowSlider";
import { Spinner } from "@chakra-ui/react";
const Campaign = () => {
  const { t } = useTranslation();
  const [campaign, setCampaign] = useState([]);
  const [currentCampaignId, setCurrentCampaignId] = useState([]);
  const [currentCampaignImg, setCurrentCampaignImg] = useState(null);
  const [productsDetail, setProductsDetail] = useState(null);
  const [products, setProducts] = useState(null);
  const encodedData = encodeURIComponent(
    JSON.stringify(`/campaign/products/${currentCampaignId}`)
  );

  useEffect(() => {
    getApi("/campaign/current").then((response) => {
      setCurrentCampaignId(
        response.data.data.length > 0 && response.data.data[0].id
      );
      setCurrentCampaignImg(
        response.data.data.length > 0 && response.data.data[0].image
      );
    });
  }, []);
  useEffect(() => {
    getApi(`/campaign/products/${currentCampaignId}`).then((r) => {
      setProductsDetail(r.data.data);
    });
  }, [currentCampaignId]);
  useEffect(() => {
    let array = [];
    productsDetail?.map((product) => {
      array.push(product.product);
    });
    setProducts(array);
  }, [productsDetail]);

  useEffect(() => {
    getApi("/campaign/upcoming", null).then((r) => {
      setCampaign(r.data.data);
    });
  }, []);

  const [mainSlider, setMainSlider] = useState();
  const [currentSlide, setCurrentSlide] = useState(1);

  const sliderSettings = {
    arrows: false,
    infinite: false,
    dots: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    touchThreshold: 4,
    focusOnSelect: true,
    beforeChange: (current, next) => setCurrentSlide(next + 1),
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1535,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container mt-4 mx-auto">
      <div className="bg-gradient-to-r from-[#924e4e] to-[#4e9287] py-4 w-full">
        <div className={` ${campaign.length > 0 || "hidden"}`}>
          <h2 className="text-center text-CardColor mb-4">
            {t("campaign.campaign")}
          </h2>
          <div className="pl-5 md:pl-10 pr-5 md:pr-10 pt:3 md:pt-5 pb-3 md:pb-5">
            <div className="flex justify-center">
              <div className="container ">
                <div className="p-cat-slider relative">
                  <div className="relative w-full h-full">
                    <Slider
                      ref={(slider1) => setMainSlider(slider1)}
                      {...sliderSettings}
                    >
                      {campaign.map((data, i) => (
                        <div key={i} className="">
                          <CampaignCard data={data}></CampaignCard>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {products?.length > 0 && (
          <div>
            <div className=" m-1 lg:m-0  rounded-lg">
              <div className="flex border-b-[1px] border-b-BorderColor pl-5 md:pl-10 pb-2 pt-2 justify-between items-center">
                {products?.length > 10 && (
                  <Link
                    to={`/various-products-page?data=${encodedData}`}
                    className="mr-5 md:mr-10 pb-1 pt-1 pl-2 pr-2 md:pl-3 md:pr-3 bg-MainColor rounded-full text-CardColor shadow-lg hover:bg-MainColorHover text-sm"
                  >
                    {t("viewMore.viewMore")}
                  </Link>
                )}
              </div>
              <div className="flex justify-center">
                <img
                  className="h-28 w-80"
                  src={`${url}${currentCampaignImg}`}
                  alt=""
                />
              </div>
              {products ? (
                <div className="pl-5 md:pl-10 pr-5 md:pr-10 pb-3 md:pb-5">
                  <ProductShowSlider products={products}></ProductShowSlider>
                </div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaign;
