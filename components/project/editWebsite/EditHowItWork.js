import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { IoMdCloudUpload } from "react-icons/io";
import { RiTicketLine } from "react-icons/ri";
import { HomepagePreview } from "./edithomepage.style";
import firstimg from "../../images/project1.png";
import { useRouter } from "next/router";
import { Form } from "../../styles/homepage.styled";
import { RiDeleteBinLine } from "react-icons/ri";
import ColorPicker from "react-best-gradient-color-picker";
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
import { AiOutlinePlus } from "react-icons/ai";

function EditHowitWorks(props) {
  const {
    setHowItWorsType,
    howItWorsType,
    setDesHeading,
    setStepInputData,
    setHowitWorksHeading,
    setStepImageData,
  } = props;
  const router = useRouter();

  const [titleData, setTitleData] = useState({
    firstField: {
      title: "Connect your wallet",
      textarea:
        "Use Trust Wallet, Metamask or any wallet to connect to the app.",
    },
    secondField: {
      title: "Select your quantity",
      textarea:
        "Use Trust Wallet, Metamask or any wallet to connect to the app.",
    },
    thirdField: {
      title: "Confirm transaction",
      textarea:
        "Earn ETH and BIT for all your NFTs that you sell on our marketplace.",
    },
    fourthField: {
      title: "Receive your NFTs",
      textarea: "Latin professor at Hampden-Sydney College in Virginia.",
    },
  });

  function handleTitleChange(e) {
    const value = e.target.value;
    setTitleData({
      ...titleData,
      [e.target.name]: {
        ...titleData[e.target.name],
        [e.target.id]: value,
      },
    });
  }

  const [imageData, setImageData] = useState({
    firstImage: null,
    secondImage: null,
    thirdImage: null,
    fourthImage: null,
  });
  function handleDesImageChange(event) {
    const name = event.target.name;
    const file = event.target.files[0];
    setImageData({
      ...imageData,
      [name]: file,
    });
  }

  // console.log(titleData);
  setStepInputData(titleData);
  setStepImageData(imageData);
  return (
    <>
      <Box
        sx={{
          width: {
            sm: "100%",
          },
          margin: "auto",
        }}
      >
        <Form className="forminput">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <div
                    className={
                      howItWorsType === "howitworks1"
                        ? "hero-type active"
                        : "hero-type"
                    }
                    onClick={() => setHowItWorsType("howitworks1")}
                  >
                    <Image
                      src="/images/editwebsite/Hlayout.svg"
                      alt="hero-type1"
                      width={100}
                      height={100}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className={
                      howItWorsType === "howitworks2"
                        ? "hero-type active"
                        : "hero-type"
                    }
                    onClick={() => setHowItWorsType("howitworks2")}
                  >
                    <Image
                      src="/images/editwebsite/Hlayout2.svg"
                      alt="hero-type2"
                      width={100}
                      height={100}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <span>Add Heading</span>
                <input
                  type="text"
                  placeholder="e.g Pudgy Penguins"
                  onChange={(e) => setHowitWorksHeading(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <div className="steps">
                <span>Step 1</span>
                <Box
                  sx={{
                    marginTop: "15px",
                  }}
                >
                  <div className="inputsc">
                    <input
                      type="file"
                      id="firstImage"
                      name="firstImage"
                      placeholder="upload Logo"
                      onChange={handleDesImageChange}
                      accept="image/*"
                    />
                    <span>
                      <IoMdCloudUpload />
                      Upload image
                    </span>
                  </div>
                </Box>
                <Box>
                  <input
                    type="text"
                    placeholder="Add title"
                    id="title"
                    name="firstField"
                    value={titleData.firstField.title}
                    onChange={handleTitleChange}
                  />
                </Box>
                <Box>
                  <textarea
                    placeholder="Explain your first step"
                    id="textarea"
                    name="firstField"
                    value={titleData.firstField.textarea}
                    onChange={handleTitleChange}
                  />
                </Box>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="steps">
                <span>Step 2</span>
                <Box
                  sx={{
                    marginTop: "15px",
                  }}
                >
                  <div className="inputsc">
                    <input
                      type="file"
                      id="secondImage"
                      name="secondImage"
                      placeholder="upload Logo"
                      onChange={handleDesImageChange}
                      accept="image/*"
                    />
                    <span>
                      <IoMdCloudUpload />
                      Upload image
                    </span>
                  </div>
                </Box>
                <Box>
                  <input
                    type="text"
                    placeholder="Add title"
                    id="title"
                    name="secondField"
                    value={titleData.secondField.title}
                    onChange={handleTitleChange}
                  />
                </Box>
                <Box>
                  <textarea
                    placeholder="Explain your first step"
                    id="textarea"
                    name="secondField"
                    value={titleData.secondField.textarea}
                    onChange={handleTitleChange}
                  />
                </Box>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="steps">
                <span>Step 3</span>
                <Box
                  sx={{
                    marginTop: "15px",
                  }}
                >
                  <div className="inputsc">
                    <input
                      type="file"
                      id="thirdImage"
                      name="thirdImage"
                      placeholder="upload Logo"
                      onChange={handleDesImageChange}
                      accept="image/*"
                    />
                    <span>
                      <IoMdCloudUpload />
                      Upload image
                    </span>
                  </div>
                </Box>
                <Box>
                  <input
                    type="text"
                    placeholder="Add title"
                    id="title"
                    name="thirdField"
                    value={titleData.thirdField.title}
                    onChange={handleTitleChange}
                  />
                </Box>
                <Box>
                  <textarea
                    placeholder="Explain your first step"
                    id="textarea"
                    name="thirdField"
                    value={titleData.thirdField.textarea}
                    onChange={handleTitleChange}
                  />
                </Box>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="steps">
                <span>Step 4</span>
                <Box
                  sx={{
                    marginTop: "15px",
                  }}
                >
                  <div className="inputsc">
                    <input
                      type="file"
                      id="fourthImage"
                      name="fourthImage"
                      placeholder="upload Logo"
                      onChange={handleDesImageChange}
                      accept="image/*"
                    />
                    <span>
                      <IoMdCloudUpload />
                      Upload image
                    </span>
                  </div>
                </Box>
                <Box>
                  <input
                    type="text"
                    placeholder="Add title"
                    id="title"
                    name="fourthField"
                    value={titleData.fourthField.title}
                    onChange={handleTitleChange}
                  />
                </Box>
                <Box>
                  <textarea
                    placeholder="Explain your first step"
                    id="textarea"
                    name="fourthField"
                    value={titleData.fourthField.textarea}
                    onChange={handleTitleChange}
                  />
                </Box>
              </div>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default EditHowitWorks;
