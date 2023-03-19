import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { IoMdCloudUpload } from "react-icons/io";
import { RiTicketLine } from "react-icons/ri";
import firstimg from "../../images/project1.png";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { AiOutlinePlus } from "react-icons/ai";

const Select = dynamic(() => import("react-select"), { ssr: false });
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
import dynamic from "next/dynamic";
function MarketPlaceGeneral(props) {
  const {
    handleNext,
    selectedImage,
    setNftName,
    nftName,
    nftdescription,
    setNftDescript,
    handleImageChange,
    setTags,
    setNftCollectionName,
    nftCollectionName,
    nftPrice,
    setNftPrice,
    nftMindBtn,
    setNftMindBtn,
    handleSelectUtility,
    handleImgUpload,
  } = props;
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  const uniqueId = v4();
  const [uploadProgress, setUploadProgress] = useState("");
  console.log(handleImageChange);
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
  const options = [
    { value: "Waitlist", label: "Waitlist" },
    { value: "Whitelist", label: "Whitelist" },
  ];

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
      padding: "10px 0px",
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
              <Box>
                <span>Name of NFT</span>
                <input
                  type="text"
                  placeholder="Ex: Draken"
                  onChange={(e) => setNftName(e.target.value)}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{}}>
                <span>Collection Name</span>
                <input
                  onChange={(e) => setNftCollectionName(e.target.value)}
                  type="text"
                  placeholder="EX: Green Gremlins"
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ margin: "15px 0px" }}>
                <span>Description </span>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Ex: DRK is the first of its kind..."
                  onChange={(e) => setNftDescript(e.target.value)}
                  required
                ></textarea>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{}}>
                <span htmlFor="fundType">Add utility</span>
                <Select
                  styles={colorStyles}
                  options={options}
                  isSearchable={true}
                  onChange={handleSelectUtility}
                  inputId="my-select"
                />
                {/* <Space wrap>
                  <Select
                    defaultValue="lucy"
                    style={{ width: "100%", color: "#fff" }}
                    bordered={false}
                    // onChange={handleChange}
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "Yiminghe",
                        label: "yiminghe",
                      },
                    ]}
                  />
                </Space> */}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  marginTop: "0px",
                }}
              >
                <div className="inputsc">
                  <input
                    type="file"
                    placeholder="upload Logo"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <span>
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <g clipPath="url(#prefix__clip0_217_16463)">
                        <path
                          d="M3.7 18a4.427 4.427 0 01-2.2-3.833 4.422 4.422 0 013.301-4.285l-.001-.14C4.8 5.468 8.247 2 12.5 2c3.621 0 6.658 2.513 7.48 5.9a5.532 5.532 0 013.52 5.161c0 1.81-.864 3.416-2.2 4.425M12.5 22v-9m0 0L9 16.5m3.5-3.5l3.5 3.5"
                          stroke="#fff"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="prefix__clip0_217_16463">
                          <path
                            fill="#fff"
                            transform="translate(.5)"
                            d="M0 0h24v24H0z"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Upload NFT
                  </span>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "50% auto",
                  gap: "10px",
                }}
              >
                <div>
                  <span>Price</span>
                  <input
                    onChange={(e) => setNftPrice(e.target.value)}
                    type="number"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <span>Chain</span>
                  <input type="text" placeholder="" required />
                </div>
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
                  onChange={(e) => setNftMindBtn(e.target.value)}
                  type="text"
                  placeholder="Add your button"
                  required
                />
              </Box>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default MarketPlaceGeneral;
