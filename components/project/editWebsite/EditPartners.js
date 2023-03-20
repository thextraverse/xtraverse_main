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
  const {
    setparternsHeading,
    imagesList,
    handleParternsImagesChange,
    handleParternsImagesRemove,
  } = props;
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  const uniqueId = v4();
  const [uploadProgress, setUploadProgress] = useState("");
  const [activeTab, setActiveTab] = useState(0);

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
            <Grid item xs={12}>
              <Box>
                <span>Upload Logos </span>
                <div>
                  <div className="inputsc" style={{ marginTop: "5px" }}>
                    <input
                      type="file"
                      placeholder="upload Logo"
                      onChange={handleParternsImagesChange}
                      accept="image/*"
                    />
                    <span>
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <g clipPath="url(#prefix__clip0_890_14854)">
                          <path
                            d="M3.7 18a4.427 4.427 0 01-2.2-3.833 4.422 4.422 0 013.301-4.285l-.001-.14C4.8 5.468 8.247 2 12.5 2c3.621 0 6.658 2.513 7.48 5.9a5.532 5.532 0 013.52 5.161c0 1.81-.864 3.416-2.2 4.425M12.5 22v-9m0 0L9 16.5m3.5-3.5l3.5 3.5"
                            stroke="#fff"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="prefix__clip0_890_14854">
                            <path
                              fill="#fff"
                              transform="translate(.5)"
                              d="M0 0h24v24H0z"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      Upload image
                    </span>
                  </div>
                  <Box sx={{ background: "#252525", borderRadius: "10px" }}>
                    {imagesList.map((image, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px",
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
                          onClick={() => handleParternsImagesRemove(index)}
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
                  </Box>
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
