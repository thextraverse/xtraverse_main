import Head from "next/head";
import Image from "next/image";
import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import Login from "../components/auth/signin";
const Main = styled.main`
  background: rgb(31, 31, 31);
  padding: 0px;
  height: 100%;
  color: rgb(255, 255, 255);
`;
const Herosec = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  background-color: #212121;
  position: relative;
  p {
    font-size: 1.2em;
    padding: 14px 0px;
    color: rgba(255, 255, 255, 0.89);
  }
`;
const Bgblur = styled.div`
  position: absolute;
  display: flex;
  top: 40%;
  left: 0%;
  transform: translate(-50%, -50%);
`;
const Bgblur1 = styled.div`
  z-index: 3;
  position: absolute;
  width: 40rem;
  height: 36rem;
  background: linear-gradient(
    131.27deg,
    rgb(238, 8, 173) 26.63%,
    rgb(247, 14, 93) 100.47%
  );
  filter: blur(6rem);
  border-radius: 50%;
  transform: translate(-30vw, -25rem);
  animation: 10s linear 0s infinite reverse none running rotate1;
  @keyframes rotate1 {
    0% {
      transform: translate(48vw, -16rem) rotate(0deg);
    }

    100% {
      transform: translate(48vw, -16rem) rotate(360deg);
    }
  }
`;
const Bgblur2 = styled.div`
  z-index: 2;
  position: absolute;
  height: 40rem;
  width: 55rem;
  background: linear-gradient(rgb(85, 67, 200) 0%, rgb(6, 233, 254) 100%);
  filter: blur(5rem);
  border-radius: 50%;
  transform: translate(-29vw, -35rem);
  animation: 15s linear 0s infinite normal none running rotate2;
  @keyframes rotate2 {
    0% {
      transform: translate(48vw, -16rem) rotate(0deg);
    }

    100% {
      transform: translate(48vw, -16rem) rotate(360deg);
    }
  }
`;
const Bgblur3 = styled.div`
  z-index: 1;
  position: absolute;
  height: 50rem;
  width: 40rem;
  background: linear-gradient(rgb(228, 241, 46) 0%, rgb(86, 219, 99) 100%);
  filter: blur(4rem);
  border-radius: 50%;
  transform: translate(-29vw, -30rem);
  animation: 10s linear 0s infinite reverse none running rotate3;
  @keyframes rotate3 {
    0% {
      transform: translate(48vw, -16rem) rotate(0deg);
    }

    100% {
      transform: translate(48vw, -16rem) rotate(360deg);
    }
  }
`;

const Heading = styled.div`
  h1 {
    text-transform: uppercase;
    line-height: 130%;
    border-bottom: 2px solid rgba(255, 255, 255, 1);
    font-weight: 500;
    font-size: 4.5em;
    span {
      font-weight: 800;
    }
  }
`;
const H1 = styled.h1`
  padding-left: 50px;
`;
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Herosec>
          <Bgblur>
            <Bgblur1></Bgblur1>
            <Bgblur2></Bgblur2>
            <Bgblur3></Bgblur3>
          </Bgblur>

          <Box
            sx={{
              position: "relative",
              zIndex: "2",
            }}
          >
            <Heading>
              <h1>
                Instanly <span>Launch</span>
              </h1>
              <H1>
                And <span>Manage</span> your
              </H1>
              <h1>
                Next <span>NFT Project</span>
              </h1>
            </Heading>
            <p>
              Xtraverse streamlines the production of NFT projects by <br />{" "}
              equipping your agency with what it needs to scale without limits
            </p>
            <Login />
          </Box>
        </Herosec>
      </Main>
    </>
  );
}
