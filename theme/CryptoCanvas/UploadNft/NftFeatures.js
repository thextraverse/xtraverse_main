import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import { FiArrowRightCircle } from "react-icons/fi";
import Image from "next/image";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/router";
import { Form, PreviewBox } from "../style/uploadnft.style";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPercent } from "react-icons/fa";
import { db, storage } from "../../../configfile/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import {
  query,
  addDoc,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { v4 } from "uuid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import { useUserAuth } from "../../../configfile/UserAuthContext";
function CryptoCanvasNftfeaures(props) {
  const {
    handlePrev,
    handleVideoChange,
    selectedVideoUrl,
    setAddStory,
    addStory,
    selectedImage,
    nftName,
    addUntility,
    tags,
    videoTitle,
    setVideoTitle,
    tokenType,
    setTokenType,
    mintType,
    setMintType,
    nftCollectionName,
    addNftDescript,
    nftPrice,
    nftMindBtn,
    imageupload,
    uploadVideoUrl,
    selectedVideo,
  } = props;
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  const uniqueId = v4();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploadProgrees, setImageUploadProgrees] = useState(0);

  const emailData = user.email;

  console.log(emailData);
  const handleDataSubmit = async () => {
    const imageRef = ref(storage, `images/nft${imageupload.name + v4()}`);
    const videoRef = ref(storage, `video/${uploadVideoUrl.name + v4()}`);

    // Upload the files to Firebase storage
    const [imageSnapshot, videoSnapshot] = await Promise.all([
      uploadBytesResumable(imageRef, imageupload),
      uploadBytesResumable(videoRef, uploadVideoUrl),
    ]);

    // Track upload progress for image
    let imageUploadProgress = 0;
    const imageUploadTask = uploadBytesResumable(imageRef, imageupload);
    imageUploadTask.on(
      "state_changed",
      (snapshot) => {
        imageUploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Image Upload Progress: ${imageUploadProgress}%`);
        setImageUploadProgrees(imageUploadProgress);
        setUploadProgress(imageUploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Image upload complete.");
      }
    );

    // Track upload progress for video
    let videoUploadProgress = 0;
    const videoUploadTask = uploadBytesResumable(videoRef, uploadVideoUrl);
    videoUploadTask.on(
      "state_changed",
      (snapshot) => {
        videoUploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Video Upload Progress: ${videoUploadProgress}%`);

        setUploadProgress(videoUploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Video upload complete.");
      }
    );

    // Wait for all the files to finish uploading
    await Promise.all([imageUploadTask, videoUploadTask]);

    // Get the download URLs for the files
    const [imageurl, videoUrl] = await Promise.all([
      getDownloadURL(imageSnapshot.ref),
      getDownloadURL(videoSnapshot.ref),
    ]);

    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("Email", "==", emailData));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const autoId = querySnapshot.docs[0].id;
        console.log(`AutoId: ${autoId}`);
        const userDataCollectionRef = collection(
          db,
          "Users",
          autoId,
          "nftData"
        );
        await addDoc(userDataCollectionRef, {
          nftimage: imageurl,
          nftvideo: videoUrl,
          nftname: nftName,
          collectionName: nftCollectionName,
          description: addNftDescript,
          price: nftPrice,
          button: nftMindBtn,
          token: tokenType,
          mint: mintType,
          videoTitle: videoTitle,
          videoStory: addStory,
          id: uniqueId,
        });
        if (
          MySwal.fire({
            title: <strong>Uploaded</strong>,
            icon: "success",
          })
        );
      } else {
        alert("No documents found.");
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Error submitting form. Please try again later.");
    }
    setUploadProgress("");
  };
  console.log(uploadProgress);
  const handleSubmitAllData = (e) => {
    e.preventDefault();
    router.push("/dashboard/createproject/edithomepage");
  };

  return (
    <Box
      sx={{
        width: {
          sx: "90%",
          lg: "100%",
          xl: "80%",
        },
        margin: "auto",
      }}
    >
      <Grid container spacing={{ lg: 2, xl: 4 }}>
        <Grid item xs={4} lg={4.5} xl={4.5}>
          <Form className="forminput" onSubmit={handleSubmitAllData}>
            <h1>Features</h1>
            <Box sx={{ width: "100%" }}>
              {uploadProgress > 0 ? (
                <Box>
                  {imageUploadProgrees !== 100
                    ? "image upload progress"
                    : "video upload progress"}
                  <LinearProgress
                    determinate
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    thickness={32}
                    value={uploadProgress}
                    sx={{
                      "--LinearProgress-radius": "0px",
                      "--LinearProgress-progressThickness": "24px",
                      boxShadow: "sm",
                      borderColor: "neutral.500",
                    }}
                  >
                    <Typography
                      level="body3"
                      fontWeight="xl"
                      textColor="common.white"
                      sx={{ mixBlendMode: "difference" }}
                    >
                      LOADING… {`${Math.round(uploadProgress)}%`}
                    </Typography>
                  </LinearProgress>
                </Box>
              ) : (
                ""
              )}
            </Box>
            <Grid container>
              <Grid item xs={12}>
                <div className="typslction">
                  <Box>
                    <h5>Token type</h5>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "50% auto",
                      }}
                    >
                      <Button onClick={(e) => setTokenType("ERC-721A")}>
                        <div>
                          <h2>ERC-721A</h2>
                          <p>
                            Each unique token <br /> only <u>has one owner</u>
                          </p>
                        </div>
                      </Button>
                      <Button onClick={(e) => setTokenType("RC-1155")}>
                        <div>
                          <h2>ERC-1155</h2>
                          <p>
                            Each unique token <br /> only <u>multiple owner</u>
                          </p>
                        </div>
                      </Button>
                    </Box>
                  </Box>
                  <Box>
                    <h5>Mint type</h5>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "50% auto",
                      }}
                    >
                      <Button onClick={(e) => setMintType("Regular")}>
                        <div>
                          <h2>Regular</h2>
                          <p>You pay gas fees</p>
                        </div>
                      </Button>
                      <Button onClick={(e) => setMintType("Lazy")}>
                        <div>
                          <h2>Lazy</h2>
                          <p>Buyer pay gas fees</p>
                        </div>
                      </Button>
                    </Box>
                  </Box>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <div className="inputsc">
                    <input
                      type="file"
                      placeholder="video upload"
                      onChange={handleVideoChange}
                      accept="video/mp4,video/x-m4v,video/*"
                    />
                    <span>
                      Upload Video <FaCloudUploadAlt />
                    </span>
                  </div>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box>
                  <span>Name of NFT</span>
                  <input
                    type="text"
                    placeholder="Ex: Draken's Origin"
                    onChange={(e) => setVideoTitle(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <span>Add Story (not required):</span>
                  <textarea
                    onChange={(e) => setAddStory(e.target.value)}
                    placeholder="Ex:Admision ticket , lifetime Costco Member"
                  />
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box>
                  <span>Royalties</span>
                  <div className="royalties">
                    <div className="roayltiesinput">
                      <input type="text" placeholder="Enter Wallet Address" />
                      <div className="parcentage">
                        <FaPercent />
                      </div>
                    </div>
                    <Button>
                      <AiOutlinePlus />
                    </Button>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{
                    background: "crimson",
                    border: "2px solid crimson",
                    width: "100%",
                    display: "block",
                    height: "50px",
                    color: "#fff",
                    marginBottom: "15px",
                  }}
                  onClick={handleDataSubmit}
                >
                  update
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={{ lg: 2, xl: 4 }}>
                  <Grid item xs={4}>
                    <Button
                      onClick={handlePrev}
                      sx={{
                        background: "transparent",
                        border: "2px solid #fff",
                        width: "100%",
                        display: "block",
                        height: "50px",
                        color: "#fff",
                        fontSize: "1.6em",
                        display: "flex",
                        alignItems: "center",
                        "&:hover": {
                          background: "#fff",
                          color: "#000",
                        },
                      }}
                    >
                      <IoIosArrowDropleftCircle />
                    </Button>
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      type="submit"
                      sx={{
                        background: "#fff",
                        border: "2px solid #fff",
                        width: "100%",
                        display: "block",
                        height: "50px",
                        color: "#000",
                        "&:hover": {
                          background: "transparent",
                          color: "#fff",
                        },
                      }}
                    >
                      Complete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </Grid>
        <Grid item xs={8} lg={7.5} xl={7.5}>
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                border: "2px solid #BEBEBE",
                padding: "10px",
                borderRadius: "10px",
                height: {
                  xl: "550px",
                  lg: "500px",
                },
              }}
            >
              <PreviewBox>
                <div className="videowrap">
                  <h1>{videoTitle}</h1>
                  <div className="videoBox">
                    <video src={selectedVideo} muted autoPlay></video>
                  </div>
                  <p>{addStory}</p>
                </div>
              </PreviewBox>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default CryptoCanvasNftfeaures;
