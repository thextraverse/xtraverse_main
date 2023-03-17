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
} from "../../components/styles/dashboard.styled";
import { useUserAuth } from "../../configfile/UserAuthContext";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import WertIntergration from "../../components/api/WertIntergration";

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
export default function Dashboard() {
  const { user } = useUserAuth();
  const router = useRouter();
  let emailData = null;
  user !== null && user.email && (emailData = user.email);
  user === null && router.push("/");

  const apiKey =
    "3b8758c81cbc23211b0bbe7d19d0ffe28be08a7fe2a837208569b5e07bab36c7d7ff09d48b1f2a37c5e9d412207c48f20520a07bc1edfcf8eb53f77230688374"; // Replace with your API key
  const clientId = "cli_050544150fc8a4b11d976a73";
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://matrix.sbapis.com/b/twitter/statistics?token=${apiKey}&query=${username}&clientid=${clientId}`
      );
      setData(response.data);
      setError(null);
    } catch (error) {
      setData(null);
      setError(error.message);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };
  console.log(data);
  const wertApiKey = "your-wert-api-key";
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
            <form onSubmit={handleSubmit} className="searchAccount">
              <label htmlFor="username">Enter the Twitter username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
            <WertIntergration wertApiKey={wertApiKey} />
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
                        <h2>Recent activity</h2>

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
                      <Grid container spacing={2}>
                        {data && (
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
                                    {data && data.data.daily[0].followers}
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
                                      width="10"
                                      height="10"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1 9L9 1M9 1V6.5M9 1H3.5"
                                        stroke="#71DD37"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
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
                                    {data && data.data.daily[0].following}
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
                                      width="10"
                                      height="10"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1 9L9 1M9 1V6.5M9 1H3.5"
                                        stroke="#71DD37"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
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
                                    {data && data.data.statistics.total.tweets}
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
                                      width="10"
                                      height="10"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1 9L9 1M9 1V6.5M9 1H3.5"
                                        stroke="#71DD37"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
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
                                    {data && data.data.daily[0].favorites}
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
                                      width="10"
                                      height="10"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1 9L9 1M9 1V6.5M9 1H3.5"
                                        stroke="#71DD37"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
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
                                    {data && data.data.daily[0].favorites}
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
                                      width="10"
                                      height="10"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1 9L9 1M9 1V6.5M9 1H3.5"
                                        stroke="#71DD37"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
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
                                    {data && data.data.daily[0].favorites}
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
                                      width="10"
                                      height="10"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1 9L9 1M9 1V6.5M9 1H3.5"
                                        stroke="#71DD37"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
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
                              <h2>Engagements</h2>
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
                          <h2>Your Sales</h2>
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
