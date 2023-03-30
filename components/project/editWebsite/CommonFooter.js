import React from "react";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { IoMdCloudUpload } from "react-icons/io";

import { Form } from "../../styles/homepage.styled";

function CommonFooter(props) {
  const {
    handleFooterImageChange,
    setFooterDescription,
    setFooterCopyright,
    setFooterTwiiter,
    setFooterDiscord,
    setFooterInstagram,
    setFooterEmail,
    setFooterYoutube,
    setFooterHeading,
    setFooterButton,
  } = props;

  return (
    <>
      <Box
        sx={{
          width: {
            sm: "100%",
          },
          margin: "auto",
        }}
      >
        <Form className="forminput">
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  marginTop: "15px",
                }}
              >
                <div className="inputsc">
                  <input
                    type="file"
                    placeholder="upload Logo"
                    onChange={handleFooterImageChange}
                    accept="image/*"
                  />
                  <span>
                    <IoMdCloudUpload />
                    Upload Logo
                  </span>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{}}>
                <span>Heading</span>
                <input
                  onChange={(e) => setFooterHeading(e.target.value)}
                  type="text"
                  placeholder="EX: Our Fancy shamny NFT..."
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{}}>
                <span>Description</span>
                <textarea
                  onChange={(e) => setFooterDescription(e.target.value)}
                  placeholder="EX: Our Fancy shamny NFT..."
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{}}>
                <span>Button</span>
                <input
                  type="text"
                  onChange={(e) => setFooterButton(e.target.value)}
                  placeholder="Join Community"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <span>Add Copyright</span>
                <input
                  type="text"
                  placeholder="Ex: Robo Gremlins"
                  onChange={(e) => setFooterCopyright(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <div className="socaillink">
                <Box>
                  <span>Social Links</span>
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    onChange={(e) => setFooterTwiiter(e.target.value)}
                  />
                </Box>
                <Box>
                  <input
                    onChange={(e) => setFooterDiscord(e.target.value)}
                    type="text"
                    placeholder="Discord URL"
                  />
                </Box>
                <Box>
                  <input
                    onChange={(e) => setFooterInstagram(e.target.value)}
                    type="text"
                    placeholder="Instagram URL"
                  />
                </Box>
                <Box>
                  <input
                    onChange={(e) => setFooterInstagram(e.target.value)}
                    type="text"
                    placeholder="Instagram URL"
                  />
                </Box>
                <Box>
                  <input
                    onChange={(e) => setFooterInstagram(e.target.value)}
                    type="text"
                    placeholder="Youtube URL"
                  />
                </Box>
              </div>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default CommonFooter;
