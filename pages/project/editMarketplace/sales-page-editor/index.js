import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { AiOutlineEye } from "react-icons/ai";
import Sidebar, {
  drawerWidth,
} from "../../../../components/dashboard/sidebar/Navbar";
import Stepnav from "../../../../components/dashboard/step-nav";
import { db, storage } from "../../../../configfile/firebaseConfig";
import { BsPlusCircle } from "react-icons/bs";
import { v4 } from "uuid";
import { RiTicketLine } from "react-icons/ri";
import blueStatus from "../../../../components/images/editwebsite/blue.png";
import yellowStatus from "../../../../components/images/editwebsite/yellowStatus.png";
import nftPreviewimg from "../../../../components/images/templatepage/uploadNft.png";
import Predviewimg from "../../../../components/images/templatepage/preivewimg.png";
import {
  query,
  addDoc,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { useUserAuth } from "../../../../configfile/UserAuthContext";
import { Button, Container, Grid } from "@mui/material";
import { RiDeleteBinLine } from "react-icons/ri";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  HomepagePreview,
  Main,
  PageEditorFrom,
  EditorInputSec,
} from "../../../../components/styles/homepage.styled";

import { XtraverseContainer } from "../../..";

import {
  PreviewBox,
  MarketPlaceDataPreview,
  BtnContainer,
} from "../../../../components/styles/uploadnft.style";
import Link from "next/link";
import { useRouter } from "next/router";
import EditorSalesPage from "../../../../components/project/EditMarketplace/EditorSalesPage";
import CryptoCanvasEditMarketPlaceSalePage from "../../../../theme/CryptoCanvas/editMarketplace/SalesPageEditor";
function SalesPageEditor() {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleToggle = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const [index, setIndex] = useState(0);
  const [imgUrl, setImgUrl] = useState();

  const [formId, setFormId] = useState(null);

  //! for Closing layout
  const [closingTopTxt, setClosingTopTxt] = useState(
    "Welcome to Robo Gremlins"
  );

  const [closingHeader, setClosingHeader] = useState("Congratulations");
  const [closingSubtexxt, setClosingSubtexxt] = useState(
    " Book a call with an onboarding manager to unlock full benefits. "
  );
  const [closingBtn, setClosingBtn] = useState({
    button: "Thank you",
    link: "",
  });
  const handleClosingBtnChange = (e) => {
    setClosingBtn({ ...closingBtn, [e.target.name]: e.target.value });
  };

  const [closingUploadVideoUrl, setClosingUploadVideoUrl] = useState(
    "/video/xtraverse.mp4"
  );
  const [closingSelectedVideo, setClosingSelectedVideo] = useState(
    "/video/xtraverse.mp4"
  );

  const handleClosingBioVideoChange = (event) => {
    const videoFile = event.target.files[0];
    setClosingSelectedVideo(URL.createObjectURL(videoFile));
    setClosingUploadVideoUrl(videoFile);
  };

  //!  upload section
  const uniqueId = v4();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploadProgrees, setImageUploadProgrees] = useState(0);
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  const emailData = user.email;
  // console.log(menuInput);
  console.log(emailData);
  // user !== null && user.email && (emailData = user.email);
  // user === null && router.push("/");
  // console.log("logo", storeLogo);
  // console.log("bg", storeBgImg);
  // console.log("bg", desBgStore);

  const handleDataSubmit = async () => {
    // const imageRef = ref(storage, `images/nft${imageupload.name + v4()}`);
    // const videoRef = ref(storage, `video/${uploadVideoUrl.name + v4()}`);

    const closingVideoRef = ref(
      storage,
      `video/${closingUploadVideoUrl.name + v4()}`
    );

    // imageSnapshot, videoSnapshot
    // Upload the files to Firebase storage
    const [closingVideoSnapshot] = await Promise.all([
      uploadBytesResumable(closingVideoRef, closingUploadVideoUrl),
    ]);

    let closingUploadProgress = 0;
    const closingUploadTask = uploadBytesResumable(
      closingVideoRef,
      closingUploadVideoUrl
    );
    closingUploadTask.on(
      "state_changed",
      (snapshot) => {
        closingUploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Image Upload Progress: ${closingUploadProgress}%`);
        setImageUploadProgrees(closingUploadProgress);
        setUploadProgress(closingUploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Image upload complete.");
      }
    );

    // Wait for all the files to finish uploading
    await Promise.all([
      closingUploadTask,
      // desimageUploadTask,
    ]);
    // Get the download URLs for the files
    // const [logoimageUrl, herobgimageUrl, desibgimageUrl] = await Promise.all([
    const [closingVideoUrl] = await Promise.all([
      getDownloadURL(closingVideoSnapshot.ref),
    ]);

    try {
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
            "marketplaceData"
          );
          const querySnapshot = await getDocs(userDataCollectionRef);

          if (!querySnapshot.empty) {
            // User data exists in database, update the existing document
            const docId = querySnapshot.docs[0].id;
            // console.log(`DocId: ${docId}`);
            const docRef = doc(userDataCollectionRef, docId);
            await updateDoc(docRef, {
              Thanksyou: {
                closingTopTxt: closingTopTxt,
                closingHeader: closingHeader,
                closingSubtexxt: closingSubtexxt,
                closingBtn: closingBtn,
                closingVideo: closingVideoUrl,
              },
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
              Thanksyou: {
                closingTopTxt: closingTopTxt,
                closingHeader: closingHeader,
                closingSubtexxt: closingSubtexxt,
                closingBtn: closingBtn,
                closingVideo: closingVideoUrl,
              },
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
      router.push("/project/editWebsite");
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Error submitting form. Please try again later.");
    }
    setUploadProgress("");
  };
  const [tempalteId, setTempalteId] = useState();
  const queryUser = collection(db, "Users");
  async function handleGetData() {
    if (!emailData) return;

    const q = query(queryUser, where("Email", "==", emailData));
    const querySnapshot1 = await getDocs(q);

    if (!querySnapshot1.empty) {
      const autoId = querySnapshot1.docs[0].id;
      const subcollectionRef = collection(db, "Users", autoId, "template");
      const querySnapshot2 = await getDocs(subcollectionRef);
      const docs = querySnapshot2.docs.map((doc) => doc.data());
      docs.map((data) => {
        // console.log(data.id);

        setTempalteId(data.id);
      });
    }
  }

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailData]);

  return (
    <>
      <Main>
        <Stepnav />
        <Box sx={{ width: "100%" }}>
          <Sidebar activeBtn={3} />
          <XtraverseContainer>
            <Grid container spacing={2}>
              <Grid lg={4} xl={4}>
                <EditorInputSec>
                  <PageEditorFrom>
                    <div className="editorform">
                      {/* Closing */}
                      <div
                        className={
                          activeIndex === 0
                            ? "page-editor-form active"
                            : "page-editor-form active"
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => handleToggle(0)}
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              color: "#fff",
                              padding: "15px",
                              textTransform: "capitalize",
                            }}
                          >
                            <span>Sales page editor</span>
                            {/* <KeyboardArrowDownIcon className="activesvg" /> */}
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <EditorSalesPage
                            setClosingHeader={setClosingHeader}
                            setClosingSubtexxt={setClosingSubtexxt}
                            key="3"
                          />
                        </div>
                      </div>
                    </div>
                  </PageEditorFrom>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "50% auto",
                      gap: "10px",
                    }}
                  >
                    <Link href="/project">
                      <Button
                        sx={{
                          width: "100%",
                          background: "#252525",
                          borderRadius: "8px",
                          color: "#fff",
                          fontSize: "1.2em",
                          textTransform: "capitalize",
                          border: "2px solid #04FCBC",
                          padding: "8px 0px",
                          fontWeight: "500",
                          margin: "10px 0px",
                          "&:hover ": {
                            background:
                              "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                            color: "#000",
                            cursor: "pointer",
                          },
                        }}
                      >
                        Back
                      </Button>
                    </Link>

                    <Button
                      onClick={handleDataSubmit}
                      sx={{
                        width: "100%",
                        background:
                          "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
                        borderRadius: "8px",
                        color: "#000",
                        fontSize: "1.2em",
                        textTransform: "capitalize",
                        padding: "8px 0px",
                        transition: "0.3s",
                        fontWeight: "500",
                        margin: "10px 0px",
                        "&:hover ": {
                          background:
                            "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </EditorInputSec>
              </Grid>
              <Grid lg={8} xl={8}>
                <Box
                  sx={{
                    background: "#252525",
                    padding: "3px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <BtnContainer>
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.597.374-3.106 1.04-4.444"
                        stroke="#8A8A8E"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "20px",
                      }}
                    >
                      <Button>
                        See full preview <AiOutlineEye />
                      </Button>
                    </Box>
                  </BtnContainer>

                  <MarketPlaceDataPreview>
                    <CryptoCanvasEditMarketPlaceSalePage
                      closingTopTxt={closingTopTxt}
                      closingHeader={closingHeader}
                      closingSubtexxt={closingSubtexxt}
                      closingSelectedVideo={closingSelectedVideo}
                      closingBtn={closingBtn}
                    />
                  </MarketPlaceDataPreview>
                </Box>
              </Grid>
            </Grid>
          </XtraverseContainer>
          {/* {selectedTemplate} */}
        </Box>
      </Main>
    </>
  );
}

export default SalesPageEditor;
