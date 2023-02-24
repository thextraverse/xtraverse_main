import React from "react";
import styled from "@emotion/styled";
import { Grid, Box } from "@mui/material";
import stripe from "../../../../components/images/stripe.svg";
import facebook from "../../../../components/images/facebook.svg";
import godaddy from "../../../../components/images/godaddy.svg";
import discord from "../../../../components/images/discord.svg";
import team from "../../../../components/images/team.svg";
import apex from "../../../../components/images/apex.svg";
import ipfs from "../../../../components/images/ipfs.svg";
import twitter from "../../../../components/images/twitter.svg";
import unstoppable from "../../../../components/images/unstoppable.svg";
import tiktok from "../../../../components/images/tiktok.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Sidebar from "../../../../components/dashboard/sidebar";
import { drawerWidth } from "../../../../components/dashboard/createproject";
import Stepnav from "../../../../components/dashboard/stepnav";
const Main = styled.main`
  background: #1f1f1f;
  padding: 30px;
`;
const Connectionsec = styled.div`
  width: 670px;
  margin: auto;
  h1 {
    text-align: center;
    margin: 5px 0px 20px;
    color: #fff;
  }
  .img {
    width: 60px;
  }
  .cntpara {
    display: flex;
    align-items: center;
    height: 100%;
    p {
      color: #514f4f;
      font-weight: 600;
      font-size: 1.2em;
      span {
        color: #888787;
        font-size: 0.9em;
      }
    }
  }
  .process {
    padding: 15px 20px;
    background: #fff;
    color: #000;
    display: grid;
    gap: 10px;
    grid-template-columns: 15% auto 15%;
    border-bottom: 2px solid #bdc7d3;

    &:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      border-bottom: none;
    }
  }
`;
const Button = styled.div`
  background: #38a169;
  width: 100%;
  height: 45px;
  display: grid;
  place-content: center;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
  transition: all 0.3s;
  &:hover {
    background: #212121;
    color: #fff;
  }
`;
const Btn = styled.div`
  background: #38a169;
  width: 100%;
  height: 55px;
  display: grid;
  place-content: center;
  font-weight: 600;
  margin: 20px 0px;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
  transition: all 0.3s;
  &:hover {
    background: #fff;
    color: #000;
  }
`;
function Connection() {
  const router = useRouter();
  return (
    <Main>
      <Sidebar />
      <Box
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          marginLeft: "auto",
          background: "#1f1f1f",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "100%",
          alignItems: "center",
        }}
      >
        <Stepnav />
        <Connectionsec>
          <h1>Lets get you on the path to success</h1>
          <Box sx={{ borderRadius: "10px" }}>
            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={facebook} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>Facebook leads</p>
              </div>
              <Button>Send Link</Button>
            </div>

            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={twitter} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>Twitter page & ads for project</p>
              </div>
              <Button>Send Link</Button>
            </div>

            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={discord} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>Discord of project</p>
              </div>
              <Button>Send Link</Button>
            </div>

            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={tiktok} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>Tik tok page/ads for project</p>
              </div>
              <Button>Send Link</Button>
            </div>

            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={stripe} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>Stripe</p>
              </div>
              <Button>Connect</Button>
            </div>
            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={team} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>Team</p>
              </div>
              <Button>Add</Button>
            </div>
            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={godaddy} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>Domain</p>
              </div>
              <Button>Add</Button>
            </div>
            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={apex} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>Apex - $200/m</p>
              </div>
              <Button>Add</Button>
            </div>
            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={ipfs} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>IPFS</p>
              </div>
              <Button>Add</Button>
            </div>
            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={godaddy} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>GoDaddy</p>
              </div>
              <Button>Add</Button>
            </div>
            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={unstoppable} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>Unstoppable (apply)</p>
              </div>
              <Button>Add</Button>
            </div>
            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={godaddy} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>Subdomain - $20/m</p>
              </div>
              <Button>Add</Button>
            </div>
            <div className="process">
              <div className="cntpara">
                <div className="img">
                  <Image src={ipfs} alt="" />
                </div>
              </div>
              <div className="cntpara">
                <p>IPFS API subdomain manager</p>
              </div>
              <Button>Add</Button>
            </div>
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Btn onClick={() => router.push("/dashboard/createproject/domain")}>
              Go For Domain
            </Btn>
          </Box>
        </Connectionsec>
      </Box>
    </Main>
  );
}

export default Connection;
