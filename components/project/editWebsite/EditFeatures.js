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

function EditFeatures(props) {
  const {
    setFeaturesHeading,

    setDesHeading,
    handleDesImageChange,
    setEditHeroScript,
    setHeroButton,
    showDesColorPopup,
    desOverlayColor,
    setDesOverlayColor,
    setShowDesColorPopup,
    setDesSubHeading,
    setDesSubtext,
    featuresType1,
    setFeaturesType1,
    featuresType2,
    setFeaturesType2,
    handleFeatures1ImageChange,
    handleFeatures2ImageChange,
    setFeature1SubHeading,
    setFeature2SubHeading,
    setFeature1Heading,
    setFeature2Heading,
    setFeature1Subtext,
    setFeature2Subtext,
    setClcktionBtn,
    setNftValueBtn,
    setFeatureOverlayColor,
    featureOverlayColor,
  } = props;
  const router = useRouter();

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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <span>Heading</span>
              <input
                type="text"
                placeholder="Why us"
                onChange={(e) => setFeaturesHeading(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <p style={{ fontSize: "1.8em", fontWeight: "500" }}>Section 1</p>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <div
                    className={
                      featuresType1 === "upperSection1"
                        ? "hero-type active"
                        : "hero-type"
                    }
                    onClick={() => setFeaturesType1("upperSection1")}
                  >
                    <Image
                      src="/images/templatePage/herotype1.svg"
                      alt="hero-type1"
                      width={100}
                      height={100}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className={
                      featuresType1 === "upperSection2"
                        ? "hero-type active"
                        : "hero-type"
                    }
                    onClick={() => setFeaturesType1("upperSection2")}
                  >
                    <Image
                      src="/images/templatePage/herotype2.svg"
                      alt="hero-type2"
                      width={100}
                      height={100}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className={
                      featuresType1 === "upperSection3"
                        ? "hero-type active"
                        : "hero-type"
                    }
                    onClick={() => setFeaturesType1("upperSection3")}
                  >
                    <Image
                      src="/images/templatePage/herotype3.svg"
                      alt="hero-type2"
                      width={100}
                      height={100}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  marginTop: "15px",
                }}
              >
                <div className="inputsc">
                  <input
                    type="file"
                    placeholder="upload Logo"
                    onChange={handleFeatures1ImageChange}
                    accept="image/*"
                  />
                  <span>
                    <IoMdCloudUpload />
                    Upload image
                  </span>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <span>Add Subheadling</span>
                <input
                  type="text"
                  placeholder="Ex: Robo Gremlins"
                  onChange={(e) => setFeature1SubHeading(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <span>Add Heading</span>
                <input
                  type="text"
                  placeholder="Ex: Robo Gremlins"
                  onChange={(e) => setFeature1Heading(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{}}>
                <span>Description</span>
                <input
                  onChange={(e) => setFeature1Subtext(e.target.value)}
                  type="text"
                  placeholder="EX: Our Fancy shamny NFT..."
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <span>Button</span>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "50% auto",
                  gap: "10px",
                }}
              >
                <Box sx={{}}>
                  <input
                    onChange={(e) => setClcktionBtn(e.target.value)}
                    type="text"
                    placeholder="4,500"
                  />
                </Box>
                <Box sx={{}}>
                  <input
                    onChange={(e) => setNftValueBtn(e.target.value)}
                    type="text"
                    placeholder="2.5x"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/*section */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p style={{ fontSize: "1.8em", fontWeight: "500" }}>Section 2</p>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <div
                    className={
                      featuresType2 === "bottomSection1"
                        ? "hero-type active"
                        : "hero-type"
                    }
                    onClick={() => setFeaturesType2("bottomSection1")}
                  >
                    <Image
                      src="/images/templatePage/herotype1.svg"
                      alt="hero-type1"
                      width={100}
                      height={100}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className={
                      featuresType2 === "bottomSection2"
                        ? "hero-type active"
                        : "hero-type"
                    }
                    onClick={() => setFeaturesType2("bottomSection2")}
                  >
                    <Image
                      src="/images/templatePage/herotype2.svg"
                      alt="hero-type2"
                      width={100}
                      height={100}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className={
                      featuresType2 === "bottomSection3"
                        ? "hero-type active"
                        : "hero-type"
                    }
                    onClick={() => setFeaturesType2("bottomSection3")}
                  >
                    <Image
                      src="/images/templatePage/herotype3.svg"
                      alt="hero-type2"
                      width={100}
                      height={100}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  marginTop: "15px",
                }}
              >
                <div className="inputsc">
                  <input
                    type="file"
                    placeholder="upload Logo"
                    onChange={handleFeatures2ImageChange}
                    accept="image/*"
                  />
                  <span>
                    <IoMdCloudUpload />
                    Upload image
                  </span>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <span>Add Subheadling</span>
                <input
                  type="text"
                  placeholder="Ex: Robo Gremlins"
                  onChange={(e) => setFeature2SubHeading(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <span>Add Heading</span>
                <input
                  type="text"
                  placeholder="Ex: Robo Gremlins"
                  onChange={(e) => setFeature2Heading(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{}}>
                <span>Description</span>
                <input
                  onChange={(e) => setFeature2Subtext(e.target.value)}
                  type="text"
                  placeholder="EX: Our Fancy shamny NFT..."
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{}}>
                <span>Button</span>
                <input
                  onChange={(e) => setHeroButton(e.target.value)}
                  type="text"
                  placeholder="e.g View On Marketplace"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <div className="selectColorType">
                <span
                  style={{
                    padding: "5px 0px 10px",
                    display: "block",
                  }}
                >
                  Add Backgorund Color
                </span>
                <div
                  className="inputsc btninputsc"
                  onClick={(e) => {
                    setShowDesColorPopup(true);
                    e.stopPropagation();
                  }}
                >
                  <Button>
                    <AiOutlinePlus />
                    gradient or color
                  </Button>
                </div>
                {showDesColorPopup && (
                  <div
                    className="picColor"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ColorPicker
                      value={featureOverlayColor}
                      onChange={setFeatureOverlayColor}
                    />
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default EditFeatures;
