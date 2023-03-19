import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// const { twitterData } = useUserAuth;
const DashboardMultipleYAxis = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Income",
        type: "column",
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: "Cashflow",
        type: "column",
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
      },
      {
        name: "Revenue",
        type: "line",
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      toolbar: {
        background: "#1C1E2E", // set the toolbar color
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#f9ff21", "#00d1ff", "#ff5959"],
      stroke: {
        width: [5, 7, 5],
        curve: "smooth",
        dashArray: [0, 0, 0], // here we define the dash array
      },
      title: {
        text: "Check your growth",
        align: "center",
        offsetX: 110,
        style: {
          color: "#fff",
        },
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
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
        labels: {
          colors: ["#ffffff"],
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
        type="line"
        height={350}
      />
    </div>
  );
};

export default DashboardMultipleYAxis;
