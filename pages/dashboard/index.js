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
import { Dashboardsc } from "../../components/styles/dashboard.styled";
import { useUserAuth } from "../../configfile/UserAuthContext";
import { Router, useRouter } from "next/router";

const Main = styled.main`
  background: #303030;
  padding: 30px;
  height: 100%;
  color: #fff;
`;
const DasboardContainer = styled.div`
  padding: 0px 100px;

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
          <DasboardContainer>
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
                        <h2>Your recent activity</h2>

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
                            Project
                          </Button>
                        </div>
                      </Box>
                    </Grid>
                    {/*top card section*/}
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        {[1, 2, 3, 4, 5, 6].map((itm, index) => (
                          <Grid item xs={2} key={index}>
                            <TopCard />
                          </Grid>
                        ))}
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
