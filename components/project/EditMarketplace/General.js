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
import { Select, Space } from "antd";
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
import { HomepagePreview } from "../../dashboard/edithome/edithomepage.style";
import { db, auth, storage } from "../../../configfile/firebaseConfig";
import { useUserAuth } from "../../../configfile/UserAuthContext";
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
    nftType,
    setNftType,
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
              <Box>
                <span>Name of NFT</span>
                <input
                  type="text"
                  placeholder="Ex: Draken"
                  onChange={(e) => setNftName(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box sx={{}}>
                <span>Collection Name</span>
                <input
                  onChange={(e) => setNftCollectionName(e.target.value)}
                  type="text"
                  placeholder="EX: Green Gremlins"
                />
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box sx={{ margin: "15px 0px" }}>
                <span>Description </span>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Ex: DRK is the first of its kind..."
                  onChange={(e) => setNftDescript(e.target.value)}
                ></textarea>
              </Box>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth sx={{}}>
                <span htmlFor="fundType">Add utility</span>
                <Space wrap>
                  <Select
                    defaultValue="lucy"
                    style={{
                      width: "100%",
                    }}
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
                </Space>
              </FormControl>
            </Grid>
            <Grid xs={12}>
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
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_217_16463)">
                        <path
                          d="M3.7 18C2.38484 17.235 1.5 15.8051 1.5 14.1674C1.5 12.1053 2.90285 10.3727 4.80122 9.88197C4.80041 9.83571 4.8 9.78935 4.8 9.7429C4.8 5.46661 8.24741 2 12.5 2C16.1211 2 19.1584 4.51348 19.9806 7.90009C22.0395 8.69955 23.5 10.7089 23.5 13.0613C23.5 14.8707 22.6359 16.4772 21.3 17.4862M12.5 22V13M12.5 13L9 16.5M12.5 13L16 16.5"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_217_16463">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Upload NFT
                  </span>
                </div>
              </Box>
            </Grid>
            <Grid xs={12}>
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
                  />
                </div>
                <div>
                  <span>Chain</span>
                  <input type="text" placeholder="" />
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
                  placeholder="Add your button"
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
