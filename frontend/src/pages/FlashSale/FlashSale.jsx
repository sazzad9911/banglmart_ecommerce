import { useEffect, useState } from "react";
import EmptyContent from "../../components/EmptyContent";
import FlashSaleBanner from "../../components/FlashSaleBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlashSellData } from "../../services/actions/flashSellDataAction";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductCartFlashSell from "../../components/ProductCartFlashSell";
import TimerFlashSell from "../../components/TimerFlashSell";
import { Helmet } from "react-helmet";

const FlashSalePage = () => {
  const dispatch = useDispatch();
  const url = "https://banglamartecommerce.com.bd";

  const flashSellId =useSelector(
    (state) => state.flashSell.flashSell?.data[0]?.id
  )
  ;

  const flashSell = useSelector((state) => state.flashSell.flashSell?.data[0]);

  useEffect(() => {
    dispatch(fetchFlashSellData(flashSellId));
  }, [flashSellId]);
  const flashSellData = useSelector(
    (state) => state.flashSellData?.flashSellData?.data
  );

  const bannerURL = `${url}${flashSell?.banner}`;

  //calculate time

  const flashSaleData = {
    startAt: new Date(flashSell?.startAt).getTime(),
    endAt: new Date(flashSell?.endAt).getTime(),
  };


  const [remainingTime, setRemainingTime] = useState(
    flashSaleData?.endAt - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = flashSaleData?.endAt - new Date().getTime();
      setRemainingTime(newRemainingTime);  //
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  if (!remainingTime) {
    return (<div>
      <div>
      <EmptyContent text="Currently No Offer available!!!"></EmptyContent>
      </div>
    </div>)// Hide the flash sale cart if the sale has ended
  }

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Flash Sale | Banglamart E-commerce</title>
      </Helmet>
      <div>
        <FlashSaleBanner bannerURL={bannerURL}></FlashSaleBanner>
      </div>
      <div className="flex justify-center pt-4 lg:pt-10">
        <TimerFlashSell flashSaleData={flashSaleData}></TimerFlashSell>
      </div>
      <div className="m-1 lg:m-0">
        <div className="mt-4">
          <h1 className="text-SubTextColor mb-4">Hunt Special Offer</h1>
        </div>
        <div>
          <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {flashSellId ? (
              flashSellData?.length > 0 ? (
                flashSellData?.map((data, i) => (
                  <ProductCartFlashSell
                    data={data}
                    key={i}
                  ></ProductCartFlashSell>
                ))
              ) : (
                <EmptyContent text="Currently No Offer available!!!"></EmptyContent>
              )
            ) : (
              <SkeletonTheme baseColor="#5dade2" highlightColor="#FAD7A0">
                <h3>
                  <Skeleton count={8} />
                </h3>
              </SkeletonTheme>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSalePage;
