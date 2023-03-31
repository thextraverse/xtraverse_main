import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { IoIosAddCircle, IoIosArrowDropright } from "react-icons/io";
import { useRouter } from "next/router";
import { BsDiscord, BsInstagram, BsPlusLg, BsTwitter } from "react-icons/bs";
import Image from "next/image";
import { Avatar, Button, Icon, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import demoimg from "../../../components/images/blacklogo.svg";
import {
  HomepagePreview,
  RoadmapCard,
  XtraverseCard,
  Faq,
} from "../../../components/styles/homepage.styled";
import { Grid } from "@mui/joy";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// Import Swiper styles
import "swiper/css";
import { useUserAuth } from "../../../configfile/UserAuthContext";
import logo1 from "../../../components/images/editwebsite/partners/client1.svg";
import logo2 from "../../../components/images/editwebsite/partners/client2.svg";
import logo3 from "../../../components/images/editwebsite/partners/client3.svg";
import logo4 from "../../../components/images/editwebsite/partners/client4.svg";
import logo5 from "../../../components/images/editwebsite/partners/client5.svg";
import logo6 from "../../../components/images/editwebsite/partners/client6.svg";
import himg1 from "../../../components/images/editwebsite/mint-01.svg";
import himg2 from "../../../components/images/editwebsite/mint-02.svg";
import himg3 from "../../../components/images/editwebsite/mint-03.svg";
import himg4 from "../../../components/images/editwebsite/mint-04.svg";
import { Card } from "../../../components/project/editWebsite/EditRaodmap";
import { FiEdit, FiInstagram, FiTwitter } from "react-icons/fi";

import {
  RiDeleteBin6Fill,
  RiDiscordFill,
  RiFacebookBoxFill,
  RiYoutubeFill,
  RiSendPlaneFill,
} from "react-icons/ri";
import { TeamCard } from "../../../components/project/editWebsite/EditTeam";
import { Edit } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse } from "antd";
function CryptoCanvasEditHome({
  activeIndex,
  menuNav,
  homeBg,
  desBg,
  heroType,
  desType,
  editHeroHeading,
  heroOverlayColor,
  editHeroSubtext,
  desOverlayColor,
  desSubHeading,
  desHeading,
  desSubtext,
  websiteBgColor,
  btnBgColor,
  browseClctionBtn,
  parternsHeading,
  parterns,
  howItWorsType,
  stepInputData,
  howitWorksHeading,
  stepImageData,
  cards,
  handleEdit,
  handleDelete,
  roadmapHeading,
  teamCards,
  handleTeamEditCard,
  handleTeamDeleteCard,
  teamHeading,
  featuresType1,
  featuresType2,
  features1Bg,
  features2Bg,
  feature1SubHeading,
  feature2SubHeading,
  feature2Heading,
  feature1Heading,
  feature1Subtext,
  feature2Subtext,
  clcktionBtn,
  nftValueBtn,
  featureOverlayColor,
  handleFaqEdit,
  handleFaqDelete,
  faqCards,
  faqHeading,
  footerBg,
  footerDescription,
  footerCopyright,
  footerTwiiter,
  footerDiscord,
  footerInstagram,
  footerEmail,
  footerYoutube,
  footerHeading,
  footerButton,
}) {
  const { user, headerMenuData, headerLogo, headermenu, navbarType } =
    useUserAuth();
  const { Panel } = Collapse;
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    const selectedSection = document.getElementsByClassName("editable")[0];
    selectedSection?.classList?.remove("editable");
    if (activeIndex) {
      const section = document.getElementById(`section${activeIndex}`);
      section?.classList?.add("editable");
      section?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });

  return (
    <>
      <HomepagePreview>
        <Box sx={{ background: websiteBgColor }}>
          {/* CryptoCanvas */}
          <div className="homesec">
            {/* header */}
            {navbarType != "header2" ? (
              <Box
                sx={{
                  position: "relative",
                  zIndex: "4",
                  padding: "15px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <div className="logo">
                      <Image
                        src={headerLogo}
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
                        {headerMenuData
                          ? headerMenuData.map((item, index) => (
                              <li key={index}>{item.button}</li>
                            ))
                          : ""}
                      </ul>
                    </div>
                  </Box>

                  <Button
                    className="waitLstBtn"
                    sx={{ background: btnBgColor }}
                  >
                    {headermenu && headermenu.button}
                  </Button>
                </Box>
              </Box>
            ) : (
              <div className="headersc">
                <div className="logo">
                  <Image
                    src={headerLogo}
                    alt="logo"
                    width={100}
                    height={100}
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="headerbtn">
                  <ul>
                    {headerMenuData
                      ? headerMenuData.map((item, index) => (
                          <li key={index}>{item.button}</li>
                        ))
                      : ""}
                  </ul>

                  <Button
                    className="waitLstBtn"
                    sx={{ background: btnBgColor }}
                  >
                    {headermenu.button}
                  </Button>
                </div>
              </div>
            )}

            {/* herosection */}
            {heroType === "hero3" ? (
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
                        background: btnBgColor,
                      }}
                    >
                      {browseClctionBtn.button}
                    </Button>
                  </Box>
                </div>
              </div>
            ) : (
              <div
                className={
                  heroType === "hero2" ? "herosec hero2" : "herosec hero1"
                }
              >
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
                        background: btnBgColor,
                      }}
                    >
                      {browseClctionBtn.button}
                    </Button>
                  </Box>
                </div>
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
              </div>
            )}
            {heroType === "hero3" ? (
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
                    src="/images/templatePage/homeimgpreview.svg"
                    alt="home background image"
                    width={100}
                    height={100}
                  />
                )}
              </div>
            ) : (
              ""
            )}
            <Box
              component="div"
              className="overlaybg"
              sx={{ background: `${heroOverlayColor}` }}
            ></Box>
            <div id="section2"></div>
          </div>
          {/* description section */}
          <div className="homesec descriptionsc">
            {desType === "destype3" ? (
              <div className="herosec destype3">
                <div className="herotxt">
                  <span>{desSubHeading}</span>
                  <h1>{desHeading}</h1>
                  <p>{desSubtext}</p>

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
                  desType === "destype2"
                    ? "herosec destype2"
                    : "herosec destype1"
                }
              >
                <div className="herotxt">
                  <span>{desSubHeading}</span>
                  <div style={{ width: "80%", marginBottom: "10px" }}>
                    <h1>{desHeading}</h1>
                  </div>
                  <p>{desSubtext}</p>
                  <br />
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
                  {desBg ? (
                    <Image
                      src={desBg}
                      alt="home background image"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Image
                      src="/images/templatePage/descriptionblock.png"
                      alt="home background image"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              </div>
            )}
            {desType === "destype3" ? (
              <div className="bgimage">
                {desBg ? (
                  // <Image
                  //   src={desBg}
                  //   alt="home background image"
                  //   width={100}
                  //   height={100}
                  // />
                  ""
                ) : (
                  <Image
                    src="/images/templatePage/hdescriptionblock.svg"
                    alt="home background image"
                    width={100}
                    height={100}
                  />
                )}
              </div>
            ) : (
              ""
            )}
            <Box
              component="div"
              className="overlaybg"
              sx={{ background: `${desOverlayColor}` }}
            ></Box>
            <div id="section4"></div>
          </div>
          {/* Collaborator */}
          <div className="homesec parternsc">
            <div className="herotxt">
              <h1>{parternsHeading}</h1>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "50px",
                }}
              >
                {parterns && parterns.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: {
                        sm: "20px",
                        xl: "50px",
                      },
                    }}
                  >
                    <div className="partnersPrviewImg">
                      <Image src={logo1} alt="image" width={400} height={400} />
                    </div>
                    <div className="partnersPrviewImg">
                      <Image src={logo2} alt="image" width={400} height={400} />
                    </div>
                    <div className="partnersPrviewImg">
                      <Image src={logo3} alt="image" width={400} height={400} />
                    </div>
                    <div className="partnersPrviewImg">
                      <Image src={logo4} alt="image" width={400} height={400} />
                    </div>
                    <div className="partnersPrviewImg">
                      <Image src={logo5} alt="image" width={400} height={400} />
                    </div>
                    <div className="partnersPrviewImg">
                      <Image src={logo6} alt="image" width={400} height={400} />
                    </div>
                  </Box>
                ) : (
                  parterns &&
                  parterns.map((itm, index) => (
                    <div className="partnersPrviewImg" key={index}>
                      <Image
                        src={itm.preview}
                        alt="image"
                        width={400}
                        height={400}
                      />
                    </div>
                  ))
                )}
              </Box>
            </div>
            <div id="section3"></div>
          </div>
          {/* how it works */}
          <div className="homesec howitworksec">
            <div className="wrapper">
              <div
                className={
                  howItWorsType === "howitworks2"
                    ? "herosec howitworks2"
                    : "herosec howitworks1"
                }
              >
                <div className="herotxt">
                  <h1>{howitWorksHeading}</h1>
                  <Grid container spacing={2}>
                    <Grid item sm={howItWorsType === "howitworks2" ? 6 : 3}>
                      <div className="CardWrap">
                        <div className="image">
                          {stepImageData.firstImage ? (
                            <Image
                              src={URL.createObjectURL(
                                stepImageData.firstImage
                              )}
                              alt="First image"
                              width={400}
                              height={400}
                            />
                          ) : (
                            <Image
                              src={himg1}
                              alt="first image"
                              width={400}
                              height={400}
                            />
                          )}
                        </div>
                        <div>
                          <h3>{stepInputData.firstField?.title}</h3>
                          <p>{stepInputData.firstField?.textarea}</p>
                        </div>
                      </div>
                    </Grid>
                    <Grid item sm={howItWorsType === "howitworks2" ? 6 : 3}>
                      <div className="CardWrap">
                        <div className="image">
                          {stepImageData.secondImage ? (
                            <Image
                              src={URL.createObjectURL(
                                stepImageData.secondImage
                              )}
                              alt="second image"
                              width={400}
                              height={400}
                            />
                          ) : (
                            <Image
                              src={himg2}
                              alt="second image"
                              width={400}
                              height={400}
                            />
                          )}
                        </div>
                        <div>
                          <h3>{stepInputData.secondField?.title}</h3>
                          <p>{stepInputData.secondField?.textarea}</p>
                        </div>
                      </div>
                    </Grid>
                    <Grid item sm={howItWorsType === "howitworks2" ? 6 : 3}>
                      <div className="CardWrap">
                        <div className="image">
                          {stepImageData.thirdImage ? (
                            <Image
                              src={URL.createObjectURL(
                                stepImageData.thirdImage
                              )}
                              alt="First image"
                              width={400}
                              height={400}
                            />
                          ) : (
                            <Image
                              src={himg3}
                              alt="fourth image"
                              width={400}
                              height={400}
                            />
                          )}
                        </div>
                        <div>
                          <h3>{stepInputData.thirdField?.title}</h3>
                          <p>{stepInputData.thirdField?.textarea}</p>
                        </div>
                      </div>
                    </Grid>
                    <Grid item sm={howItWorsType === "howitworks2" ? 6 : 3}>
                      <div className="CardWrap">
                        <div className="image">
                          {stepImageData.fourthImage ? (
                            <Image
                              src={URL.createObjectURL(
                                stepImageData.fourthImage
                              )}
                              alt="fourth image"
                              width={400}
                              height={400}
                            />
                          ) : (
                            <Image
                              src={himg4}
                              alt="fourth image"
                              width={400}
                              height={400}
                            />
                          )}
                        </div>
                        <div>
                          <h3>{stepInputData.fourthField?.title}</h3>
                          <p>{stepInputData.fourthField?.textarea}</p>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
            <div id="section5"></div>
          </div>
          {/* Roadmap */}
          <div className="homesec roadmapsc">
            <div className="wrapper">
              <h1 className="h1">{roadmapHeading}</h1>
              <Swiper
                modules={[Pagination, Scrollbar]}
                spaceBetween={50}
                slidesPerView={3}
                // navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {cards.map((card) => (
                  <SwiperSlide key={card.id}>
                    <RoadmapCard>
                      <div className="content">
                        <h5>{card.title}</h5>
                        <h1>{card.explain}</h1>
                        <p>{card.subtext}</p>
                        <hr />
                        <ul>
                          {card.list.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="btnsc">
                        <button onClick={() => handleEdit(card)}>
                          <FiEdit />
                        </button>
                        <button onClick={() => handleDelete(card)}>
                          <RiDeleteBin6Fill />
                        </button>
                      </div>
                    </RoadmapCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div id="section6"></div>
          </div>
          {/* Team/Artist */}
          <div className="homesec team">
            <div className="wrapper">
              <h1
                className="h1"
                style={{ marginBottom: "20px", fontSize: "2.5em" }}
              >
                {teamHeading}
              </h1>
              <XtraverseCard>
                {teamCards.map((card, index) => (
                  <div className="cardwrapper">
                    <div className="content">
                      <Avatar
                        src={card.image}
                        alt={card.name}
                        sx={{
                          width: "150px",
                          height: "160px",
                          mx: "auto",
                          mb: "10px",
                          borderRadius: "15px",
                          background: "#fff",
                        }}
                      />
                      <h1>{card.name}</h1>
                      <p>{card.title}</p>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "6px",
                          alignItems: "center",
                          justifyContent: "center",
                          pt: "25px",
                        }}
                      >
                        <BsTwitter />
                        <BsDiscord />
                        <BsInstagram />
                        <RiFacebookBoxFill />
                      </Box>
                      <ul style={{ display: "none" }}>
                        {Object.entries(card.links).map(([key, value]) => (
                          <li key={key}>
                            <a href={value}>{key}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="btnsc">
                      <button onClick={() => handleTeamEditCard(index)}>
                        <FiEdit />
                      </button>
                      <button onClick={() => handleTeamDeleteCard(index)}>
                        <RiDeleteBin6Fill />
                      </button>
                    </div>
                  </div>
                ))}
              </XtraverseCard>
            </div>
            <div id="section7"></div>
          </div>
          {/* Features section */}
          <div className="homesec descriptionsc">
            {featuresType1 === "upperSection3" ? (
              <div className="herosec upperSection3">
                <div className="herotxt">
                  <span>{feature1SubHeading}</span>
                  <h1>{feature1Heading}</h1>
                  <p>{feature1Subtext}</p>

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
                  featuresType1 === "upperSection2"
                    ? "herosec upperSection2"
                    : "herosec upperSection1"
                }
              >
                <div className="herotxt">
                  <span>{feature1SubHeading}</span>
                  <h1>{feature1Heading}</h1>
                  <p>{feature1Subtext}</p>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div className="grdntsc">
                        <h1>{clcktionBtn}</h1>
                        <p>Collections Indexed every 5mins.</p>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="grdntsc">
                        <h1>{nftValueBtn}</h1>
                        <p>Difference in Floor & Estimated NFT Value</p>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div className="heroImg">
                  {features1Bg ? (
                    <Image
                      src={features1Bg}
                      alt="home background image"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Image
                      src="/images/templatePage/descriptionblock.png"
                      alt="home background image"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              </div>
            )}
            {featuresType1 === "upperSection3" ? (
              <div className="bgimage">
                {features1Bg ? (
                  // <Image
                  //   src={desBg}
                  //   alt="home background image"
                  //   width={100}
                  //   height={100}
                  // />
                  ""
                ) : (
                  <Image
                    src="/images/templatePage/hdescriptionblock.svg"
                    alt="home background image"
                    width={100}
                    height={100}
                  />
                )}
              </div>
            ) : (
              ""
            )}

            {/* bottomsection */}
            {featuresType2 === "bottomSection3" ? (
              <div className="herosec bottomSection3">
                <div className="herotxt">
                  <span>{feature2SubHeading}</span>
                  <h1>{feature2Heading}</h1>
                  <p>{feature2Subtext}</p>

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
                  featuresType2 === "bottomSection2"
                    ? "herosec bottomSection2"
                    : "herosec bottomSection1"
                }
              >
                <div className="herotxt">
                  <span>{feature2SubHeading}</span>
                  <h1>{feature2Heading}</h1>
                  <p>{feature2Subtext}</p>
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
                  {features2Bg ? (
                    <Image
                      src={features2Bg}
                      alt="home background image"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Image
                      src="/images/templatePage/descriptionblock.png"
                      alt="home background image"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              </div>
            )}
            {featuresType2 === "bottomSection3" ? (
              <div className="bgimage">
                {features2Bg ? (
                  // <Image
                  //   src={desBg}
                  //   alt="home background image"
                  //   width={100}
                  //   height={100}
                  // />
                  ""
                ) : (
                  <Image
                    src="/images/templatePage/hdescriptionblock.svg"
                    alt="home background image"
                    width={100}
                    height={100}
                  />
                )}
              </div>
            ) : (
              ""
            )}
            <Box
              component="div"
              className="overlaybg"
              sx={{ background: `${featureOverlayColor}` }}
            ></Box>
            <div id="section8"></div>
          </div>
          {/* FAQ */}
          <div
            className="homesec faq"
            // style={{ }}
          >
            <div className="wrapper" style={{ paddingTop: "10px" }}>
              <h1 className="h1">{faqHeading}</h1>
              <Faq>
                <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                  {faqCards.map((card, index) => (
                    <>
                      <Panel header={card.title} key={index}>
                        <div className="content">
                          <p>{card.explain}</p>
                        </div>
                        <div className="btnsc">
                          <button onClick={() => handleFaqEdit(card)}>
                            <FiEdit />
                          </button>
                          <button onClick={() => handleFaqDelete(card)}>
                            <RiDeleteBin6Fill />
                          </button>
                        </div>
                      </Panel>
                    </>
                  ))}
                </Collapse>
              </Faq>
            </div>
            <div id="section9"></div>
          </div>

          {/* Footer */}
          <div className="homesec footer">
            <div className="wrapper">
              <div className="footertxt">
                <h1>{footerHeading}</h1>
                <p>{footerDescription}</p>
                <Button
                  sx={{
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "1.2em",
                    textTransform: "capitalize",
                    padding: "8px 20px",
                    fontWeight: "500",
                    background:
                      "linear-gradient(25deg, #2600FC 0%, #FF00EA 100%);",
                    margin: "10px 0px",
                    "&:hover ": {
                      background:
                        "linear-gradient(25deg, #2600FC 0%, #FF00EA 100%);",
                      cursor: "pointer",
                    },
                  }}
                >
                  {footerButton}
                </Button>
              </div>

              <div className="footerwrapper">
                <Box
                  sx={{
                    width: "40%",
                    margin: "auto",
                  }}
                >
                  <div className="icons">
                    <FiTwitter />
                    <RiDiscordFill />
                    <FiInstagram />
                    <RiSendPlaneFill />
                    <RiYoutubeFill />
                  </div>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div className="image">
                      <Image src={footerBg} alt="" width={50} height={50} />
                      <p>Powered by Xtraverse</p>
                    </div>
                  </Box>

                  <span>{footerCopyright}</span>
                </Box>
              </div>
            </div>

            <div id="section10"></div>
          </div>
        </Box>
      </HomepagePreview>
    </>
  );
}

export default CryptoCanvasEditHome;
