import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// const { twitterData } = useUserAuth;
const ActivityChart = () => {
  const objectData = {
    data: {
      daily: [
        {
          date: "14-3-2023",
          followers: 4344,
          following: 5343,
          tweets: 42,
          impressions: 500,
        },
        {
          date: "15-3-2023",
          followers: 5344,
          following: 1343,
          tweets: 1118,
          impressions: 3300,
        },
        {
          date: "16-3-2023",
          followers: 6344,
          following: 3343,
          tweets: 2130,
          impressions: 2200,
        },
        {
          date: "17-3-2023",
          followers: 4344,
          following: 1343,
          tweets: 1565,
          impressions: 2700,
        },
        {
          date: "18-3-2023",
          followers: 2344,
          following: 6343,
          tweets: 1910,
          impressions: 2500,
        },
        {
          date: "19-3-2023",
          followers: 1344,
          following: 4343,
          tweets: 1120,
          impressions: 3500,
        },
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
        name: "Follwers",
        data: objectData.data.daily.map((item) => ({
          x: item.date,
          y: item.followers,
        })),
      },
      {
        name: "Follwing",
        data: objectData.data.daily.map((item) => ({
          x: item.date,
          y: item.following,
        })),
      },
      {
        name: "Impressions",
        data: objectData.data.daily.map((item) => ({
          x: item.date,
          y: item.impressions,
        })),
      },
      {
        name: "Engagement",
        data: objectData.data.daily.map((item) => ({
          x: item.date,
          y: item.tweets,
        })),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
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
        foreColor: "#333",
        events: {
          mounted: function (chartContext, config) {
            console.log(chartContext);
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#fff601", "#ff781f", "#632de9", "#20f986"],
      stroke: {
        width: [5, 7, 5, 5, 5, 5],
        curve: "smooth",
        dashArray: [0, 0, 0], // here we define the dash array
      },
      // title: {
      //   text: "Page Statistics",
      //   align: "left",
      //   style: {
      //     color: "red",
      //   },
      // },
      legend: {
        labels: {
          colors: ["#ffffff"],
        },
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      yaxis: [
        {
          show: false,
        },
      ],
      xaxis: {
        labels: {
          style: {
            colors: "#fff", // set the text color of x-axis labels
            border: {
              color: "#fff", // set the border color of x-axis labels
            },
          },
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
          {
            title: {
              formatter: function (val) {
                return '<span style="color: #ff0000;">' + val + "</span>";
              },
            },
          },
        ],
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
        type="line"
        height={350}
      />
    </div>
  );
};

export default ActivityChart;
