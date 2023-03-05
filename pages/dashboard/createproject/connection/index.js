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
import Sidebar, { drawerWidth } from "../../../../components/dashboard/sidebar";
import Stepnav from "../../../../components/dashboard/stepnav";
import {
  Connectionsec,
  Button,
  Btn,
} from "../../../../components/dashboard/connection/connection.styled";
const Main = styled.main`
  background: #303030;
  padding: 30px;
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
          background: "transparent",
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
