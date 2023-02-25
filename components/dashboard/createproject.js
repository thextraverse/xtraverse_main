import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/router";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import prjctImg1 from "../images/project1.png";
import {
  InitializeProject,
  H1,
  Button,
  Form,
  NFT_pro,
  Imgsc,
} from "./dashboard.styled";
export const drawerWidth = 240;

function CreateProject() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/dashboard/createproject");
  };

  const six_nft_projects = [
    {
      title: "NFT Magicians",
      top_left_code: "ERC 721",
      top_right_code: "10 NFTs",
      image_src: "",
      vid_src: "",
      key: "1",
    },
    {
      title: "NFT Magicians",
      top_left_code: "ERC 721",
      top_right_code: "10 NFTs",
      image_src: "",
      vid_src: "",
      key: "2",
    },
    {
      title: "NFT Magicians",
      top_left_code: "ERC 721",
      top_right_code: "10 NFTs",
      image_src: "",
      vid_src: "",
      key: "3",
    },
    {
      title: "NFT Magicians",
      top_left_code: "ERC 721",
      top_right_code: "10 NFTs",
      image_src: "",
      vid_src: "",
      key: "4",
    },
    {
      title: "NFT Magicians",
      top_left_code: "ERC 721",
      top_right_code: "10 NFTs",
      image_src: "",
      vid_src: "",
      key: "5",
    },
    {
      title: "NFT Magicians",
      top_left_code: "ERC 721",
      top_right_code: "10 NFTs",
      image_src: "",
      vid_src: "",
      key: "6",
    },
  ];
  return (
    <Box
      sx={{
        width: { lg: `calc(100% - ${drawerWidth}px)` },
        marginLeft: "auto",
        textAlign: "center",
        padding: {
          xl: "0px 100px",
        },
      }}
    >
      <H1>Slipstream Agency</H1>
      <Button onClick={handleClickOpen}>Create Project</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            background: "#1f1f1f",
            border: "2px solid #fff",
            borderRadius: "10px",
          }}
        >
          {/* <Box>
            <Btn onClick={handleClose}>Disagree</Btn>
          </Box> */}
          <InitializeProject>
            <Box>
              <span>Step 1</span>
              <h1>Initialize Project</h1>
            </Box>
            <Form onSubmit={handleSubmit}>
              <Box
                sx={{
                  margin: "20px 0px",
                }}
              >
                <label htmlFor="projectname">
                  Name of project (keep it simple)
                </label>
                <input
                  type="text"
                  id="projectname"
                  placeholder="ex: robogremlins"
                  required
                />
              </Box>

              <input type="submit" value="Initialize" />
            </Form>
          </InitializeProject>
        </DialogContent>
      </Dialog>
      <Grid container spacing={{ xs: 2, md: 0 }}>
        {six_nft_projects.map(
          (
            { title, top_left_code, top_right_code, image_src, vid_src, key },
            index
          ) => (
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={key}>
              <NFT_pro>
                <div className="pro_title">{title}</div>
                <div className="pro_codes">
                  <div>{top_left_code}</div>
                  <div>{top_right_code}</div>
                </div>
                <Imgsc>
                  <Image src={prjctImg1} alt="prjectimg" />
                </Imgsc>
                <button>Add/Manage NFTs</button>
                <button>Domain Setup</button>
              </NFT_pro>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}

export default CreateProject;
