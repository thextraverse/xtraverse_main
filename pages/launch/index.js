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
import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { IntergrationSec } from "../../components/dashboard/luanch/IntergrationsSection";
import FacebookForm from "../../components/dashboard/luanch/FacebookForm";
import TiktokForm from "../../components/dashboard/luanch/TiktokForm";
import DomainIntergration from "../../components/dashboard/luanch/DomainIntergration";
import { useUserAuth } from "../../configfile/UserAuthContext";
import { useRouter } from "next/router";

const Main = styled.main`
  background: #303030;
  padding: 30px;
  height: 100%;
  color: #fff;
`;
const DasboardContainer = styled.div`
  padding: 0px 100px;
  hr {
    background: #252525;
    width: 100%;
    height: 2px;
    border: none;
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
export default function Launch() {
  const { user, setTwitterData } = useUserAuth();
  const router = useRouter();
  let emailData = null;

  user !== null && user.email && (emailData = user.email);
  user === null && router.push("/");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Main>
      <Sidebar activeBtn={6} heading={"Dashboard"} />

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
              {/*main*/}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",

                    width: "100%",
                  }}
                >
                  <h2>Integrations</h2>

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
              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Button
                    className={activeTab === 0 ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(0);
                    }}
                    sx={{
                      width: "100%",
                      background: activeTab === 0 ? "#fff" : "#303030",
                      borderRadius: "8px",
                      color: activeTab === 0 ? "#000" : "#fff",
                      fontSize: "1.2em",
                      textTransform: "capitalize",
                      padding: "8px 0px",
                      transition: "0.3s",
                      fontWeight: "500",
                      margin: "10px 0px",
                      "&:hover ": {
                        background: "#fff",
                        color: "#000",
                      },
                    }}
                  >
                    Integrations
                  </Button>
                  <Button
                    className={activeTab === 1 ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(1);
                    }}
                    sx={{
                      width: "100%",
                      background: activeTab === 1 ? "#fff" : "#303030",
                      borderRadius: "8px",
                      color: activeTab === 1 ? "#000" : "#fff",

                      fontSize: "1.2em",
                      textTransform: "capitalize",
                      padding: "8px 0px",
                      transition: "0.3s",
                      fontWeight: "500",
                      margin: "10px 0px",
                      "&:hover ": {
                        background: "#fff",
                        color: "#000",
                      },
                    }}
                  >
                    Facebook Form
                  </Button>
                  <Button
                    className={activeTab === 2 ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(2);
                    }}
                    sx={{
                      width: "100%",
                      background: activeTab === 2 ? "#fff" : "#303030",

                      borderRadius: "8px",
                      color: activeTab === 2 ? "#000" : "#fff",

                      fontSize: "1.2em",
                      textTransform: "capitalize",
                      padding: "8px 0px",
                      transition: "0.3s",
                      fontWeight: "500",
                      margin: "10px 0px",
                      "&:hover ": {
                        background: "#fff",
                        color: "#000",
                      },
                    }}
                  >
                    Tiktok Form
                  </Button>
                  <Button
                    className={activeTab === 3 ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(3);
                    }}
                    sx={{
                      width: "100%",
                      background: activeTab === 3 ? "#fff" : "#303030",

                      borderRadius: "8px",
                      color: activeTab === 3 ? "#000" : "#fff",
                      fontSize: "1.2em",
                      textTransform: "capitalize",
                      padding: "8px 0px",
                      transition: "0.3s",
                      fontWeight: "500",
                      margin: "10px 0px",
                      "&:hover ": {
                        background: "#fff",
                        color: "#000",
                      },
                    }}
                  >
                    Domain Integration
                  </Button>
                </Box>
                <hr />
                <div className="tab-content">
                  {activeTab === 0 && (
                    <div>
                      <Box
                        sx={{
                          gap: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <IntergrationSec setTwitterData={setTwitterData} />
                      </Box>
                    </div>
                  )}
                  {activeTab === 1 && (
                    <div>
                      <Box
                        sx={{
                          gap: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <FacebookForm />
                      </Box>
                    </div>
                  )}
                  {activeTab === 2 && (
                    <div>
                      <Box
                        sx={{
                          gap: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <TiktokForm />
                      </Box>
                    </div>
                  )}
                  {activeTab === 3 && (
                    <div>
                      <Box
                        sx={{
                          gap: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <DomainIntergration />
                      </Box>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </DasboardContainer>
      </Grid>
    </Main>
  );
}
