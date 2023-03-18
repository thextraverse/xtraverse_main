import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DashboardRadialBarChart = () => {
  const [chartData, setChartData] = useState({
    series: [44, 55, 67, 83],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "30%",
          },
          dataLabels: {
            name: {
              fontSize: "32px",
            },
            value: {
              fontSize: "26px",
              color: "#fff",
            },
            total: {
              show: true,
              label: "Total",
              color: "#fff",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 249;
              },
            },
          },
        },
      },

      labels: ["Apples", "Oranges", "Bananas", "Berries"],
      // fill: {
      //   type: "gradient",
      //   gradient: {
      //     shade: "dark",
      //     type: "vertical",
      //     shadeIntensity: 0.5,
      //     gradientToColors: [
      //       "#ABE5A1",
      //       "#8CEA92",
      //       "#69EF7F",
      //       "#4FF274",
      //       "#3DDC6A",
      //     ],
      //     inverseColors: false,
      //     opacityFrom: 1,
      //     opacityTo: 1,
      //     stops: [0, 400, 405, 90, 100],
      //   },
      // },
      colors: ["#f9ff21", "#00d1ff", "#ff5959", "#000"],
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height={350}
      />
    </div>
  );
};

export default DashboardRadialBarChart;
