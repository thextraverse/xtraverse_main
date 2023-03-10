import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Sidebar, {
  drawerWidth,
} from "../../../../components/dashboard/sidebar/Navbar";
import Stepnav from "../../../../components/dashboard/step-nav";
import { db } from "../../../../configfile/firebaseConfig";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { useUserAuth } from "../../../../configfile/UserAuthContext";
import { Button, Grid } from "@mui/material";
import { RiDeleteBinLine } from "react-icons/ri";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Edithero from "../../../../components/dashboard/edithome/EditHero";
import EditHeader from "../../../../components/dashboard/edithome/header/EditHeader";
import demoimg from "../../../../components/images/blacklogo.svg";
import firstimg from "../../../../components/images/project1.png";
import Image from "next/image";
import {
  HomepagePreview,
  Main,
  PageEditorFrom,
} from "../../../../components/dashboard/edithome/homepage.styled";
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
  const [formId, setFormId] = useState(null);
  //! Edit header
  const [headerType, setHeaderType] = useState();
  const [uploadLogo, setUploadLogo] = useState(demoimg);
  const [waitlistInput, setWaitlistInput] = useState("Waitlist");
  const [numInputs, setNumInputs] = useState(3);
  const [menuInput, setMenuInput] = useState({
    input1: "Home",
    input2: "About",
    input3: "Collection",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMenuInput({ ...menuInput, [name]: value });
  };
  const handleAddInput = () => {
    setNumInputs(numInputs + 1);
    setMenuInput({ ...menuInput, [`input${numInputs + 1}`]: "" });
  };
  const handleDeleteInput = (index) => {
    setMenuInput((prevMenuInput) => {
      const updatedMenuInput = { ...prevMenuInput };
      delete updatedMenuInput[`input${index}`];
      return updatedMenuInput;
    });
    setNumInputs(numInputs - 1);
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 1; i <= numInputs; i++) {
      inputs.push(
        <Box sx={{}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <span>Menu {i}</span>
            <button className="dltBtn" onClick={() => handleDeleteInput(i)}>
              <RiDeleteBinLine />
            </button>
          </Box>
          <input
            key={i}
            type="text"
            name={`input${i}`}
            value={menuInput[`input${i}`]}
            onChange={handleInputChange}
          />
        </Box>
      );
    }
    return inputs;
  };
  console.log(renderInputs);
  //! Edit hero
  const [homeLogo, setHomeLogo] = useState(demoimg);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setHomeLogo(URL.createObjectURL(imageFile));
    setUploadLogo(imageFile);
  };
  const [editHeroName, setEditHeroName] = useState("Robo Gremlins");
  const [editHeroScript, setEditHeroScript] = useState(
    "Our Fancy Shamncy NFT Project is the king of all fancy shamncy NFT projects. And we are sworn enemies of Gary v."
  );
  const handleNext = () => {
    setIndex(index === layouts.length - 1 ? 0 : index + 1);
  };
  const handlePrev = () => {
    setIndex(index === 0 ? layouts.length - 1 : index - 1);
  };
  // const { user, logOut } = useUserAuth();
  // console.log(user.email);
  // const [tempalteId, setTempalteId] = useState();
  // const queryUser = collection(db, "Users");
  // console.log(users);
  // const emailData = user.email;
  // console.log(emailData);
  // async function handleGetData() {
  //   if (!emailData) return;

  //   const q = query(queryUser, where("Email", "==", emailData));
  //   const querySnapshot1 = await getDocs(q);

  //   if (!querySnapshot1.empty) {
  //     const autoId = querySnapshot1.docs[0].id;
  //     const subcollectionRef = collection(db, "Users", autoId, "template");
  //     const querySnapshot2 = await getDocs(subcollectionRef);
  //     const docs = querySnapshot2.docs.map((doc) => doc.data());
  //     docs.map((data) => {
  //       setTempalteId(data.id);
  //     });
  //   }
  // }

  // useEffect(() => {
  //   handleGetData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [emailData]);

  // let selectedTemplate;
  // if (tempalteId === "CryptoCanvas") {
  //   selectedTemplate = <CryptoCanvasEditHome />;
  // } else if (tempalteId === "EtherEasel") {
  //   selectedTemplate = <EtherEaselEditHome />;
  // } else if (tempalteId === "PixelVault") {
  //   selectedTemplate = <PixelVaultEditHome />;
  // }
  console.log(headerType);
  return (
    <>
      <Main>
        <Sidebar activeBtn={1} />
        <Box
          sx={{
            width: { lg: `calc(100% - ${drawerWidth}px)` },
            marginTop: "60px",
            marginLeft: "auto",
            background: "transparent",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "100%",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <PageEditorFrom>
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
                      waitlistInput={waitlistInput}
                      setWaitlistInput={setWaitlistInput}
                      menuInput={menuInput}
                      handleInputChange={handleInputChange}
                      renderNewBtn={renderInputs()}
                      handleAddInput={handleAddInput}
                      headerType={headerType}
                      setHeaderType={setHeaderType}
                      uploadLogo={uploadLogo}
                      editHeroName={editHeroName}
                      setEditHeroName={setEditHeroName}
                      editHeroScript={editHeroScript}
                      setEditHeroScript={setEditHeroScript}
                      handleImageChange={handleImageChange}
                      key="1"
                    />
                  </div>
                </div>
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
                      <span>Hero</span>
                      <KeyboardArrowDownIcon className="activesvg" />
                    </Button>
                    <div className="visibility">
                      <VisibilityOffIcon /> <VisibilityIcon />
                    </div>
                  </div>

                  <div className="page-editor-content-input">
                    <Edithero
                      handleNext={handleNext}
                      setHomeLogo={setHomeLogo}
                      homeLogo={homeLogo}
                      uploadLogo={uploadLogo}
                      editHeroName={editHeroName}
                      setEditHeroName={setEditHeroName}
                      editHeroScript={editHeroScript}
                      setEditHeroScript={setEditHeroScript}
                      handleImageChange={handleImageChange}
                      formId={formId}
                      setFormId={setFormId}
                      key="1"
                    />
                  </div>
                </div>
              </PageEditorFrom>
            </Grid>
            <Grid item xs={7}>
              <Box
                sx={{
                  border: "2px solid #BEBEBE",
                  padding: "3px",
                  borderRadius: "10px",
                  width: "100%",
                  textAlign: "center",
                  height: {
                    xl: "600px",
                    lg: "600px",
                    md: "470px",
                  },
                }}
              >
                <HomepagePreview>
                  <div className="homesec">
                    <div className="headersc">
                      <div className="logo">
                        <Image
                          src={homeLogo}
                          alt="logo"
                          width={100}
                          height={100}
                          style={{ width: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div className="headerbtn">
                        {Object.keys(menuInput).map((key) => (
                          <button key={key}>{menuInput[key]}</button>
                        ))}

                        <Button>{waitlistInput}</Button>
                      </div>
                    </div>
                    <div className="herosec">
                      <div className="herotxt">
                        <h1>{editHeroName}</h1>
                        <p>{editHeroScript}</p>
                        <Button>GO TO NFTS</Button>
                      </div>
                      <div className="heroimgs">
                        <div className="img">
                          <Image src={firstimg} alt="" />
                        </div>
                        <div className="img">
                          <Image src={firstimg} alt="" />
                        </div>
                        <div className="img">
                          <Image src={firstimg} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </HomepagePreview>
              </Box>
            </Grid>
          </Grid>
          {/* <Stepnav /> */}

          {/* {selectedTemplate} */}
        </Box>
      </Main>
    </>
  );
}

export default EditHomePageindex;
