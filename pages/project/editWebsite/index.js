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
import EditHowitWorks from "../../../components/project/editWebsite/EditHowItWork";
import EditRaodmap from "../../../components/project/editWebsite/EditRaodmap";
import EditTeam from "../../../components/project/editWebsite/EditTeam";
import { useRef } from "react";
import EditFeatures from "../../../components/project/editWebsite/EditFeatures";
import EditFrequentQuestion from "../../../components/project/editWebsite/EditFAQ";
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
    "linear-gradient(190deg, rgba(2,0,36,0.38) 0%, RGBA(32, 20, 45, 1) 100%)"
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
  const [editHeroHeading, setEditHeroHeading] = useState("Buy & Sell Robos");
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

  //! how it works
  const [howitWorksHeading, setHowitWorksHeading] = useState("How it Works");
  const [howItWorsType, setHowItWorsType] = useState("howitworks2");
  const [stepInputData, setStepInputData] = useState({});
  const [stepImageData, setStepImageData] = useState({});

  //! Roadmap
  const [roadmapHeading, setRoadmapHeading] = useState("Robo's Roadmap");

  const [cards, setCards] = useState([
    {
      id: 1,
      title: "PHASE 01",
      explain: "Planning ",
      subtext:
        "Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.",
      list: [
        "Release website and logo",
        "Grow community",
        "Launch the project",
      ],
    },
    {
      id: 2,
      title: "PHASE 02",
      explain: "Production ",
      subtext:
        "Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.",
      list: [
        "Release website and logo",
        "Grow Community",
        "Launch the project",
      ],
    },
    {
      id: 3,
      title: "PHASE 03 ",
      explain: "Launch ",
      subtext:
        "Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.",
      list: [
        "Release website and logo",
        "Grow community",
        "Launch the project",
      ],
    },
  ]);

  const [formData, setFormData] = useState({
    title: "Phase 01",
    explain: "Planning",
    subtext:
      "Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.",
    list: ["", "", ""],
  });

  const [editMode, setEditMode] = useState(false);
  const [editCardId, setEditCardId] = useState(null);

  const handleInputChange = (e, index) => {
    if (index !== undefined) {
      setFormData((prevFormData) => {
        const updatedList = [...prevFormData.list];
        updatedList[index] = e.target.value;
        return { ...prevFormData, list: updatedList };
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedCards = cards.map((card) => {
        if (card.id === editCardId) {
          return { ...card, ...formData };
        }
        return card;
      });
      setCards(updatedCards);
      setEditMode(false);
      setEditCardId(null);
    } else {
      const newCard = {
        id: Math.random(),
        ...formData,
      };
      setCards([...cards, newCard]);
    }
    setFormData({
      title: "",
      explain: "",
      subtext: "",
      list: ["", "", ""],
    });
  };

  const handleEdit = (card) => {
    setFormData(card);
    setEditMode(true);
    setEditCardId(card.id);
  };

  const handleDelete = (card) => {
    const updatedCards = cards.filter((c) => c.id !== card.id);
    setCards(updatedCards);
  };

  //! Team/Artist
  const [teamHeading, setTeamHeading] = useState("Meet The Artist");

  const [teamCards, setTeamCards] = useState([
    {
      image: "/images/editwebsite/team01.png",
      name: "Steps Jobs",
      title: "Artist",
      links: {
        Twitter: "https://twitter.com/johndoe",
        Discord: "https://discord.gg/johndoe",
        Instagram: "https://instagram.com/johndoe",
        Facebook: "https://facebook.com/johndoe",
      },
    },
    {
      image: "/images/editwebsite/team02.png",
      name: "Andry Moray",
      title: "Artist",
      links: {
        Twitter: "https://twitter.com/janedoe",
        Discord: "https://discord.gg/janedoe",
        Instagram: "https://instagram.com/janedoe",
        Facebook: "https://facebook.com/janedoe",
      },
    },
    {
      image: "/images/editwebsite/team03.png",
      name: "Zaid Ed",
      title: "Artist",
      links: {
        Twitter: "https://twitter.com/janedoe",
        Discord: "https://discord.gg/janedoe",
        Instagram: "https://instagram.com/janedoe",
        Facebook: "https://facebook.com/janedoe",
      },
    },
    {
      image: "/images/editwebsite/team04.png",
      name: "Laila Ed",
      title: "Artist",
      links: {
        Twitter: "https://twitter.com/janedoe",
        Discord: "https://discord.gg/janedoe",
        Instagram: "https://instagram.com/janedoe",
        Facebook: "https://facebook.com/janedoe",
      },
    },
    {
      image: "/images/editwebsite/team05.png",
      name: "Naymur",
      title: "Artist",
      links: {
        Twitter: "https://twitter.com/janedoe",
        Discord: "https://discord.gg/janedoe",
        Instagram: "https://instagram.com/janedoe",
        Facebook: "https://facebook.com/janedoe",
      },
    },
    // Add two more cards here
  ]);
  const [teamFormData, setTeamFormData] = useState({
    image: "",
    name: "",
    title: "",
    links: {
      Twitter: "",
      Discord: "",
      Instagram: "",
      Facebook: "",
    },
  });
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  function handleTeamFormChange(event) {
    const { name, value } = event.target;
    if (name === "name" || name === "title") {
      setTeamFormData({
        ...teamFormData,
        [name]: value,
      });
    } else {
      setTeamFormData({
        ...teamFormData,
        links: {
          ...teamFormData.links,
          [name]: value,
        },
      });
    }
  }
  function handleTeamImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setTeamFormData({ ...teamFormData, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  function handleTeamAddCard(event) {
    event.preventDefault();
    setTeamCards([...teamCards, teamFormData]);
    setTeamFormData({
      image: "",
      name: "",
      title: "",
      links: {
        Twitter: "",
        Discord: "",
        Instagram: "",
        Facebook: "",
      },
    });
  }
  function handleTeamEditCard(index) {
    setTeamFormData(teamCards[index]);
    setEditingCardIndex(index);
  }
  function handleTeamUpdateCard(event) {
    event.preventDefault();
    const updatedCards = [...teamCards];
    updatedCards[editingCardIndex] = teamFormData;
    setTeamCards(updatedCards);
    setTeamFormData({
      image: "",
      name: "",
      title: "",
      links: {
        Twitter: "",
        Discord: "",
        Instagram: "",
        Facebook: "",
      },
    });
    setEditingCardIndex(null);
  }
  function handleTeamDeleteCard(index) {
    const updatedCards = teamCards.filter((_, i) => i !== index);
    setTeamCards(updatedCards);
  }

  //! Features
  const [featuresHeading, setFeaturesHeading] = useState("Why Us");

  const [featuresType1, setFeaturesType1] = useState("upperSection1");
  const [featuresType2, setFeaturesType2] = useState("bottomSection2");

  // feature1 bg
  const [features1Bg, setfeatures1Bg] = useState(
    "/images/templatePage/descriptionblock.svg"
  );
  const [uploadFeature1Bg, setUploadFeature1Bg] = useState(
    "/images/templatePage/descriptionblock.svg"
  );

  const handleFeatures1ImageChange = (event) => {
    const imageFile = event.target.files[0];
    setfeatures1Bg(URL.createObjectURL(imageFile));
    setUploadFeature1Bg(imageFile);
  };
  // feature2 bg
  const [features2Bg, setfeatures2Bg] = useState(
    "/images/templatePage/descriptionblock.svg"
  );
  const [uploadFeature2Bg, setUploadFeature2Bg] = useState(
    "/images/templatePage/descriptionblock.svg"
  );
  const handleFeatures2ImageChange = (event) => {
    const imageFile = event.target.files[0];
    setfeatures2Bg(URL.createObjectURL(imageFile));
    setUploadFeature2Bg(imageFile);
  };
  const [feature1SubHeading, setFeature1SubHeading] =
    useState("Create and Invest");
  const [feature2SubHeading, setFeature2SubHeading] =
    useState("Sync and Track");
  const [feature1Heading, setFeature1Heading] = useState("Create your own NFT");
  const [feature2Heading, setFeature2Heading] = useState(
    "Multiple Chains, One Home"
  );

  const [feature1Subtext, setFeature1Subtext] = useState(
    "Multiple Chains, One Home. Stack up all your NFTs from across blockchains."
  );
  const [feature2Subtext, setFeature2Subtext] = useState(
    "We make it easy to Discover, Invest and manage all your NFTs at one place, looked up one of the more obscure.Find the right NFT collections to buy within the platform."
  );
  const [clcktionBtn, setClcktionBtn] = useState("4,500+");
  const [nftValueBtn, setNftValueBtn] = useState("2.5x");
  // // const [heroButton, setHeroButton] = useState("Browse collection");

  // const [showDesColorPopup, setShowDesColorPopup] = useState(false);
  const [featureOverlayColor, setFeatureOverlayColor] = useState("#321155");

  //! Roadmap
  const [faqHeading, setFaqHeading] = useState("FAQ");

  const [faqCards, setFaqCards] = useState([
    {
      id: 1,
      title: "PHASE 01",
      explain: "Planning ",
    },
    {
      id: 2,
      title: "PHASE 02",
      explain: "Production ",
    },
    {
      id: 3,
      title: "PHASE 03 ",
      explain: "Launch ",
    },
  ]);

  const [faQFormData, setFaqFormData] = useState({
    title: "Phase 01",
    explain: "Planning",
  });

  const [faqEditMode, setFaQEditMode] = useState(false);
  const [faqEditCardId, setFaqEditCardId] = useState(null);

  const handleFaqInputChange = (e, index) => {
    if (index !== undefined) {
      setFaqFormData((prevFormData) => {
        const updatedList = [...prevFormData.list];
        updatedList[index] = e.target.value;
        return { ...prevFormData, list: updatedList };
      });
    } else {
      setFaqFormData({ ...faQFormData, [e.target.name]: e.target.value });
    }
  };

  const handleFaqSubmit = (e) => {
    e.preventDefault();
    if (faqEditMode) {
      const updatedCards = faqCards.map((card) => {
        if (card.id === faqEditCardId) {
          return { ...card, ...faQFormData };
        }
        return card;
      });
      setFaqCards(updatedCards);
      setFaqFormData(false);
      setFaqEditCardId(null);
    } else {
      const newCard = {
        id: Math.random(),
        ...faQFormData,
      };
      setFaqCards([...faqCards, newCard]);
    }
    setFaqFormData({
      title: "",
      explain: "",
    });
  };

  const handleFaqEdit = (card) => {
    setFaqFormData(card);
    setFaqFormData(true);
    setFaqEditCardId(card.id);
  };

  const handleFaqDelete = (card) => {
    const updatedCards = faqCards.filter((c) => c.id !== card.id);
    setFaqCards(updatedCards);
  };

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
                  howitworks: {
                    heading: howitWorksHeading,
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
                howitworks: {
                  heading: howitWorksHeading,
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
        <Box sx={{ width: "100%", padding: " 0px 0px 0px 100px" }}>
          {/* <Sidebar activeBtn={4} heading={"Website"} /> */}

          <XtraverseContainer>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <EditorInputSec sx={{ position: "fixed" }}>
                  {/* <h1>Card List</h1>
                   */}
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
                          <span>website</span>
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
                      {/* How it works  */}
                      <div
                        className={
                          activeIndex === 5
                            ? "page-editor-form active"
                            : "page-editor-form"
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
                            <span>How it works</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <EditHowitWorks
                            setHowItWorsType={setHowItWorsType}
                            howItWorsType={howItWorsType}
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
                            setStepInputData={setStepInputData}
                            setHowitWorksHeading={setHowitWorksHeading}
                            setStepImageData={setStepImageData}
                            key="1"
                          />
                        </div>
                      </div>
                      {/* Roadmap  */}
                      <div
                        className={
                          activeIndex === 6
                            ? "page-editor-form active"
                            : "page-editor-form"
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => handleToggle(6)}
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              color: "#fff",
                              padding: "15px",
                              textTransform: "capitalize",
                            }}
                          >
                            <span>Roadmap</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <EditRaodmap
                            handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}
                            formData={formData}
                            editMode={editMode}
                            setRoadmapHeading={setRoadmapHeading}
                            key="1"
                          />
                        </div>
                      </div>
                      {/* Team/Artist  */}
                      <div
                        className={
                          activeIndex === 7
                            ? "page-editor-form active"
                            : "page-editor-form"
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => handleToggle(7)}
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              color: "#fff",
                              padding: "15px",
                              textTransform: "capitalize",
                            }}
                          >
                            <span>Team/Artist</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <EditTeam
                            setTeamHeading={setTeamHeading}
                            teamFormData={teamFormData}
                            handleTeamFormChange={handleTeamFormChange}
                            handleTeamImageChange={handleTeamImageChange}
                            handleTeamAddCard={handleTeamAddCard}
                            handleTeamEditCard={handleTeamEditCard}
                            handleTeamUpdateCard={handleTeamUpdateCard}
                            handleTeamDeleteCard={handleTeamDeleteCard}
                            editingCardIndex={editingCardIndex}
                            teamCards={teamCards}
                            key="1"
                          />
                        </div>
                      </div>
                      {/* Features Block */}
                      <div
                        className={
                          activeIndex === 8
                            ? "page-editor-form active"
                            : "page-editor-form"
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => handleToggle(8)}
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              color: "#fff",
                              padding: "15px",
                              textTransform: "capitalize",
                            }}
                          >
                            <span>Features </span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <EditFeatures
                            featuresType1={featuresType1}
                            setFeaturesType1={setFeaturesType1}
                            featuresType2={featuresType2}
                            setFeaturesType2={setFeaturesType2}
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
                            handleFeatures1ImageChange={
                              handleFeatures1ImageChange
                            }
                            handleFeatures2ImageChange={
                              handleFeatures2ImageChange
                            }
                            setFeature1SubHeading={setFeature1SubHeading}
                            setFeature2SubHeading={setFeature2SubHeading}
                            setFeature1Heading={setFeature1Heading}
                            setFeature2Heading={setFeature2Heading}
                            setFeature2Subtext={setFeature2Subtext}
                            setFeature1Subtext={setFeature1Subtext}
                            setClcktionBtn={setClcktionBtn}
                            setNftValueBtn={setNftValueBtn}
                            setFeatureOverlayColor={setFeatureOverlayColor}
                            featureOverlayColor={featureOverlayColor}
                            setFeaturesHeading={setFeaturesHeading}
                            key="1"
                          />
                        </div>
                      </div>
                      {/* FAQ  */}
                      <div
                        className={
                          activeIndex === 9
                            ? "page-editor-form active"
                            : "page-editor-form"
                        }
                      >
                        <div className="btn-flex">
                          <Button
                            className="page-editor-form-btn"
                            onClick={() => handleToggle(9)}
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              color: "#fff",
                              padding: "15px",
                              textTransform: "capitalize",
                            }}
                          >
                            <span>FAQ</span>
                            <KeyboardArrowDownIcon className="activesvg" />
                          </Button>
                          <div className="visibility">
                            <VisibilityOffIcon /> <VisibilityIcon />
                          </div>
                        </div>

                        <div className="page-editor-content-input">
                          <EditFrequentQuestion
                            handleFaqSubmit={handleFaqSubmit}
                            handleFaqInputChange={handleFaqInputChange}
                            faQFormData={faQFormData}
                            faqEditMode={faqEditMode}
                            setRoadmapHeading={setRoadmapHeading}
                            setFaqHeading={setFaqHeading}
                            key="1"
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
                    activeIndex={activeIndex}
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
                    howItWorsType={howItWorsType}
                    stepInputData={stepInputData}
                    howitWorksHeading={howitWorksHeading}
                    stepImageData={stepImageData}
                    cards={cards}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    roadmapHeading={roadmapHeading}
                    handleTeamEditCard={handleTeamEditCard}
                    handleTeamDeleteCard={handleTeamDeleteCard}
                    teamHeading={teamHeading}
                    teamCards={teamCards}
                    featuresType1={featuresType1}
                    featuresType2={featuresType2}
                    features1Bg={features1Bg}
                    features2Bg={features2Bg}
                    feature1SubHeading={feature1SubHeading}
                    feature2SubHeading={feature2SubHeading}
                    feature1Heading={feature1Heading}
                    feature2Heading={feature2Heading}
                    feature1Subtext={feature1Subtext}
                    feature2Subtext={feature2Subtext}
                    clcktionBtn={clcktionBtn}
                    nftValueBtn={nftValueBtn}
                    featureOverlayColor={featureOverlayColor}
                    faqCards={faqCards}
                    handleFaqEdit={handleFaqEdit}
                    handleFaqDelete={handleFaqDelete}
                    faqHeading={faqHeading}
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
