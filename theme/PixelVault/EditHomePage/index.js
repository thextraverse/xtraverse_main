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
function PixelVaultEditHome({
  homeLogo,
  homeBg,
  desBg,
  headerType,
  heroType,
  desType,
  heroButton,
  editHeroHeading,
  heroOverlayColor,
  editHeroSubtext,
  menuInput,
  waitlistInput,
  desOverlayColor,
  desSubHeading,
  desHeading,
  desSubtext,
}) {
  return (
    <>
      <HomepagePreview>
        PixelVaultEditHome
        <div className="homesec">
          {/* header */}
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
                      style={{
                        width: "100%",
                        objectFit: "cover",
                      }}
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
                  <Button className="waitLstBtn">{waitlistInput}</Button>
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
                <Button className="waitLstBtn">{waitlistInput}</Button>
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
                    }}
                  >
                    {heroButton}
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
                    }}
                  >
                    {heroButton}
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
                desType === "destype2" ? "herosec destype2" : "herosec destype1"
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
                <Image
                  src={desBg}
                  alt="home background image"
                  width={100}
                  height={100}
                />
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
      </HomepagePreview>
    </>
  );
}

export default PixelVaultEditHome;
