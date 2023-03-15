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
import MarketPlaceGeneral from "../../../../components/project/EditMarketplace/General";
import MarketPlaceFeatures from "../../../../components/project/EditMarketplace/Features";
import {
  PreviewBox,
  MarketPlaceDataPreview,
  BtnContainer,
} from "../../../../components/styles/uploadnft.style";

import MarketPlaceProjectBio from "../../../../components/project/EditMarketplace/ProjectBio";
import Link from "next/link";
import MarketPlaceClosing from "../../../../components/project/EditMarketplace/Closing";
import CryptoCanvasEditMarketPlace from "../../../../theme/CryptoCanvas/editMarketplace";
import CryptoCanvasEditMarketPlaceSalespage from "../../../../theme/CryptoCanvas/editMarketplace/marketplacesales";
import { useRouter } from "next/router";
function EditMarketPlaceSalesindex() {
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

  //! for Closing layout
  //   const [closingTopTxt, setClosingTopTxt] = useState(
  //     "Welcome to Robo Gremlins"
  //   );
  //   const [closingHeader, setClosingHeader] = useState("Congratulations");
  //   const [closingSubtexxt, setClosingSubtexxt] = useState(
  //     " Book a call with an onboarding manager to unlock full benefits. "
  //   );
  //   const [closingBtn, setClosingBtn] = useState({
  //     button: "Book a Call",
  //     link: "",
  //   });
  //   const handleClosingBtnChange = (e) => {
  //     setClosingBtn({ ...closingBtn, [e.target.name]: e.target.value });
  //   };

  //   const [closingUploadVideoUrl, setClosingUploadVideoUrl] = useState(null);
  //   const [closingSelectedVideo, setClosingSelectedVideo] = useState(Predviewimg);

  //   const handleClosingBioVideoChange = (event) => {
  //     const videoFile = event.target.files[0];
  //     setClosingSelectedVideo(URL.createObjectURL(videoFile));
  //     setClosingUploadVideoUrl(videoFile);
  //   };

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
      closingVideoSnapshot,
    ] = await Promise.all([
      uploadBytesResumable(generealimageRef, imageupload),
      uploadBytesResumable(featurefilesRef, uploadVideoUrl),
      uploadBytesResumable(projectBioVideoRef, prjctUploadVideoUrl),
      //   uploadBytesResumable(closingVideoRef, closingUploadVideoUrl),
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
      //   closingUploadTask,
      // desimageUploadTask,
    ]);
    // Get the download URLs for the files
    // const [logoimageUrl, herobgimageUrl, desibgimageUrl] = await Promise.all([
    const [
      generalimageUrl,
      featuresimageUrl,
      projectBioVideoUrl,
      //   closingVideoUrl,
    ] = await Promise.all([
      getDownloadURL(generalimageSnapshot.ref),
      getDownloadURL(featuresimageSnapshot.ref),
      getDownloadURL(projectsVideoSnapshot.ref),
      //   getDownloadURL(closingVideoSnapshot.ref),
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
              NftGeneralData: {
                nftImg: generalimageUrl,
                nftName: nftName,
                collectionName: nftCollectionName,
                nftDescription: addNftDescript,
                utility: utility,
                nftPrice: nftPrice,
                nftMintBtn: nftMindBtn,
              },
              NftFeaturesData: {
                featuresImg: featuresimageUrl,
                TokenType: tokenType,
                minType: mintType,
                royaltiesList: royaltiesList,
                featureBtn: featureBtn,
                videoTitle: videoTitle,
                addStory: addStory,
              },
              NftProjecBio: {
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
              nftImg: generalimageUrl,
              featuresImg: featuresimageUrl,

              collectionName: nftCollectionName,
              nftName: nftName,
              nftDescription: addNftDescript,
              nftPrice: nftPrice,
              nftMintBtn: nftMindBtn,
              utility: utility,
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

      router.push("/project/editMarketplace/thankyouPage");
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
                <Grid item lg={3} xl={4}>
                  <EditorInputSec>
                    <PageEditorFrom>
                      <div className="editorform">
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
                              <span>Offer General</span>
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
                              <span>Offer Features</span>
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
                              <span>NFt Project Bio</span>
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
                <Grid item lg={9} xl={8}>
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
                      <CryptoCanvasEditMarketPlaceSalespage
                        nftCollectionName={nftCollectionName}
                        nftName={nftName}
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
                        // closingTopTxt={closingTopTxt}
                        // closingHeader={closingHeader}
                        // closingSubtexxt={closingSubtexxt}
                        // closingSelectedVideo={closingSelectedVideo}
                        // closingBtn={closingBtn}
                        projectBtn={projectBtn}
                      />
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

export default EditMarketPlaceSalesindex;
