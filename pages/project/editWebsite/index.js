import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Sidebar, {
  drawerWidth,
} from "../../../components/dashboard/sidebar/Navbar";
import Stepnav from "../../../components/dashboard/step-nav";
import { db, storage } from "../../../configfile/firebaseConfig";
import { AiOutlineEye } from "react-icons/ai";

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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";

import { useUserAuth } from "../../../configfile/UserAuthContext";
import { Button, Container, Grid } from "@mui/material";
import { RiDeleteBinLine } from "react-icons/ri";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Edithero from "../../../components/project/editWebsite/EditHero";
import EditHeader from "../../../components/project/editWebsite/header/EditHeader";
import demoimg from "../../../components/images/blacklogo.svg";
import firstimg from "../../../components/images/project1.png";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  HomepagePreview,
  Main,
  PageEditorFrom,
  EditorInputSec,
} from "../../../components/styles/homepage.styled";
import EditDescription from "../../../components/project/editWebsite/EditDescriptionBlock";
import CryptoCanvasEditHome from "../../../theme/CryptoCanvas/EditHomePage";
import EtherEaselEditHome from "../../../theme/EtherEasel/EditHomePage";
import PixelVaultEditHome from "../../../theme/PixelVault/EditHomePage";
import { XtraverseContainer } from "../..";
import { BtnContainer } from "../../../components/styles/uploadnft.style";
import ThemeSettings from "../../../components/project/editWebsite/ThemeSettings";
import { color } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import EditPartners from "../../../components/project/editWebsite/EditPartners";
import { registerDomain, addDomainToFirebase, deployWebsite } from './GoDaddy';

function WebsiteForm() {
  const [domainName, setDomainName] = useState('');
  const [projectId, setProjectId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Register domain with GoDaddy
    const authorizationToken = await getAuthorizationToken();
    const registeredDomain = await registerDomain(authorizationToken, domainName);

    // Add domain to Firebase
    const firebaseAccessToken = process.env.FIREBASE_ACCESS_TOKEN;
    const addedDomain = await addDomainToFirebase(projectId, registeredDomain, firebaseAccessToken);

    // Deploy website to Firebase Hosting
    const websiteId = 'your-website-id'; // Replace with your website ID
    await deployWebsite(projectId, websiteId, addedDomain);
  };

function EditHomePageindex() {
  const router = useRouter();
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
  //! Theme settings
  const [typographySelect, setTypographySelect] = useState();
  const [websiteBgColorPopup, setWebsiteBgColorPopup] = useState(false);
  const [websiteBgColor, setWebsiteBgColor] = useState(
    "linear-gradient(190deg, rgba(2,0,36,0.38) 0%, RGBA(97, 0, 255, 0.46) 100%)"
  );
  const [btnBgColorPopup, setBtnBgColorPopup] = useState(false);
  const [btnBgColor, setBtnBgColor] = useState(
    "linear-gradient(25deg, rgba(38, 0, 252, 1) 0%, rgba(255, 0, 234, 1) 100%)"
  );
  console.log("btnColor", btnBgColor);

  //! Edit hero
  const [heroType, setHeroType] = useState("hero3");
  const heroTypeStore = heroType;
  const [homeBg, setHomeBg] = useState(
    "/images/templatePage/homeimgpreview.png"
  );
  const [uploadHomeBg, setUploadHomeBg] = useState(
    "/images/templatePage/homeimgpreview.png"
  );
  const [storeBgImg, setStoreBgImg] = useState();
  const handleHomeImageChange = (event) => {
    const imageFile = event.target.files[0];
    setHomeBg(URL.createObjectURL(imageFile));
    setUploadHomeBg(imageFile);
  };
  const [editHeroHeading, setEditHeroHeading] = useState(
    "Buy & Sell Robo's Collection"
  );
  const [editHeroSubtext, setEditHeroSubtext] = useState(
    "Invest and manage all your NFTs at one place."
  );
  const [heroButton, setHeroButton] = useState("Browse collection");

  const [showColorPopup, setShowColorPopup] = useState(false);
  const [heroOverlayColor, setHeroOverlayColor] = useState(
    "linear-gradient(190deg, rgba(2,0,36,0.38) 0%, RGBA(97, 0, 255, 0.46) 100%)"
  );

  const [browseClctionBtn, setBrowseClctionBtn] = useState({
    button: "Browse Collection",
    link: "www.demo.com",
  });

  const handleBrowseClctionBtn = (e) => {
    setBrowseClctionBtn({
      ...browseClctionBtn,
      [e.target.name]: e.target.value,
    });
  };

  //! Edit Description
  const [desType, setDesType] = useState("destype2");
  const desTypeStore = desType;
  const [desBg, setDesBg] = useState(
    "/images/templatePage/descriptionblock.svg"
  );
  const [uploadDesBg, setUploadDesBg] = useState(
    "/images/templatePage/descriptionblock.svg"
  );
  const [desBgStore, setDesBgStore] = useState();
  const handleDesImageChange = (event) => {
    const imageFile = event.target.files[0];
    setDesBg(URL.createObjectURL(imageFile));
    setUploadDesBg(imageFile);
  };
  const [desSubHeading, setDesSubHeading] = useState("TAKE A RIDE");
  const [desHeading, setDesHeading] = useState("Robo's Movement");
  const [desSubtext, setDesSubtext] = useState(
    "We make it easy to Discover, Invest and manage all your NFTs at one place, looked up one of the more obscure.Find the right NFT collections to buy within the platform."
  );
  const [desButton, setDesButton] = useState("");
  // const [heroButton, setHeroButton] = useState("Browse collection");

  const [showDesColorPopup, setShowDesColorPopup] = useState(false);
  const [desOverlayColor, setDesOverlayColor] = useState("#20142D");
  //! parters
  const [parternsHeading, setparternsHeading] = useState("Our Partners");
  const [imagesList, setImagesList] = useState([]);
  const handleParternsImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => ({
      preview: URL.createObjectURL(file),
      file: file,
    }));
    setImagesList(imagesList.concat(images));
  };
  const handleParternsImagesRemove = (index) => {
    const images = [...imagesList];
    images.splice(index, 1);
    setImagesList(images);
  };

  const [parterns, setParterns] = useState();
  console.log("hey", parterns);
  //!  upload section
  const uniqueId = v4();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploadProgrees, setImageUploadProgrees] = useState(0);
  const MySwal = withReactContent(Swal);
  const {
    user,
    headerMenuData,
    headerLogo,
    headermenu,
    navbarType,
    projectData,
  } = useUserAuth();
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
    const bgimageRef = ref(storage, `images/nft${uploadHomeBg.name + v4()}`);
    const desimageRef = ref(storage, `images/nft${uploadDesBg.name + v4()}`);

    // imageSnapshot, videoSnapshot
    // Upload the files to Firebase storage
    const [herobgimageSnapshot, desbgimageSnapshot] = await Promise.all([
      uploadBytesResumable(bgimageRef, uploadHomeBg),
      uploadBytesResumable(desimageRef, uploadDesBg),
    ]);

    let bgimageUploadProgress = 0;
    const bgimageUploadTask = uploadBytesResumable(bgimageRef, uploadHomeBg);
    bgimageUploadTask.on(
      "state_changed",
      (snapshot) => {
        bgimageUploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Image Upload Progress: ${bgimageUploadProgress}%`);
        setImageUploadProgrees(bgimageUploadProgress);
        setUploadProgress(bgimageUploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Image upload complete.");
      }
    );
    let desimageUploadProgress = 0;
    const desimageUploadTask = uploadBytesResumable(desimageRef, uploadDesBg);
    desimageUploadTask.on(
      "state_changed",
      (snapshot) => {
        desimageUploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Image Upload Progress: ${desimageUploadProgress}%`);
        setImageUploadProgrees(desimageUploadProgress);
        setUploadProgress(desimageUploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Image upload complete.");
      }
    );

    // // Track upload progress for video
    // let videoUploadProgress = 0;
    // const videoUploadTask = uploadBytesResumable(videoRef, uploadVideoUrl);
    // videoUploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     videoUploadProgress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     console.log(`Video Upload Progress: ${videoUploadProgress}%`);

    //     setUploadProgress(videoUploadProgress);
    //   },
    //   (error) => {
    //     console.log(error);
    //   },
    //   () => {
    //     console.log("Video upload complete.");
    //   }
    // );

    // Wait for all the files to finish uploading
    await Promise.all([bgimageUploadTask, desimageUploadTask]);

    // Get the download URLs for the files
    const [herobgimageUrl, desibgimageUrl] = await Promise.all([
      getDownloadURL(herobgimageSnapshot.ref),
      getDownloadURL(desbgimageSnapshot.ref),
    ]);

    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("Email", "==", emailData));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const autoId = querySnapshot.docs[0].id;
        console.log(`AutoId: ${autoId}`);

        const projectRef = collection(db, "Users", autoId, "project");
        const pq = query(projectRef, where("id", "==", projectData));
        const projectQuerySnapshot = await getDocs(pq);
        try {
          const projectAutoId = projectQuerySnapshot.docs[0].id;
          const websiteDataCollectionRef = collection(
            db,
            "Users",
            autoId,
            "project",
            projectAutoId,
            "WebsiteEditorData"
          );
          const newQuerySnapshot = await getDocs(websiteDataCollectionRef);

          if (!newQuerySnapshot.empty) {
            // User data exists in database, update the existing document
            const docId = querySnapshot.docs[0].id;
            const docRef = doc(websiteDataCollectionRef, docId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
              await updateDoc(docRef, {
                editWebsiteData: {
                  hero: {
                    heroBgImage: herobgimageUrl,
                    heroButton: heroButton,
                    heroHeading: editHeroHeading,
                    heroOverlay: heroOverlayColor,
                    heroSubtext: editHeroSubtext,
                    heroBlockType: heroTypeStore,
                  },
                  descriptionBlock: {
                    DesBlockType: desTypeStore,
                    desOverlay: desOverlayColor,
                    desSubtitle: desSubHeading,
                    desscriptHeading: desHeading,
                    descriptionSubtext: desSubtext,
                    desBgImage: desibgimageUrl,
                  },
                  themeSetting: {
                    websiteBgColor: websiteBgColor,
                    btnBgColor: btnBgColor,
                    TypographyData: typographySelect,
                  },
                  id: uniqueId,
                },
              });
              if (
                MySwal.fire({
                  title: <strong>Uploaded</strong>,
                  icon: "success",
                })
              );
            } else {
              console.log(`Document does not exist: ${docId}`);
            }
          } else {
            // User data does not exist in database, create a new document
            await addDoc(websiteDataCollectionRef, {
              editWebsiteData: {
                hero: {
                  heroBgImage: herobgimageUrl,
                  heroButton: heroButton,
                  heroHeading: editHeroHeading,
                  heroOverlay: heroOverlayColor,
                  heroSubtext: editHeroSubtext,
                  heroBlockType: heroTypeStore,
                },
                descriptionBlock: {
                  DesBlockType: desTypeStore,
                  desOverlay: desOverlayColor,
                  desSubtitle: desSubHeading,
                  desscriptHeading: desHeading,
                  descriptionSubtext: desSubtext,
                  desBgImage: desibgimageUrl,
                },
                themeSetting: {
                  websiteBgColor: websiteBgColor,
                  btnBgColor: btnBgColor,
                  TypographyData: typographySelect,
                },
                id: uniqueId,
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
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
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
  console.log(tempalteId);

  return (
    <>
      <Main>
        <Box sx={{ width: "100%" }}>
          <Sidebar activeBtn={4} />
          <XtraverseContainer>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <EditorInputSec>
                  <PageEditorFrom
                    onClick={() => {
                      setShowColorPopup(false);
                      setShowDesColorPopup(false);
                      setWebsiteBgColorPopup(false);
                      setBtnBgColorPopup(false);
                    }}
                  >
                    {/* theme settings */}
                    <div
                      className={
                        activeIndex === 0
                          ? "page-editor-form theme active"
                          : "page-editor-form theme"
                      }
                    >
                      <div className="btn-flex">
                        <Button
                          className="page-editor-form-btn"
                          onClick={() => {
                            handleToggle(0);
                            setShowColorPopup(false);
                          }}
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            color: "#fff",
                            padding: "15px",
                            textTransform: "capitalize",
                          }}
                        >
                          <span>Theme settings</span>
                          <KeyboardArrowDownIcon className="activesvg" />
                        </Button>
                        <div className="visibility">
                          <VisibilityOffIcon /> <VisibilityIcon />
                        </div>

                        {/* <VisibilityIcon className="visible" /> */}
                      </div>
                      <div className="page-editor-content-input">
                        <ThemeSettings
                          setTypographySelect={setTypographySelect}
                          websiteBgColorPopup={websiteBgColorPopup}
                          setWebsiteBgColorPopup={setWebsiteBgColorPopup}
                          websiteBgColor={websiteBgColor}
                          setWebsiteBgColor={setWebsiteBgColor}
                          btnBgColorPopup={btnBgColorPopup}
                          setBtnBgColorPopup={setBtnBgColorPopup}
                          btnBgColor={btnBgColor}
                          setBtnBgColor={setBtnBgColor}
                          key="1"
                        />
                      </div>
                    </div>
                    <div className="editorform">
                      {/* hero */}
                      <div
                        className={
                          activeIndex === 2
                            ? "page-editor-form active"
                            : "page-editor-form"
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => handleToggle(2)}
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              color: "#fff",
                              padding: "15px",
                              textTransform: "capitalize",
                            }}
                          >
                            <span>Hero</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <Edithero
                            browseClctionBtn={browseClctionBtn}
                            handleBrowseClctionBtn={handleBrowseClctionBtn}
                            heroType={heroType}
                            setHeroType={setHeroType}
                            editHeroName={editHeroHeading}
                            setEditHeroName={setEditHeroHeading}
                            editHeroScript={editHeroSubtext}
                            setEditHeroScript={setEditHeroSubtext}
                            handleImageChange={handleHomeImageChange}
                            setHeroButton={setHeroButton}
                            heroOverlayColor={heroOverlayColor}
                            setHeroOverlayColor={setHeroOverlayColor}
                            showColorPopup={showColorPopup}
                            setShowColorPopup={setShowColorPopup}
                            formId={formId}
                            setFormId={setFormId}
                            key="1"
                          />
                        </div>
                      </div>
                      {/* Description Block */}
                      <div
                        className={
                          activeIndex === 4
                            ? "page-editor-form active"
                            : "page-editor-form"
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => handleToggle(4)}
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              color: "#fff",
                              padding: "15px",
                              textTransform: "capitalize",
                            }}
                          >
                            <span>Description Block</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <EditDescription
                            desType={desType}
                            setDesType={setDesType}
                            setDesHeading={setDesHeading}
                            setDesSubtext={setDesSubtext}
                            setDesSubHeading={setDesSubHeading}
                            editHeroScript={editHeroSubtext}
                            setEditHeroScript={setEditHeroSubtext}
                            handleDesImageChange={handleDesImageChange}
                            setHeroButton={setHeroButton}
                            desOverlayColor={desOverlayColor}
                            setDesOverlayColor={setDesOverlayColor}
                            showDesColorPopup={showDesColorPopup}
                            setShowDesColorPopup={setShowDesColorPopup}
                            formId={formId}
                            setFormId={setFormId}
                            key="1"
                          />
                        </div>
                      </div>
                      {/* Partners */}
                      <div
                        className={
                          activeIndex === 3
                            ? "page-editor-form active"
                            : "page-editor-form"
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => handleToggle(3)}
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              color: "#fff",
                              padding: "15px",
                              textTransform: "capitalize",
                            }}
                          >
                            <span>collaborator</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <EditPartners
                            setparternsHeading={setparternsHeading}
                            setParterns={setParterns}
                            imagesList={imagesList}
                            handleParternsImagesChange={
                              handleParternsImagesChange
                            }
                            handleParternsImagesRemove={
                              handleParternsImagesRemove
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "50% auto",
                        gap: "10px",
                      }}
                    >
                      <Link href="/project/editMarketplace/thankyouPage">
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
                  </PageEditorFrom>
                </EditorInputSec>
              </Grid>
              <Grid xs={8}>
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
                  <CryptoCanvasEditHome
                    browseClctionBtn={browseClctionBtn}
                    homeBg={homeBg}
                    desBg={desBg}
                    heroType={heroType}
                    desType={desType}
                    heroButton={heroButton}
                    editHeroHeading={editHeroHeading}
                    heroOverlayColor={heroOverlayColor}
                    editHeroSubtext={editHeroSubtext}
                    desOverlayColor={desOverlayColor}
                    desSubHeading={desSubHeading}
                    desHeading={desHeading}
                    desSubtext={desSubtext}
                    websiteBgColor={websiteBgColor}
                    btnBgColor={btnBgColor}
                    parternsHeading={parternsHeading}
                    parterns={imagesList}
                  />
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

export default EditHomePageindex;
