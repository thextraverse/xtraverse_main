import React, { useState, Component } from "react";
import Slider from "react-slick";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import template1 from "../../../components/images/theme/cryptocanvas.png";
import template2 from "../../../components/images/theme/ethereasel.png";
import template4 from "../../../components/images/theme/pixelvault.png";
import Sidebar, { drawerWidth } from "../../../components/dashboard/sidebar";
import Stepnav from "../../../components/dashboard/stepnav";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { auth, db, storage } from "../../../configfile/firebaseConfig";
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
import { useUserAuth } from "../../../configfile/UserAuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";

const Main = styled.main`
  background: #303030;
  padding: 30px;
  height: 100%;
  color: #fff;
`;
const SlderTemplatesc = styled.div`
  width: 100%;
  height: 100%;
  margin: 50px 0px 0px;
  .TitleTxt {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 100px;
    width: 100%;
    height: 100%;
    span {
      color: #fff;
    }
    h1 {
      color: #fff;
    }
    a {
      display: inline-block;
      padding: 10px 55px;
      background: transparent;
      border: 2px solid rgba(255, 255, 255, 0.6);
      border-radius: 5px;
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
      margin: 30px 0px;
      &:hover {
        background: #fff;
        color: #000;
      }
    }
  }
`;
const SliderSec = styled.div`
  width: 90%;
  object-fit: cover;
  span {
    text-align: center;
    display: block;
    padding: 10px 0px;
    color: rgba(255, 255, 255, 0.6);
  }
  .image {
    width: 100%;
    height: 100%;
    background-color: #fff;
    span {
      width: 100%;
      height: 100% !important;
    }
    img {
      object-fit: contain;
    }
  }
`;

function Template() {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const emailData = user.email;
  console.log(emailData);

  const handleDataSubmit = async (templateId) => {
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
          "template"
        );
        const querySnapshot = await getDocs(userDataCollectionRef);

        if (!querySnapshot.empty) {
          // User data exists in database, update the existing document
          const docId = querySnapshot.docs[0].id;
          const docRef = doc(userDataCollectionRef, docId);
          await updateDoc(docRef, {
            id: templateId,
          });
          if (
            MySwal.fire({
              title: <strong>Thanks for selecting</strong>,
              icon: "success",
            })
          );
        } else {
          // User data does not exist in database, create a new document
          await addDoc(userDataCollectionRef, {
            id: templateId,
          });
          if (
            MySwal.fire({
              title: <strong>Thanks for uploading</strong>,
              icon: "success",
            })
          );
        }
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      console.log("No documents found.");
    }
  };

  return (
    <Main>
      <Sidebar />
      <Box
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          marginLeft: "auto",
          background: "transparent",
          height: "100vh",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "100%",
          alignItems: "center",
        }}
      >
        <Stepnav />
        <SlderTemplatesc>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4.5}>
                <div className="TitleTxt">
                  <div>
                    <span>Step 3</span>
                    <h1>Select Template</h1>

                    <Link href="/dashboard/createproject/uploadnfts">
                      <a>Next step</a>
                    </Link>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6} md={7.5}>
                <SliderSec>
                  <Slider {...settings}>
                    <Box
                      sx={{
                        position: "relative",
                        height: "100%",
                      }}
                    >
                      <div className="image">
                        <Image src={template1} alt="Picture of the author" />
                      </div>
                      <Button
                        onClick={() => {
                          handleDataSubmit("CryptoCanvas");
                        }}
                        sx={{
                          position: "absolute",
                          bottom: "-2%",
                          left: "50%",
                          zIndex: "2",
                          transform: "translate(-50%,-50%)",
                          background: "#000",
                          transition: ".3s",
                          color: "#fff",
                          boxShadow: "0px 0px 10px rgba(0,0,0,.4)",
                          "&:hover": {
                            background: "#EB5757",
                            color: "#fff",
                          },
                        }}
                      >
                        Select Template
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        height: "100%",
                      }}
                    >
                      <div className="image">
                        <Image src={template2} alt="Picture of the author" />
                      </div>

                      <Button
                        onClick={() => {
                          handleDataSubmit("EtherEasel");
                        }}
                        sx={{
                          position: "absolute",
                          bottom: "-2%",
                          left: "50%",
                          zIndex: "2",
                          transform: "translate(-50%,-50%)",
                          background: "#000",
                          transition: ".3s",
                          color: "#fff",
                          boxShadow: "0px 0px 10px rgba(0,0,0,.4)",
                          "&:hover": {
                            background: "#EB5757",
                            color: "#fff",
                          },
                        }}
                      >
                        Select Template
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        height: "100%",
                      }}
                    >
                      <div className="image">
                        <Image src={template4} alt="Picture of the author" />
                      </div>

                      <Button
                        onClick={() => {
                          handleDataSubmit("PixelVault");
                        }}
                        sx={{
                          position: "absolute",
                          bottom: "-2%",
                          left: "50%",
                          zIndex: "2",
                          transform: "translate(-50%,-50%)",
                          background: "#000",
                          transition: ".3s",
                          color: "#fff",
                          boxShadow: "0px 0px 10px rgba(0,0,0,.4)",
                          "&:hover": {
                            background: "#EB5757",
                            color: "#fff",
                          },
                        }}
                      >
                        Select Template
                      </Button>
                    </Box>
                  </Slider>
                  <span>More templates to come!</span>
                </SliderSec>
              </Grid>
            </Grid>
          </Box>
        </SlderTemplatesc>
      </Box>
    </Main>
  );
}

export default Template;
