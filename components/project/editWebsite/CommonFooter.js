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

function CommonFooter(props) {
  const {
    handleFooterImageChange,
    setFooterDescription,
    setFooterCopyright,
    setFooterTwiiter,
    setFooterDiscord,
    setFooterInstagram,
    setFooterHeading,
    setFooterButton,
  } = props;
  const router = useRouter();

  // const [firebaseUserData, setFirebaseUserData] = useState([]);
  // useEffect(() => {
  //   getTemplates();
  // }, []);
  // useEffect(() => {}, [firebaseUserData]);

  // function getTemplates() {
  //   const getUploadDataRef = collection(db, "Users");
  //   getDocs(getUploadDataRef)
  //     .then((response) => {
  //       console.log(response.docs);
  //       const datas = response.docs.map((doc) => ({
  //         data: doc.data(),
  //         id: doc.id,
  //       }));
  //       setFirebaseUserData(datas);
  //     })
  //     .catch((error) => {
  //       console.log(error.messages);
  //     });
  // }
  // var ameniemailData = [];
  // var useruid = [];
  // firebaseUserData.map((userData, index) => {
  //   const uid = userData.data.Uid;
  //   const userEmail = userData.data.Email;
  //   ameniemailData.push(userEmail);
  //   useruid.push(uid);
  // });
  // console.log(emailData);

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
                <Box sx={{}}>
                  <input
                    onChange={(e) => setFooterDiscord(e.target.value)}
                    type="text"
                    placeholder="Discord URL"
                  />
                </Box>
                <Box sx={{}}>
                  <input
                    onChange={(e) => setFooterInstagram(e.target.value)}
                    type="text"
                    placeholder="Instagram URL"
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
