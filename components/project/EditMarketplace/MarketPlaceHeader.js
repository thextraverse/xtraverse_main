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
import { RiDeleteBinLine } from "react-icons/ri";
import { db, auth, storage } from "../../../configfile/firebaseConfig";
import { useUserAuth } from "../../../configfile/UserAuthContext";
import { BsPlusCircle } from "react-icons/bs";
import Select from "react-select";
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
import headerType1 from "../../../components/images/templatepage/header1.svg";
import headerType2 from "../../../components/images/templatepage/header2.svg";

const options1 = [
  { value: "Home", label: "Home", link: "home" },
  { value: "About", label: "About", link: "about" },
  { value: "Collection", label: "Collection", link: "collection" },
  { value: "How it works", label: "How it works", link: "howItWorks" },
  { value: "Roadmap", label: "Roadmap", link: "roadmap" },
  { value: "Team", label: "Team", link: "team" },
  { value: "Features", label: "Features", link: "features" },
];
const colorStyles = {
  control: (styles, state) => ({
    ...styles,
    width: "100%",
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
function MarketPlaceHeader(props) {
  const {
    headerType,
    setHeaderType,
    uploadLogo,
    editHeroName,
    editHeroScript,
    handleImageChange,
    handleWaitlistBtnChange,
    waitlistBtn,
    setMenuNav,
  } = props;
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  const uniqueId = v4();
  const [uploadProgress, setUploadProgress] = useState("");
  const [imageUploadProgrees, setImageUploadProgrees] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  console.log(handleImageChange);
  const [founderList, setFounderList] = useState([
    { button: "Home" },
    { button: "Shop" },
    { button: "Waitlist" },
  ]);

  const handleServiceChange = (selectedOption, index) => {
    const { value } = selectedOption;
    const list = [...founderList];
    list[index].button = value;
    setFounderList(list);
  };
  const handleServiceRemove = (index) => {
    const list = [...founderList];
    list.splice(index, 1);
    setFounderList(list);
  };

  const handleServiceAdd = () => {
    setFounderList([...founderList, { button: "" }]);
  };
  // console.log(founderList);
  setMenuNav(founderList);
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
          <Grid item spacing={2}>
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
                  <Image src={headerType2} alt="header-type1" />
                </div>

                <div
                  className={
                    headerType === "header2"
                      ? "header-type active"
                      : "header-type"
                  }
                  onClick={() => setHeaderType("header2")}
                >
                  <Image src={headerType1} alt="header-type2" />
                </div>
              </Box>
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
            {founderList.map((singleService, index) => (
              <div key={index} className="services" style={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                    padding: "8px 0px",
                  }}
                >
                  <span>Menu {index + 1} </span>
                  <div
                    className="dltBtn"
                    onClick={() => handleServiceRemove(index)}
                  >
                    <RiDeleteBinLine />
                  </div>
                </Box>
                <Grid container spacing="">
                  <Grid item xs={12}>
                    <Select
                      styles={colorStyles}
                      options={options1}
                      defaultValue={{ value: "Blog", label: "Blog" }}
                      isSearchable={true}
                      value={options1.find(
                        (option) => option.value === singleService.button
                      )}
                      onChange={(selectedOption) =>
                        handleServiceChange(selectedOption, index)
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            ))}
            <Button
              onClick={handleServiceAdd}
              sx={{
                background: "#252525",
                width: "100%",
                borderRadius: "8px",
                fontSize: "1.2em",
                textTransform: "capitalize",
                padding: "8px 0px",
                transition: "0.3s",
                fontWeight: "500",
                margin: "10px 0px",
                display: "flex",
                gap: "8px",
                border: "2px dashed #8A8A8E",
                color: "#fff",
                cursor: "pointer",
                "&:hover ": {
                  border: "2px dashed #fff",
                },
              }}
            >
              <BsPlusCircle /> Add more menu
            </Button>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: "10px",
                }}
              >
                <span>Waitlist</span>
                <input
                  onChange={(e) => handleWaitlistBtnChange(e)}
                  type="text"
                  value={waitlistBtn.button}
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
                    <svg width={17} height={17} fill="none">
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
                          onChange={(e) => handleWaitlistBtnChange(e)}
                          value={waitlistBtn.link}
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
                          onChange={(e) => handleWaitlistBtnChange(e)}
                          value={waitlistBtn.link}
                          name="link"
                          id="link"
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
                          onChange={(e) => handleWaitlistBtnChange(e)}
                          value={waitlistBtn.link}
                          name="link"
                          id="link"
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

export default MarketPlaceHeader;
