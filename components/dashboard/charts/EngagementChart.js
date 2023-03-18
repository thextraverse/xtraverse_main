import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react apex-charts"), {
  ssr: false,
});

// const { twitterData } = useUserAuth;
const EngageChart = () => {
  const objectData = {
    data: {
      daily: [
        { date: "18-3-2023", followers: 4344, following: 5343, tweets: 42 },
        { date: "19-3-2023", followers: 5344, following: 1343, tweets: 200 },
        { date: "20-3-2023", followers: 6344, following: 3343, tweets: 50 },
        { date: "21-3-2023", followers: 4344, following: 1343, tweets: 30 },
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
        name: "Tweets",
        data: objectData.data.daily.map((item) => ({
          x: item.date,
          y: item.tweets,
        })),
      },
    ],
    options: {
      toolbar: {
        show: false,
      },
      chart: {
        type: "bar",
        height: 350,
      },

      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
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
      yaxis: [
        {
          labels: {
            style: {
              colors: "#fff", // set the text color of x-axis labels
              border: {
                color: "#fff", // set the border color of x-axis labels
              },
            },
          },
        },
        {
          show: false,
        },
        {
          opposite: true,
          show: false,
        },
      ],
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
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
      grid: {
        borderColor: "transparent",
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          // reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default EngageChart;
