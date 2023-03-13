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
  EditorInputSec,
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
  // for upload logo
  const [homeLogo, setHomeLogo] = useState(demoimg);
  const [uploadLogo, setUploadLogo] = useState(demoimg);
  const handleLogoChange = (event) => {
    const imageFile = event.target.files[0];
    setHomeLogo(URL.createObjectURL(imageFile));
    setUploadLogo(imageFile);
  };
  // waitlist button
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
            <div className="dltBtn" onClick={() => handleDeleteInput(i)}>
              <RiDeleteBinLine />
            </div>
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

  //! Edit hero
  const [heroType, setHeroType] = useState();
  const [homeBg, setHomeBg] = useState(
    "/images/templatePage/homeimgpreview.png"
  );
  const [uploadHomeBg, setUploadHomeBg] = useState(
    "/images/templatePage/homeimgpreview.png"
  );
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
  // const [gradientInput, setGradientInput] = useState({ input1: "#fff" });

  //   const handleGradientInput = (event) => {
  //     const { name, value } = event.target;
  //     setGradientInput({ ...gradientInput, [name]: value });
  //   };

  //   const handleGradient = () => {
  //     setNumGradientInputs((prevNumGradientInputs) => prevNumGradientInputs + 1);
  //     setGradientInput({
  //       ...gradientInput,
  //       [`input${numGradientInputs + 1}`]: "",
  //     });
  //   };
  //   const handlePasteColor = (event, index) => {
  //     const pastedColor = event.target.value;
  //     setGradientInput((prevGradientInput) => ({
  //       ...prevGradientInput,
  //       [`input${index}`]: pastedColor,
  //     }));
  //   };
  //   const handleGradientDelete = (index) => {
  //     setGradientInput((prevGradientInput) => {
  //       const updatedGradientInput = { ...prevGradientInput };
  //       delete updatedGradientInput[`input${index}`];
  //       return updatedGradientInput;
  //     });
  //     setNumGradientInputs((prevNumGradientInputs) => prevNumGradientInputs - 1);
  //   };

  //   const renderGradientInput = () => {
  //     const inputs = [];
  //     for (let i = 1; i <= numGradientInputs; i++) {
  //       inputs.push(
  //         <Box sx={{}}>
  //           <div className="colorPallete">
  //             <div className="dflex">
  //               <div className="selectColor">
  //                 <Box
  //                   sx={{
  //                     width: "20px",
  //                     height: "20px",
  //                     background: gradientInput[`input${i}`] || "#FFFFFF",
  //                   }}
  //                 ></Box>
  //                 <input
  //                   key={i}
  //                   type="color"
  //                   name={`input${i}`}
  //                   value={gradientInput[`input${i}`]}
  //                   onChange={handleGradientInput}
  //                   className="selectColor"
  //                 />
  //               </div>
  //               <input
  //                 type="text"
  //                 value={gradientInput[`input${i}`]}
  //                 placeholder="#FFFFFF"
  //                 className="pastecolor"
  //                 onChange={(event) => handlePasteColor(event, i)}
  //               />
  //             </div>

  //             <Box>
  //               <div className="dltBtn" onClick={() => handleGradientDelete(i)}>
  //                 <RiDeleteBinLine />
  //               </div>
  //             </Box>
  //           </div>
  //         </Box>
  //       );
  //     }
  //     return inputs;
  //   };
  //   const gradientClass = `
  //   linear-gradient(to left, ${Object.values(gradientInput).join(",")});
  // `;
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
        <Box sx={{ width: `${drawerWidth}px`, background: "#303030" }}></Box>
        <Box sx={{ width: "100%" }}>
          <Sidebar activeBtn={1} />
          <Box
            sx={{
              marginLeft: "auto",
              background: "#303030",
              height: "100%",
              display: "grid",
              gridTemplateColumns: "100%",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <EditorInputSec>
                  <PageEditorFrom onClick={() => setShowColorPopup(false)}>
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
                          waitlistInput={waitlistInput}
                          setWaitlistInput={setWaitlistInput}
                          menuInput={menuInput}
                          handleInputChange={handleInputChange}
                          renderNewBtn={renderInputs()}
                          handleAddInput={handleAddInput}
                          headerType={headerType}
                          setHeaderType={setHeaderType}
                          uploadLogo={uploadLogo}
                          handleImageChange={handleLogoChange}
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
                          heroType={heroType}
                          setHeroType={setHeroType}
                          setHomeLogo={setHomeLogo}
                          homeLogo={homeLogo}
                          uploadLogo={uploadLogo}
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
                  </PageEditorFrom>
                </EditorInputSec>
              </Grid>
              <Grid item xs={8}>
                <Box
                  sx={{
                    border: "2px solid #BEBEBE",
                    background: "#fff",
                    padding: "3px",
                    borderRadius: "10px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Button>send it</Button>
                  <HomepagePreview>
                    <div className="homesec">
                      {headerType != "header2" ? (
                        <Box
                          sx={{
                            position: "relative",
                            zIndex: "4",
                            padding: "15px",
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={2.5}>
                              <div className="logo">
                                <Image
                                  src={homeLogo}
                                  alt="logo"
                                  width={100}
                                  height={100}
                                  style={{ width: "100%", objectFit: "cover" }}
                                />
                              </div>
                            </Grid>
                            <Grid item xs={7}>
                              <div className="headerbtn">
                                {Object.keys(menuInput).map((key) => (
                                  <button key={key}>{menuInput[key]}</button>
                                ))}
                              </div>
                            </Grid>
                            <Grid item xs={2.5}>
                              <Button className="waitLstBtn">
                                {waitlistInput}
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      ) : (
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
                            <Button className="waitLstBtn">
                              {waitlistInput}
                            </Button>
                          </div>
                        </div>
                      )}

                      {heroType === "hero1" ? (
                        <div className="herosec hero1">
                          <Grid container spacing={2}>
                            <Grid xs={6}>
                              <div className="heroImg">
                                {homeBg ? (
                                  <Image
                                    src={homeBg}
                                    alt="home background image"
                                    width={100}
                                    height={100}
                                  />
                                ) : (
                                  <Image
                                    src="/images/templatePage/homeimgpreview.png"
                                    alt="home background image"
                                    width={100}
                                    height={100}
                                  />
                                )}
                              </div>
                            </Grid>
                            <Grid xs={6}>
                              <div className="herotxt">
                                <h1>{editHeroHeading}</h1>
                                <p>{editHeroSubtext}</p>

                                <Box
                                  sx={{
                                    width: "100%",
                                    textAlign: "end",
                                  }}
                                >
                                  <Button
                                    sx={{
                                      width: "fit-content",
                                    }}
                                  >
                                    {heroButton}
                                  </Button>
                                </Box>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      ) : heroType === "hero2" ? (
                        <div className="herosec hero2">
                          <Grid container spacing={2}>
                            <Grid xs={6}>
                              <div className="herotxt">
                                <h1>{editHeroHeading}</h1>
                                <p>{editHeroSubtext}</p>
                                <Box
                                  sx={{
                                    width: "100%",
                                    textAlign: "start",
                                  }}
                                >
                                  <Button
                                    sx={{
                                      width: "fit-content",
                                    }}
                                  >
                                    {heroButton}
                                  </Button>
                                </Box>
                              </div>
                            </Grid>
                            <Grid xs={6}>
                              <div className="heroImg">
                                {homeBg ? (
                                  <Image
                                    src={homeBg}
                                    alt="home background image"
                                    width={100}
                                    height={100}
                                  />
                                ) : (
                                  <Image
                                    src="/images/templatePage/homeimgpreview.png"
                                    alt="home background image"
                                    width={100}
                                    height={100}
                                  />
                                )}
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      ) : (
                        <>
                          <div className="herosec hero3">
                            <div className="herotxt">
                              <h1>{editHeroHeading}</h1>
                              <p>{editHeroSubtext}</p>
                              <Box
                                sx={{
                                  width: "100%",
                                  textAlign: "center",
                                }}
                              >
                                <Button
                                  sx={{
                                    width: "fit-content",
                                  }}
                                >
                                  {heroButton}
                                </Button>
                              </Box>
                            </div>
                          </div>
                        </>
                      )}
                      {heroType ? (
                        heroType === "hero3" ? (
                          <div className="bgimage">
                            {homeBg ? (
                              <Image
                                src={homeBg}
                                alt="home background image"
                                width={100}
                                height={100}
                              />
                            ) : (
                              <Image
                                src="/images/templatePage/homeimgpreview.png"
                                alt="home background image"
                                width={100}
                                height={100}
                              />
                            )}
                          </div>
                        ) : (
                          ""
                        )
                      ) : (
                        <div className="bgimage">
                          {homeBg ? (
                            <Image
                              src={homeBg}
                              alt="home background image"
                              width={100}
                              height={100}
                            />
                          ) : (
                            <Image
                              src="/images/templatePage/homeimgpreview.png"
                              alt="home background image"
                              width={100}
                              height={100}
                            />
                          )}
                        </div>
                      )}
                    </div>

                    <Box
                      component="div"
                      className="overlaybg"
                      sx={{ background: `${heroOverlayColor}` }}
                    ></Box>
                  </HomepagePreview>
                </Box>
              </Grid>
            </Grid>
            {/* <Stepnav /> */}

            {/* {selectedTemplate} */}
          </Box>
        </Box>
      </Main>
    </>
  );
}

export default EditHomePageindex;
