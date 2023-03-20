import styled from "@emotion/styled";
import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { BsCheck2 } from "react-icons/bs";
import Select from "react-select";
import rainbow from "../../images/icons/rainbow.png";
import tiktok from "../../images/icons/_TikTok.png";
import snapchat from "../../images/icons/_Snapchat.png";
import twitter from "../../images/icons/_Twitter.png";
import discord from "../../images/icons/_Discord.png";
import reddit from "../../images/icons/_Reddit.png";
import zappier from "../../images/icons/zapier-logo_black.png";
import faceInsta from "../../images/icons/faceInsta.png";
import website from "../../images/icons/domain.png";
import Image from "next/image";
import { Domain } from "@mui/icons-material";
import axios from "axios";
import { useUserAuth } from "../../../configfile/UserAuthContext";

const IntegrationCard = styled.div`
  background: #212121;
  border-radius: 10px;
  padding: 15px 12px;
  margin: 10px;
  height: 420px;
  position: relative;
  .searchAccount {
    input {
      padding: 10px 10px;
      width: 100%;
      background: #303030;
      border: none;
      font-size: 1.1em;
      color: #fff;
    }
  }
  .absluteBtn {
    position: absolute;
    bottom: 10px;
    width: 90%;
    margin: auto;
    left: 5%;
  }
  p {
    display: block;
    padding: 8px 0px;
    margin-top: 10px;
    font-size: 0.88em;
    font-weight: 500;
  }
  .content {
    .span {
      display: block;
      padding: 12px 0px 0px;
      font-size: 0.88em;
      font-weight: 500;
    }
  }
  @media screen and (min-width: 1536px) {
    height: 500px;

    p {
      font-size: 1.2em;
    }
    .content {
      .span {
        font-size: 1.1em;
      }
    }
  }
`;

const colorStyles = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: "#252525",
    color: "#fff",
    border: "transparent",
    // borderColor: state.isFocused ? "#04fcbc" : "transparent",
    // "&:hover": {
    //   borderColor: state.isFocused ? "#04fcbc" : styles.borderColor,
    // },
    padding: "4px 0px",
    margin: "10px 0px",
    "& input": {
      color: "#fff !important",
    },
  }),
  highlight: (styles, state) => ({
    ...styles,
    backgroundColor: "yellow",
    color: "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "#000",
    backgroundColor: state.isSelected ? "#04fcbc" : "#fff",
    "&:active": {
      backgroundColor: "blue",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "white", // Change this to your desired color
  }),
};

export function IntergrationSec({ setTwitterData }) {
  const [utilities, setUtilities] = useState({});
  console.log(utilities);
  const { user } = useUserAuth();

  const handleAnalytics1Account = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      analyticsAcc1: selectedOption,
    }));
  };

  const handleAnalytics2Account = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      analyticsAcc2: selectedOption,
    }));
  };
  const handleMCCAccId = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      mccAccountId: selectedOption,
    }));
  };
  const handleGoogleSelectBusiness = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      gogleBusinessPage: selectedOption,
    }));
  };
  const handleFbMsgPage = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      FbMsgPage: selectedOption,
    }));
  };
  const options1 = [
    { value: "account-1", label: "Account 1" },
    { value: "account-2", label: "Account 2" },
    { value: "account-3", label: "Account 3" },
  ];
  const options2 = [
    { value: "account-1", label: "Account 1" },
    { value: "account-2", label: "Account 2" },
    { value: "account-3", label: "Account 3" },
  ];
  const options3 = [
    { value: "MCC ACCOUNT", label: "Account 1" },
    { value: "account-2", label: "Account 2" },
    { value: "account-3", label: "Account 3" },
  ];
  const options4 = [
    { value: "OMC Real Estate", label: "MC Real Estate" },
    { value: "OMC Real Estate2", label: "MC Real Estate2" },
    { value: "OMC Real Estate3", label: "MC Real Estate3" },
  ];
  const options5 = [
    { value: "Xtraverse", label: "Xtraverse" },
    { value: "Xtraverse1", label: "Xtraverse2" },
    { value: "Xtraverse3", label: "Xtraverse3" },
  ];
  const handleWert = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      wert: selectedOption,
    }));
  };
  const options6 = [
    { value: "Accoutn 1", label: "Account 1" },
    { value: "Accoutn 2", label: "Account 2" },
    { value: "Accoutn 3", label: "Account 3" },
  ];

  const handleComet = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      wert: selectedOption,
    }));
  };
  const options7 = [
    { value: "Accoutn 1", label: "Account 1" },
    { value: "Accoutn 2", label: "Account 2" },
    { value: "Accoutn 3", label: "Account 3" },
  ];

  const handleRainbow = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      rainbow: selectedOption,
    }));
  };
  const options8 = [
    { value: "Accoutn 1", label: "Account 1" },
    { value: "Accoutn 2", label: "Account 2" },
    { value: "Accoutn 3", label: "Account 3" },
  ];

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
    setUsername("");
  };
  console.log(data);
  console.log(username);
  data && setTwitterData(data);

  return (
    <>
      <Grid container>
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M38.4 20.4351C38.4 19.076 38.278 17.7692 38.0515 16.5146H20V23.9287H30.3152C29.8708 26.3245 28.5205 28.3544 26.4905 29.7135V34.5226H32.6848C36.3091 31.1859 38.4 26.2722 38.4 20.4351Z"
                    fill="#4285F4"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.9952 39.1656C25.1702 39.1656 29.5089 37.4493 32.6801 34.5221L26.4857 29.713C24.7695 30.863 22.574 31.5425 19.9952 31.5425C15.0032 31.5425 10.7778 28.1709 9.2706 23.6406H2.86719V28.6065C6.02098 34.8706 12.5028 39.1656 19.9952 39.1656Z"
                    fill="#34A853"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.27017 23.6418C8.88684 22.4918 8.66903 21.2634 8.66903 20.0002C8.66903 18.7369 8.88684 17.5085 9.27017 16.3585V11.3926H2.86676C1.56866 13.9801 0.828125 16.9074 0.828125 20.0002C0.828125 23.093 1.56866 26.0202 2.86676 28.6077L9.27017 23.6418Z"
                    fill="#FBBC05"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.9952 8.45611C22.8092 8.45611 25.3357 9.42316 27.3221 11.3224L32.8195 5.82505C29.5001 2.73225 25.1615 0.833008 19.9952 0.833008C12.5028 0.833008 6.02098 5.12808 2.86719 11.3921L9.2706 16.358C10.7778 11.8277 15.0032 8.45611 19.9952 8.45611Z"
                    fill="#EA4335"
                  />
                </svg>
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#04FCBC ",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Connected{" "}
                <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
              </Box>
            </Box>
            <div className="content">
              <p>Google Account (admin@xtraverse.com)</p>
              <span className="span">Select analytics account</span>
              <Select
                styles={colorStyles}
                options={options1}
                isSearchable={true}
                onChange={handleAnalytics1Account}
                placeholder="Select account"
              />
              <Select
                styles={colorStyles}
                options={options2}
                isSearchable={true}
                onChange={handleAnalytics2Account}
                placeholder="Select account"
              />
              <span className="span">Adwords MCC account ID</span>
              <Select
                styles={colorStyles}
                options={options3}
                isSearchable={true}
                onChange={handleMCCAccId}
                placeholder="Select MCC Account ID"
              />

              <Button
                className="absluteBtn"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "2px solid #04FCBC",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "5px 0px",
                  transition: "0.3s",
                  fontWeight: "500",
                  margin: "10px 0px",
                  display: "flex",
                  gap: "20px",
                  "&:hover ": {
                    color: "#000",
                    background:
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    cursor: "pointer",
                  },
                }}
              >
                Add another account
                <svg
                  style={{ padding: "5px" }}
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M38.4 20.4351C38.4 19.076 38.278 17.7692 38.0515 16.5146H20V23.9287H30.3152C29.8708 26.3245 28.5205 28.3544 26.4905 29.7135V34.5226H32.6848C36.3091 31.1859 38.4 26.2722 38.4 20.4351Z"
                    fill="#4285F4"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.9952 39.1656C25.1702 39.1656 29.5089 37.4493 32.6801 34.5221L26.4857 29.713C24.7695 30.863 22.574 31.5425 19.9952 31.5425C15.0032 31.5425 10.7778 28.1709 9.2706 23.6406H2.86719V28.6065C6.02098 34.8706 12.5028 39.1656 19.9952 39.1656Z"
                    fill="#34A853"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.27017 23.6418C8.88684 22.4918 8.66903 21.2634 8.66903 20.0002C8.66903 18.7369 8.88684 17.5085 9.27017 16.3585V11.3926H2.86676C1.56866 13.9801 0.828125 16.9074 0.828125 20.0002C0.828125 23.093 1.56866 26.0202 2.86676 28.6077L9.27017 23.6418Z"
                    fill="#FBBC05"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.9952 8.45611C22.8092 8.45611 25.3357 9.42316 27.3221 11.3224L32.8195 5.82505C29.5001 2.73225 25.1615 0.833008 19.9952 0.833008C12.5028 0.833008 6.02098 5.12808 2.86719 11.3921L9.2706 16.358C10.7778 11.8277 15.0032 8.45611 19.9952 8.45611Z"
                    fill="#EA4335"
                  />
                </svg>
              </Button>
            </div>
          </IntegrationCard>
        </Grid>
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M38.4 20.4351C38.4 19.076 38.278 17.7692 38.0515 16.5146H20V23.9287H30.3152C29.8708 26.3245 28.5205 28.3544 26.4905 29.7135V34.5226H32.6848C36.3091 31.1859 38.4 26.2722 38.4 20.4351Z"
                    fill="#4285F4"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.9952 39.1656C25.1702 39.1656 29.5089 37.4493 32.6801 34.5221L26.4857 29.713C24.7695 30.863 22.574 31.5425 19.9952 31.5425C15.0032 31.5425 10.7778 28.1709 9.2706 23.6406H2.86719V28.6065C6.02098 34.8706 12.5028 39.1656 19.9952 39.1656Z"
                    fill="#34A853"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.27017 23.6418C8.88684 22.4918 8.66903 21.2634 8.66903 20.0002C8.66903 18.7369 8.88684 17.5085 9.27017 16.3585V11.3926H2.86676C1.56866 13.9801 0.828125 16.9074 0.828125 20.0002C0.828125 23.093 1.56866 26.0202 2.86676 28.6077L9.27017 23.6418Z"
                    fill="#FBBC05"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.9952 8.45611C22.8092 8.45611 25.3357 9.42316 27.3221 11.3224L32.8195 5.82505C29.5001 2.73225 25.1615 0.833008 19.9952 0.833008C12.5028 0.833008 6.02098 5.12808 2.86719 11.3921L9.2706 16.358C10.7778 11.8277 15.0032 8.45611 19.9952 8.45611Z"
                    fill="#EA4335"
                  />
                </svg>
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#04FCBC ",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Connected{" "}
                <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
              </Box>
            </Box>
            <div className="content">
              <p>Google My Business</p>
              <span className="span">Select page</span>
              <Select
                styles={colorStyles}
                options={options4}
                isSearchable={true}
                onChange={handleGoogleSelectBusiness}
                placeholder="Select page"
              />
              <p className="absluteBtn">
                Multiple locations are connected to same page, tracking or
                messaging might not work
              </p>
            </div>
          </IntegrationCard>
        </Grid>
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Image src={faceInsta} alt="" />
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#04FCBC ",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Connected{" "}
                <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
              </Box>
            </Box>
            <div className="content">
              <p>Selected page</p>
              <Select
                styles={colorStyles}
                options={options5}
                isSearchable={true}
                onChange={handleFbMsgPage}
                placeholder="Select page"
              />
              <Button
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "2px solid #04FCBC",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "5px 0px",
                  transition: "0.3s",
                  fontWeight: "500",
                  margin: "10px 0px",
                  display: "flex",
                  gap: "20px",
                  "&:hover ": {
                    color: "#000",
                    background:
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    cursor: "pointer",
                  },
                }}
              >
                Messenger
              </Button>
              <Button
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "2px solid #04FCBC",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "5px 0px",
                  transition: "0.3s",
                  fontWeight: "500",
                  margin: "10px 0px",
                  display: "flex",
                  gap: "20px",
                  "&:hover ": {
                    color: "#000",
                    background:
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    cursor: "pointer",
                  },
                }}
              >
                Instagram
              </Button>
              <p className="absluteBtn">
                To use Instagram DM’s, you need to connect your Instagram
                Account with a Facebook Page. Learn more
              </p>
            </div>
          </IntegrationCard>
        </Grid>
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <svg
                  width="92"
                  height="40"
                  viewBox="0 0 92 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 8.03395L5.27355 8L9.66255 25.3805L14.3237 8.03395H18.9168L23.4419 25.3805L27.9329 8.03395H33.1044L26.504 31.7963H20.618L16.5012 16.0113L12.4865 31.7963H6.60045L0 8.03395Z"
                    fill="white"
                  />
                  <path
                    d="M32.7812 23.1064C32.7812 21.2959 33.1441 19.723 33.8699 18.3878C34.6185 17.03 35.6505 15.989 36.966 15.2648C38.3043 14.518 39.8467 14.1445 41.5932 14.1445C43.3624 14.1445 44.9161 14.4953 46.2543 15.1969C47.6152 15.8758 48.67 16.8489 49.4185 18.1163C50.1898 19.361 50.5868 20.832 50.6093 22.5293C50.6093 23.1403 50.5638 23.6834 50.4733 24.1587H37.7826V24.2945C37.896 25.5618 38.3043 26.5576 39.0075 27.2817C39.7106 28.0059 40.6745 28.368 41.8994 28.368C42.8747 28.368 43.6799 28.1644 44.315 27.757C44.9728 27.327 45.4037 26.7047 45.6079 25.89H50.3373C50.1558 27.0441 49.7133 28.0851 49.0102 29.013C48.307 29.9409 47.3771 30.6764 46.2203 31.2195C45.0635 31.74 43.7366 32.0003 42.2396 32.0003C40.289 32.0003 38.5992 31.6382 37.1702 30.914C35.7639 30.1898 34.6752 29.1601 33.904 27.8249C33.1555 26.467 32.7812 24.8942 32.7812 23.1064ZM45.812 21.0356C45.6532 19.972 45.2109 19.1573 44.4851 18.5915C43.782 18.0031 42.886 17.7089 41.7973 17.7089C40.7539 17.7089 39.8693 18.0144 39.1435 18.6255C38.4404 19.2139 38.0208 20.0172 37.8847 21.0356H45.812Z"
                    fill="white"
                  />
                  <path
                    d="M63.8761 14.3477V18.6928H61.9706C60.6096 18.6928 59.6116 19.1001 58.9766 19.9149C58.3416 20.7296 58.0241 21.8385 58.0241 23.2416V31.796H53.2266V14.3477H57.5816L58.0241 16.9615C58.5456 16.1016 59.1921 15.4566 59.9631 15.0266C60.7346 14.574 61.7666 14.3477 63.0591 14.3477H63.8761Z"
                    fill="white"
                  />
                  <path
                    d="M66.0156 9.45996H70.8126V14.3482H74.7936V18.3878H70.8126V26.0257C70.8126 26.6368 70.9376 27.0781 71.1871 27.3496C71.4591 27.6212 71.9016 27.757 72.5141 27.757H74.9976V31.7966H71.0171C67.6826 31.7966 66.0156 30.1332 66.0156 26.8065V9.45996Z"
                    fill="white"
                  />
                </svg>
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#04FCBC ",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Connected{" "}
                <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
              </Box>
            </Box>
            <div className="content">
              <p>Wert Account (admin@xtraverse.com)</p>
              <p>Selected Other account</p>
              <Select
                styles={colorStyles}
                options={options6}
                isSearchable={true}
                onChange={handleWert}
                placeholder="Select account"
              />

              <Button
                className="absluteBtn"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "2px solid #04FCBC",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "5px 0px",
                  transition: "0.3s",
                  fontWeight: "500",
                  margin: "10px 0px",
                  display: "flex",
                  gap: "20px",
                  "&:hover ": {
                    color: "#000",
                    background:
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    cursor: "pointer",
                  },
                }}
              >
                Connect
              </Button>
            </div>
          </IntegrationCard>
        </Grid>
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <svg
                  width="134"
                  height="25"
                  viewBox="0 0 134 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.00499638 12.0892C-0.0386669 10.509 0.237814 8.93627 0.817805 7.46568C1.3978 5.9951 2.2693 4.65707 3.37989 3.53208C4.49048 2.40709 5.81718 1.51838 7.28017 0.919489C8.74315 0.320594 10.3122 0.0238766 11.8928 0.047171C18.8181 0.047171 21.8601 4.4911 22.6171 7.79951L17.7667 9.28548C17.4572 7.98903 16.696 6.84521 15.6196 6.05911C14.5432 5.273 13.222 4.89603 11.8928 4.99577C10.222 5.23385 8.69321 6.06676 7.58721 7.34153C6.48121 8.6163 5.87229 10.2473 5.87229 11.935C5.87229 13.6227 6.48121 15.2537 7.58721 16.5285C8.69321 17.8033 10.222 18.6362 11.8928 18.8743C13.2426 18.9579 14.5801 18.5744 15.6804 17.7881C16.7807 17.0018 17.5768 15.8607 17.9349 14.5565L22.8414 15.9584C22.2413 18.367 20.819 20.4905 18.82 21.9622C16.8211 23.4338 14.371 24.1614 11.8928 24.0191C10.317 24.0598 8.74949 23.7788 7.28601 23.1931C5.82252 22.6074 4.49384 21.7295 3.38117 20.6129C2.26851 19.4963 1.39524 18.1645 0.814746 16.6989C0.234248 15.2334 -0.0412752 13.6649 0.00499638 12.0892Z"
                    fill="white"
                  />
                  <path
                    d="M40.1247 0.00503062C42.498 0.00225961 44.8189 0.703347 46.7938 2.01962C48.7688 3.33589 50.309 5.20823 51.2198 7.39988C52.1307 9.59153 52.3711 12.004 51.9108 14.3323C51.4505 16.6607 50.3101 18.8002 48.6339 20.4804C46.9576 22.1606 44.8207 23.306 42.4935 23.7717C40.1663 24.2374 37.7532 24.0026 35.5594 23.0969C33.3657 22.1913 31.4897 20.6553 30.1688 18.6835C28.848 16.7117 28.1414 14.3924 28.1387 12.0191C28.0882 10.4301 28.3636 8.84759 28.9477 7.36904C29.5319 5.89048 30.4124 4.54715 31.5353 3.4217C32.6581 2.29626 33.9994 1.41253 35.4766 0.824941C36.9538 0.237348 38.5356 -0.0416831 40.1247 0.00503062ZM40.1247 18.9443C41.5238 19.0143 42.9118 18.6635 44.1096 17.9371C45.3075 17.2107 46.2602 16.1421 46.8448 14.869C47.4295 13.596 47.6193 12.177 47.3897 10.795C47.1601 9.41309 46.5218 8.13166 45.5569 7.11603C44.592 6.10039 43.345 5.39716 41.9766 5.09707C40.6083 4.79698 39.1814 4.91379 37.8801 5.43244C36.5787 5.95109 35.4627 6.84774 34.6758 8.00678C33.889 9.16582 33.4675 10.5341 33.4658 11.935C33.3902 12.8447 33.5079 13.7602 33.811 14.6213C34.1141 15.4825 34.5959 16.2698 35.2246 16.9316C35.8534 17.5935 36.615 18.115 37.4595 18.4618C38.3039 18.8087 39.2122 18.9731 40.1247 18.9443Z"
                    fill="white"
                  />
                  <path
                    d="M80.0513 23.5141V8.24781L74.0372 23.5141H69.8316L63.8316 8.44405V23.5141H58.9531V0.481445H65.64L71.9765 16.0422L77.9905 0.481445H84.9999V23.5141H80.0513Z"
                    fill="white"
                  />
                  <path
                    d="M93.3984 23.5141V0.481445H107.992V5.3319H98.5293V9.70573H107.109V14.2338H98.5293V18.6497H108.02V23.5141H93.3984Z"
                    fill="white"
                  />
                  <path
                    d="M126.443 5.38799V23.5141H121.298V5.38799H114.289V0.481445H133.621V5.38799H126.443Z"
                    fill="white"
                  />
                </svg>
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#04FCBC ",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Connected{" "}
                <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
              </Box>
            </Box>
            <div className="content">
              <p>Comet Account (admin@xtraverse.com)</p>
              <p>Selected Other account</p>
              <Select
                styles={colorStyles}
                options={options7}
                isSearchable={true}
                onChange={handleComet}
                placeholder="Select account"
              />

              <Button
                className="absluteBtn"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "2px solid #04FCBC",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "5px 0px",
                  transition: "0.3s",
                  fontWeight: "500",
                  margin: "10px 0px",
                  display: "flex",
                  gap: "20px",
                  "&:hover ": {
                    color: "#000",
                    background:
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    cursor: "pointer",
                  },
                }}
              >
                Connect
              </Button>
            </div>
          </IntegrationCard>
        </Grid>
        {/* rainbow */}
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Image src={rainbow} alt="" />
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#04FCBC ",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Connected{" "}
                <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
              </Box>
            </Box>
            <div className="content">
              <p>Rainbow Account (admin@xtraverse.com)</p>
              <p>Selected Other account</p>
              <Select
                styles={colorStyles}
                options={options8}
                isSearchable={true}
                onChange={handleRainbow}
                placeholder="Select account"
              />

              <Button
                className="absluteBtn"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "2px solid #04FCBC",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "5px 0px",
                  transition: "0.3s",
                  fontWeight: "500",
                  margin: "10px 0px",
                  display: "flex",
                  gap: "20px",
                  "&:hover ": {
                    color: "#000",
                    background:
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    cursor: "pointer",
                  },
                }}
              >
                Connect
              </Button>
            </div>
          </IntegrationCard>
        </Grid>
        {/* titktok */}
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Image src={tiktok} alt="" />
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#04FCBC ",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Connected{" "}
                <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
              </Box>
            </Box>
            <div className="content">
              <p>Tiktok Account (admin@xtraverse.com)</p>
              <p>Selected Other account</p>
              <Select
                styles={colorStyles}
                options={options8}
                isSearchable={true}
                onChange={handleRainbow}
                placeholder="Select account"
              />

              <Button
                className="absluteBtn"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "2px solid #04FCBC",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "5px 0px",
                  transition: "0.3s",
                  fontWeight: "500",
                  margin: "10px 0px",
                  display: "flex",
                  gap: "20px",
                  "&:hover ": {
                    color: "#000",
                    background:
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    cursor: "pointer",
                  },
                }}
              >
                Connect
              </Button>
            </div>
          </IntegrationCard>
        </Grid>
        {/* snapchat */}
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Image src={snapchat} alt="" />
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#04FCBC ",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Connected{" "}
                <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
              </Box>
            </Box>
            <div className="content">
              <p>Snapchat Account (admin@xtraverse.com)</p>
              <p>Selected Other account</p>
              <Select
                styles={colorStyles}
                options={options8}
                isSearchable={true}
                onChange={handleRainbow}
                placeholder="Select account"
              />

              <Button
                className="absluteBtn"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "2px solid #04FCBC",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "5px 0px",
                  transition: "0.3s",
                  fontWeight: "500",
                  margin: "10px 0px",
                  display: "flex",
                  gap: "20px",
                  "&:hover ": {
                    color: "#000",
                    background:
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    cursor: "pointer",
                  },
                }}
              >
                Connect
              </Button>
            </div>
          </IntegrationCard>
        </Grid>
        {/* twitter */}
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Image src={twitter} alt="" />
              </Box>

              <Box
                component="span"
                sx={{
                  color: data ? "#04FCBC" : "#b5b5b5",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {data ? "Connected" : "connect"}

                {data && (
                  <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
                )}
              </Box>
            </Box>
            <div className="content">
              <p>Twitter Account (@{data && data.data.id.username})</p>
              <p>Enter the Twitter username:</p>
              <form onSubmit={handleSubmit} className="searchAccount">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  placeholder="@ElonMask"
                />
                <Button
                  className="absluteBtn"
                  type="submit"
                  sx={{
                    width: "100%",
                    borderRadius: "8px",
                    background:
                      data &&
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    color: "#fff",
                    border: "2px solid #04FCBC",
                    fontSize: "1em",
                    textTransform: "capitalize",
                    padding: "5px 0px",
                    transition: "0.3s",
                    fontWeight: "500",
                    margin: "10px 0px",
                    display: "flex",
                    gap: "20px",
                    "&:hover ": {
                      color: "#000",
                      background:
                        "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                      cursor: "pointer",
                    },
                  }}
                >
                  Connect
                </Button>
              </form>
            </div>
          </IntegrationCard>
        </Grid>
        {/* discord */}
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Image src={discord} alt="discord" />
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#04FCBC ",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Connected{" "}
                <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
              </Box>
            </Box>
            <div className="content">
              <p>Discord Account (admin@xtraverse.com)</p>
              <p>Selected Other account</p>
              <Select
                styles={colorStyles}
                options={options8}
                isSearchable={true}
                onChange={handleRainbow}
                placeholder="Select account"
              />

              <Button
                className="absluteBtn"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "2px solid #04FCBC",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "5px 0px",
                  transition: "0.3s",
                  fontWeight: "500",
                  margin: "10px 0px",
                  display: "flex",
                  gap: "20px",
                  "&:hover ": {
                    color: "#000",
                    background:
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    cursor: "pointer",
                  },
                }}
              >
                Connect
              </Button>
            </div>
          </IntegrationCard>
        </Grid>
        {/* Reddit */}
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Image src={reddit} alt="" />
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#04FCBC ",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Connected{" "}
                <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
              </Box>
            </Box>
            <div className="content">
              <p>Reddit Account (admin@xtraverse.com)</p>
              <p>Selected Other account</p>
              <Select
                styles={colorStyles}
                options={options8}
                isSearchable={true}
                onChange={handleRainbow}
                placeholder="Select account"
              />

              <Button
                className="absluteBtn"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "2px solid #04FCBC",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "5px 0px",
                  transition: "0.3s",
                  fontWeight: "500",
                  margin: "10px 0px",
                  display: "flex",
                  gap: "20px",
                  "&:hover ": {
                    color: "#000",
                    background:
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    cursor: "pointer",
                  },
                }}
              >
                Connect
              </Button>
            </div>
          </IntegrationCard>
        </Grid>
        {/* Zapier */}
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Image src={zappier} alt="" />
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#04FCBC ",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Connected{" "}
                <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
              </Box>
            </Box>
            <div className="content">
              <p>Zappier Account (admin@xtraverse.com)</p>
              <p>Selected Other account</p>
              <Select
                styles={colorStyles}
                options={options8}
                isSearchable={true}
                onChange={handleRainbow}
                placeholder="Select account"
              />

              <Button
                className="absluteBtn"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "2px solid #04FCBC",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "5px 0px",
                  transition: "0.3s",
                  fontWeight: "500",
                  margin: "10px 0px",
                  display: "flex",
                  gap: "20px",
                  "&:hover ": {
                    color: "#000",
                    background:
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    cursor: "pointer",
                  },
                }}
              >
                Connect
              </Button>
            </div>
          </IntegrationCard>
        </Grid>
        {/* Website */}
        <Grid md={4}>
          <IntegrationCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Image src={website} alt="" />
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#04FCBC ",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Connected{" "}
                <BsCheck2 style={{ fontSize: "1.2em", color: "#04FCBC " }} />
              </Box>
            </Box>
            <div className="content">
              <p>Domain Account (admin@xtraverse.com)</p>
              <p>Selected Other account</p>
              <Select
                styles={colorStyles}
                options={options8}
                isSearchable={true}
                onChange={handleRainbow}
                placeholder="Select account"
              />

              <Button
                className="absluteBtn"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "2px solid #04FCBC",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "5px 0px",
                  transition: "0.3s",
                  fontWeight: "500",
                  margin: "10px 0px",
                  display: "flex",
                  gap: "20px",
                  "&:hover ": {
                    color: "#000",
                    background:
                      "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                    cursor: "pointer",
                  },
                }}
              >
                Connect
              </Button>
            </div>
          </IntegrationCard>
        </Grid>
      </Grid>
    </>
  );
}
