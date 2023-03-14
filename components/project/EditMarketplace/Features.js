import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import PercentIcon from "@mui/icons-material/Percent";
import { AiOutlinePlus } from "react-icons/ai";
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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import { Form } from "../../dashboard/edithome/homepage.styled";
import { HomepagePreview } from "../../dashboard/edithome/edithomepage.style";
import { db, auth, storage } from "../../../configfile/firebaseConfig";
import { useUserAuth } from "../../../configfile/UserAuthContext";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaPercent } from "react-icons/fa";

function MarketPlaceFeatures(props) {
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
  const [uploadProgress, setUploadProgress] = useState("");

  // const [firebaseUserData, setFirebaseUserData] = useState([]);
  // useEffect(() => {
  //   getTemplates();
  // }, []);
  // useEffect(() => {}, [firebaseUserData]);

  // function getTemplates() {
  //   const getUploadDataRef = collection(db, "Users");
  //   getDocs(getUploadDataRef)
  //     .then((response) => {
  //       console.log(response.docs);
  //       const datas = response.docs.map((doc) => ({
  //         data: doc.data(),
  //         id: doc.id,
  //       }));
  //       setFirebaseUserData(datas);
  //     })
  //     .catch((error) => {
  //       console.log(error.messages);
  //     });
  // }
  // var ameniemailData = [];
  // var useruid = [];
  // firebaseUserData.map((userData, index) => {
  //   const uid = userData.data.Uid;
  //   const userEmail = userData.data.Email;
  //   ameniemailData.push(userEmail);
  //   useruid.push(uid);
  // });
  // console.log(emailData);
  const emailData = user.email;
  console.log(emailData);
  // handleshubmit function for sending data to firebase

  const handleDataSubmit = async () => {
    const imageRef = ref(storage, `images/nft${uploadLogo.name + v4()}`);

    // Upload the file to Firebase storage
    const uploadTask = uploadBytesResumable(imageRef, uploadLogo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.totalBytes
          ? Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          : 0;
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        // File upload complete
        const [imageSnapshot] = await Promise.all([
          uploadBytes(imageRef, uploadLogo),
        ]);
        // Get the download URLs for the file
        const [imageurl] = await Promise.all([
          getDownloadURL(imageSnapshot.ref),
        ]);

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
              "homepage"
            );
            const querySnapshot = await getDocs(userDataCollectionRef);

            if (!querySnapshot.empty) {
              // User data exists in database, update the existing document
              const docId = querySnapshot.docs[0].id;
              // console.log(`DocId: ${docId}`);
              const docRef = doc(userDataCollectionRef, docId);
              await updateDoc(docRef, {
                logo: imageurl,
                heading: editHeroName,
                description: editHeroScript,

                id: uniqueId,
              });
              if (
                MySwal.fire({
                  title: <strong>Uploaded</strong>,
                  icon: "success",
                })
              );
            } else {
              // User data does not exist in database, create a new document
              await addDoc(userDataCollectionRef, {
                logo: imageurl,
                heading: editHeroName,
                description: editHeroScript,
                id: uniqueId,
              });
              if (
                MySwal.fire({
                  title: <strong>Uploaded</strong>,
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
        // Reset the upload progress bar
        setUploadProgress("");
      }
    );
  };

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
            <Box sx={{ width: "100%" }}>
              {uploadProgress > 0 ? (
                <Box>
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

            <Grid xs={12}>
              <div className="typslction">
                <Box sx={{ marginBottom: "10px" }}>
                  <span>Token type</span>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "50% auto",
                      gap: "15px",
                      marginTop: "5px",
                    }}
                  >
                    <Button onClick={(e) => setTokenType("ERC-721A")}>
                      <h2>ERC-721A</h2>
                      <p>Each unique token only has one owner.</p>
                    </Button>
                    <Button onClick={(e) => setTokenType("RC-1155")}>
                      <h2>ERC-1155</h2>
                      <p>Each token is unique to multiple owner.</p>
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ marginBottom: "10px" }}>
                  <span>Mint type</span>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "50% auto",
                      gap: "15px",
                      marginTop: "5px",
                    }}
                  >
                    <Button onClick={(e) => setMintType("Regular")}>
                      <h2>Regular</h2>
                      <p>You pay gas fees</p>
                    </Button>
                    <Button onClick={(e) => setMintType("Lazy")}>
                      <h2>Lazy</h2>
                      <p>Buyer pay gas fees</p>
                    </Button>
                  </Box>
                </Box>
              </div>
            </Grid>
            <Grid xs={12}>
              <Box>
                <div className="inputsc">
                  <input
                    type="file"
                    placeholder="video upload"
                    onChange={handleVideoChange}
                    accept="video/mp4,video/x-m4v,video/*"
                  />
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.2 18C1.88484 17.235 1 15.8051 1 14.1674C1 12.1053 2.40285 10.3727 4.30122 9.88197C4.30041 9.83571 4.3 9.78935 4.3 9.7429C4.3 5.46661 7.74741 2 12 2C15.6211 2 18.6584 4.51348 19.4806 7.90009C21.5395 8.69955 23 10.7089 23 13.0613C23 14.8707 22.1359 16.4772 20.8 17.4862M12 22V13M12 13L8.5 16.5M12 13L15.5 16.5"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Upload Content
                  </span>
                </div>
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box>
                <span>Heading</span>
                <input
                  type="text"
                  placeholder="Draken's Origin"
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box>
                <span>Add Story </span>
                <textarea
                  onChange={(e) => setAddStory(e.target.value)}
                  placeholder="Add your "
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
                      <PercentIcon />
                    </div>
                  </div>
                  <Button>
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 12.5H12M12 12.5H16M12 12.5V8.5M12 12.5V16.5M11.6 22.5H12.4C15.7603 22.5 17.4405 22.5 18.7239 21.846C19.8529 21.2708 20.7708 20.3529 21.346 19.2239C22 17.9405 22 16.2603 22 12.9V12.1C22 8.73969 22 7.05953 21.346 5.77606C20.7708 4.64708 19.8529 3.7292 18.7239 3.15396C17.4405 2.5 15.7603 2.5 12.4 2.5H11.6C8.23969 2.5 6.55953 2.5 5.27606 3.15396C4.14708 3.7292 3.2292 4.64708 2.65396 5.77606C2 7.05953 2 8.73969 2 12.1V12.9C2 16.2603 2 17.9405 2.65396 19.2239C3.2292 20.3529 4.14708 21.2708 5.27606 21.846C6.55953 22.5 8.23969 22.5 11.6 22.5Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Button>
                </div>
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box
                sx={{
                  gap: "10px",
                }}
              >
                <span>Button</span>
                <input
                  onChange={(e) => setNftMindBtn(e.target.value)}
                  type="text"
                  placeholder="Add Custom Link"
                />
              </Box>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default MarketPlaceFeatures;
