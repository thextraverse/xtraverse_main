import styled from "@emotion/styled";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { BsPlusLg, BsTwitter } from "react-icons/bs";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, red } from "@mui/material/colors";
import metamask from "../../../components/images/metamask.png";
import coinbase from "../../../components/images/coinbase.png";
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#000000",
    },
  },
});
const Main = styled.div`
  background: #fff;
`;
const Templatepage = styled.div`
  background: #fff;
  padding: 40px;
  position: relative;
  height: 100vh;
`;
const WaitingList = styled.div`
  height: 88vh;
  display: grid;
  place-content: center;
`;
const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  .activeDot {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 30px 0px 60px;
    li {
      list-style: none;
      background: transparent;
      transition: all 0.3s;
      position: relative;
      display: grid;
      grid-template-columns: 70% auto;
      align-items: center;
      gap: 20px;
      transition: all 0.3s;

      &:first-of-type {
        display: block;
      }
      .dot {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #d9d9d9;
        display: block;
        transition: background 0.5s;
        transition-delay: 0.5s;
      }
      .line {
        width: 100%;
        height: 2px;
        background: #d9d9d9;
        display: block;
        width: 120px;
        border-radius: 5px;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: 0%;
          left: 0px;
          width: 0%;
          height: 100%;
          background: #212121;
          transition: width 0.6s;
        }
      }
      &.active {
        .dot {
          background: #212121;
        }
        .line {
          &::after {
            width: 100%;
          }
        }
      }
    }
  }
`;

const TitleTxt = styled.div`
  text-align: center;
  h1 {
    font-weight: 600;
    font-size: 3.5em;
    color: #000;
  }
  p {
    color: #000;
    font-weight: 700;
    font-size: 1.3em;
  }
  span {
    color: #000;
    font-size: 0.9em;
    strong {
      padding: 0px 5px;
    }
    a {
      font-weight: 700;
      padding: 0px 5px;
      color: #000;
    }
  }
  img {
    width: 35px;
    height: 35px;
  }
  .span {
    padding-left: 20px;
  }
`;
const Form = styled.form`
  width: 100%;
  color: #000;
  input {
    background: transparent;
    border: 2px solid rgba(0, 0, 0, 1);
    border-radius: 10px;
    width: 100%;
    padding: 15px 20px;
    font-size: 1em;
    color: #fff;
    outline: none;
    font-family: "Open Sans", sans-serif;
  }
`;
const InputSc = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50% auto;
  gap: 20px;
  margin: 50px 0px 10px;
  label {
    display: block;
    color: #000;
    font-weight: 600;
  }
  &.varifyMail {
    display: block;
    text-align: center;
    width: 350px;
    margin: 30px auto 0px;
    label {
      text-align: left;
    }
    input {
      width: 100%;
    }
  }
`;
function Index() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex(index === layouts.length - 1 ? 0 : index + 1);
  };
  const handlePrev = () => {
    setIndex(index === 0 ? layouts.length - 1 : index - 1);
  };
  const layouts = [
    <WaitinList handleNext={handleNext} key="1" />,
    <VerifyMail handleNext={handleNext} key="2" />,
    <Follow handleNext={handleNext} key="3" />,
    <ConnectWallet handleNext={handleNext} key="4" />,
    <Thankyou key="5" />,
  ];
  return (
    <>
      <Main>
        <Templatepage>
          <WaitingList>
            <Wrapper>
              <ul className="activeDot">
                <li className={index === 0 ? "active" : ""}>
                  <span className="dot"></span>
                </li>
                <li className={index === 1 ? "active" : ""}>
                  <span className="line"></span>

                  <span className="dot"></span>
                </li>
                <li className={index === 2 ? "active" : ""}>
                  <span className="line"></span>
                  <span className="dot"></span>
                </li>
                <li className={index === 3 ? "active" : ""}>
                  <span className="line"></span>
                  <span className="dot"></span>
                </li>
                <li className={index === 4 ? "active" : ""}>
                  <span className="line"></span>
                  <span className="dot"></span>
                </li>
              </ul>
              {layouts[index]}
            </Wrapper>
          </WaitingList>
        </Templatepage>
      </Main>
    </>
  );
}

//  WaitinList
function WaitinList({ handleNext }) {
  return (
    <>
      <TitleTxt>
        <p>Robo Gremlins</p>
        <h1>Waiting list</h1>
        <span>Join Robo Gremlins waiting list & get early access.</span>
      </TitleTxt>
      <Form>
        <InputSc>
          <div>
            <label htmlFor="">Name</label>
            <input type="text" required />
          </div>

          <div>
            <label htmlFor="">Email</label>
            <input type="email" required />
          </div>
        </InputSc>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <Button
            sx={{
              background: "#000",
              border: "2px solid #000",
              width: "180px",
              margin: "auto",
              display: "inline-block",
              padding: "12px ",
              color: "#fff",
              margin: "15px 0px",
              borderRadius: "10px",
              color: "#fff",
              "&:hover": {
                background: "#fff",
                color: "#000",
              },
            }}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Form>
    </>
  );
}
// VerifyMail
function VerifyMail({ handleNext }) {
  return (
    <>
      <TitleTxt>
        <p>Robo Gremlins</p>
        <h1>Verify email</h1>
        <span>
          Enter in the one-time code we emailed to
          <strong>your@email.com</strong> (check spam folder too).
        </span>
      </TitleTxt>
      <Form>
        <InputSc className="varifyMail">
          <div>
            <label htmlFor="">Password</label>
            <input type="password" required />
          </div>
        </InputSc>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <Button
            sx={{
              background: "#000",
              border: "2px solid #000",
              width: "180px",
              margin: "auto",
              display: "inline-block",
              padding: "12px ",
              color: "#fff",
              margin: "15px 0px",
              borderRadius: "10px",
              color: "#fff",
              "&:hover": {
                background: "#fff",
                color: "#000",
              },
            }}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Form>
    </>
  );
}
// Follow
function Follow({ handleNext }) {
  return (
    <>
      <TitleTxt>
        <p>Robo Gremlins</p>
        <h1>Follow</h1>
        <span>
          Follow Robo Gremlins on Twitter and Discord for more rewards.
        </span>
        <Box
          sx={{
            display: "flex",
            fontSize: "2em",
            color: "#000",
            justifyContent: "center",
            gap: "30px",
            margin: "30px",
          }}
        >
          <BsTwitter />
          <FaDiscord />
        </Box>
      </TitleTxt>
      <Form>
        <Box>
          <ThemeProvider theme={theme}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Twitter"
              name="radio-buttons-group"
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "inherit",
                gap: "30px",
              }}
            >
              <FormControlLabel
                value="Twitter"
                control={<Radio color="secondary" />}
                label="Following on Twitter"
              />
              <FormControlLabel
                value="Discord"
                control={<Radio color="secondary" />}
                label="Following on Discord"
              />
            </RadioGroup>
          </ThemeProvider>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <Button
            sx={{
              background: "#000",
              border: "2px solid #000",
              width: "180px",
              margin: "auto",
              display: "inline-block",
              padding: "12px ",
              color: "#fff",
              margin: "15px 0px",
              borderRadius: "10px",
              color: "#fff",
              "&:hover": {
                background: "#fff",
                color: "#000",
              },
            }}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Form>
    </>
  );
}
//  ConnectWallet
function ConnectWallet({ handleNext }) {
  return (
    <>
      <TitleTxt>
        <p>Robo Gremlins</p>
        <h1>Connect Wallet</h1>
        <span>
          By signing into this platform, you agree to the following <br />
          <Link href="/">terms and conditions </Link> and
          <Link href="/">privacy policy.</Link>
        </span>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            fontSize: "2em",
            color: "#000",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            margin: "30px",
          }}
        >
          <Button
            sx={{
              width: "fit-content",
            }}
          >
            <div style={{ width: "40px" }}>
              <Image src={metamask} alt="" />
            </div>
            <span className="span">Metamask</span>
          </Button>
          <Button
            sx={{
              width: "fit-content",
            }}
          >
            <div style={{ width: "40px" }}>
              <Image src={coinbase} alt="" />
            </div>
            <span className="span">Coinbase</span>
          </Button>
          <Button
            sx={{
              width: "fit-content",
            }}
          >
            <span className="span">Show more options</span>
          </Button>
        </Box>
      </TitleTxt>
      <Form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <Button
            sx={{
              background: "#000",
              border: "2px solid #000",
              width: "180px",
              margin: "auto",
              display: "inline-block",
              padding: "12px ",
              color: "#fff",
              margin: "15px 0px",
              borderRadius: "10px",
              color: "#fff",
              "&:hover": {
                background: "#fff",
                color: "#000",
              },
            }}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Form>
    </>
  );
}
//  Thankyou
function Thankyou() {
  return (
    <>
      <TitleTxt>
        <p>Robo Gremlins</p>
        <h1>Thanks you!</h1>
        <span>
          Keep on the lookout for exclusive rewards for our awesome community.
        </span>
      </TitleTxt>
    </>
  );
}
export default Index;
