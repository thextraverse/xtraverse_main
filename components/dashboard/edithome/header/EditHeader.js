import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { IoMdCloudUpload } from "react-icons/io";
import { Form } from "../homepage.styled";
import { RiTicketLine } from "react-icons/ri";
import { HomepagePreview } from "../edithomepage.style";
import firstimg from "../../../images/project1.png";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
import { auth, db, storage } from "../../../../configfile/firebaseConfig";
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
import { useUserAuth } from "../../../../configfile/UserAuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import headerType1 from "../../../../components/images/templatepage/header1.svg";
import headerType2 from "../../../../components/images/templatepage/header2.svg";
function EditHeader(props) {
  const {
    menuInput,
    handleInputChange,
    waitlistInput,
    setWaitlistInput,
    renderNewBtn,
    handleAddInput,
    headerType,
    setHeaderType,
    uploadLogo,
    editHeroName,
    setEditHeroName,
    editHeroScript,
    handleImageChange,
    setEditHeroScript,
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
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "50% auto",
                  gap: "15px",
                }}
              >
                <div
                  className={
                    headerType === "header1"
                      ? "header-type active"
                      : "header-type"
                  }
                  onClick={() => setHeaderType("header1")}
                >
                  <Image src={headerType1} alt="header-type1" />
                </div>

                <div
                  className={
                    headerType === "header2"
                      ? "header-type active"
                      : "header-type"
                  }
                  onClick={() => setHeaderType("header2")}
                >
                  <Image src={headerType2} alt="header-type2" />
                </div>
              </Box>
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
                    <IoMdCloudUpload />
                    Upload Logo
                  </span>
                </div>
              </Box>
            </Grid>
            <Grid xs={12}>
              {renderNewBtn}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={handleAddInput}
                  sx={{
                    color: "#fff",
                    textTransform: "capitalize",
                    display: "flex",

                    gap: "8px",
                    fontSize: "1.1em",
                  }}
                >
                  <AiOutlinePlus
                    style={{
                      fontSize: "1.3em",
                    }}
                  />
                  Add more Button
                </Button>
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box sx={{}}>
                <span>Button </span>
                <input
                  type="text"
                  value={waitlistInput}
                  onChange={(e) => setWaitlistInput(e.target.value)}
                  placeholder="e.g View On Marketplace"
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
      </Box>
    </>
  );
}

export default EditHeader;
