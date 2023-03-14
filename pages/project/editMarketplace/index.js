import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { AiOutlineEye } from "react-icons/ai";
import Sidebar, {
  drawerWidth,
} from "../../../components/dashboard/sidebar/Navbar";
import Stepnav from "../../../components/dashboard/step-nav";
import { db, storage } from "../../../configfile/firebaseConfig";
import { BsPlusCircle } from "react-icons/bs";
import { v4 } from "uuid";
import { RiTicketLine } from "react-icons/ri";
import blueStatus from "../../../components/images/editwebsite/blue.png";
import yellowStatus from "../../../components/images/editwebsite/yellowStatus.png";
import nftPreviewimg from "../../../components/images/templatepage/uploadNft.png";
import Predviewimg from "../../../components/images/templatepage/preivewimg.png";
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

import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  HomepagePreview,
  Main,
  PageEditorFrom,
  EditorInputSec,
} from "../../../components/styles/homepage.styled";

import { XtraverseContainer } from "../..";
import MarketPlaceGeneral from "../../../components/project/EditMarketplace/General";
import MarketPlaceFeatures from "../../../components/project/EditMarketplace/Features";
import {
  PreviewBox,
  MarketPlaceDataPreview,
  BtnContainer,
} from "../../../components/styles/uploadnft.style";

import ItemAcivity from "../../../components/project/EditMarketplace/ItemActivity";
import MarketPlaceProjectBio from "../../../components/project/EditMarketplace/ProjectBio";
import Link from "next/link";
import MarketPlaceClosing from "../../../components/project/EditMarketplace/Closing";
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

  //! nft details name, collection name,price, chain utitlity, tag

  const [nftCollectionName, setNftCollectionName] = useState("Green Gremlins");
  const [nftName, setNftName] = useState("Draken");
  const [addNftDescript, setAddNftDescript] = useState(
    "DRK is the first of its kind. Bringing AAA quality to the #NFT world with mythical creatures inside virtual realtiy space."
  );
  const [nftPrice, setNftPrice] = useState("7");
  const [nftMindBtn, setNftMindBtn] = useState("Mint Now");
  const [nftType, setNftType] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [mintType, setMintType] = useState("");
  // console.log(tokenType, mintType);
  const [imageupload, setImageUpload] = useState();
  const [selectedImage, setSelectedImage] = useState(nftPreviewimg);
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(URL.createObjectURL(imageFile));
    setImageUpload(imageFile);
  };

  //! for features  videosec
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

  const [uploadVideoUrl, setUploadVideoUrl] = useState(null);
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

  const [prjctUploadVideoUrl, setPrjctUploadVideoUrl] = useState(null);
  const [prjctSelectedVideo, setPrjctSelectedVideo] = useState(Predviewimg);

  const handlePrjctBioVideoChange = (event) => {
    const videoFile = event.target.files[0];
    setPrjctSelectedVideo(URL.createObjectURL(videoFile));
    setPrjctUploadVideoUrl(videoFile);
  };

  //! for Closing layout
  const [closingTopTxt, setClosingTopTxt] = useState(
    "Welcome to Robo Gremlins"
  );
  const [closingHeader, setClosingHeader] = useState("Congratulations");
  const [closingSubtexxt, setClosingSubtexxt] = useState(
    " Book a call with an onboarding manager to unlock full benefits. "
  );
  const [closingBtn, setClosingBtn] = useState({
    button: "Book a Call",
    link: "",
  });
  const handleClosingBtnChange = (e) => {
    setClosingBtn({ ...closingBtn, [e.target.name]: e.target.value });
  };

  const [closingUploadVideoUrl, setClosingUploadVideoUrl] = useState(null);
  const [closingSelectedVideo, setClosingSelectedVideo] = useState(Predviewimg);

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
  const { user } = useUserAuth();
  const emailData = user.email;
  // console.log(menuInput);
  console.log(emailData);

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
    const closingVideoRef = ref(
      storage,
      `video/${closingUploadVideoUrl.name + v4()}`
    );

    // imageSnapshot, videoSnapshot
    // Upload the files to Firebase storage
    const [
      generalimageSnapshot,
      featuresimageSnapshot,
      projectsVideoSnapshot,
      closingVideoSnapshot,
    ] = await Promise.all([
      uploadBytesResumable(generealimageRef, imageupload),
      uploadBytesResumable(featurefilesRef, uploadVideoUrl),
      uploadBytesResumable(projectBioVideoRef, prjctUploadVideoUrl),
      uploadBytesResumable(closingVideoRef, closingUploadVideoUrl),
    ]);
    // Track upload progress for image
    let logoimageUploadProgress = 0;
    const generalfilesUploadTask = uploadBytesResumable(
      generealimageRef,
      imageupload
    );
    generalfilesUploadTask.on(
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
      generalfilesUploadTask,
      featurefilesUploadTask,
      projectBioUploadTask,
      closingUploadTask,
      // desimageUploadTask,
    ]);
    // Get the download URLs for the files
    // const [logoimageUrl, herobgimageUrl, desibgimageUrl] = await Promise.all([
    const [
      generalimageUrl,
      featuresimageUrl,
      projectBioVideoUrl,
      closingVideoUrl,
    ] = await Promise.all([
      getDownloadURL(generalimageSnapshot.ref),
      getDownloadURL(featuresimageSnapshot.ref),
      getDownloadURL(projectsVideoSnapshot.ref),
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
              nftImg: generalimageUrl,
              featuresImg: featuresimageUrl,

              collectionName: nftCollectionName,
              nftName: nftName,
              nftDescription: addNftDescript,
              nftPrice: nftPrice,
              nftMintBtn: nftMindBtn,
              //  nftType: nftType
              TokenType: tokenType,
              minType: mintType,
              videoTitle: videoTitle,
              addStory: addStory,
              featureBtn: featureBtn,
              royaltiesList: royaltiesList,
              projectBioVideo: projectBioVideoUrl,
              closingVideo: closingVideoUrl,
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
              nftImg: generalimageUrl,
              featuresImg: featuresimageUrl,

              collectionName: nftCollectionName,
              nftName: nftName,
              nftDescription: addNftDescript,
              nftPrice: nftPrice,
              nftMintBtn: nftMindBtn,
              //  nftType: nftType
              TokenType: tokenType,
              minType: mintType,
              videoTitle: videoTitle,
              addStory: addStory,
              royaltiesList: royaltiesList,
              projectBioVideo: projectBioVideoUrl,
              closingVideo: closingVideoUrl,
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
  console.log(royaltiesList);
  return (
    <>
      <Main>
        <Stepnav />
        <Box sx={{ width: "100%" }}>
          <Sidebar activeBtn={3} />
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
                    <PageEditorFrom>
                      {/* general */}
                      <div
                        className={
                          activeIndex === 0
                            ? "page-editor-form active"
                            : "page-editor-form"
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => {
                              handleToggle(0);
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
                            nftType={nftType}
                            setNftType={setNftType}
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
                          activeIndex === 1
                            ? "page-editor-form active"
                            : "page-editor-form"
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => handleToggle(1)}
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
                            <span>Project Bio</span>
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
                      {/* Closing */}
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
                            <span>Closing</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <MarketPlaceClosing
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
                        Initialize
                      </Button>
                    </Box>
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
                        <Button>
                          See full preview <AiOutlineEye />
                        </Button>
                      </Box>
                    </BtnContainer>

                    <MarketPlaceDataPreview>
                      <PreviewBox>
                        <div className="Preivewgrid">
                          <div className="previewtxt">
                            {/* <Box
                            component="p"
                            sx={{
                              fontWeight: "800",
                              color: "crimson !important",
                            }}
                          >
                            CryptoCanvas
                          </Box> */}
                            <span>
                              1 of 10 {nftCollectionName}{" "}
                              <svg
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.75952 2.46557C9.32777 2.09549 9.1119 1.91046 8.88749 1.7994C8.32846 1.52276 7.67238 1.52276 7.11336 1.7994C6.88895 1.91046 6.67307 2.09549 6.24132 2.46557L6.16646 2.52973C6.04556 2.63335 5.98512 2.68517 5.92266 2.73083C5.62261 2.9502 5.26736 3.08161 4.89679 3.11033C4.81965 3.1163 4.73915 3.1163 4.57815 3.1163C4.17692 3.1163 3.9763 3.1163 3.81068 3.14432C2.9716 3.28626 2.31424 3.94363 2.17229 4.78271C2.14428 4.94833 2.14428 5.14657 2.14428 5.54304C2.14428 5.69739 2.14428 5.77456 2.13865 5.84938C2.11086 6.21935 1.98069 6.5743 1.76272 6.87453C1.71864 6.93525 1.66875 6.99413 1.56897 7.11188L1.50014 7.19311C1.12907 7.63102 0.94353 7.84998 0.833108 8.07803C0.566553 8.62853 0.566553 9.27074 0.833108 9.82124C0.94353 10.0493 1.12907 10.2682 1.50014 10.7062L1.56897 10.7874C1.66875 10.9051 1.71864 10.964 1.76272 11.0247C1.98069 11.325 2.11086 11.6799 2.13865 12.0499C2.14428 12.1247 2.14428 12.2019 2.14428 12.3562C2.14428 12.7527 2.14428 12.9509 2.17229 13.1166C2.31424 13.9556 2.9716 14.613 3.81068 14.755C3.9763 14.783 4.17692 14.783 4.57815 14.783C4.73915 14.783 4.81965 14.783 4.89679 14.7889C5.26736 14.8177 5.62261 14.9491 5.92266 15.1684C5.98512 15.2141 6.04557 15.2659 6.16646 15.3695L6.24132 15.4337C6.67307 15.8038 6.88895 15.9888 7.11336 16.0999C7.67238 16.3765 8.32846 16.3765 8.88748 16.0999C9.1119 15.9888 9.32777 15.8038 9.75953 15.4337L9.83905 15.3655C9.95534 15.2659 10.0135 15.216 10.0734 15.1719C10.3761 14.9493 10.7353 14.8164 11.1099 14.7885C11.1841 14.783 11.2607 14.783 11.4139 14.783C11.804 14.783 11.999 14.783 12.162 14.7558C13.0054 14.6155 13.6663 13.9546 13.8066 13.1112C13.8338 12.9482 13.8338 12.7532 13.8338 12.3631C13.8338 12.2099 13.8338 12.1334 13.8393 12.0592C13.8672 11.6845 14.0001 11.3253 14.2227 11.0226C14.2668 10.9627 14.3166 10.9046 14.4163 10.7883L14.4845 10.7087C14.8546 10.277 15.0396 10.0611 15.1507 9.8367C15.4273 9.27768 15.4273 8.62159 15.1507 8.06257C15.0396 7.83816 14.8546 7.62228 14.4845 7.19053L14.4163 7.111C14.3166 6.99472 14.2668 6.93657 14.2227 6.87663C14.0001 6.574 13.8672 6.21478 13.8393 5.84012C13.8338 5.76591 13.8338 5.68933 13.8338 5.53617C13.8338 5.14609 13.8338 4.95104 13.8066 4.78803C13.6663 3.94466 13.0054 3.28376 12.162 3.14343C11.999 3.1163 11.804 3.1163 11.4139 3.1163C11.2607 3.1163 11.1841 3.1163 11.1099 3.11077C10.7353 3.08285 10.3761 2.94997 10.0734 2.72734C10.0135 2.68325 9.95534 2.63341 9.83905 2.53373L9.75952 2.46557Z"
                                  fill="#1883E6"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M11.197 6.41889C11.4899 6.71178 11.4899 7.18666 11.197 7.47955L7.86366 10.8129C7.72301 10.9535 7.53225 11.0326 7.33333 11.0326C7.13442 11.0326 6.94366 10.9535 6.803 10.8129L5.46967 9.47955C5.17678 9.18666 5.17678 8.71178 5.46967 8.41889C5.76256 8.126 6.23744 8.126 6.53033 8.41889L7.33333 9.22189L10.1363 6.41889C10.4292 6.126 10.9041 6.126 11.197 6.41889Z"
                                  fill="white"
                                />
                              </svg>
                            </span>
                            <h1>{nftName}</h1>
                            <Box
                              sx={{
                                display: "flex",
                                gap: "5px",
                                padding: "5px 0px",
                              }}
                            >
                              <Image src={blueStatus} />
                              <Box component="span" sx={{ color: "#303030" }}>
                                By
                              </Box>
                              <Box
                                component="p"
                                sx={{ color: "#fff", fontWeight: "600" }}
                              >
                                Alexander
                              </Box>
                            </Box>
                            <p>{addNftDescript}</p>

                            <Box
                              sx={{
                                display: "flex",
                                gap: "5px",
                                padding: "15px 0px 0px",
                              }}
                            >
                              <Image src={yellowStatus} />
                              <Box component="span" sx={{ color: "#303030" }}>
                                Owned By
                              </Box>
                              <Box
                                component="p"
                                sx={{ color: "#fff", fontWeight: "600" }}
                              >
                                Phillip
                              </Box>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "10px",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                type="submit"
                                sx={{
                                  background:
                                    "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
                                  borderRadius: "8px",
                                  color: "#000",
                                  fontSize: ".9em",
                                  textTransform: "capitalize",
                                  padding: "8px 25px",
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
                                {nftMindBtn}
                              </Button>

                              <span className="DlrSpan">
                                <svg
                                  width="14"
                                  height="17"
                                  viewBox="0 0 14 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.02145 1.0129L7.49341 0.679963C7.43574 0.621418 7.36357 0.574317 7.28201 0.541996C7.20045 0.509674 7.1115 0.49292 7.02145 0.49292C6.9314 0.49292 6.84245 0.509674 6.76089 0.541996C6.67933 0.574317 6.60716 0.621418 6.54949 0.679963L7.02145 1.0129ZM0.876151 7.25548L0.404192 6.92254C0.321338 7.00669 0.271978 7.11083 0.263151 7.22012C0.254323 7.32942 0.286477 7.43828 0.35503 7.53119L0.876151 7.25548ZM7.02145 15.5789L6.50033 15.8546C6.55557 15.9294 6.63238 15.9911 6.72354 16.0339C6.81471 16.0767 6.91722 16.0991 7.02145 16.0991C7.12568 16.0991 7.22819 16.0767 7.31936 16.0339C7.41052 15.9911 7.48733 15.9294 7.54257 15.8546L7.02145 15.5789ZM13.1667 7.25548L13.6879 7.53119C13.7564 7.43828 13.7886 7.32942 13.7797 7.22012C13.7709 7.11083 13.7216 7.00669 13.6387 6.92254L13.1667 7.25548ZM7.02145 5.17462L7.25005 4.69186L7.02145 4.61279L6.79284 4.69082L7.02145 5.17358V5.17462ZM6.54949 0.679963L0.404192 6.92254L1.34811 7.58841L7.49341 1.34584L6.54949 0.679963ZM0.35503 7.53119L6.50033 15.8546L7.54257 15.3032L1.39727 6.97976L0.35503 7.53119ZM7.54257 15.8546L13.6879 7.53119L12.6456 6.97976L6.50033 15.3032L7.54257 15.8546ZM13.6387 6.92254L7.49341 0.679963L6.54949 1.34584L12.6948 7.58841L13.6387 6.92254ZM1.10476 7.73824L7.25005 5.65738L6.79284 4.69186L0.647546 6.77272L1.10476 7.73824ZM6.79284 5.65738L12.9381 7.73824L13.3954 6.77272L7.25005 4.69186L6.79284 5.65738Z"
                                    fill="white"
                                  />
                                </svg>
                                <strong>{nftPrice}</strong>
                              </span>
                            </Box>
                          </div>
                          {/* image section */}
                          <div className="imgwrap">
                            <div className="imgbox">
                              <Image
                                src={selectedImage}
                                alt=""
                                width={100}
                                height={100}
                                style={{ width: "100%", objectFit: "cover" }}
                              />
                            </div>
                          </div>
                        </div>
                        <Box
                          sx={{
                            padding: "20px 0px",
                          }}
                        >
                          <h1
                            style={{
                              textAlign: "left",
                              fontSize: "2.1em",
                              fontWeight: "500",
                              padding: "10px 0px",
                            }}
                          >
                            Item Activity
                          </h1>
                          <ItemAcivity />
                        </Box>
                      </PreviewBox>
                      <PreviewBox>
                        <div className="videowrap">
                          <h1>{videoTitle}</h1>
                          <div className="videoBox">
                            <Image
                              src={selectedVideo}
                              width={100}
                              height={100}
                            />
                          </div>
                          <p>{addStory}</p>
                          <Link href={featureBtn.link}>
                            <Button
                              type="submit"
                              sx={{
                                background:
                                  "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
                                borderRadius: "8px",
                                color: "#000",
                                fontSize: ".9em",
                                textTransform: "capitalize",
                                padding: "8px 25px",
                                transition: "0.3s",
                                fontWeight: "500",
                                margin: "10px 0px",
                                display: "inline-flex",

                                "&:hover ": {
                                  background:
                                    "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                                  cursor: "pointer",
                                },
                              }}
                            >
                              {featureBtn.button}
                            </Button>
                          </Link>
                        </div>
                      </PreviewBox>
                      <PreviewBox>
                        <div className="Preivewgrid">
                          {/* video section */}
                          <div className="imgwrap">
                            <div className="imgbox">
                              <video
                                src={prjctSelectedVideo}
                                muted
                                autoPlay
                              ></video>
                            </div>
                          </div>
                          <div className="previewtxt">
                            {/* <Box
                            component="p"
                            sx={{
                              fontWeight: "800",
                              color: "crimson !important",
                            }}
                          >
                            CryptoCanvas
                          </Box> */}
                            <span>
                              1 of 10 {projectBioStory}
                              <svg
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.75952 2.46557C9.32777 2.09549 9.1119 1.91046 8.88749 1.7994C8.32846 1.52276 7.67238 1.52276 7.11336 1.7994C6.88895 1.91046 6.67307 2.09549 6.24132 2.46557L6.16646 2.52973C6.04556 2.63335 5.98512 2.68517 5.92266 2.73083C5.62261 2.9502 5.26736 3.08161 4.89679 3.11033C4.81965 3.1163 4.73915 3.1163 4.57815 3.1163C4.17692 3.1163 3.9763 3.1163 3.81068 3.14432C2.9716 3.28626 2.31424 3.94363 2.17229 4.78271C2.14428 4.94833 2.14428 5.14657 2.14428 5.54304C2.14428 5.69739 2.14428 5.77456 2.13865 5.84938C2.11086 6.21935 1.98069 6.5743 1.76272 6.87453C1.71864 6.93525 1.66875 6.99413 1.56897 7.11188L1.50014 7.19311C1.12907 7.63102 0.94353 7.84998 0.833108 8.07803C0.566553 8.62853 0.566553 9.27074 0.833108 9.82124C0.94353 10.0493 1.12907 10.2682 1.50014 10.7062L1.56897 10.7874C1.66875 10.9051 1.71864 10.964 1.76272 11.0247C1.98069 11.325 2.11086 11.6799 2.13865 12.0499C2.14428 12.1247 2.14428 12.2019 2.14428 12.3562C2.14428 12.7527 2.14428 12.9509 2.17229 13.1166C2.31424 13.9556 2.9716 14.613 3.81068 14.755C3.9763 14.783 4.17692 14.783 4.57815 14.783C4.73915 14.783 4.81965 14.783 4.89679 14.7889C5.26736 14.8177 5.62261 14.9491 5.92266 15.1684C5.98512 15.2141 6.04557 15.2659 6.16646 15.3695L6.24132 15.4337C6.67307 15.8038 6.88895 15.9888 7.11336 16.0999C7.67238 16.3765 8.32846 16.3765 8.88748 16.0999C9.1119 15.9888 9.32777 15.8038 9.75953 15.4337L9.83905 15.3655C9.95534 15.2659 10.0135 15.216 10.0734 15.1719C10.3761 14.9493 10.7353 14.8164 11.1099 14.7885C11.1841 14.783 11.2607 14.783 11.4139 14.783C11.804 14.783 11.999 14.783 12.162 14.7558C13.0054 14.6155 13.6663 13.9546 13.8066 13.1112C13.8338 12.9482 13.8338 12.7532 13.8338 12.3631C13.8338 12.2099 13.8338 12.1334 13.8393 12.0592C13.8672 11.6845 14.0001 11.3253 14.2227 11.0226C14.2668 10.9627 14.3166 10.9046 14.4163 10.7883L14.4845 10.7087C14.8546 10.277 15.0396 10.0611 15.1507 9.8367C15.4273 9.27768 15.4273 8.62159 15.1507 8.06257C15.0396 7.83816 14.8546 7.62228 14.4845 7.19053L14.4163 7.111C14.3166 6.99472 14.2668 6.93657 14.2227 6.87663C14.0001 6.574 13.8672 6.21478 13.8393 5.84012C13.8338 5.76591 13.8338 5.68933 13.8338 5.53617C13.8338 5.14609 13.8338 4.95104 13.8066 4.78803C13.6663 3.94466 13.0054 3.28376 12.162 3.14343C11.999 3.1163 11.804 3.1163 11.4139 3.1163C11.2607 3.1163 11.1841 3.1163 11.1099 3.11077C10.7353 3.08285 10.3761 2.94997 10.0734 2.72734C10.0135 2.68325 9.95534 2.63341 9.83905 2.53373L9.75952 2.46557Z"
                                  fill="#1883E6"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M11.197 6.41889C11.4899 6.71178 11.4899 7.18666 11.197 7.47955L7.86366 10.8129C7.72301 10.9535 7.53225 11.0326 7.33333 11.0326C7.13442 11.0326 6.94366 10.9535 6.803 10.8129L5.46967 9.47955C5.17678 9.18666 5.17678 8.71178 5.46967 8.41889C5.76256 8.126 6.23744 8.126 6.53033 8.41889L7.33333 9.22189L10.1363 6.41889C10.4292 6.126 10.9041 6.126 11.197 6.41889Z"
                                  fill="white"
                                />
                              </svg>
                            </span>
                            <h1>{prjctBioCollection}</h1>

                            <p>{projectBio}</p>
                            <Box>
                              <Link href={projectBtn.link}>
                                <Button
                                  sx={{
                                    background:
                                      "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
                                    borderRadius: "8px",
                                    color: "#000",
                                    fontSize: ".9em",
                                    textTransform: "capitalize",
                                    padding: "8px 25px",
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
                                  {projectBtn.button}
                                </Button>
                              </Link>
                            </Box>
                          </div>
                        </div>
                      </PreviewBox>
                      <PreviewBox>
                        <div className="videowrap">
                          <h2>{closingTopTxt}</h2>
                          <h1>{closingHeader}</h1>
                          <p>{closingSubtexxt}</p>
                          <div className="videoBox">
                            <video
                              src={closingSelectedVideo}
                              muted
                              autoPlay
                            ></video>
                          </div>
                          <Link href={closingBtn.link}>
                            <Button
                              type="submit"
                              sx={{
                                background:
                                  "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
                                borderRadius: "8px",
                                color: "#000",
                                fontSize: ".9em",
                                textTransform: "capitalize",
                                padding: "8px 25px",
                                transition: "0.3s",
                                fontWeight: "500",
                                margin: "10px 0px",
                                display: "inline-flex",

                                "&:hover ": {
                                  background:
                                    "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                                  cursor: "pointer",
                                },
                              }}
                            >
                              {closingBtn.button}
                            </Button>
                          </Link>
                        </div>
                      </PreviewBox>
                    </MarketPlaceDataPreview>
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
