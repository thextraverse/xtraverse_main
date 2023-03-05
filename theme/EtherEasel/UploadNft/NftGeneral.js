import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { FiArrowRightCircle } from "react-icons/fi";
import Image from "next/image";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Grid from "@mui/material/Grid";
import { IoMdCloudUpload } from "react-icons/io";
import { Form, PreviewBox } from "../style/uploadnft.style";
import { RiTicketLine } from "react-icons/ri";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function EtherEaselNftgeneral(props) {
  const {
    handleNext,
    selectedImage,
    setNftName,
    nftName,
    nftdescription,
    setNftDescript,
    handleImageChange,
    setTags,
    setNftCollectionName,
    nftCollectionName,
    nftPrice,
    setNftPrice,
    nftMindBtn,
    setNftMindBtn,
    nftType,
    setNftType,
    handleImgUpload,
  } = props;

  return (
    <Box
      sx={{
        width: {
          sx: "90%",
          lg: "100%",
          xl: "80%",
        },
        margin: "auto",
        padding: {
          lg: "5px 30px",
          md: "0px 20px",
          xl: "0px",
        },
      }}
    >
      <Grid container spacing={{ md: 2, xl: 4 }}>
        <Grid item xs={4} lg={4.5} xl={4.5}>
          <Form className="forminput">
            <Grid container spacing={2}>
              <h1>General</h1>
              <Grid xs={12}>
                <Box>
                  <span>Name of NFT</span>
                  <input
                    type="text"
                    placeholder="Ex: Draken"
                    onChange={(e) => setNftName(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box sx={{}}>
                  <span>Collection Name</span>
                  <input
                    onChange={(e) => setNftCollectionName(e.target.value)}
                    type="text"
                    placeholder="EX: Green Gremlins"
                  />
                </Box>
              </Grid>
              <Grid xs={12}>
                <FormControl
                  fullWidth
                  sx={{
                    border: "2px solid #fff",
                    borderRadius: "10px",
                    color: "#000",
                  }}
                >
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ color: "#fff", fontWeight: "600" }}
                  >
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={nftType}
                    sx={{ color: "#fff" }}
                    label="Age"
                    onChange={(e) => setNftType(e.target.value)}
                  >
                    <MenuItem value={"Waitlist"} sx={{ color: "#000" }}>
                      <em>Waitlist</em>
                    </MenuItem>
                    <MenuItem value={"Whitelist"} sx={{ color: "#000" }}>
                      Whitelist
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <Box sx={{ margin: "15px 0px" }}>
                  <span>Description </span>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Ex: DRK is the first of its kind..."
                    onChange={(e) => setNftDescript(e.target.value)}
                  ></textarea>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box>
                  <div className="inputsc">
                    <input
                      type="file"
                      placeholder="upload Nft"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <span>
                      Upload NFTs
                      <IoMdCloudUpload />
                    </span>
                  </div>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "50% auto",
                    gap: "10px",
                  }}
                >
                  <div>
                    <span>Price</span>
                    <input
                      onChange={(e) => setNftPrice(e.target.value)}
                      type="number"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <span>Chain</span>
                    <input type="text" placeholder="" />
                  </div>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box
                  sx={{
                    gap: "10px",
                  }}
                >
                  <span>Button</span>
                  <input
                    onChange={(e) => setNftMindBtn(e.target.value)}
                    type="text"
                    placeholder="Ex: Mint Now"
                  />
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <Button
                    onClick={handleNext}
                    sx={{
                      background: "#fff",
                      border: "2px solid #fff",
                      width: "100%",
                      display: "block",
                      height: "60px",
                      color: "#000",
                      margin: "15px 0px",
                      "&:hover": {
                        background: "transparent",
                        color: "#fff",
                      },
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        </Grid>
        {/* Preview section */}
        <Grid
          item
          xs={8}
          lg={7.5}
          xl={7.5}
          sx={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box
            sx={{
              border: "2px solid #BEBEBE",
              padding: "10px",
              borderRadius: "10px",
              width: "100%",
              height: {
                xl: "550px",
                lg: "400px",
              },
            }}
          >
            <PreviewBox>
              <div className="Preivewgrid">
                <div className="previewtxt">
                  <Box
                    component="p"
                    sx={{
                      fontWeight: "800",
                      color: "crimson !important",
                    }}
                  >
                    Ether Easel
                  </Box>
                  <span>1 of 10 {nftCollectionName}</span>
                  <h1>{nftName}</h1>
                  <p>{nftdescription}</p>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <Button
                      sx={{
                        background: "#000",
                        color: "#fff",
                        padding: "5px 15px",
                        border: "2px solid #000",
                        "&:hover": {
                          background: "#fff",
                          border: "2px solid #000",
                          color: "#000",
                        },
                      }}
                    >
                      {nftMindBtn}
                    </Button>

                    <span className="DlrSpan">
                      $ <strong>{nftPrice}</strong>
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
                  <span>
                    Ticket <RiTicketLine />
                  </span>
                </div>
              </div>
            </PreviewBox>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default EtherEaselNftgeneral;
