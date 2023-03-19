import { Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ItemAcivity from "../../../../components/project/EditMarketplace/ItemActivity";
import { PreviewBox } from "../../../../components/styles/uploadnft.style";
function CryptoCanvasEditMarketPlaceSalespage(props) {
  const {
    menuNav,
    homeLogo,
    nftCollectionName,
    nftName,
    headerType,
    waitlistBtn,
    blueStatus,
    addNftDescript,
    yellowStatus,
    nftMindBtn,
    nftPrice,
    selectedImage,
    videoTitle,
    selectedVideo,
    addStory,
    featureBtn,
    prjctSelectedVideo,
    projectBioStory,
    prjctBioCollection,
    projectBio,
    projectBtn,
  } = props;

  return (
    <>
      <PreviewBox>
        <div className="Preivewgrid">
          <div className="offerheader">
            {/* header */}
            {headerType != "header2" ? (
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
                  <div className="headerbtn">
                    <ul>
                      {menuNav
                        ? menuNav.map((item, index) => (
                            <li key={index}>{item.button}</li>
                          ))
                        : ""}
                    </ul>
                  </div>
                </Box>

                <Link href={waitlistBtn.link}>
                  <a target="_blank">
                    <Button
                      className="waitLstBtn"
                      sx={{
                        background:
                          "linear-gradient(25deg, #2600FC 0%, #FF00EA 100%)",
                        color: "#fff",
                      }}
                    >
                      {waitlistBtn.button}
                    </Button>
                  </a>
                </Link>
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
                  <ul>
                    {menuNav
                      ? menuNav.map((item, index) => (
                          <li key={index}>{item.button}</li>
                        ))
                      : ""}
                  </ul>

                  <Link href={waitlistBtn.link}>
                    <a target="_blank">
                      <Button
                        className="waitLstBtn"
                        sx={{
                          background:
                            "linear-gradient(25deg, #2600FC 0%, #FF00EA 100%)",
                          color: "#fff",
                        }}
                      >
                        {waitlistBtn.button}
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="previewtxt">
            <span>
              1 of 10 {nftCollectionName}{" "}
              <svg width="1em" height="1em" viewBox="0 0 16 17" fill="none">
                <path
                  d="M9.76 2.466c-.432-.37-.648-.556-.873-.667a2 2 0 00-1.774 0c-.224.111-.44.296-.872.667l-.075.064c-.12.103-.18.155-.243.2a2 2 0 01-1.026.38c-.077.006-.158.006-.319.006-.401 0-.602 0-.767.028a2 2 0 00-1.639 1.639c-.028.165-.028.364-.028.76 0 .154 0 .232-.005.306a2 2 0 01-.376 1.026c-.044.06-.094.12-.194.237l-.069.081c-.37.438-.556.657-.667.885a2 2 0 000 1.743c.11.228.296.447.667.885l.069.081c.1.118.15.177.194.238a2 2 0 01.376 1.025c.005.075.005.152.005.306 0 .397 0 .595.028.76a2 2 0 001.639 1.639c.165.028.366.028.767.028.161 0 .242 0 .319.006.37.029.726.16 1.026.38.062.045.123.097.243.2l.075.065c.432.37.648.555.872.666a2 2 0 001.774 0c.225-.111.44-.296.873-.666l.08-.068c.115-.1.174-.15.233-.194a2 2 0 011.037-.383c.074-.006.15-.006.304-.006.39 0 .585 0 .748-.027a2 2 0 001.645-1.645c.027-.163.027-.358.027-.748 0-.153 0-.23.005-.304a2 2 0 01.384-1.036c.044-.06.094-.118.193-.235l.069-.08c.37-.431.555-.647.666-.871a2 2 0 000-1.774c-.111-.225-.296-.44-.666-.872l-.069-.08c-.1-.116-.15-.174-.193-.234a2 2 0 01-.384-1.037c-.005-.074-.005-.15-.005-.304 0-.39 0-.585-.027-.748a2 2 0 00-1.645-1.645c-.163-.027-.358-.027-.748-.027-.153 0-.23 0-.304-.005a2 2 0 01-1.037-.384 4.271 4.271 0 01-.234-.193l-.08-.068z"
                  fill="#1883E6"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.197 6.419a.75.75 0 010 1.06l-3.333 3.334a.75.75 0 01-1.061 0L5.47 9.48a.75.75 0 011.06-1.061l.803.803 2.803-2.803a.75.75 0 011.061 0z"
                  fill="#fff"
                />
              </svg>
            </span>
            <h1>{nftName}</h1>
            <div className="ownerdv">
              <div className="image">
                <Image src={blueStatus} />
              </div>
              <p className="p"> By</p>
              <p>Phillip</p>
            </div>
            <p>{addNftDescript}</p>

            <div className="ownerdv">
              <div className="image">
                <Image src={yellowStatus} width={20} height={20} />
              </div>
              <p className="p">Owned By</p>
              <p>Phillip</p>
            </div>

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
                <svg width="1em" height="1em" viewBox="0 0 14 17" fill="none">
                  <path
                    d="M7.021 1.013L7.493.68a.613.613 0 00-.211-.138.71.71 0 00-.521 0 .613.613 0 00-.212.138l.472.333zM.876 7.255l-.472-.332a.46.46 0 00-.05.609l.522-.277zm6.145 8.324l-.52.276a.585.585 0 00.223.179.703.703 0 00.595 0 .585.585 0 00.224-.18l-.522-.275zm6.146-8.324l.52.276a.46.46 0 00-.048-.608l-.472.332zM7.02 5.175l.229-.483-.229-.08-.228.079.228.483zM6.55.68L.404 6.923l.944.665 6.145-6.242L6.55.68zM.355 7.531L6.5 15.855l1.043-.552L1.397 6.98.355 7.53zm7.188 8.324l6.145-8.324-1.042-.551L6.5 15.303l1.043.552zm6.096-8.932L7.493.68l-.944.666 6.146 6.242.944-.665zm-12.534.815l6.145-2.08-.457-.966-6.145 2.08.457.966zm5.688-2.08l6.145 2.08.457-.965L7.25 4.692l-.457.965z"
                    fill="#fff"
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
            <Image src={selectedVideo} width={100} height={100} />
          </div>
          <p>{addStory}</p>
          <Link href={featureBtn.link}>
            <a target="_blank">
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
            </a>
          </Link>
        </div>
      </PreviewBox>
      <PreviewBox>
        <div className="Preivewgrid">
          {/* video section */}
          <div className="imgwrap">
            <div className="imgbox">
              <video src={prjctSelectedVideo} muted autoPlay></video>
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
              <svg width="1em" height="1em" viewBox="0 0 16 17" fill="none">
                <path
                  d="M9.76 2.466c-.432-.37-.648-.556-.873-.667a2 2 0 00-1.774 0c-.224.111-.44.296-.872.667l-.075.064c-.12.103-.18.155-.243.2a2 2 0 01-1.026.38c-.077.006-.158.006-.319.006-.401 0-.602 0-.767.028a2 2 0 00-1.639 1.639c-.028.165-.028.364-.028.76 0 .154 0 .232-.005.306a2 2 0 01-.376 1.026c-.044.06-.094.12-.194.237l-.069.081c-.37.438-.556.657-.667.885a2 2 0 000 1.743c.11.228.296.447.667.885l.069.081c.1.118.15.177.194.238a2 2 0 01.376 1.025c.005.075.005.152.005.306 0 .397 0 .595.028.76a2 2 0 001.639 1.639c.165.028.366.028.767.028.161 0 .242 0 .319.006.37.029.726.16 1.026.38.062.045.123.097.243.2l.075.065c.432.37.648.555.872.666a2 2 0 001.774 0c.225-.111.44-.296.873-.666l.08-.068c.115-.1.174-.15.233-.194a2 2 0 011.037-.383c.074-.006.15-.006.304-.006.39 0 .585 0 .748-.027a2 2 0 001.645-1.645c.027-.163.027-.358.027-.748 0-.153 0-.23.005-.304a2 2 0 01.384-1.036c.044-.06.094-.118.193-.235l.069-.08c.37-.431.555-.647.666-.871a2 2 0 000-1.774c-.111-.225-.296-.44-.666-.872l-.069-.08c-.1-.116-.15-.174-.193-.234a2 2 0 01-.384-1.037c-.005-.074-.005-.15-.005-.304 0-.39 0-.585-.027-.748a2 2 0 00-1.645-1.645c-.163-.027-.358-.027-.748-.027-.153 0-.23 0-.304-.005a2 2 0 01-1.037-.384 4.271 4.271 0 01-.234-.193l-.08-.068z"
                  fill="#1883E6"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.197 6.419a.75.75 0 010 1.06l-3.333 3.334a.75.75 0 01-1.061 0L5.47 9.48a.75.75 0 011.06-1.061l.803.803 2.803-2.803a.75.75 0 011.061 0z"
                  fill="#fff"
                />
              </svg>
            </span>
            <h1>{prjctBioCollection}</h1>

            <p>{projectBio}</p>
            <Box>
              <Link href={projectBtn.link}>
                <a target="_blank">
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
                </a>
              </Link>
            </Box>
          </div>
        </div>
      </PreviewBox>
    </>
  );
}

export default CryptoCanvasEditMarketPlaceSalespage;
