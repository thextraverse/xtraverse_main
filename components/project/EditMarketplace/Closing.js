import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import PercentIcon from "@mui/icons-material/Percent";
import { AiOutlinePlus } from "react-icons/ai";
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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import { Form } from "../../styles/homepage.styled";
import { HomepagePreview } from "../../dashboard/edithome/edithomepage.style";
import { db, auth, storage } from "../../../configfile/firebaseConfig";
import { useUserAuth } from "../../../configfile/UserAuthContext";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaPercent } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";

function MarketPlaceClosing(props) {
  const {
    setClosingTopTxt,
    setClosingHeader,
    setClosingSubtexxt,
    setClosingBtn,
    closingBtn,
    handleClosingBtnChange,
    handleClosingVideoChange,
  } = props;
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  const uniqueId = v4();
  const [uploadProgress, setUploadProgress] = useState("");
  const [activeTab, setActiveTab] = useState(0);

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
            <Grid xs={12}>
              <Box>
                <span>Top Text</span>
                <input
                  type="text"
                  placeholder="Draken's Origin"
                  onChange={(e) => setClosingTopTxt(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box>
                <span>Header</span>
                <input
                  type="text"
                  placeholder="Draken's Origin"
                  onChange={(e) => setClosingHeader(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box>
                <span>Subtext </span>
                <textarea
                  onChange={(e) => setClosingSubtexxt(e.target.value)}
                  placeholder="Add your "
                />
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box>
                <div className="inputsc" style={{ marginBottom: "0px" }}>
                  <input
                    type="file"
                    placeholder="video upload"
                    onChange={handleClosingVideoChange}
                    accept="video/mp4,video/x-m4v,video/*"
                  />
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.2 18C1.88484 17.235 1 15.8051 1 14.1674C1 12.1053 2.40285 10.3727 4.30122 9.88197C4.30041 9.83571 4.3 9.78935 4.3 9.7429C4.3 5.46661 7.74741 2 12 2C15.6211 2 18.6584 4.51348 19.4806 7.90009C21.5395 8.69955 23 10.7089 23 13.0613C23 14.8707 22.1359 16.4772 20.8 17.4862M12 22V13M12 13L8.5 16.5M12 13L15.5 16.5"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Upload Video
                  </span>
                </div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "1.4em",
                  padding: "10px 0px",
                }}
              >
                or
              </Box>
              <Button className="grndBrdr">Calendly Integration</Button>
            </Grid>

            <Grid xs={12}>
              <Box
                sx={{
                  gap: "10px",
                }}
              >
                <span>Button</span>
                <input
                  onChange={(e) => handleClosingBtnChange(e)}
                  type="text"
                  value={closingBtn.button}
                  placeholder="e.g View on Marketplace"
                  name="button"
                />
              </Box>
              <div>
                <div className="BtnLinksc">
                  <Button
                    className={activeTab === 0 ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(0);
                    }}
                    sx={{
                      padding: "5px 20px",
                    }}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.86085 12.9989L8.38706 13.4877C7.07874 14.8374 4.95753 14.8374 3.64921 13.4877C2.34089 12.138 2.34089 9.94968 3.64921 8.59996L4.77901 7.43442C5.98669 6.18853 7.94473 6.18853 9.15241 7.43442L9.33464 7.62241M8.47509 4.00106L8.94887 3.51229C10.2572 2.16257 12.3784 2.16257 13.6867 3.51229C14.995 4.862 14.995 7.05032 13.6867 8.40004L12.5569 9.56558C11.3492 10.8115 9.39121 10.8115 8.18353 9.56558L8.0013 9.37759"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Button>
                  <Button
                    className={activeTab === 1 ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(1);
                    }}
                  >
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.33203 1.83325H9.66536V1.83325C10.5947 1.83325 11.0593 1.83325 11.4457 1.91011C13.0325 2.22574 14.2729 3.46613 14.5885 5.05289C14.6654 5.43929 14.6654 5.90394 14.6654 6.83325V10.1666C14.6654 11.0959 14.6654 11.5606 14.5885 11.9469C14.2729 13.5337 13.0325 14.7741 11.4457 15.0897C11.0593 15.1666 10.5947 15.1666 9.66536 15.1666V15.1666H9.33203M1.33203 8.49992H9.33203M9.33203 8.49992L6.66536 5.83325M9.33203 8.49992L6.66536 11.1666"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Button>
                  <Button
                    className={activeTab === 2 ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(2);
                    }}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.66797 3.16659V10.3666C1.66797 12.0467 1.66797 12.8868 1.99495 13.5286C2.28257 14.093 2.74151 14.552 3.306 14.8396C3.94773 15.1666 4.78781 15.1666 6.46797 15.1666H10.2013C11.8815 15.1666 12.7215 15.1666 13.3633 14.8396C13.9278 14.552 14.3867 14.093 14.6743 13.5286C15.0013 12.8868 15.0013 12.0467 15.0013 10.3666V9.29992C15.0013 7.61976 15.0013 6.77968 14.6743 6.13795C14.3867 5.57346 13.9278 5.11452 13.3633 4.8269C12.7215 4.49992 11.8815 4.49992 10.2013 4.49992H8.33464M15.0013 7.83325H14.668C13.5634 7.83325 12.668 8.72868 12.668 9.83325V9.83325C12.668 10.9378 13.5634 11.8333 14.668 11.8333H15.0013M11.668 4.49992L11.588 4.39325C10.884 3.45459 10.532 2.98526 10.0859 2.64676C9.69076 2.34695 9.24334 2.12324 8.76643 1.98703C8.22796 1.83325 7.6413 1.83325 6.46797 1.83325H3.0013C2.26492 1.83325 1.66797 2.43021 1.66797 3.16659V3.16659C1.66797 3.90296 2.26492 4.49992 3.0013 4.49992H11.668Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Button>
                </div>

                <div className="tab-content">
                  {activeTab === 0 && (
                    <div>
                      <Box
                        sx={{
                          gap: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <input
                          onChange={(e) => handleClosingBtnChange(e)}
                          value={closingBtn.link}
                          name="link"
                          id="link"
                          type="text"
                          placeholder="Add custom link"
                        />
                      </Box>
                    </div>
                  )}
                  {activeTab === 1 && (
                    <div>
                      <Box
                        sx={{
                          gap: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <input
                          onChange={(e) => setClosingBtn(e.target.value)}
                          type="text"
                          placeholder="e.g View on Marketplace"
                        />
                      </Box>
                    </div>
                  )}
                  {activeTab === 2 && (
                    <div>
                      <Box
                        sx={{
                          gap: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <input
                          onChange={(e) => featureBtn(e.target.value)}
                          type="text"
                          placeholder="e.g View on Marketplace"
                        />
                      </Box>
                    </div>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default MarketPlaceClosing;
