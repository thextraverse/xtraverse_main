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
import CryptoCanvasMarketPlaceOfferPageEditor from "../../../../theme/CryptoCanvas/editMarketplace/OffersPageEditor";
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

  const [closingHeader, setClosingHeader] = useState("Marketplace");
  const [closingSubtexxt, setClosingSubtexxt] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim consequat massa arcu, scelerisque fermentum mauris aliquam nunc. Tellus quam magna eu mattis nulla vestibulum."
  );
  //!  upload section
  const [uniqueId, setUniqueId] = useState(1);
  const [productData, setProductData] = useState([]);
  const [tempalteId, setTempalteId] = useState([]);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploadProgrees, setImageUploadProgrees] = useState(0);
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  const emailData = user.email;
  // console.log(menuInput);
  // console.log(emailData);
  // user !== null && user.email && (emailData = user.email);
  // user === null && router.push("/");
  // console.log("logo", storeLogo);
  // console.log("bg", storeBgImg);
  // console.log("bg", desBgStore);
  // console.log(projectId);
  let idData = [];

  //! projectuniqeId
  const queryUser = collection(db, "Users");
  async function handleGetData() {
    if (!emailData) return;

    const q = query(queryUser, where("Email", "==", emailData));
    const querySnapshot1 = await getDocs(q);

    if (!querySnapshot1.empty) {
      const autoId = querySnapshot1.docs[0].id;
      const subcollectionRef = collection(db, "Users", autoId, "project");
      const querySnapshot2 = await getDocs(subcollectionRef);
      const docs = querySnapshot2.docs.map((doc) => doc.data());
      setTempalteId(docs);

      // docs.map((data) => {});
    }
  }

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailData]);
  console.log("id", tempalteId);
  tempalteId.map((prjctid, index) => {
    console.log("another", prjctid.id);
    idData.push(prjctid.id);
  });
  console.log(idData);
  idData.map((itm, index) => {
    console.log(itm);
  });
  //! salespagedata
  const handleDataSubmit = async () => {
    try {
      setUniqueId(uniqueId + 1);
      const newId = `createProduct0${uniqueId}`;

      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("Email", "==", emailData));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const autoId = querySnapshot.docs[0].id;
        console.log(`AutoId: ${autoId}`);

        const promises = idData.map((itm, index) => {
          const projectRef = collection(db, "Users", autoId, "project");
          const pq = query(projectRef, where("id", "==", itm));
          return getDocs(pq);
        });

        const projectQuerySnapshots = await Promise.all(promises);
        const projectAutoIds = projectQuerySnapshots.map(
          (projectQuerySnapshot) => projectQuerySnapshot.docs[0].id
        );

        const newAutoId = projectAutoIds[0]; // Assuming that the first ID in idData is the one you want to use
        console.log(`AudtoId: ${newAutoId}`);
        const offersDataCollectionRef = collection(
          db,
          "Users",
          autoId,
          "project",
          newAutoId, // Assuming that the first ID in idData is the one you want to use
          "offerspage"
        );

        await addDoc(offersDataCollectionRef, {
          salespageform: {
            closingHeader: closingHeader,
            closingSubtexxt: closingSubtexxt,
          },
        });

        if (
          MySwal.fire({
            title: <strong>Uploaded</strong>,
            icon: "success",
          })
        );
      } else {
        alert("No user found.");
      }
      router.push("/project/editMarketplace/marketplaceSalespage");
      window.sessionStorage.setItem(
        "activeMenu",
        JSON.stringify({ key: "3", label: "Shop" })
      );
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Error submitting form. Please try again later.");
    }
    setUploadProgress("");
  };

  return (
    <>
      <Main>
        {/* <Stepnav /> */}
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
                            <span>Offers page editor</span>
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
                </EditorInputSec>
              </Grid>
              <Grid lg={8} xl={8}>
                <Box
                  sx={{
                    background: "#252525",
                    padding: "3px",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: "50px",
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
                    <CryptoCanvasMarketPlaceOfferPageEditor
                      closingHeader={closingHeader}
                      closingSubtexxt={closingSubtexxt}
                      handleDataSubmit={handleDataSubmit}
                      productData={productData}
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
