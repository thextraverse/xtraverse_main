import styled from "@emotion/styled";
import React, { useState } from "react";
import { IoIosAddCircle, IoIosArrowDropright } from "react-icons/io";
import { useRouter } from "next/router";
import { BsPlusLg } from "react-icons/bs";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import demoimg from "../../../components/images/blacklogo.svg";
import {
  HomepagePreview,
  RoadmapCard,
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
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
function CryptoCanvasEditHome({
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
}) {
  console.log(menuNav);
  const { user, headerMenuData, headerLogo, headermenu, navbarType } =
    useUserAuth();

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
                  <h1>{desHeading}</h1>
                  <p>{desSubtext}</p>
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
            <div className="deletesc"></div>
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
                      gap: "50px",
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
            <div className="deletesc"></div>
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
            <div className="deletesc"></div>
          </div>
          {/* Roadmap */}
          <div className="homesec roadmapsc">
            {/* <div className="wrapper">
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
            </div> */}
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

            <div className="deletesc"></div>
          </div>
        </Box>
      </HomepagePreview>
    </>
  );
}

export default CryptoCanvasEditHome;
