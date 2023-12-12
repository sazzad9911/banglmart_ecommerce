import PieChart from "components/charts/PieChart";
import Card from "components/card";
import { useEffect, useState } from "react";
import { getApi } from "api/api";
import { getNumber } from "variables/number";
 
const PieChartAds = () => {
  const pieChartOptions = {
    labels: ["Visitor", "Active User"],
    colors: ["#4318FF",  "#EFF4FB"],
    chart: {
      width: "50px",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
    },
  };
  const [data,setData]=useState([100,0])
  useEffect(()=>{
    getApi("/adds/analytics").then(res=>{
      setData(res.data.data)
    })
  },[])
  
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Flash Ads Analytics
          </h4>
        </div>

        
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart options={pieChartOptions} series={data} />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-brand-500" />
            <p className="ml-1 text-sm font-normal text-gray-600">Total Site Visitor</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
            {getNumber(data[0])}
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">ADs Visitors</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
          {getNumber(data[1])}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PieChartAds;
