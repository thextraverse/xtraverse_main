import React, { useState } from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import Sidebar from "../../../components/dashboard/sidebar/Navbar";
import Stepnav from "../../../components/dashboard/step-nav";
import { IoIosAddCircle, IoIosArrowDropright } from "react-icons/io";
import { useRouter } from "next/router";
import { BsPlusLg } from "react-icons/bs";
import Image from "next/image";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import websitepreview from "../../../components/images/editwebsite/websitepreview.png";
import tiktok from "../../../components/images/icons/_TikTok.png";
import twitter from "../../../components/images/icons/_Twitter.png";
import facebook from "../../../components/images/icons/_Facebook.png";
import snapchat from "../../../components/images/icons/_Snapchat.png";
import team from "../../../components/images/team.svg";
import { BsCheck2All } from "react-icons/bs";
import {
  Form,
  LaucnhWrapper,
  Step,
  LuanchForm,
  ActiveDot,
  Connectionsec,
} from "../../../components/styles/homepage.styled";
import { useUserAuth } from "../../../configfile/UserAuthContext";
const Main = styled.main`
  background: #303030;
  padding: 30px;
`;
const Launchsc = styled.div`
  width: 1100px;
  margin: auto;
  .launchimgbox {
    display: grid;
    place-content: center;
    background: #9f56e9;
    height: 100%;
    span {
      width: 100% !important;
      transform: scale(1.1);
    }
  }
`;
function Launch() {
  const [index, setIndex] = useState(0);
  // const [step, setStep] = useState("Step 1");
  const [domain, setDomain] = useState();
  const [subdomain, setSubDomain] = useState();
  const { user } = useUserAuth();
  const router = useRouter();
  user !== null && user.email && (emailData = user.email);
  user === null && router.push("/");
  const [activeTab, setActiveTab] = useState(0);
  console.log(domain);
  const handleNext = () => {
    setIndex(index === layouts.length - 1 ? 0 : index + 1);
  };
  const handlePrev = () => {
    setIndex(index === 0 ? layouts.length - 1 : index - 1);
  };
  const layouts = [
    <DomainSelection
      handleNext={handleNext}
      key="1"
      setDomain={setDomain}
      domain={domain}
    />,
    <DomainType handleNext={handleNext} key="2" />,
    <ManageDomains
      ManageDomains
      handleNext={handleNext}
      handlePrev={handlePrev}
      key="3"
    />,
    <AllSet key="4" />,
  ];
  return (
    <>
      <Head>
        <title>Domain</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Sidebar activeBtn={2} />
        <Stepnav />
        <Box
          sx={{
            marginLeft: "auto",
            background: "transparent",
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "100%",
            alignItems: "center",
          }}
        >
          <Launchsc>
            {layouts[index] !== layouts[3] ? (
              <>
                <Step>
                  <h1> Domain Configuration</h1>
                </Step>
                <Grid container>
                  <Grid item md={6}>
                    <div className="launchimgbox">
                      <Image src={websitepreview} alt="website preview" />
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <LaucnhWrapper>{layouts[index]}</LaucnhWrapper>
                  </Grid>
                </Grid>
                <ActiveDot>
                  <ul className="activeDot">
                    <li className={index === 0 ? "active" : ""}></li>
                    <li className={index === 1 ? "active" : ""}></li>
                    <li className={index === 2 ? "active" : ""}></li>
                    <li className={index === 3 ? "active" : ""}></li>
                  </ul>
                </ActiveDot>
              </>
            ) : (
              layouts[3]
            )}
          </Launchsc>
        </Box>
      </Main>
    </>
  );
}
// Domain Selection
function DomainSelection({
  handleNext,
  setDomain,
  domain,
  subdomain,
  setSubDomain,
}) {
  return (
    <>
      <LuanchForm>
        <Grid container>
          <Grid xs={12}>
            <Box sx={{}}>
              <p>Type</p>
              <input type="text" placeholder="e.g View On Marketplace" />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ padding: "8px 0px" }}>
              <p>Name</p>
              <input type="text" placeholder="Add your domain" />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ padding: "8px 0px" }}>
              <p>Value</p>
              <input
                onChange={(e) => setDomain(e.target.value)}
                type="text"
                placeholder="Add your domain"
              />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ padding: "8px 0px" }}>
              <h5>Instruction</h5>
              <p className="instruction">
                Head over to your DNS provider (website that controls your
                domain name) and add a CNAME record with the above values.
              </p>
            </Box>
          </Grid>
        </Grid>
        <Button
          onClick={handleNext}
          sx={{
            width: "100%",
            background: "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
            borderRadius: "8px",
            color: "#000",
            fontSize: "1.2em",
            textTransform: "capitalize",
            padding: "8px 0px",
            transition: "0.3s",
            fontWeight: "500",
            margin: "10px 0px",
            "&:hover ": {
              background: "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
              cursor: "pointer",
            },
          }}
        >
          I added the records
        </Button>
      </LuanchForm>
    </>
  );
}
// DomainType
function DomainType({ handleNext, domain, setDomain }) {
  return (
    <>
      <LuanchForm className="manageDomain">
        <Grid container>
          <Grid xs={12}>
            <Box sx={{}}>
              <h1>You're all set!</h1>
              <p className="allset" style={{ textAlign: "left" }}>
                We &apos; ll scan for your domain name and provision an SSL
                certificate automatically for free. Usually DNS propagation
                happens quickly. However, in the worst case, it may take up to
                24 hours.
              </p>
            </Box>
          </Grid>

          <Grid xs={12}>
            <Box sx={{ padding: "8px 0px" }}>
              <p>Domain</p>
              <input value={domain} type="text" placeholder="Add your domain" />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ padding: "8px 0px" }}>
              <p>Subdomain</p>
              <input type="text" placeholder="Add your domain" />
            </Box>
          </Grid>
        </Grid>
        <Button
          onClick={handleNext}
          sx={{
            width: "100%",
            background: "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
            borderRadius: "8px",
            color: "#000",
            fontSize: "1.2em",
            textTransform: "capitalize",
            padding: "8px 0px",
            transition: "0.3s",
            fontWeight: "500",
            margin: "10px 0px",
            "&:hover ": {
              background: "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
              cursor: "pointer",
            },
          }}
        >
          Manage Domain
        </Button>
      </LuanchForm>
    </>
  );
}
// Check all set
function ManageDomains({ handleNext, handlePrev }) {
  return (
    <>
      <LuanchForm>
        <Grid container>
          <Grid xs={12}>
            <Box sx={{}}>
              <h5>Manage Domains</h5>
              <p
                className="allset"
                style={{ textAlign: "left", paddingTop: "12px" }}
              >
                If you’ve added the CNAME record and you don’t see the status of
                your domain as “configured” after 24 hours, we recommend you
                contacting your DNS provider’s support team to ensure you’ve
                added the CNAME record correctly.
              </p>
            </Box>
          </Grid>

          <Grid xs={12}>
            <Box sx={{ padding: "8px 0px" }}>
              <p>Domain</p>
              <input
                onChange={(e) => setHeroButton(e.target.value)}
                type="text"
                placeholder="Add your domain"
              />
            </Box>
          </Grid>

          <Grid xs={6}>
            <Box sx={{ padding: "8px 0px" }}>
              <p>Status:</p>
              <h5>Not Confused</h5>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "50% auto",
            width: "100%",
            gap: "10px",
          }}
        >
          <Button
            onClick={handlePrev}
            sx={{
              width: "100%",
              background: "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
              borderRadius: "8px",
              color: "#000",
              fontSize: "1.2em",
              textTransform: "capitalize",
              padding: "8px 0px",
              transition: "0.3s",
              fontWeight: "500",
              margin: "10px 0px",
              "&:hover ": {
                background: "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                cursor: "pointer",
              },
            }}
          >
            Remove
          </Button>
          <Button
            onClick={handleNext}
            sx={{
              width: "100%",
              background: "#252525",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "1.2em",
              textTransform: "capitalize",
              padding: "8px 0px",
              transition: "0.3s",
              fontWeight: "500",
              border: "2px solid #04fcbc",
              margin: "10px 0px",
            }}
          >
            Go live
          </Button>
        </Box>
      </LuanchForm>
    </>
  );
}
// Manage domains
function AllSet({ handlePrev }) {
  const router = useRouter();
  const [connections, setConnections] = useState({});
  console.log(connections);
  const handleConnect = (buttonId, value, name) => {
    setConnections((prevConnections) => ({
      ...prevConnections,
      [buttonId]: true,
      [value]: name,
    }));
  };
  return (
    <>
      <Connectionsec>
        <h1>You’re all set!</h1>
        <Box sx={{ borderRadius: "10px" }}>
          <div className="process">
            <div className="cntpara">
              <div className="img">
                <Image src={twitter} alt="twitter" />
              </div>
            </div>
            <div className="cntpara">
              <p>Twitter page & ads for project</p>
            </div>
            <Button
              onClick={() => handleConnect("button1", "key-1", "Twitter")}
              sx={{
                width: "100%",
                background: "#252525",
                borderRadius: "8px",
                color: `${connections["button1"] ? "#04fcbc" : "#fff"}`,
                fontSize: "1.2em",
                textTransform: "capitalize",
                padding: "6px 10px",
                transition: "0.3s",
                fontWeight: "500",
                border: `2px solid ${
                  connections["button1"] ? "#252525" : "#04fcbc"
                }`,
                margin: "10px 0px",
              }}
            >
              {connections["button1"] ? (
                <>
                  Connected <BsCheck2All />
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </div>
          <div className="process">
            <div className="cntpara">
              <div className="img">
                <Image src={tiktok} alt="tik" />
              </div>
            </div>
            <div className="cntpara">
              <p>Earn money with tiktok</p>
            </div>
            <Button
              onClick={() => handleConnect("button2", "key-2", "Tiktok")}
              sx={{
                width: "100%",
                background: "#252525",
                borderRadius: "8px",
                color: `${connections["button2"] ? "#04fcbc" : "#fff"}`,
                fontSize: "1.2em",
                textTransform: "capitalize",
                padding: "6px 10px",
                transition: "0.3s",
                fontWeight: "500",
                border: `2px solid ${
                  connections["button2"] ? "#252525" : "#04fcbc"
                }`,
                margin: "10px 0px",
              }}
            >
              {connections["button2"] ? (
                <>
                  Connected <BsCheck2All />
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </div>

          <div className="process">
            <div className="cntpara">
              <div className="img">
                <Image src={facebook} alt="facebook" />
              </div>
            </div>
            <div className="cntpara">
              <p>Facebook leads</p>
            </div>
            <Button
              onClick={() => handleConnect("button3", "key-1", "Facebook")}
              sx={{
                width: "100%",
                background: "#252525",
                borderRadius: "8px",
                color: ` ${connections["button3"] ? "#04fcbc" : "#fff"}`,
                fontSize: "1.2em",
                textTransform: "capitalize",
                padding: "6px 10px",
                transition: "0.3s",
                fontWeight: "500",
                border: `2px solid ${
                  connections["button3"] ? "#252525" : "#04fcbc"
                }`,
                margin: "10px 0px",
              }}
            >
              {connections["button3"] ? (
                <>
                  Connected <BsCheck2All />
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </div>

          <div className="process">
            <div className="cntpara">
              <div className="img">
                <Image src={snapchat} alt="snapchat" />
              </div>
            </div>
            <div className="cntpara">
              <p> Add filter and impress everyone</p>
            </div>
            <Button
              onClick={() => handleConnect("button4", "key-1", "Facebook")}
              sx={{
                width: "100%",
                background: "#252525",
                borderRadius: "8px",
                color: `${connections["button4"] ? "#04fcbc" : "#fff"}`,
                fontSize: "1.2em",
                textTransform: "capitalize",
                padding: "6px 10px",
                transition: "0.3s",
                fontWeight: "500",
                border: `2px solid ${
                  connections["button4"] ? "#252525" : "#04fcbc"
                }`,
                margin: "10px 0px",
              }}
            >
              {connections["button4"] ? (
                <>
                  Connected <BsCheck2All />
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </div>
        </Box>
      </Connectionsec>
    </>
  );
}

export default Launch;
