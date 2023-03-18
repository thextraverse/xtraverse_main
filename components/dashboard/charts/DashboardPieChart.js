import React, { useState } from "react";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
// const { twitterData } = useUserAuth;

const DashboardPieChart = ({ twitterData }) => {
  const objectData = {
    data: {
      daily: [
        { date: "18-3-2023", followers: 4344, following: 5343, tweets: 142 },
        { date: "19-3-2023", followers: 5344, following: 1343, tweets: 458 },
        { date: "20-3-2023", followers: 6344, following: 3343, tweets: 1020 },
      ],
      general: {
        created_at: "thu may 27 21:26:25",
      },
    },
    info: {
      acces: {
        expires_at: "03/19/2023 03:56:33 EDT",
        seconds_to_expire: 83381,
      },
    },
  };

  const [chartData, setChartData] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: false,
        },
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },

        background: "transparent",
        foreColor: "#000",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      // stroke: {
      //   width: [5, 7, 5],
      //   curve: "smooth",
      //   dashArray: [0, 0, 0], // here we define the dash array
      //   color: "transparent",
      // },
      legend: {
        labels: {
          colors: ["#ffffff"],
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      fill: {
        opacity: 1,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      colors: ["#303030", "#04fcbc", "#FEB019", "#f469a9", "#88bef5"],
    },
  });

  return (
    <div id="chart">
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default DashboardPieChart;
