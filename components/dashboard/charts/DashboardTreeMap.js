import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// const { twitterData } = useUserAuth;
const TreeMapLayout = () => {
  const objectData = {
    data: {
      daily: [
        { date: "18-3-2023", followers: 4344, following: 5343, tweets: 42 },
        { date: "19-3-2023", followers: 5344, following: 1343, tweets: 18 },
        { date: "20-3-2023", followers: 6344, following: 3343, tweets: 30 },
        { date: "21-3-2023", followers: 4344, following: 1343, tweets: 5 },
        { date: "22-3-2023", followers: 2344, following: 6343, tweets: 10 },
        { date: "23-3-2023", followers: 1344, following: 4343, tweets: 20 },
        { date: "24-3-2023", followers: 8344, following: 343, tweets: 15 },
        { date: "25-3-2023", followers: 3344, following: 2343, tweets: 35 },
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
    series: [
      {
        data: [
          {
            x: "New Delhi",
            y: 218,
          },
          {
            x: "Kolkata",
            y: 149,
          },
          {
            x: "Mumbai",
            y: 184,
          },
          {
            x: "Ahmedabad",
            y: 55,
          },
          {
            x: "Bangaluru",
            y: 84,
          },
          {
            x: "Pune",
            y: 31,
          },
          {
            x: "Chennai",
            y: 70,
          },
          {
            x: "Jaipur",
            y: 30,
          },
          {
            x: "Surat",
            y: 44,
          },
          {
            x: "Hyderabad",
            y: 68,
          },
          {
            x: "Lucknow",
            y: 28,
          },
          {
            x: "Indore",
            y: 19,
          },
          {
            x: "Kanpur",
            y: 29,
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },

        background: "transparent",
        foreColor: "#333",
      },
      title: {
        text: "Most viewer location",
        align: "center",
        style: {
          color: "#fff",
        },
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return '<span style="color: #ff0000;">' + val + "</span>";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return '<span style="color: #ff0000;">' + val + "</span>";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return '<span style="color: #ff0000;">' + val + "</span>";
              },
            },
          },
        ],
      },
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false,
        },
      },
      grid: {
        borderColor: "transparent",
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="treemap"
        height={350}
      />
    </div>
  );
};

export default TreeMapLayout;
