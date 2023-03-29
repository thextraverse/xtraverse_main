import React, { useState } from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import Sidebar from "../../../components/dashboard/sidebar/Navbar";
import Stepnav from "../../../components/dashboard/step-nav";
import { IoIosAddCircle, IoIosArrowDropright } from "react-icons/io";
import { useRouter } from "next/router";
import { BsCheck2, BsPlusLg } from "react-icons/bs";
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
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import {
  query,
  addDoc,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Form,
  LaucnhWrapper,
  Step,
  LuanchForm,
  ActiveDot,
  Connectionsec,
} from "../../../components/styles/homepage.styled";
import { useUserAuth } from "../../../configfile/UserAuthContext";
import domainImg from "../../../components/images/icons/domain.png";
import Select from "react-select";
import { db } from "../../../configfile/firebaseConfig";

const Main = styled.main`
  background: #303030;
  padding: 30px;
`;
const Launchsc = styled.div`
  // width: 500px;
  // margin: auto;
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
  input,
  textarea {
    padding: 15px 15px;
    border: none;
    border-radius: 10px;
    margin: 5px 0px 20px;
    background: #252525;
    outline: none;
    @media screen and (max-width: 1400px) {
      padding: 10px 10px;
      margin: 5px 0px 15px;
    }
  }
  span {
    color: #fff;
    font-weight: 400;
    font-size: 0.9em;
  }
  .showselectedresult {
    margin: 10px 0px 40px;

    span {
      display: block;
    }
    input {
      width: 100%;
      padding: 15px;
      color: #fff;
      font-size: 1em;
    }
  }
`;
const IntegrationCard = styled.div`
  background: #212121;
  border-radius: 10px;
  padding: 15px 12px;
  margin: 10px;
  position: relative;
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
function Launch() {
  // const [step, setStep] = useState("Step 1");
  const { user } = useUserAuth();
  const router = useRouter();
  // user !== null && user.email && (emailData = user.email);
  // user === null && router.push("/");
  const [activeTab, setActiveTab] = useState(0);

  const [domainData, setDomainData] = useState();
  const [subdomainData, setSubDomainData] = useState();
  const [utilities, setUtilities] = useState({});
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
  // const handleDomainSubdomain = (name, value) => {
  //   setDomainData(name, value);
  // };
  const handleDomain = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      selectedOption,
    }));
  };
  console.log("domaindata", domainData);
  const domainOption = [
    { value: "Domain", label: "domain" },
    { value: "Sub-Domain", label: "subdomain" },
  ];
  // const checkDomainSelection = utilities.Domain.value;
  const emailData = user.email;
  // handleshubmit function for sending data to firebase

  const handleSubmit = async () => {
    // Check if user already exists in database
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("Email", "==", emailData));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const autoId = querySnapshot.docs[0].id;
      console.log(`AutoId: ${autoId}`);
      try {
        const userDataCollectionRef = collection(
          db,
          "Users",
          autoId,
          "domainData"
        );
        const querySnapshot = await getDocs(userDataCollectionRef);

        if (!querySnapshot.empty) {
          // User data exists in database, update the existing document
          const docId = querySnapshot.docs[0].id;
          // console.log(`DocId: ${docId}`);
          const docRef = doc(userDataCollectionRef, docId);
          await updateDoc(docRef, {
            domainData: domainData,
          });
          if (console.log("succesfully update data"));
        } else {
          // User data does not exist in database, create a new document
          await addDoc(userDataCollectionRef, {
            domainData: domainData,
          });
          if (console.log("succesfully create data"));
        }
      } catch (error) {
        console.error("Error updating document:", error);
        alert("select domain please");
      }
    } else {
      console.log("No documents found.");
    }
  };

  return (
    <>
      <Head>
        <title>Domain</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        {/* <Sidebar activeBtn={2} /> */}
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
                    <Image src={domainImg} alt="" />
                  </Box>

                  {/* <Box
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
                    <BsCheck2
                      style={{ fontSize: "1.2em", color: "#04FCBC " }}
                    />
                  </Box> */}
                </Box>
                <div className="content">
                  <p>Domain Intergrations </p>
                  <p>Selected Domain</p>
                  <Select
                    styles={colorStyles}
                    options={domainOption}
                    isSearchable={true}
                    defaultValue={domainOption[0]}
                    onChange={handleDomain}
                    placeholder="Select Domain"
                  />
                  <Box
                    sx={{
                      padding: "5px 0px",
                    }}
                  >
                    {utilities.selectedOption &&
                    utilities.selectedOption.label != "domain" ? (
                      <div className="showselectedresult">
                        <span>Add Subdomain</span>
                        <input
                          type="text"
                          placeholder="Sub domain"
                          onChange={(e) =>
                            setDomainData((prevState) => ({
                              ...prevState,
                              SubdomainData: e.target.value,
                            }))
                          }
                        />
                      </div>
                    ) : (
                      <div className="showselectedresult">
                        <span>Add Domain</span>
                        <input
                          type="text"
                          placeholder="domain"
                          onChange={(e) =>
                            setDomainData((prevState) => ({
                              ...prevState,
                              domainData: e.target.value,
                            }))
                          }
                        />
                      </div>
                    )}
                  </Box>
                  <Button
                    className="absluteBtn"
                    onClick={handleSubmit}
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
                    Submit
                  </Button>
                </div>
              </IntegrationCard>
            </Grid>
          </Launchsc>
        </Box>
      </Main>
    </>
  );
}

export default Launch;
