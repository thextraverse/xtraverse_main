import styled from "@emotion/styled";
import React, { useState } from "react";
import { IoIosAddCircle, IoIosArrowDropright } from "react-icons/io";
import { useRouter } from "next/router";
import { BsPlusLg } from "react-icons/bs";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import demoimg from "../../../components/images/blacklogo.svg";
import { HomepagePreview } from "../../../components/styles/homepage.styled";
import { Grid } from "@mui/joy";
import Link from "next/link";
import { useUserAuth } from "../../../configfile/UserAuthContext";
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
}) {
  console.log(menuNav);
  const { user, headerMenuData, headerLogo, headermenu, navbarType } =
    useUserAuth();
  console.log("editWebsite", headerMenuData);
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
          </div>
          {/* Collaborator */}
          <div className="homesec">
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
        </Box>
      </HomepagePreview>
    </>
  );
}

export default CryptoCanvasEditHome;
