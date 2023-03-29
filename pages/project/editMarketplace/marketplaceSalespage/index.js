import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { AiOutlineEye } from "react-icons/ai";
import demoimg from "../../../../components/images/blacklogo.svg";
import xtraverseLogo from "../../../../components/images/logo/3d-logo.png";

import Sidebar, {
  drawerWidth,
} from "../../../../components/dashboard/sidebar/Navbar";
import Stepnav from "../../../../components/dashboard/step-nav";
import { db, storage } from "../../../../configfile/firebaseConfig";
import { v4 } from "uuid";
import blueStatus from "../../../../components/images/editwebsite/blue.png";
import yellowStatus from "../../../../components/images/editwebsite/yellowStatus.png";
import nftPreviewimg from "../../../../components/images/templatepage/uploadNft.png";
import Predviewimg from "../../../../components/images/templatepage/preivewimg.png";
// import projectBioVideo from "../../../../components/images/video/xtraverse.mp4";
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
import { Button, Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Main,
  PageEditorFrom,
  EditorInputSec,
} from "../../../../components/styles/homepage.styled";

import { XtraverseContainer } from "../../..";
import MarketPlaceGeneral from "../../../../components/project/EditMarketplace/General";
import MarketPlaceFeatures from "../../../../components/project/EditMarketplace/Features";
import {
  MarketPlaceDataPreview,
  BtnContainer,
} from "../../../../components/styles/uploadnft.style";

import MarketPlaceProjectBio from "../../../../components/project/EditMarketplace/ProjectBio";
import Link from "next/link";
import CryptoCanvasEditMarketPlaceSalespage from "../../../../theme/CryptoCanvas/editMarketplace/marketplacesales";
import { useRouter } from "next/router";
import MarketPlaceHeader from "../../../../components/project/EditMarketplace/MarketPlaceHeader";
import EditorSalesPage from "../../../../components/project/EditMarketplace/EditorSalesPage";
import CryptoCanvasMarketPlaceOfferPageEditor from "../../../../theme/CryptoCanvas/editMarketplace/OffersPageEditor";
import MarketPlaceClosing from "../../../../components/project/EditMarketplace/Closing";
import ThanksyouPage from "../../../../components/project/EditMarketplace/ThanksyouPage";
function EditMarketPlaceSalesindex() {
  const router = useRouter();
  const {
    user,
    headerMenuData,
    setHeaderMenuData,
    headerLogo,
    setHeaderLogo,
    headermenu,
    setHeadermenu,
    navbarType,
    setNavbarType,
    projectData,
  } = useUserAuth();
  const [activeIndex, setActiveIndex] = useState(null);
  const handleToggle = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  const { data } = router.query;
  console.log(data);
  const [index, setIndex] = useState(0);
  const [imgUrl, setImgUrl] = useState();
  const [formId, setFormId] = useState(null);

  // ! offers
  const [activeOffer, setActiveOffer] = useState(true);
  const [offerHeader, setOfferHeader] = useState("Marketplace");
  const [offerSubtexxt, setOfferSubtexxt] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim consequat massa arcu, scelerisque fermentum mauris aliquam nunc. Tellus quam magna eu mattis nulla vestibulum."
  );
  //! Edit header
  const [headerType, setHeaderType] = useState("header1");
  const storeHeaderType = headerType;
  // for upload logo
  const [homeLogo, setHomeLogo] = useState(xtraverseLogo);
  const [uploadLogo, setUploadLogo] = useState(demoimg);
  const [storeLogo, setStoreLogo] = useState();
  const handleLogoChange = (event) => {
    const imageFile = event.target.files[0];
    setHomeLogo(URL.createObjectURL(imageFile));
    setUploadLogo(imageFile);
  };
  const [waitlistBtn, setWaitlistBtn] = useState({
    button: "Login",
    link: "www.demo.com",
  });

  const handleWaitlistBtnChange = (e) => {
    setWaitlistBtn({ ...waitlistBtn, [e.target.name]: e.target.value });
  };

  const [menuNav, setMenuNav] = useState();
  setHeaderMenuData(menuNav);
  setHeaderLogo(homeLogo);
  setHeadermenu(waitlistBtn);
  setNavbarType(headerType);
  // waitlist button
  const [waitlistInput, setWaitlistInput] = useState("Waitlist");

  //! nft details name, collection name,price, chain utitlity, tag
  const [nftCollectionName, setNftCollectionName] = useState("Green Gremlins");
  const [nftName, setNftName] = useState("Draken");
  const [addNftDescript, setAddNftDescript] = useState(
    "DRK is the first of its kind. Bringing AAA quality to the #NFT world with mythical creatures inside virtual realtiy space."
  );
  const [nftPrice, setNftPrice] = useState("7");
  const [nftMindBtn, setNftMindBtn] = useState("Mint Now");
  const [utility, setUtility] = useState("");
  const handleSelectUtility = (selectedOption) => {
    setUtility(selectedOption);
    // console.log("handleChange", selectedOption);
  };
  console.log("nftType", utility);
  // console.log(tokenType, mintType);
  const [imageupload, setImageUpload] = useState(nftPreviewimg);
  const [selectedImage, setSelectedImage] = useState(nftPreviewimg);
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(URL.createObjectURL(imageFile));
    setImageUpload(imageFile);
  };

  //! for features  videosec
  const [tokenType, setTokenType] = useState("");
  const [mintType, setMintType] = useState("");
  const [videoTitle, setVideoTitle] = useState("Draken's Origin");
  const [addStory, setAddStory] = useState(
    "DRK is the first of its kind. Bringing AAA quality to the #NFT world with mythical creatures inside virtual realtiy space.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim consequat massa arcu, scelerisque fermentum mauris aliquam nunc. Tellus quam magna eu mattis nulla vestibulum. "
  );
  const [featureBtn, setFeatureBtn] = useState({
    button: "Mint Now",
    link: "",
  });
  const handleButtonChange = (e) => {
    setFeatureBtn({ ...featureBtn, [e.target.name]: e.target.value });
  };
  console.log(featureBtn);
  const [uploadVideoUrl, setUploadVideoUrl] = useState(Predviewimg);
  const [selectedVideo, setSelectedVideo] = useState(Predviewimg);
  const handleVideoChange = (event) => {
    const videoFile = event.target.files[0];
    setSelectedVideo(URL.createObjectURL(videoFile));
    setUploadVideoUrl(videoFile);
  };
  const [royaltiesList, setRoyaltiesList] = useState([{ founder: "" }]);
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...royaltiesList];
    list[index][name] = value;
    setRoyaltiesList(list);
  };
  const handleServiceRemove = (index) => {
    const list = [...royaltiesList];
    list.splice(index, 1);
    setRoyaltiesList(list);
  };
  const handleServiceAdd = () => {
    setRoyaltiesList([...royaltiesList, { founder: "" }]);
  };

  //! for project bio
  const [prjctBioCollection, setPrjctBioCollection] = useState("Robois");
  const [projectBio, setProjectBio] = useState(
    "DRK is the first of its kind. Bringing AAA quality to the #NFT world with mythical creatures inside virtual realtiy space.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim consequat massa arcu, scelerisque fermentum mauris aliquam nunc. Tellus quam magna eu mattis nulla vestibulum. "
  );
  const [projectBioStory, setProjectBioStory] = useState("Our Story");
  const [projectBtn, SetProjectBtn] = useState({
    button: "Mint Now",
    link: "",
  });
  const handleProjectBtnChange = (e) => {
    SetProjectBtn({ ...projectBtn, [e.target.name]: e.target.value });
  };
  const [prjctUploadVideoUrl, setPrjctUploadVideoUrl] = useState(
    "/video/xtraverse.mp4"
  );
  const [prjctSelectedVideo, setPrjctSelectedVideo] = useState(
    "/video/xtraverse.mp4"
  );
  const handlePrjctBioVideoChange = (event) => {
    const videoFile = event.target.files[0];
    setPrjctSelectedVideo(URL.createObjectURL(videoFile));
    setPrjctUploadVideoUrl(videoFile);
  };

  //! Thank you page
  // const [closingTopTxt, setClosingTopTxt] = useState(
  //   "Welcome to Robo Gremlins"
  // );
  // const [closingHeader, setClosingHeader] = useState("Congratulations");
  // const [closingSubtexxt, setClosingSubtexxt] = useState(
  //   " Book a call with an onboarding manager to unlock full benefits. "
  // );
  // const [closingBtn, setClosingBtn] = useState({
  //   button: "Book a Call",
  //   link: "",
  // });
  // const handleClosingBtnChange = (e) => {
  //   setClosingBtn({ ...closingBtn, [e.target.name]: e.target.value });
  // };
  // const [closingUploadVideoUrl, setClosingUploadVideoUrl] = useState(null);
  // const [closingSelectedVideo, setClosingSelectedVideo] = useState(Predviewimg);
  // const handleClosingBioVideoChange = (event) => {
  //   const videoFile = event.target.files[0];
  //   setClosingSelectedVideo(URL.createObjectURL(videoFile));
  //   setClosingUploadVideoUrl(videoFile);
  // };

  //!  upload section
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploadProgrees, setImageUploadProgrees] = useState(0);
  const MySwal = withReactContent(Swal);
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
    const generealimageRef = ref(
      storage,
      `images/nft${imageupload.name + v4()}`
    );
    const featurefilesRef = ref(
      storage,
      `images/nft${uploadVideoUrl.name + v4()}`
    );
    const projectBioVideoRef = ref(
      storage,
      `images/nft${prjctUploadVideoUrl.name + v4()}`
    );
    const logoimageRef = ref(storage, `images/nft${uploadLogo.name + v4()}`);

    // const closingVideoRef = ref(
    //   storage,
    //   `video/${closingUploadVideoUrl.name + v4()}`
    // );

    // imageSnapshot, videoSnapshot
    // Upload the files to Firebase storage
    const [
      generalimageSnapshot,
      featuresimageSnapshot,
      projectsVideoSnapshot,
      logoimageSnapshot,
    ] = await Promise.all([
      uploadBytesResumable(generealimageRef, imageupload),
      uploadBytesResumable(featurefilesRef, uploadVideoUrl),
      uploadBytesResumable(projectBioVideoRef, prjctUploadVideoUrl),
      uploadBytesResumable(logoimageRef, uploadLogo),

      //   uploadBytesResumable(closingVideoRef, closingUploadVideoUrl),
    ]);
    // Track upload progress for image
    let generalimageUploadProgress = 0;
    const generalfilesUploadTask = uploadBytesResumable(
      generealimageRef,
      imageupload
    );
    generalfilesUploadTask.on(
      "state_changed",
      (snapshot) => {
        generalimageUploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Image Upload Progress: ${generalimageUploadProgress}%`);
        setImageUploadProgrees(generalimageUploadProgress);
        setUploadProgress(generalimageUploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Image upload complete.");
      }
    );

    let bgimageUploadProgress = 0;
    const featurefilesUploadTask = uploadBytesResumable(
      featurefilesRef,
      uploadVideoUrl
    );
    featurefilesUploadTask.on(
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
    let projectBioUploadProgress = 0;
    const projectBioUploadTask = uploadBytesResumable(
      projectBioVideoRef,
      prjctUploadVideoUrl
    );
    projectBioUploadTask.on(
      "state_changed",
      (snapshot) => {
        projectBioUploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Image Upload Progress: ${projectBioUploadProgress}%`);
        setImageUploadProgrees(projectBioUploadProgress);
        setUploadProgress(projectBioUploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Image upload complete.");
      }
    );

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
    // let closingUploadProgress = 0;
    // const closingUploadTask = uploadBytesResumable(
    //   closingVideoRef,
    //   closingUploadVideoUrl
    // );
    // closingUploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     closingUploadProgress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     console.log(`Image Upload Progress: ${closingUploadProgress}%`);
    //     setImageUploadProgrees(closingUploadProgress);
    //     setUploadProgress(closingUploadProgress);
    //   },
    //   (error) => {
    //     console.log(error);
    //   },
    //   () => {
    //     console.log("Image upload complete.");
    //   }
    // );

    // Wait for all the files to finish uploading
    await Promise.all([
      generalfilesUploadTask,
      featurefilesUploadTask,
      projectBioUploadTask,
      logoimageUploadTask,
      //   closingUploadTask,
      // desimageUploadTask,
    ]);
    // Get the download URLs for the files
    // const [logoimageUrl, herobgimageUrl, desibgimageUrl] = await Promise.all([
    const [
      generalimageUrl,
      featuresimageUrl,
      projectBioVideoUrl,
      logoimageUrl,
      //   closingVideoUrl,
    ] = await Promise.all([
      getDownloadURL(generalimageSnapshot.ref),
      getDownloadURL(featuresimageSnapshot.ref),
      getDownloadURL(projectsVideoSnapshot.ref),
      getDownloadURL(logoimageSnapshot.ref),
      //   getDownloadURL(closingVideoSnapshot.ref),
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
          console.log(`productAudtoId: ${projectAutoId}`);
          const userDataCollectionRef = collection(
            db,
            "Users",
            autoId,
            "project",
            projectAutoId,
            "OffersPageData"
          );
          const newQuerySnapshot = await getDocs(userDataCollectionRef);

          if (!newQuerySnapshot.empty) {
            // User data exists in database, update the existing document
            const docId = newQuerySnapshot.docs[0].id;
            // console.log(`DocId: ${docId}`);
            const docRef = doc(userDataCollectionRef, docId);
            await updateDoc(docRef, {
              Offerheader: {
                logoImage: logoimageUrl,
                navbarType: storeHeaderType,
                waitlistBtn: waitlistBtn,
                menuNav: menuNav,
              },
              OfferGeneralData: {
                nftImg: generalimageUrl,
                nftName: nftName,
                collectionName: nftCollectionName,
                nftDescription: addNftDescript,
                utility: utility,
                nftPrice: nftPrice,
                nftMintBtn: nftMindBtn,
              },
              OfferFeaturesData: {
                featuresImg: featuresimageUrl,
                TokenType: tokenType,
                minType: mintType,
                royaltiesList: royaltiesList,
                featureBtn: featureBtn,
                videoTitle: videoTitle,
                addStory: addStory,
              },
              OffersProjecBio: {
                projectBioVideo: projectBioVideoUrl,
                prjctBioCollection: prjctBioCollection,
                projectBio: projectBio,
                projectBioStory: projectBioStory,
                projectBtn: projectBtn,
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
              Offerheader: {
                logoImage: logoimageUrl,
                navbarType: storeHeaderType,
                waitlistBtn: waitlistBtn,
                menuNav: menuNav,
              },
              OfferGeneralData: {
                nftImg: generalimageUrl,
                nftName: nftName,
                collectionName: nftCollectionName,
                nftDescription: addNftDescript,
                utility: utility,
                nftPrice: nftPrice,
                nftMintBtn: nftMindBtn,
              },
              OfferFeaturesData: {
                featuresImg: featuresimageUrl,
                TokenType: tokenType,
                minType: mintType,
                royaltiesList: royaltiesList,
                featureBtn: featureBtn,
                videoTitle: videoTitle,
                addStory: addStory,
              },
              OffersProjecBio: {
                projectBioVideo: projectBioVideoUrl,
                prjctBioCollection: prjctBioCollection,
                projectBio: projectBio,
                projectBioStory: projectBioStory,
                projectBtn: projectBtn,
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
      router.push("/project/editMarketplace/thankyouPage");
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
  const [tempalteId, setTempalteId] = useState();
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
  console.log(royaltiesList);
  // function handleCheckToekSubmit() {
  //   if (tokenType === "ERC-721A" && mintType === "Regular") {
  //     alert("yes color");
  //   }
  // }

  return (
    <>
      <Main>
        {/* <Stepnav /> */}

        <Box sx={{ padding: "0px 0px 0px 100px" }}>
          {/* <Sidebar activeBtn={3} heading="Shop" /> */}
          <XtraverseContainer>
            <Grid container spacing={2}>
              <Grid lg={4} xl={4}>
                {tokenType === "ERC-721A" && mintType === "Regular"
                  ? console.log("match")
                  : console.log("not match")}
                <EditorInputSec>
                  <PageEditorFrom>
                    {/* offers page editor */}
                    <div
                      className={
                        activeIndex === 0
                          ? activeOffer
                            ? "page-editor-form theme  active"
                            : "page-editor-form theme "
                          : "page-editor-form theme "
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
                          <span>Shop</span>
                          <KeyboardArrowDownIcon className="activesvg" />
                        </Button>
                        <div className="visibility">
                          <VisibilityOffIcon /> <VisibilityIcon />
                        </div>
                      </div>

                      <div className="page-editor-content-input">
                        <EditorSalesPage
                          setOfferHeader={setOfferHeader}
                          setOfferSubtexxt={setOfferSubtexxt}
                          key="3"
                        />
                      </div>
                    </div>
                    <div className="editorform">
                      {/* header */}
                      <div
                        className={
                          activeIndex === 1
                            ? activeOffer
                              ? "page-editor-form "
                              : "page-editor-form active"
                            : "page-editor-form "
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => {
                              handleToggle(1);
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
                            <span>Header</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>

                          {/* <VisibilityIcon className="visible" /> */}
                        </div>
                        <div className="page-editor-content-input">
                          <MarketPlaceHeader
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
                      {/* general */}
                      <div
                        className={
                          activeIndex === 2
                            ? activeOffer
                              ? "page-editor-form  "
                              : "page-editor-form active"
                            : "page-editor-form "
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => {
                              handleToggle(2);
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
                            <span>General</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>

                          {/* <VisibilityIcon className="visible" /> */}
                        </div>
                        <div className="page-editor-content-input">
                          <MarketPlaceGeneral
                            setNftName={setNftName}
                            nftName={nftName}
                            addNftDescript={addNftDescript}
                            nftCollectionName={nftCollectionName}
                            setNftCollectionName={setNftCollectionName}
                            setNftDescript={setAddNftDescript}
                            handleSelectUtility={handleSelectUtility}
                            selectedImage={selectedImage}
                            handleImageChange={handleImageChange}
                            nftPrice={nftPrice}
                            setNftPrice={setNftPrice}
                            nftMindBtn={nftMindBtn}
                            setNftMindBtn={setNftMindBtn}
                            key="1"
                          />
                        </div>
                      </div>
                      {/* features */}
                      <div
                        className={
                          activeIndex === 3
                            ? activeOffer
                              ? "page-editor-form  "
                              : "page-editor-form active"
                            : "page-editor-form "
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
                            <span>Features</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <MarketPlaceFeatures
                            handleVideoChange={handleVideoChange}
                            setFeatureBtn={setFeatureBtn}
                            setAddStory={setAddStory}
                            setVideoTitle={setVideoTitle}
                            tokenType={tokenType}
                            setTokenType={setTokenType}
                            mintType={mintType}
                            setMintType={setMintType}
                            featureBtn={featureBtn}
                            handleButtonChange={handleButtonChange}
                            handleServiceAdd={handleServiceAdd}
                            handleServiceChange={handleServiceChange}
                            handleServiceRemove={handleServiceRemove}
                            royaltiesList={royaltiesList}
                            key="1"
                          />
                        </div>
                      </div>
                      {/* project bio */}
                      <div
                        className={
                          activeIndex === 4
                            ? activeOffer
                              ? "page-editor-form  "
                              : "page-editor-form active"
                            : "page-editor-form "
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => {
                              setActiveIndex(true);
                              handleToggle(4);
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
                            <span>Bio</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <MarketPlaceProjectBio
                            setPrjctBioCollection={setPrjctBioCollection}
                            setProjectBio={setProjectBio}
                            setProjectBioStory={setProjectBioStory}
                            handleProjectBtnChange={handleProjectBtnChange}
                            projectBtn={projectBtn}
                            prjctSelectedVideo={prjctSelectedVideo}
                            handlePrjctBioVideoChange={
                              handlePrjctBioVideoChange
                            }
                            key="2"
                          />
                        </div>
                      </div>
                      {/* Thanks you page */}
                      {/* <div
                        className={
                          activeIndex === 5
                            ? activeOffer
                              ? "page-editor-form  "
                              : "page-editor-form active"
                            : "page-editor-form "
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => handleToggle(5)}
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              color: "#fff",
                              padding: "15px",
                              textTransform: "capitalize",
                            }}
                          >
                            <span>Thank you page</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <ThanksyouPage
                            setClosingTopTxt={setClosingTopTxt}
                            setClosingHeader={setClosingHeader}
                            setClosingSubtexxt={setClosingSubtexxt}
                            setClosingBtn={setClosingBtn}
                            closingBtn={closingBtn}
                            handleClosingBtnChange={handleClosingBtnChange}
                            handleClosingVideoChange={
                              handleClosingBioVideoChange
                            }
                            key="3"
                          />
                        </div>
                      </div> */}
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
                      Complete
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
                        stroke="#04fcbc"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </BtnContainer>

                  <MarketPlaceDataPreview>
                    {activeOffer ? (
                      <CryptoCanvasMarketPlaceOfferPageEditor
                        offerHeader={offerHeader}
                        offerSubtexxt={offerSubtexxt}
                        setActiveOffer={setActiveOffer}
                      />
                    ) : (
                      <CryptoCanvasEditMarketPlaceSalespage
                        nftCollectionName={nftCollectionName}
                        nftName={nftName}
                        waitlistBtn={waitlistBtn}
                        blueStatus={blueStatus}
                        addNftDescript={addNftDescript}
                        yellowStatus={yellowStatus}
                        nftMindBtn={nftMindBtn}
                        nftPrice={nftPrice}
                        selectedImage={selectedImage}
                        videoTitle={videoTitle}
                        selectedVideo={selectedVideo}
                        addStory={addStory}
                        featureBtn={featureBtn}
                        prjctSelectedVideo={prjctSelectedVideo}
                        projectBioStory={projectBioStory}
                        prjctBioCollection={prjctBioCollection}
                        projectBio={projectBio}
                        menuNav={menuNav}
                        headerType={headerType}
                        homeLogo={homeLogo}
                        projectBtn={projectBtn}
                      />
                    )}
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

export default EditMarketPlaceSalesindex;
