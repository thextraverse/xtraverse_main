import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { IoMdCloudUpload } from "react-icons/io";
import { Form, PreviewBox } from "../upladnft/uploadnft.style";
import { RiTicketLine } from "react-icons/ri";
import { HomepagePreview } from "./edithomepage.style";
import firstimg from "../../images/project1.png";
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
function Edithero(props) {
  const {
    handleNext,
    homeLogo,
    setHomeLogo,
    uploadLogo,
    editHeroName,
    setEditHeroName,
    editHeroScript,
    handleImageChange,
    setEditHeroScript,
    blur1,
    blur2,
    blur3,
    setBlur1,
    setBlur2,
    setBlur3,
    formId,
    setFormId,
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
                gradient: {
                  color1: blur1,
                  color2: blur2,
                  color3: blur3,
                },
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
                gradient: {
                  color1: blur1,
                  color2: blur2,
                  color3: blur3,
                },
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
            sx: "90%",
            lg: "100%",
            xl: "80%",
          },
          margin: "auto",
          padding: "50px",
        }}
      >
        <Grid container spacing={{ md: 2, xl: 4 }}>
          <Grid>
            <Form className="forminput">
              <Grid container spacing={2}>
                <h1 style={{ marginBottom: "35px" }}>Edit Hero</h1>
                <br />
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
                  <Grid container spacing={{ lg: 2, xl: 4 }}>
                    <Grid xs={4}>
                      <p className="clrP">Color 1</p>
                      <div className="colorbox">
                        <input
                          type="color"
                          onChange={(e) => setBlur1(e.target.value)}
                        />
                        <span style={{ background: blur1 }}></span>
                      </div>
                    </Grid>
                    <Grid xs={4}>
                      <p className="clrP">Color 2</p>

                      <div className="colorbox">
                        <input
                          type="color"
                          onChange={(e) => setBlur2(e.target.value)}
                        />
                        <span style={{ background: blur2 }}></span>
                      </div>
                    </Grid>
                    <Grid xs={4}>
                      <p className="clrP">Color 3</p>
                      <div className="colorbox">
                        <input
                          type="color"
                          onChange={(e) => setBlur3(e.target.value)}
                        />
                        <span style={{ background: blur3 }}></span>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12}>
                  <Box
                    sx={{
                      marginTop: "15px",
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
                        Upload Logo
                        <IoMdCloudUpload />
                      </span>
                    </div>
                  </Box>
                </Grid>
                <Grid xs={12}>
                  <Box>
                    <span>Heading</span>
                    <input
                      type="text"
                      placeholder="Ex: Robo Gremlins"
                      onChange={(e) => setEditHeroName(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid xs={12}>
                  <Box sx={{}}>
                    <span>Subtext</span>
                    <input
                      onChange={(e) => setEditHeroScript(e.target.value)}
                      type="text"
                      placeholder="EX: Our Fancy shamny NFT..."
                    />
                  </Box>
                </Grid>
                <Grid xs={12}>
                  <Button
                    sx={{
                      background: "#a3f6ab",
                      border: "none",
                      width: "100%",
                      display: "block",
                      padding: "15px ",
                      color: "#000",
                      margin: "15px 0px",
                      "&:hover": {
                        background: "#fff",
                      },
                    }}
                    onClick={handleDataSubmit}
                  >
                    Update
                  </Button>
                  <Button
                    sx={{
                      background: "transparent",
                      border: "2px solid #fff",
                      width: "100%",
                      display: "block",
                      padding: "10px ",
                      color: "#000",
                      margin: "15px 0px",
                      color: "#fff",
                      "&:hover": {
                        background: "#fff",
                        color: "#000",
                      },
                    }}
                    onClick={() =>
                      router.push("/dashboard/createproject/connection")
                    }
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Edithero;
