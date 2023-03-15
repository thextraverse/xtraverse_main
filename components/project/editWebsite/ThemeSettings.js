import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { IoMdCloudUpload } from "react-icons/io";
import { Form } from "../../styles/homepage.styled";
import { RiTicketLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
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
import Select from "react-select";

import { useUserAuth } from "../../../configfile/UserAuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import headerType1 from "../../../components/images/templatepage/header1.svg";
import headerType2 from "../../../components/images/templatepage/header2.svg";
function ThemeSettings(props) {
  const {
    websiteBgColorPopup,
    setWebsiteBgColorPopup,
    websiteBgColor,
    setWebsiteBgColor,
    uploadLogo,
    editHeroName,
    editHeroScript,
    handleImageChange,
    setTypographySelect,
    btnBgColorPopup,
    setBtnBgColorPopup,
    btnBgColor,
    setBtnBgColor,
  } = props;
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  const uniqueId = v4();
  const [uploadProgress, setUploadProgress] = useState("");
  console.log(handleImageChange);
  const [utilities, setUtilities] = useState({
    h1Utility: "",
    h2Utility: "",
    bodyCopyUtility: "",
    smallUtility: "",
  });
  setTypographySelect(utilities);

  const handleH1Utility = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      h1Utility: selectedOption,
    }));
  };

  const handleH2Utility = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      h2Utility: selectedOption,
    }));
  };

  const handleBodyCopyUtility = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      bodyCopyUtility: selectedOption,
    }));
  };

  const handleSmallUtility = (selectedOption) => {
    setUtilities((prevState) => ({
      ...prevState,
      smallUtility: selectedOption,
    }));
  };

  const options1 = [
    { value: "H1", label: "H1" },
    { value: "H2", label: "H2" },
    { value: "H3", label: "H3" },
    { value: "H4", label: "H4" },
    { value: "H5", label: "H5" },
    { value: "H6", label: "H6" },
  ];
  const options2 = [
    { value: "H1", label: "H1" },
    { value: "H2", label: "H2" },
    { value: "H3", label: "H3" },
    { value: "H4", label: "H4" },
    { value: "H5", label: "H5" },
    { value: "H6", label: "H6" },
  ];
  const options3 = [
    { value: "H1", label: "H1" },
    { value: "H2", label: "H2" },
    { value: "H3", label: "H3" },
    { value: "H4", label: "H4" },
    { value: "H5", label: "H5" },
    { value: "H6", label: "H6" },
  ];
  const options4 = [
    { value: "Small", label: "Small" },
    { value: "Medium", label: "Medium" },
    { value: "Large", label: "Large" },
    { value: "ExtraLarge", label: "ExtraLarge" },
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
    menu: (provided) => ({
      ...provided,
      maxHeight: "150px",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "150px",
      overflowY: "auto",
    }),
  };
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
                component="span"
                sx={{ padding: "5px 0px 10px", display: "block" }}
              >
                Add Background Color
              </Box>
              <div className="selectColorType">
                <div
                  className="inputsc btninputsc"
                  onClick={(e) => {
                    setWebsiteBgColorPopup(true);
                    e.stopPropagation();
                  }}
                >
                  <Button>
                    <AiOutlinePlus />
                    gradient or color
                  </Button>
                </div>
                {websiteBgColorPopup && (
                  <div
                    className="picColor"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ColorPicker
                      value={websiteBgColor}
                      onChange={setWebsiteBgColor}
                    />
                  </div>
                )}
              </div>
            </Grid>
            <Grid xs={12}>
              <Box
                component="span"
                sx={{ padding: "5px 0px 0px", display: "block" }}
              >
                Typography
              </Box>
              <Select
                styles={colorStyles}
                options={options1}
                defaultValue={{ value: "H1", label: "H1" }}
                isSearchable={true}
                onChange={handleH1Utility}
              />
              <Select
                styles={colorStyles}
                options={options2}
                isSearchable={true}
                defaultValue={{ value: "H2", label: "H2" }}
                onChange={handleH1Utility}
              />
              <Select
                styles={colorStyles}
                options={options3}
                isSearchable={true}
                defaultValue={{ value: "Bodycopy", label: "Bodycopy" }}
                onChange={handleBodyCopyUtility}
              />
              <Select
                styles={colorStyles}
                options={options4}
                isSearchable={true}
                defaultValue={{ value: "Small", label: "Small" }}
                onChange={handleSmallUtility}
              />
            </Grid>
            <Grid xs={12}>
              <Box
                component="span"
                sx={{ padding: "5px 0px 10px", display: "block" }}
              >
                Button color
              </Box>

              <div className="selectColorType">
                <div
                  className="inputsc btninputsc"
                  onClick={(e) => {
                    setBtnBgColorPopup(true);
                    e.stopPropagation();
                  }}
                >
                  <Button>
                    <AiOutlinePlus />
                    gradient or color
                  </Button>
                </div>
                {btnBgColorPopup && (
                  <div
                    className="picColor"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ColorPicker value={btnBgColor} onChange={setBtnBgColor} />
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

export default ThemeSettings;
