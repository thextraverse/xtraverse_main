import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import { Box, Breadcrumbs, Card, CardContent, Grid } from "@mui/material";

// const { twitterData } = useUserAuth;
const ChartText = () => {
  const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39];

  const [chartData, setChartData] = useState({
    series: [
      {
        data: sparklineData,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 160,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: "straight",
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {
        min: 0,
      },
      colors: ["#21e6c1"],
      title: {
        text: "$424,652",
        offsetX: 0,
        style: {
          fontSize: "24px",
          color: "#fff",
        },
      },
      subtitle: {
        text: "Sales",
        offsetX: 0,
        style: {
          fontSize: "14px",
          color: "#fff",
        },
      },
    },

    seriesSpark2: [
      {
        data: sparklineData,
      },
    ],
    optionsSpark2: {
      chart: {
        type: "area",
        height: 160,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: "straight",
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {
        min: 0,
      },
      colors: ["#f4fa9c"],
      title: {
        text: "$235,312",
        offsetX: 0,
        style: {
          fontSize: "24px",
          color: "#fff",
        },
      },
      subtitle: {
        text: "Expenses",
        offsetX: 0,
        style: {
          fontSize: "14px",
          color: "#fff",
        },
      },
    },
    seriesSpark3: [
      {
        data: sparklineData,
      },
    ],
    optionsSpark3: {
      chart: {
        type: "area",
        height: 160,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: "straight",
      },
      fill: {
        opacity: 0.3,
      },
      xaxis: {
        crosshairs: {
          width: 1,
        },
      },
      yaxis: {
        min: 0,
      },
      colors: ["#fc5185"],
      title: {
        text: "$135,965",
        offsetX: 0,
        style: {
          fontSize: "24px",
          color: "#fff",
        },
      },
      subtitle: {
        text: "Profits",
        offsetX: 0,
        style: {
          fontSize: "14px",
          color: "#fff",
        },
      },
    },
    series1: [
      {
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
      },
    ],
    options1: {
      chart: {
        type: "line",
        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
      colors: ["#ffd615"],
    },
    series2: [
      {
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
      },
    ],
    options2: {
      chart: {
        type: "line",
        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
      colors: ["#ffb174"],
    },
    series3: [
      // Update this array
      {
        data: [13, 34, 10, 12, 40],
      },
    ],
    options3: {
      chart: {
        type: "line",
        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
      colors: ["#fff"],
    },
    series4: [43, 32, 12, 9],
    options4: {
      chart: {
        type: "donut",
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        width: 1,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
      },
    },
  });

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item sm={4}>
          <div id="chart-spark1">
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="area"
              height={160}
            />
          </div>
        </Grid>
        <Grid item sm={4}>
          <div id="chart-spark2">
            <ReactApexChart
              options={chartData.optionsSpark2}
              series={chartData.seriesSpark2}
              type="area"
              height={160}
            />
          </div>
        </Grid>
        <Grid item sm={4}>
          <div id="chart-spark3">
            <ReactApexChart
              options={chartData.optionsSpark3}
              series={chartData.seriesSpark3}
              type="area"
              height={160}
            />
          </div>
        </Grid>
      </Grid>

      <Box sx={{ padding: "50px 0px" }}>
        <Grid container spacing={5}>
          <Grid item sm={2}>
            <div id="chart-1">
              <ReactApexChart
                options={chartData.options1}
                series={chartData.series1}
                type="line"
                height={35}
                width={100}
              />
            </div>
          </Grid>
          <Grid item sm={2}>
            <div id="chart-2">
              <ReactApexChart
                options={chartData.options2}
                series={chartData.series2}
                type="line"
                height={35}
                width={100}
              />
            </div>
          </Grid>
          <Grid item sm={2}>
            <div id="chart-3">
              <ReactApexChart
                options={chartData.options3}
                series={chartData.series3}
                type="line"
                height={40}
                width={100}
              />
            </div>
          </Grid>
          <Grid item sm={4}>
            <div id="chart-4">
              <ReactApexChart
                options={chartData.options4}
                series={chartData.series4}
                type="donut"
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ChartText;
