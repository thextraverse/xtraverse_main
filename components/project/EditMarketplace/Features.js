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
import { Form } from "../../styles/homepage.styled";
import { db, auth, storage } from "../../../configfile/firebaseConfig";
import { useUserAuth } from "../../../configfile/UserAuthContext";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaPercent } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";

function MarketPlaceFeatures(props) {
  const {
    handleVideoChange,
    setAddStory,
    handleServiceAdd,
    handleServiceChange,
    royaltiesList,
    featureBtn,
    setFeatureBtn,
    setVideoTitle,
    tokenType,
    setTokenType,
    mintType,
    setMintType,
    handleButtonChange,
    handlePayment,
  } = props;
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  const uniqueId = v4();
  const [uploadProgress, setUploadProgress] = useState("");
  const [activeTab, setActiveTab] = useState(0);

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

            <Grid item xs={12}>
              <div className="typslction">
                <Box sx={{ marginBottom: "10px" }}>
                  <span>Offer type</span>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "50% auto",
                      gap: "15px",
                      marginTop: "5px",
                    }}
                  >
                    <Button
                      onClick={(e) => {
                        setTokenType("ERC-721A");
                        handlePayment;
                      }}
                      className={tokenType === "ERC-721A" ? "active" : ""}
                    >
                      <h2>ERC-721A</h2>
                      <p>Each token has one owner</p>
                    </Button>
                    <Button
                      onClick={(e) => {
                        setTokenType("RC-1155");
                        handlePayment;
                      }}
                      className={tokenType === "RC-1155" ? "active" : ""}
                    >
                      <h2>ERC-1155</h2>
                      <p>Each token is unique to multiple owners</p>
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
                    <Button
                      onClick={(e) => {
                        setMintType("Regular");
                        handlePayment;
                      }}
                      className={mintType === "Regular" ? "active" : ""}
                    >
                      <h2>Regular</h2>
                      <p>Seller pays fees</p>
                    </Button>
                    <Button
                      onClick={(e) => {
                        setMintType("Lazy");
                        handlePayment;
                      }}
                      className={mintType === "Lazy" ? "active" : ""}
                    >
                      <h2>Free</h2>
                      <p>Buyer pays fees</p>
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
                    accept="video/mp4,video/x-m4v,video/*,image/*"
                  />
                  <span>
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M3.2 18A4.427 4.427 0 011 14.167a4.422 4.422 0 013.301-4.285l-.001-.14C4.3 5.468 7.747 2 12 2c3.621 0 6.658 2.513 7.48 5.9A5.532 5.532 0 0123 13.061c0 1.81-.864 3.416-2.2 4.425M12 22v-9m0 0l-3.5 3.5M12 13l3.5 3.5"
                        stroke="#fff"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Upload Content
                  </span>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <span>Heading</span>
                <input
                  type="text"
                  placeholder="Draken's Origin"
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <span>Add Story </span>
                <textarea
                  onChange={(e) => setAddStory(e.target.value)}
                  placeholder="Add your "
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                {royaltiesList.map((singleService, index) => (
                  <div key={index} className="services">
                    <span>Royalties</span>
                    <div className="royalties">
                      <div className="roayltiesinput">
                        <input
                          type="text"
                          placeholder="Enter Wallet Address"
                          name="royalties"
                          value={singleService.service}
                          onChange={(e) => handleServiceChange(e, index)}
                        />

                        <div className="parcentage">
                          <PercentIcon />
                        </div>
                      </div>
                      <Button onClick={handleServiceAdd}>
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M8 12.5h4m0 0h4m-4 0v-4m0 4v4m-.4 6h.8c3.36 0 5.04 0 6.324-.654a6 6 0 002.622-2.622C22 17.94 22 16.26 22 12.9v-.8c0-3.36 0-5.04-.654-6.324a6 6 0 00-2.622-2.622C17.44 2.5 15.76 2.5 12.4 2.5h-.8c-3.36 0-5.04 0-6.324.654a6 6 0 00-2.622 2.622C2 7.06 2 8.74 2 12.1v.8c0 3.36 0 5.04.654 6.324a6 6 0 002.622 2.622c1.284.654 2.964.654 6.324.654z"
                            stroke="#fff"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: "10px",
                }}
              >
                <span>Button</span>
                <input
                  onChange={(e) => handleButtonChange(e)}
                  type="text"
                  value={featureBtn.button}
                  placeholder="e.g View on Marketplace"
                  name="button"
                />
              </Box>
              <div>
                <div className="BtnLinksc">
                  <Button
                    className={activeTab === 0 ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(0);
                    }}
                    sx={{
                      padding: "5px 20px",
                    }}
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        d="M8.86 12.999l-.473.489a3.278 3.278 0 01-4.738 0c-1.308-1.35-1.308-3.538 0-4.888l1.13-1.166a3.026 3.026 0 014.373 0l.183.188m-.86-3.62l.474-.49a3.278 3.278 0 014.738 0c1.308 1.35 1.308 3.538 0 4.888l-1.13 1.166a3.026 3.026 0 01-4.373 0L8 9.378"
                        stroke="#fff"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                  <Button
                    className={activeTab === 1 ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(1);
                    }}
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path
                        d="M9.332 1.833h.333v0c.93 0 1.394 0 1.78.077a4 4 0 013.143 3.143c.077.386.077.85.077 1.78v3.334c0 .929 0 1.394-.076 1.78a4 4 0 01-3.143 3.143c-.387.077-.851.077-1.78.077v0h-.334m-8-6.667h8m0 0L6.665 5.833M9.332 8.5l-2.667 2.667"
                        stroke="#fff"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                  <Button
                    className={activeTab === 2 ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(2);
                    }}
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        d="M1.668 3.167v7.2c0 1.68 0 2.52.327 3.162a3 3 0 001.311 1.31c.642.328 1.482.328 3.162.328h3.733c1.68 0 2.52 0 3.162-.327a3 3 0 001.311-1.311c.327-.642.327-1.482.327-3.162V9.3c0-1.68 0-2.52-.327-3.162a3 3 0 00-1.31-1.311C12.72 4.5 11.881 4.5 10.2 4.5H8.335M15 7.833h-.333a2 2 0 00-2 2v0a2 2 0 002 2h.333M11.668 4.5l-.08-.107c-.704-.938-1.056-1.408-1.502-1.746a4 4 0 00-1.32-.66c-.538-.154-1.125-.154-2.298-.154H3.001c-.736 0-1.333.597-1.333 1.334v0c0 .736.597 1.333 1.333 1.333h8.667z"
                        stroke="#fff"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </div>

                <div className="tab-content">
                  {activeTab === 0 && (
                    <div>
                      <Box
                        sx={{
                          gap: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <input
                          onChange={(e) => handleButtonChange(e)}
                          value={featureBtn.link}
                          name="link"
                          id="link"
                          type="text"
                          placeholder="Add custom link"
                        />
                      </Box>
                    </div>
                  )}
                  {activeTab === 1 && (
                    <div>
                      <Box
                        sx={{
                          gap: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <input
                          onChange={(e) => setFeatureBtn(e.target.value)}
                          type="text"
                          placeholder="e.g View on Marketplace"
                        />
                      </Box>
                    </div>
                  )}
                  {activeTab === 2 && (
                    <div>
                      <Box
                        sx={{
                          gap: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <input
                          onChange={(e) => setFeatureBtn(e.target.value)}
                          type="text"
                          placeholder="e.g View on Marketplace"
                        />
                      </Box>
                    </div>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default MarketPlaceFeatures;
