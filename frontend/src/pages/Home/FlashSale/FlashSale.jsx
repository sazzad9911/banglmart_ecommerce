import { useEffect, useState } from "react";
import TimerFlashSell from "../../../components/TimerFlashSell";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlashSellData } from "../../../services/actions/flashSellDataAction";
import EmptyContent from "../../../components/EmptyContent";
import FlashSellProductShowSlider from "../../../components/FlashSellProductShowSlider";
import { getApi } from "../../../apis";
import { useTranslation } from "react-i18next";

const FlashSale = () => {
  const dispatch = useDispatch();
  const [flashSellInfo, setFlashSellInfo] = useState(null);
  const { t } = useTranslation();
  // console.log(flashSellInfo);

  useEffect(() => {
    getApi("/product/get/flash", null)
      .then((res) => {
        setFlashSellInfo(res.data.data[0]);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  useEffect(() => {
    dispatch(fetchFlashSellData(flashSellInfo?.id));
  }, [flashSellInfo]);

  const flashSellData = useSelector(
    (state) => state.flashSellData?.flashSellData?.data
  );
  //calculate time

  const flashSaleData = {
    startAt: new Date(flashSellInfo?.startAt).getTime(),
    endAt: new Date(flashSellInfo?.endAt).getTime(),
  };

  // const [remainingTime, setRemainingTime] = useState(
  //   flashSaleData.endAt - new Date().getTime()
  // );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newRemainingTime = flashSaleData.endAt - new Date().getTime();
  //     setRemainingTime(newRemainingTime); //
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  return (
    <div
      className={`${
        flashSellInfo || "hidden"
      } mt-4 lg:mt-8 m-1 lg:m-0 bg-CardColor rounded-lg`}
    >
      <div className="flex border-b-[1px] border-b-BorderColor pl-5 md:pl-10 pb-2 pt-2 justify-between items-center">
        <div className="border-b-[3px] border-b-MainColor ">
          <h1 className="">{t("header.flash")}</h1>
        </div>
        <div className={`${flashSellData?.length > 10 || "mr-4"}`}>
          {flashSaleData && flashSaleData.endAt && (
            <TimerFlashSell flashSaleData={flashSaleData}></TimerFlashSell>
          )}
        </div>

        {flashSellData?.length > 7 && (
          <Link
            to="flash-sell"
            className="mr-5 md:mr-10 pb-1 pt-1 pl-2 pr-2 md:pl-3 md:pr-3 bg-MainColor rounded-full text-CardColor shadow-lg hover:bg-MainColorHover text-sm"
          >
            {t("viewMore.viewMore")}
          </Link>
        )}
      </div>
      <div className="pl-5 md:pl-10 pr-5 md:pr-10 pt:3 md:pt-5 pb-3 md:pb-5">
        {flashSellData?.length <= 0 ? (
          <EmptyContent text="No Offer available"></EmptyContent>
        ) : (
          <FlashSellProductShowSlider
            flashSellData={flashSellData}
          ></FlashSellProductShowSlider>
        )}
      </div>
    </div>
  );
};

export default FlashSale;
