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

function EditDescription(props) {
  const {
    desType,
    setDesType,
    setDesHeading,
    handleDesImageChange,
    setEditHeroScript,
    setHeroButton,
    showDesColorPopup,
    desOverlayColor,
    setDesOverlayColor,
    setShowDesColorPopup,
    setDesSubHeading,
    setDesSubtext,
    formId,
    setFormId,
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
            <Grid xs={12}>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <div
                    className={
                      desType === "destype1" ? "hero-type active" : "hero-type"
                    }
                    onClick={() => setDesType("destype1")}
                  >
                    <Image
                      src="/images/templatePage/herotype1.svg"
                      alt="hero-type1"
                      width={100}
                      height={100}
                    />
                  </div>
                </Grid>
                <Grid xs={6}>
                  <div
                    className={
                      desType === "destype2" ? "hero-type active" : "hero-type"
                    }
                    onClick={() => setDesType("destype2")}
                  >
                    <Image
                      src="/images/templatePage/herotype2.svg"
                      alt="hero-type2"
                      width={100}
                      height={100}
                    />
                  </div>
                </Grid>
                <Grid xs={6}>
                  <div
                    className={
                      desType === "destype3" ? "hero-type active" : "hero-type"
                    }
                    onClick={() => setDesType("destype3")}
                  >
                    <Image
                      src="/images/templatePage/herotype3.svg"
                      alt="hero-type2"
                      width={100}
                      height={100}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12}>
              <Box
                sx={{
                  marginTop: "15px",
                }}
              >
                <div className="inputsc">
                  <input
                    type="file"
                    placeholder="upload Logo"
                    onChange={handleDesImageChange}
                    accept="image/*"
                  />
                  <span>
                    <IoMdCloudUpload />
                    Upload image
                  </span>
                </div>
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box>
                <span>Add Subheadling</span>
                <input
                  type="text"
                  placeholder="Ex: Robo Gremlins"
                  onChange={(e) => setDesSubHeading(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box>
                <span>Add Heading</span>
                <input
                  type="text"
                  placeholder="Ex: Robo Gremlins"
                  onChange={(e) => setDesHeading(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box sx={{}}>
                <span>Description</span>
                <input
                  onChange={(e) => setDesSubtext(e.target.value)}
                  type="text"
                  placeholder="EX: Our Fancy shamny NFT..."
                />
              </Box>
            </Grid>

            <Grid xs={12}>
              <Box sx={{}}>
                <span>Button</span>
                <input
                  onChange={(e) => setHeroButton(e.target.value)}
                  type="text"
                  placeholder="e.g View On Marketplace"
                />
              </Box>
            </Grid>
            <Grid xs={12}>
              <div className="selectColorType">
                <span
                  style={{
                    padding: "5px 0px 10px",
                    display: "block",
                  }}
                >
                  Add Backgorund Color
                </span>
                <div
                  className="inputsc btninputsc"
                  onClick={(e) => {
                    setShowDesColorPopup(true);
                    e.stopPropagation();
                  }}
                >
                  <Button>
                    <AiOutlinePlus />
                    gradient or color
                  </Button>
                </div>
                {showDesColorPopup && (
                  <div
                    className="picColor"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ColorPicker
                      value={desOverlayColor}
                      onChange={setDesOverlayColor}
                    />
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default EditDescription;
