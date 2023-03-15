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
function EditHomePageindex() {
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
  //! Edit header
  const [headerType, setHeaderType] = useState("header1");
  const storeHeaderType = headerType;
  // for upload logo
  const [homeLogo, setHomeLogo] = useState(demoimg);
  const [uploadLogo, setUploadLogo] = useState(demoimg);
  const [storeLogo, setStoreLogo] = useState();
  const handleLogoChange = (event) => {
    const imageFile = event.target.files[0];
    setHomeLogo(URL.createObjectURL(imageFile));
    setUploadLogo(imageFile);
  };
  const [waitlistBtn, setWaitlistBtn] = useState({
    button: "Collection",
    link: "",
  });

  const handleWaitlistBtnChange = (e) => {
    setWaitlistBtn({ ...waitlistBtn, [e.target.name]: e.target.value });
  };

  const [menuNav, setMenuNav] = useState();
  console.log(menuNav);
  // waitlist button
  const [waitlistInput, setWaitlistInput] = useState("Waitlist");

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
    link: "",
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
  const [desOverlayColor, setDesOverlayColor] = useState("");

  //!  upload section
  const uniqueId = v4();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploadProgrees, setImageUploadProgrees] = useState(0);
  const MySwal = withReactContent(Swal);
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
    const logoimageRef = ref(storage, `images/nft${uploadLogo.name + v4()}`);
    const bgimageRef = ref(storage, `images/nft${uploadHomeBg.name + v4()}`);
    const desimageRef = ref(storage, `images/nft${uploadDesBg.name + v4()}`);

    // imageSnapshot, videoSnapshot
    // Upload the files to Firebase storage
    const [logoimageSnapshot, herobgimageSnapshot, desbgimageSnapshot] =
      await Promise.all([
        uploadBytesResumable(logoimageRef, uploadLogo),
        uploadBytesResumable(bgimageRef, uploadHomeBg),
        uploadBytesResumable(desimageRef, uploadDesBg),
      ]);

    // Track upload progress for image
    let logoimageUploadProgress = 0;
    const logoimageUploadTask = uploadBytesResumable(logoimageRef, uploadLogo);
    logoimageUploadTask.on(
      "state_changed",
      (snapshot) => {
        logoimageUploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Image Upload Progress: ${logoimageUploadProgress}%`);
        setImageUploadProgrees(logoimageUploadProgress);
        setUploadProgress(logoimageUploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Image upload complete.");
      }
    );

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
    await Promise.all([
      logoimageUploadTask,
      bgimageUploadTask,
      desimageUploadTask,
    ]);

    // Get the download URLs for the files
    const [logoimageUrl, herobgimageUrl, desibgimageUrl] = await Promise.all([
      getDownloadURL(logoimageSnapshot.ref),
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
        try {
          const userDataCollectionRef = collection(
            db,
            "Users",
            autoId,
            "editWebsite"
          );
          const querySnapshot = await getDocs(userDataCollectionRef);

          if (!querySnapshot.empty) {
            // User data exists in database, update the existing document
            const docId = querySnapshot.docs[0].id;
            // console.log(`DocId: ${docId}`);
            const docRef = doc(userDataCollectionRef, docId);
            await updateDoc(docRef, {
              header: {
                logoImage: logoimageUrl,
                navbarType: storeHeaderType,
                waitlistBtn: waitlistBtn,
                menuNav: menuNav,
              },
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
              header: {
                logoImage: logoimageUrl,
                navbarType: storeHeaderType,
                waitlistBtn: waitlistBtn,
                menuNav: menuNav,
              },
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
  console.log(tempalteId);

  return (
    <>
      <Main>
        <Stepnav />
        <Box sx={{ width: "100%" }}>
          <Sidebar activeBtn={4} />
          <Box
            sx={{
              marginLeft: "auto",
              background: "#303030",
              height: "100%",
              display: "grid",
              gridTemplateColumns: "100%",
              alignItems: "center",
              paddingLeft: "110px",
            }}
          >
            <XtraverseContainer>
              <Grid container spacing={2}>
                <Grid item xs={4}>
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
                            headerType={headerType}
                            setHeaderType={setHeaderType}
                            uploadLogo={uploadLogo}
                            handleImageChange={handleLogoChange}
                            btnBgColorPopup={btnBgColorPopup}
                            setBtnBgColorPopup={setBtnBgColorPopup}
                            btnBgColor={btnBgColor}
                            setBtnBgColor={setBtnBgColor}
                            key="1"
                          />
                        </div>
                      </div>
                      <div className="editorform">
                        {/* header navigation */}
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
                              onClick={() => {
                                handleToggle(3);
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
                              <span>Header Navigation</span>
                              <KeyboardArrowDownIcon className="activesvg" />
                            </Button>
                            <div className="visibility">
                              <VisibilityOffIcon /> <VisibilityIcon />
                            </div>

                            {/* <VisibilityIcon className="visible" /> */}
                          </div>
                          <div className="page-editor-content-input">
                            <EditHeader
                              menuNav={menuNav}
                              setMenuNav={setMenuNav}
                              waitlistBtn={waitlistBtn}
                              handleWaitlistBtnChange={handleWaitlistBtnChange}
                              headerType={headerType}
                              setHeaderType={setHeaderType}
                              uploadLogo={uploadLogo}
                              handleImageChange={handleLogoChange}
                              key="1"
                            />
                          </div>
                        </div>
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
                              setHomeLogo={setHomeLogo}
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
                      </div>
                    </PageEditorFrom>
                  </EditorInputSec>
                </Grid>
                <Grid item xs={8}>
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
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.4035 2.37412 8.8944 3.03947 7.55556"
                          stroke="#8A8A8E"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "20px",
                        }}
                      >
                        <Button onClick={handleDataSubmit}>Publish</Button>
                        <Button>
                          See full preview <AiOutlineEye />
                        </Button>
                      </Box>
                    </BtnContainer>
                    <CryptoCanvasEditHome
                      browseClctionBtn={browseClctionBtn}
                      menuNav={menuNav}
                      waitlistBtn={waitlistBtn}
                      homeLogo={homeLogo}
                      homeBg={homeBg}
                      desBg={desBg}
                      headerType={headerType}
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
                    />
                  </Box>
                </Grid>
              </Grid>
            </XtraverseContainer>
            {/* {selectedTemplate} */}
          </Box>
        </Box>
      </Main>
    </>
  );
}

export default EditHomePageindex;
