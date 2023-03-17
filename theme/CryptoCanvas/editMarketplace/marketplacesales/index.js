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
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.75952 2.46557C9.32777 2.09549 9.1119 1.91046 8.88749 1.7994C8.32846 1.52276 7.67238 1.52276 7.11336 1.7994C6.88895 1.91046 6.67307 2.09549 6.24132 2.46557L6.16646 2.52973C6.04556 2.63335 5.98512 2.68517 5.92266 2.73083C5.62261 2.9502 5.26736 3.08161 4.89679 3.11033C4.81965 3.1163 4.73915 3.1163 4.57815 3.1163C4.17692 3.1163 3.9763 3.1163 3.81068 3.14432C2.9716 3.28626 2.31424 3.94363 2.17229 4.78271C2.14428 4.94833 2.14428 5.14657 2.14428 5.54304C2.14428 5.69739 2.14428 5.77456 2.13865 5.84938C2.11086 6.21935 1.98069 6.5743 1.76272 6.87453C1.71864 6.93525 1.66875 6.99413 1.56897 7.11188L1.50014 7.19311C1.12907 7.63102 0.94353 7.84998 0.833108 8.07803C0.566553 8.62853 0.566553 9.27074 0.833108 9.82124C0.94353 10.0493 1.12907 10.2682 1.50014 10.7062L1.56897 10.7874C1.66875 10.9051 1.71864 10.964 1.76272 11.0247C1.98069 11.325 2.11086 11.6799 2.13865 12.0499C2.14428 12.1247 2.14428 12.2019 2.14428 12.3562C2.14428 12.7527 2.14428 12.9509 2.17229 13.1166C2.31424 13.9556 2.9716 14.613 3.81068 14.755C3.9763 14.783 4.17692 14.783 4.57815 14.783C4.73915 14.783 4.81965 14.783 4.89679 14.7889C5.26736 14.8177 5.62261 14.9491 5.92266 15.1684C5.98512 15.2141 6.04557 15.2659 6.16646 15.3695L6.24132 15.4337C6.67307 15.8038 6.88895 15.9888 7.11336 16.0999C7.67238 16.3765 8.32846 16.3765 8.88748 16.0999C9.1119 15.9888 9.32777 15.8038 9.75953 15.4337L9.83905 15.3655C9.95534 15.2659 10.0135 15.216 10.0734 15.1719C10.3761 14.9493 10.7353 14.8164 11.1099 14.7885C11.1841 14.783 11.2607 14.783 11.4139 14.783C11.804 14.783 11.999 14.783 12.162 14.7558C13.0054 14.6155 13.6663 13.9546 13.8066 13.1112C13.8338 12.9482 13.8338 12.7532 13.8338 12.3631C13.8338 12.2099 13.8338 12.1334 13.8393 12.0592C13.8672 11.6845 14.0001 11.3253 14.2227 11.0226C14.2668 10.9627 14.3166 10.9046 14.4163 10.7883L14.4845 10.7087C14.8546 10.277 15.0396 10.0611 15.1507 9.8367C15.4273 9.27768 15.4273 8.62159 15.1507 8.06257C15.0396 7.83816 14.8546 7.62228 14.4845 7.19053L14.4163 7.111C14.3166 6.99472 14.2668 6.93657 14.2227 6.87663C14.0001 6.574 13.8672 6.21478 13.8393 5.84012C13.8338 5.76591 13.8338 5.68933 13.8338 5.53617C13.8338 5.14609 13.8338 4.95104 13.8066 4.78803C13.6663 3.94466 13.0054 3.28376 12.162 3.14343C11.999 3.1163 11.804 3.1163 11.4139 3.1163C11.2607 3.1163 11.1841 3.1163 11.1099 3.11077C10.7353 3.08285 10.3761 2.94997 10.0734 2.72734C10.0135 2.68325 9.95534 2.63341 9.83905 2.53373L9.75952 2.46557Z"
                  fill="#1883E6"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.197 6.41889C11.4899 6.71178 11.4899 7.18666 11.197 7.47955L7.86366 10.8129C7.72301 10.9535 7.53225 11.0326 7.33333 11.0326C7.13442 11.0326 6.94366 10.9535 6.803 10.8129L5.46967 9.47955C5.17678 9.18666 5.17678 8.71178 5.46967 8.41889C5.76256 8.126 6.23744 8.126 6.53033 8.41889L7.33333 9.22189L10.1363 6.41889C10.4292 6.126 10.9041 6.126 11.197 6.41889Z"
                  fill="white"
                />
              </svg>
            </span>
            <h1>{nftName}</h1>
            <div className="ownerdv">
              <Image src={blueStatus} />
              <p className="p"> By</p>
              <p>Phillip</p>
            </div>
            <p>{addNftDescript}</p>

            <div className="ownerdv">
              <Image src={yellowStatus} width={20} height={20} />
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
                <svg
                  width="14"
                  height="17"
                  viewBox="0 0 14 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.02145 1.0129L7.49341 0.679963C7.43574 0.621418 7.36357 0.574317 7.28201 0.541996C7.20045 0.509674 7.1115 0.49292 7.02145 0.49292C6.9314 0.49292 6.84245 0.509674 6.76089 0.541996C6.67933 0.574317 6.60716 0.621418 6.54949 0.679963L7.02145 1.0129ZM0.876151 7.25548L0.404192 6.92254C0.321338 7.00669 0.271978 7.11083 0.263151 7.22012C0.254323 7.32942 0.286477 7.43828 0.35503 7.53119L0.876151 7.25548ZM7.02145 15.5789L6.50033 15.8546C6.55557 15.9294 6.63238 15.9911 6.72354 16.0339C6.81471 16.0767 6.91722 16.0991 7.02145 16.0991C7.12568 16.0991 7.22819 16.0767 7.31936 16.0339C7.41052 15.9911 7.48733 15.9294 7.54257 15.8546L7.02145 15.5789ZM13.1667 7.25548L13.6879 7.53119C13.7564 7.43828 13.7886 7.32942 13.7797 7.22012C13.7709 7.11083 13.7216 7.00669 13.6387 6.92254L13.1667 7.25548ZM7.02145 5.17462L7.25005 4.69186L7.02145 4.61279L6.79284 4.69082L7.02145 5.17358V5.17462ZM6.54949 0.679963L0.404192 6.92254L1.34811 7.58841L7.49341 1.34584L6.54949 0.679963ZM0.35503 7.53119L6.50033 15.8546L7.54257 15.3032L1.39727 6.97976L0.35503 7.53119ZM7.54257 15.8546L13.6879 7.53119L12.6456 6.97976L6.50033 15.3032L7.54257 15.8546ZM13.6387 6.92254L7.49341 0.679963L6.54949 1.34584L12.6948 7.58841L13.6387 6.92254ZM1.10476 7.73824L7.25005 5.65738L6.79284 4.69186L0.647546 6.77272L1.10476 7.73824ZM6.79284 5.65738L12.9381 7.73824L13.3954 6.77272L7.25005 4.69186L6.79284 5.65738Z"
                    fill="white"
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
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.75952 2.46557C9.32777 2.09549 9.1119 1.91046 8.88749 1.7994C8.32846 1.52276 7.67238 1.52276 7.11336 1.7994C6.88895 1.91046 6.67307 2.09549 6.24132 2.46557L6.16646 2.52973C6.04556 2.63335 5.98512 2.68517 5.92266 2.73083C5.62261 2.9502 5.26736 3.08161 4.89679 3.11033C4.81965 3.1163 4.73915 3.1163 4.57815 3.1163C4.17692 3.1163 3.9763 3.1163 3.81068 3.14432C2.9716 3.28626 2.31424 3.94363 2.17229 4.78271C2.14428 4.94833 2.14428 5.14657 2.14428 5.54304C2.14428 5.69739 2.14428 5.77456 2.13865 5.84938C2.11086 6.21935 1.98069 6.5743 1.76272 6.87453C1.71864 6.93525 1.66875 6.99413 1.56897 7.11188L1.50014 7.19311C1.12907 7.63102 0.94353 7.84998 0.833108 8.07803C0.566553 8.62853 0.566553 9.27074 0.833108 9.82124C0.94353 10.0493 1.12907 10.2682 1.50014 10.7062L1.56897 10.7874C1.66875 10.9051 1.71864 10.964 1.76272 11.0247C1.98069 11.325 2.11086 11.6799 2.13865 12.0499C2.14428 12.1247 2.14428 12.2019 2.14428 12.3562C2.14428 12.7527 2.14428 12.9509 2.17229 13.1166C2.31424 13.9556 2.9716 14.613 3.81068 14.755C3.9763 14.783 4.17692 14.783 4.57815 14.783C4.73915 14.783 4.81965 14.783 4.89679 14.7889C5.26736 14.8177 5.62261 14.9491 5.92266 15.1684C5.98512 15.2141 6.04557 15.2659 6.16646 15.3695L6.24132 15.4337C6.67307 15.8038 6.88895 15.9888 7.11336 16.0999C7.67238 16.3765 8.32846 16.3765 8.88748 16.0999C9.1119 15.9888 9.32777 15.8038 9.75953 15.4337L9.83905 15.3655C9.95534 15.2659 10.0135 15.216 10.0734 15.1719C10.3761 14.9493 10.7353 14.8164 11.1099 14.7885C11.1841 14.783 11.2607 14.783 11.4139 14.783C11.804 14.783 11.999 14.783 12.162 14.7558C13.0054 14.6155 13.6663 13.9546 13.8066 13.1112C13.8338 12.9482 13.8338 12.7532 13.8338 12.3631C13.8338 12.2099 13.8338 12.1334 13.8393 12.0592C13.8672 11.6845 14.0001 11.3253 14.2227 11.0226C14.2668 10.9627 14.3166 10.9046 14.4163 10.7883L14.4845 10.7087C14.8546 10.277 15.0396 10.0611 15.1507 9.8367C15.4273 9.27768 15.4273 8.62159 15.1507 8.06257C15.0396 7.83816 14.8546 7.62228 14.4845 7.19053L14.4163 7.111C14.3166 6.99472 14.2668 6.93657 14.2227 6.87663C14.0001 6.574 13.8672 6.21478 13.8393 5.84012C13.8338 5.76591 13.8338 5.68933 13.8338 5.53617C13.8338 5.14609 13.8338 4.95104 13.8066 4.78803C13.6663 3.94466 13.0054 3.28376 12.162 3.14343C11.999 3.1163 11.804 3.1163 11.4139 3.1163C11.2607 3.1163 11.1841 3.1163 11.1099 3.11077C10.7353 3.08285 10.3761 2.94997 10.0734 2.72734C10.0135 2.68325 9.95534 2.63341 9.83905 2.53373L9.75952 2.46557Z"
                  fill="#1883E6"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.197 6.41889C11.4899 6.71178 11.4899 7.18666 11.197 7.47955L7.86366 10.8129C7.72301 10.9535 7.53225 11.0326 7.33333 11.0326C7.13442 11.0326 6.94366 10.9535 6.803 10.8129L5.46967 9.47955C5.17678 9.18666 5.17678 8.71178 5.46967 8.41889C5.76256 8.126 6.23744 8.126 6.53033 8.41889L7.33333 9.22189L10.1363 6.41889C10.4292 6.126 10.9041 6.126 11.197 6.41889Z"
                  fill="white"
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
