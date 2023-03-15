import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import shadow from "../../components/images/shadow.svg";
import { db } from "../../configfile/firebaseConfig";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { Button } from "@mui/material";
import firstimg from "../../components/images/project1.png";
import Link from "next/link";
import TemplateHeader from "../../components/template/TemplateHeader";
import { Box } from "@mui/system";
import { async } from "@firebase/util";
import { useUserAuth } from "../../configfile/UserAuthContext";
import CryptoCanvas from "../../theme/CryptoCanvas";
import EtherEasel from "../../theme/EtherEasel";
import PixelVault from "../../theme/PixelVault";
import CryptoCanvasEditHome from "../../theme/CryptoCanvas/EditHomePage";
import { HomepagePreview } from "../../components/styles/homepage.styled";
import { H1 } from "../../components/dashboard/dashboard.styled";
import { Grid } from "@mui/joy";
import { XtraverseContainer } from "../../pages/index";
import logos from "../../components/images/blacklogo.svg";
import heroimg from "../../components/images/editwebsite/heroimg.png";
import features from "../../components/images/editwebsite/features.svg";
const Main = styled.div`
  background: #252525;
  height: 100%;
`;
const Templatepage = styled.div`
  background: #fff;
  padding: 0px;
  position: relative;
`;
function TemplateIndex() {
  const { user, logOut } = useUserAuth();
  // console.log(user.email);
  const [tempalteId, setTempalteId] = useState();
  const queryUser = collection(db, "Users");
  // console.log(users);
  const emailData = user.email;
  console.log(emailData);
  async function handleGetData() {
    if (!emailData) return;

    const q = query(queryUser, where("Email", "==", emailData));
    const querySnapshot1 = await getDocs(q);

    if (!querySnapshot1.empty) {
      const autoId = querySnapshot1.docs[0].id;
      const subcollectionRef = collection(db, "Users", autoId, "editWebsite");
      const querySnapshot2 = await getDocs(subcollectionRef);
      const docs = querySnapshot2.docs.map((doc) => doc.data());
      docs.map((data) => {
        setTempalteId(data);
      });
    }
  }
  // console.log(tempalteId);
  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailData]);

  // let selectedTemplate;
  // if (tempalteId === "CryptoCanvas") {
  //   selectedTemplate = <CryptoCanvas />;
  // } else if (tempalteId === "EtherEasel") {
  //   selectedTemplate = <EtherEasel />;
  // } else if (tempalteId === "PixelVault") {
  //   selectedTemplate = <PixelVault />;
  // }
  // console.log(tempalteId.header);
  return (
    <>
      <Main>
        <Templatepage>
          {tempalteId &&
            (console.log(tempalteId),
            (
              // {tempalteId.header.navbarType},
              // {tempalteId.themeSetting.websiteBgColor},

              <HomepagePreview className="templatePreview">
                <Box
                  sx={{
                    background: tempalteId.themeSetting.websiteBgColor,
                  }}
                >
                  <div className="homesec">
                    {/* header */}
                    <div className="headersc">
                      <div className="logo">
                        <Image
                          src={logos}
                          alt="logo"
                          width={100}
                          height={100}
                          style={{
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="headerbtn">
                        <ul>
                          <li>
                            <a href="#">Home</a>
                          </li>
                          <li>
                            <a href="#">About </a>
                          </li>
                          <li>
                            <a href="#">Blog</a>
                          </li>
                          <li>
                            <a href="#">Collection</a>
                          </li>
                          <li>
                            <a href="#">Roadmap</a>
                          </li>
                          <li>
                            <a href="#">How it works</a>
                          </li>
                        </ul>
                        <a target="_blank">
                          <Button
                            className="waitLstBtn"
                            sx={{
                              background: tempalteId.themeSetting.btnBgColor,
                            }}
                          >
                            {tempalteId.header.waitlistBtn.button}
                          </Button>
                        </a>
                      </div>
                    </div>
                    {/* herosection */}
                    <div className="herosec hero3">
                      <div className="herotxt">
                        <h1>{tempalteId.hero.heroHeading}</h1>
                        <p>{tempalteId.hero.heroSubtext}</p>
                        <Box
                          sx={{
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          <Button
                            sx={{
                              width: "fit-content",
                              background: tempalteId.themeSetting.btnBgColor,
                            }}
                          >
                            {tempalteId.hero.heroButton}
                          </Button>
                        </Box>
                      </div>
                    </div>

                    <div className="bgimage">
                      <Image src={heroimg} alt="home background image" />
                    </div>

                    <Box
                      component="div"
                      className="overlaybg"
                      sx={{
                        background: "rgba(32, 19, 45, 1)",
                        opacity: 0.8,
                      }}
                    ></Box>
                  </div>
                  {/* description section */}
                  <div className="homesec descriptionsc">
                    {tempalteId.descriptionBlock.DesBlockType === "destype3" ? (
                      <div className="herosec destype3">
                        <div className="herotxt">
                          <span>{tempalteId.descriptionBlock.desSubtitle}</span>
                          <h1>
                            {tempalteId.descriptionBlock.desscriptHeading}
                          </h1>
                          <p>
                            {tempalteId.descriptionBlock.descriptionSubtext}
                          </p>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div className="grdntsc">
                              <div className="GrdntBox"></div>
                              <h5>
                                Collections Indexed <br /> every 5mins
                              </h5>
                            </div>

                            <div className="grdntsc">
                              <div className="GrdntBox"></div>
                              <h5>
                                Difference in Floor <br /> & Estimated Value
                              </h5>
                            </div>
                          </Box>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={
                          tempalteId.descriptionBlock.DesBlockType ===
                          "destype2"
                            ? "herosec destype2"
                            : "herosec destype1"
                        }
                      >
                        <div className="herotxt">
                          <span>{tempalteId.descriptionBlock.desSubtitle}</span>
                          <h1>
                            {tempalteId.descriptionBlock.desscriptHeading}
                          </h1>
                          <p>
                            {tempalteId.descriptionBlock.descriptionSubtext}
                          </p>

                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <div className="grdntsc">
                                <div className="GrdntBox"></div>
                                <h5>
                                  Collections Indexed <br /> every 5mins
                                </h5>
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <div className="grdntsc">
                                <div className="GrdntBox"></div>
                                <h5>
                                  Difference in Floor <br /> & Estimated Value
                                </h5>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                        <div className="heroImg">
                          <Image src={features} alt="home background image" />
                        </div>
                      </div>
                    )}
                    {tempalteId.descriptionBlock.DesBlockType === "destype3" ? (
                      <div className="bgimage">
                        {tempalteId.descriptionBlock.DesBlockType ? (
                          // <Image
                          //   src={desBg}
                          //   alt="home background image"
                          //   width={100}
                          //   height={100}
                          // />
                          ""
                        ) : (
                          <Image src={features} alt="home background image" />
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    <Box
                      component="div"
                      className="overlaybg"
                      sx={{
                        background: tempalteId.descriptionBlock.desOverlay,
                      }}
                    ></Box>
                  </div>
                </Box>
              </HomepagePreview>
            ))}
        </Templatepage>
      </Main>
    </>
  );
}

export default TemplateIndex;
