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
    heroType,
    setHeroType,
    uploadLogo,
    editHeroName,
    setEditHeroName,
    editHeroScript,
    handleImageChange,
    setEditHeroScript,
    setHeroButton,
    heroOverlayColor,
    setHeroOverlayColor,
    showColorPopup,
    setShowColorPopup,
    formId,
    setFormId,
    browseClctionBtn,
    handleBrowseClctionBtn,
  } = props;
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  const uniqueId = v4();
  const [uploadProgress, setUploadProgress] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [royaltiesList, setRoyaltiesList] = useState([{ founder: "" }]);
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...royaltiesList];
    list[index][name] = value;
    setRoyaltiesList(list);
  };
  const handleServiceRemove = (index) => {
    const list = [...royaltiesList];
    list.splice(index, 1);
    setRoyaltiesList(list);
  };

  const handleServiceAdd = () => {
    setRoyaltiesList([...royaltiesList, { founder: "" }]);
  };
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
  const emailData = user.email;
  console.log(emailData);
  // handleshubmit function for sending data to firebase

  const handleDataSubmit = async () => {
    const imageRef = ref(storage, `images/nft${uploadLogo.name + v4()}`);

    // Upload the file to Firebase storage
    const uploadTask = uploadBytesResumable(imageRef, uploadLogo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.totalBytes
          ? Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          : 0;
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        // File upload complete
        const [imageSnapshot] = await Promise.all([
          uploadBytes(imageRef, uploadLogo),
        ]);
        // Get the download URLs for the file
        const [imageurl] = await Promise.all([
          getDownloadURL(imageSnapshot.ref),
        ]);

        // Check if user already exists in database
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("Email", "==", emailData));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const autoId = querySnapshot.docs[0].id;
          console.log(`AutoId: ${autoId}`);
          try {
            const userDataCollectionRef = collection(
              db,
              "Users",
              autoId,
              "homepage"
            );
            const querySnapshot = await getDocs(userDataCollectionRef);

            if (!querySnapshot.empty) {
              // User data exists in database, update the existing document
              const docId = querySnapshot.docs[0].id;
              // console.log(`DocId: ${docId}`);
              const docRef = doc(userDataCollectionRef, docId);
              await updateDoc(docRef, {
                logo: imageurl,
                heading: editHeroName,
                description: editHeroScript,

                id: uniqueId,
              });
              if (
                MySwal.fire({
                  title: <strong>Uploaded</strong>,
                  icon: "success",
                })
              );
            } else {
              // User data does not exist in database, create a new document
              await addDoc(userDataCollectionRef, {
                logo: imageurl,
                heading: editHeroName,
                description: editHeroScript,
                id: uniqueId,
              });
              if (
                MySwal.fire({
                  title: <strong>Uploaded</strong>,
                  icon: "success",
                })
              );
            }
          } catch (error) {
            console.error("Error updating document:", error);
          }
        } else {
          console.log("No documents found.");
        }
        // Reset the upload progress bar
        setUploadProgress("");
      }
    );
  };

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
            <Grid xs={12}>
              <Box>
                <span>Add Headline</span>
                <input
                  type="text"
                  placeholder="Ex: Robo Gremlins"
                  onChange={(e) => setEditHeroName(e.target.value)}
                />
              </Box>
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
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <span>
                    <IoMdCloudUpload />
                    Upload image
                  </span>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                {royaltiesList.map((singleService, index) => (
                  <div key={index} className="services">
                    <span>Royalties</span>
                    <div className="royalties">
                      <div className="roayltiesinput">
                        <input
                          type="text"
                          placeholder="Enter Wallet Address"
                          name="royalties"
                          value={singleService.service}
                          onChange={(e) => handleServiceChange(e, index)}
                        />

                        <div className="parcentage">
                          <PercentIcon />
                        </div>
                      </div>
                      <Button onClick={handleServiceAdd}>
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M8 12.5h4m0 0h4m-4 0v-4m0 4v4m-.4 6h.8c3.36 0 5.04 0 6.324-.654a6 6 0 002.622-2.622C22 17.94 22 16.26 22 12.9v-.8c0-3.36 0-5.04-.654-6.324a6 6 0 00-2.622-2.622C17.44 2.5 15.76 2.5 12.4 2.5h-.8c-3.36 0-5.04 0-6.324.654a6 6 0 00-2.622 2.622C2 7.06 2 8.74 2 12.1v.8c0 3.36 0 5.04.654 6.324a6 6 0 002.622 2.622c1.284.654 2.964.654 6.324.654z"
                            stroke="#fff"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default EditPartners;
