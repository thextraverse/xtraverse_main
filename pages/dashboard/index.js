import styled from "@emotion/styled";
import Sidebar from "../../components/dashboard/sidebar/Navbar";
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import TopCard from "../../components/dashboard/home/TopCard";
import EngagementsTop from "../../components/dashboard/home/EngagementsTop";
import EngagementsLeft from "../../components/dashboard/home/EngagementsLeft";
import EngagementsRight from "../../components/dashboard/home/EngagementsRight";
import Community from "../../components/dashboard/home/Community";
import CustomTableContainer from "../../components/dashboard/home/CustomTableContainer";
import {
  Dashboardsc,
  TopCardDiv,
  ActivityCharts,
} from "../../components/styles/dashboard.styled";
import { useUserAuth } from "../../configfile/UserAuthContext";
import { Router, useRouter } from "next/router";
import React, { useState, PureComponent } from "react";
import axios from "axios";
import WertIntergration from "../../components/api/WertIntergration";
import ActivityChart from "../../components/dashboard/charts/DashboardCharts";
import EngageChart from "../../components/dashboard/charts/EngagementChart";
import MixedChartsLayout from "../../components/dashboard/charts/MixedCharts";
import TreeMapLayout from "../../components/dashboard/charts/DashboardTreeMap";
import DashboardPieChart from "../../components/dashboard/charts/DashboardPieChart";
import ChartText from "../../components/dashboard/charts/ChartText";
import DashboardGradientDonut from "../../components/dashboard/charts/GradientDonutChart";
import DashboardRadialBarChart from "../../components/dashboard/charts/RadialBarChart";
import DashboardMultipleYAxis from "../../components/dashboard/charts/DashboardMultipleYChart";
const Main = styled.main`
  background: #303030;
  padding: 30px;
  height: 100%;
  color: #fff;
`;
const DasboardContainer = styled.div`
  padding: 0px 100px;
  .searchAccount {
    label {
      font-size: 2em;
    }
    input {
      padding: 10px 20px;
      border: none;
      display: block;
      font-size: 1.5em;
      margin: 10px 0px;
      background: #252525;
      color: #fff;
      border: 1px solid #fff;
    }
    button {
      font-size: 1.2em;
      border: none;
      background: #40fbce;
      padding: 10px 20px;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 500;
    }
  }
  @media screen and (min-width: 1536px) {
    width: 1500px;
    margin: auto;
    padding: 0px 80px;
  }
  @media screen and (min-width: 1800px) {
    width: 1750px;
    padding: 0px 100px;
    margin: auto;
  }
`;

const data = [
  { date: "2023-03-17", followers: 5273, following: 5838, post: 435 },
  { date: "2023-03-18", followers: 273, following: 538, post: 55 },
  { date: "2023-03-19", followers: 5223, following: 5838, post: 435 },
  { date: "2023-03-20", followers: 5273, following: 5838, post: 435 },
  { date: "2023-03-21", followers: 5273, following: 5838, post: 435 },
];

export default function Dashboard() {
  const { user, twitterData } = useUserAuth();
  const router = useRouter();
  let emailData = null;
  user !== null && user.email && (emailData = user.email);
  user === null && router.push("/");

  const wertApiKey = "";
  const transformedData = data.map((item) => ({
    name: item.date,
    followers: item.followers,
    following: item.following,
    post: item.post,
  }));
  return (
    <Main>
      <Dashboardsc>
        <Sidebar activeBtn={1} heading={"Dashboard"} />

        <Grid container spacing={1.3}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <DasboardContainer>
            {/* <WertIntergration wertApiKey={wertApiKey} /> */}
            <div></div>
            <Grid item xs={12}>
              <Grid container spacing={1.3}>
                <Grid item xs={1.25}></Grid>
                {/*main*/}
                <Grid item>
                  <Grid container spacing={1.3}>
                    {/*Your recent activity section*/}
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",

                          width: "100%",
                        }}
                      >
                        <h2>Attention</h2>

                        <div style={{ width: "175px" }}>
                          <Button
                            type="submit"
                            sx={{
                              width: "100%",
                              background:
                                "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
                              borderRadius: "8px",
                              color: "#000",
                              fontSize: "1.2em",
                              textTransform: "capitalize",
                              padding: "8px 0px",
                              transition: "0.3s",
                              fontWeight: "500",
                              margin: "10px 0px",
                              "&:hover ": {
                                background:
                                  "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                                cursor: "pointer",
                              },
                            }}
                          >
                            Create Project
                          </Button>
                        </div>
                      </Box>
                    </Grid>
                    {/*top card section*/}
                    <Grid item xs={12}>
                      <ActivityCharts>
                        <ActivityChart twitterData={twitterData} />

                        {/* <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            width={500}
                            height={300}
                            style={{ backgroundColor: "#f5f5f5" }}
                            data={transformedData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="followers"
                              stroke="#8884d8"
                              activeDot={{ r: 8 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="following"
                              stroke="#82ca9d"
                            />
                            <Line
                              type="monotone"
                              dataKey="post"
                              stroke="#f00"
                            />
                          </LineChart>
                        </ResponsiveContainer> */}
                      </ActivityCharts>

                      <Grid container spacing={2}>
                        {twitterData && (
                          <>
                            <Grid item xs={2}>
                              <TopCardDiv>
                                <p>Followers</p>
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <h2>
                                    {twitterData &&
                                      twitterData.data.daily[0].followers}
                                  </h2>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "8px",

                                      marginLeft: "8px",
                                      padding: "4px",
                                      background: "#252525",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <svg
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                    >
                                      <path
                                        d="M1 9l8-8m0 0v5.5M9 1H3.5"
                                        stroke="#71DD37"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>

                                    <span
                                      style={{
                                        marginLeft: "6px",
                                      }}
                                    >
                                      +5.0 %
                                    </span>
                                  </div>
                                </Box>
                                <span>21 new followers today</span>
                              </TopCardDiv>
                            </Grid>
                            <Grid item xs={2}>
                              <TopCardDiv>
                                <p>Follwing</p>
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <h2>
                                    {twitterData &&
                                      twitterData.data.daily[0].following}
                                  </h2>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "8px",

                                      marginLeft: "8px",
                                      padding: "4px",
                                      background: "#252525",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <svg
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                    >
                                      <path
                                        d="M1 9l8-8m0 0v5.5M9 1H3.5"
                                        stroke="#71DD37"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>

                                    <span
                                      style={{
                                        marginLeft: "6px",
                                      }}
                                    >
                                      +5.0 %
                                    </span>
                                  </div>
                                </Box>
                                <span>21 new followers today</span>
                              </TopCardDiv>
                            </Grid>
                            <Grid item xs={2}>
                              <TopCardDiv>
                                <p>Posts</p>
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <h2>
                                    {twitterData &&
                                      twitterData.data.statistics.total.tweets}
                                  </h2>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "8px",

                                      marginLeft: "8px",
                                      padding: "4px",
                                      background: "#252525",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <svg
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                    >
                                      <path
                                        d="M1 9l8-8m0 0v5.5M9 1H3.5"
                                        stroke="#71DD37"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>

                                    <span
                                      style={{
                                        marginLeft: "6px",
                                      }}
                                    >
                                      +5.0 %
                                    </span>
                                  </div>
                                </Box>
                                <span>
                                  {/* {data && data.data.daily[0].following} */}
                                  21 new followers today
                                </span>
                              </TopCardDiv>
                            </Grid>
                            <Grid item xs={2}>
                              <TopCardDiv>
                                <p>impressions</p>
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <h2>
                                    {twitterData &&
                                      twitterData.data.daily[0].favorites}
                                  </h2>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "8px",

                                      marginLeft: "8px",
                                      padding: "4px",
                                      background: "#252525",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <svg
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                    >
                                      <path
                                        d="M1 9l8-8m0 0v5.5M9 1H3.5"
                                        stroke="#71DD37"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>

                                    <span
                                      style={{
                                        marginLeft: "6px",
                                      }}
                                    >
                                      +5.0 %
                                    </span>
                                  </div>
                                </Box>
                                <span>
                                  {/* {data && data.data.daily[0].following} */}
                                  21 new followers today
                                </span>
                              </TopCardDiv>
                            </Grid>
                            <Grid item xs={2}>
                              <TopCardDiv>
                                <p>Profile visit</p>
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <h2>
                                    {twitterData &&
                                      twitterData.data.daily[0].favorites}
                                  </h2>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "8px",

                                      marginLeft: "8px",
                                      padding: "4px",
                                      background: "#252525",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <svg
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                    >
                                      <path
                                        d="M1 9l8-8m0 0v5.5M9 1H3.5"
                                        stroke="#71DD37"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>

                                    <span
                                      style={{
                                        marginLeft: "6px",
                                      }}
                                    >
                                      +5.0 %
                                    </span>
                                  </div>
                                </Box>
                                <span>
                                  {/* {data && data.data.daily[0].following} */}
                                  21 new followers today
                                </span>
                              </TopCardDiv>
                            </Grid>
                            <Grid item xs={2}>
                              <TopCardDiv>
                                <p>Discord</p>
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <h2>
                                    {twitterData &&
                                      twitterData.data.daily[0].favorites}
                                  </h2>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "8px",

                                      marginLeft: "8px",
                                      padding: "4px",
                                      background: "#252525",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <svg
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                    >
                                      <path
                                        d="M1 9l8-8m0 0v5.5M9 1H3.5"
                                        stroke="#71DD37"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <span
                                      style={{
                                        marginLeft: "6px",
                                      }}
                                    >
                                      +5.0 %
                                    </span>
                                  </div>
                                </Box>
                                <span>21 new followers today</span>
                              </TopCardDiv>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Grid>
                    {/*Engagements and Community section*/}
                    <Grid item xs={12} style={{ marginTop: "50px" }}>
                      <Grid container spacing={1.3}>
                        <Grid item xs={12} style={{ margin: "0 0 20px 0" }}>
                          <Grid container spacing={1.3}>
                            <Grid item xs={6}>
                              <h2>Engagement</h2>
                            </Grid>
                            <Grid item xs={6}>
                              <h2>Community</h2>
                            </Grid>
                          </Grid>
                        </Grid>
                        {/*Engagements cards*/}
                        <Grid item xs={12}>
                          <Grid
                            container
                            spacing={2}
                            style={{ height: "100%" }}
                          >
                            <Grid item xs={6}>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <EngagementsTop />
                                </Grid>
                                <Grid item xs={6}>
                                  <EngagementsLeft />
                                </Grid>
                                <Grid item xs={6}>
                                  <EngagementsRight />
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item xs={6}>
                              <Community />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/*top table section*/}
                    <Grid item xs={12} style={{ marginTop: "50px" }}>
                      <Grid container spacing={1.3}>
                        <Grid item xs={12} style={{ marginBottom: "20px" }}>
                          <h2>Primary Sales</h2>
                        </Grid>

                        <Grid item xs={12}>
                          <CustomTableContainer />
                        </Grid>
                      </Grid>
                    </Grid>
                    {/*bottom table section*/}
                    <Grid item xs={12} style={{ marginTop: "50px" }}>
                      <Grid container spacing={1.3}>
                        <Grid item xs={12} style={{ marginBottom: "20px" }}>
                          <h2>Secondary Sales</h2>
                        </Grid>

                        <Grid item xs={12}>
                          <CustomTableContainer />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DasboardContainer>
        </Grid>
      </Dashboardsc>
    </Main>
  );
}
