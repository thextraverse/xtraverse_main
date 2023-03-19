import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { IoMdCloudUpload } from "react-icons/io";
import { RiTicketLine } from "react-icons/ri";
import { HomepagePreview } from "./edithomepage.style";
import firstimg from "../../images/project1.png";
import { useRouter } from "next/router";
import { Form } from "../../styles/homepage.styled";
import { RiDeleteBinLine } from "react-icons/ri";
import ColorPicker from "react-best-gradient-color-picker";
import { auth, db, storage } from "../../../configfile/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import {
  query,
  addDoc,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useUserAuth } from "../../../configfile/UserAuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import { AiOutlinePlus } from "react-icons/ai";

function EditPartners(props) {
  const { setParterns, setparternsHeading } = props;
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  const uniqueId = v4();
  const [uploadProgress, setUploadProgress] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [imagesList, setImagesList] = useState([]);
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => ({
      preview: URL.createObjectURL(file),
      file: file,
    }));
    setImagesList(imagesList.concat(images));
  };

  const handleImageRemove = (index) => {
    const images = [...imagesList];
    images.splice(index, 1);
    setImagesList(images);
  };
  console.log(imagesList);
  setParterns(imagesList);
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
        <Form className="forminput ">
          <Grid container spacing={2}>
            <Box sx={{ width: "100%" }}>
              {uploadProgress > 0 ? (
                <Box>
                  <LinearProgress
                    determinate
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    thickness={32}
                    value={uploadProgress}
                    sx={{
                      "--LinearProgress-radius": "0px",
                      "--LinearProgress-progressThickness": "24px",
                      boxShadow: "sm",
                      borderColor: "neutral.500",
                    }}
                  >
                    <Typography
                      level="body3"
                      fontWeight="xl"
                      textColor="common.white"
                      sx={{ mixBlendMode: "difference" }}
                    >
                      LOADING… {`${Math.round(uploadProgress)}%`}
                    </Typography>
                  </LinearProgress>
                </Box>
              ) : (
                ""
              )}
            </Box>
            <Grid item xs={12}>
              <Box>
                <span>Add Headline</span>
                <input
                  type="text"
                  placeholder="Ex: Robo Gremlins"
                  onChange={(e) => setparternsHeading(e.target.value)}
                />
              </Box>
            </Grid>
            {/* <Grid xs={12}>
              <Box
                sx={{
                  marginTop: "15px",
                }}
              >
                <div className="inputsc">
                  <input
                    type="file"
                    placeholder="upload Logo"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <span>
                    <IoMdCloudUpload />
                    Upload image
                  </span>
                </div>
              </Box>
            </Grid> */}
            <Grid item xs={12}>
              <Box>
                <span>Upload Logos </span>
                <div>
                  <input
                    type="file"
                    placeholder="upload images"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                  />
                  <div>
                    {imagesList.map((image, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div className="previewimages">
                          <Image
                            src={image.preview}
                            alt="preview"
                            width={400}
                            height={400}
                          />
                        </div>

                        <Button
                          onClick={() => handleImageRemove(index)}
                          sx={{
                            fontSize: ".8em",
                            border: "1px solid #fff",
                            height: "35px",
                            padding: "0px 20px",
                            color: "#fff",
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default EditPartners;
