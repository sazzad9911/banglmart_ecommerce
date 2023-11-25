import { useEffect, useState } from "react";

const TimerFlashSell = ({ flashSaleData }) => {
  
  const endTimestamp = new Date(flashSaleData?.endAt).getTime(); // Convert endAt to Unix timestamp

  const [remainingTime, setRemainingTime] = useState(
    Math.max(0, Math.floor((endTimestamp - new Date().getTime()) / 1000))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = Math.max(0, remainingTime - 1);
      setRemainingTime(newRemainingTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  return (
    
    <span className="countdown font-mono text-2xl text-MainColor flex items-center">
      <span className="mt-2 mb-2 pt-1 pb-1 h-6 " style={{ "--value": remainingTime / (24 * 60 * 60) }}></span>
      :
      <span className="mt-2 mb-2 pt-1 pb-1 h-6" style={{ "--value": (remainingTime / 3600) % 24 }}></span>:
      <span className="mt-2 mb-2 pt-1 pb-1 h-6" style={{ "--value": (remainingTime / 60) % 60 }}></span>:
      <span className="mt-2 mb-2 pt-1 pb-1 h-6" style={{ "--value": remainingTime % 60 }}></span>
    </span>
  );
};

export default TimerFlashSell;
