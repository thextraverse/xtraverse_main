import React, { useState } from "react";
import styled from "@emotion/styled";
import Sidebar from "../../components/dashboard/sidebar/Navbar";
import Image from "next/image";
import Link from "next/link";
import logo from "../../components/images/logo.svg";
import { Box } from "@mui/system";
import CreateProject from "../../components/dashboard/create-project";
import { Form } from "../../components/dashboard/dashboard.styled";
import { Button, Grid } from "@mui/material";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import { BsPlusCircle } from "react-icons/bs";
import { useUserAuth } from "../../configfile/UserAuthContext";
import { db, storage } from "../../configfile/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import {
  query,
  addDoc,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { v4 } from "uuid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

const Main = styled.main`
  background: #303030;
  padding: 30px;
  height: 100%;
  color: #fff;
`;

const Dashboardsc = styled.div`
  width: 100%;
  position: relative;
`;
const Initialize = styled.div`
  width: 800px;
  gap: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: auto;
  .uploadProject {
    width: 100%;
    background: #252525;
    border: 2px dashed #8a8a8e;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 10px;
    height: 400px;
    cursor: pointer;
    position: relative;
    .img {
      width: 100%;
      position: absolute;
      z-index: 1;
      height: 100%;
      span {
        width: 100% !important;
        height: 100% !important;
      }
      img {
        object-fit: cover;
      }
    }
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      opacity: 0;
      z-index: 3;
    }
  }
  h1 {
    font-weight: 600;
    margin: 20px 0px;
  }
  form {
    margin: 0px 15px;
    input {
      width: 100%;
      background: #252525;
      color: #fff;
      border: none;
      padding: 15px 10px;
      border-radius: 10px;
      outline: none;
      font-size: 1.1em;
      margin: 4px 0px;
      &::placeholder {
        opacity: 0.3;
      }
    }
    label {
      font-size: 0.98em;
      padding: 3px 0px;
      display: block;
    }
    .form-wraper {
      margin-bottom: 30px;
      input {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    }
  }
`;
export default function Project() {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  const uniqueId = v4();
  let emailData = null;

  user !== null && user.email && (emailData = user.email);
  user === null && router.push("/");

  const [ProjectCoverImg, setProjectCoverImg] = useState();
  const [upldPrjctCover, setUpldPrjctCover] = useState("");
  const handleDesImageChange = (event) => {
    const imageFile = event.target.files[0];
    setProjectCoverImg(URL.createObjectURL(imageFile));
    setUpldPrjctCover(imageFile);
  };

  const [projectName, setProjectName] = useState();
  const [founderList, setFounderList] = useState([{ founder: "" }]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...founderList];
    list[index][name] = value;
    setFounderList(list);
  };
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploadProgrees, setImageUploadProgrees] = useState(0);
  const handleServiceRemove = (index) => {
    const list = [...founderList];
    list.splice(index, 1);
    setFounderList(list);
  };

  const handleServiceAdd = () => {
    setFounderList([...founderList, { founder: "" }]);
  };
  console.log(founderList);

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `images/${upldPrjctCover.name + v4()}`);

    // Upload the files to Firebase storage
    const [imageSnapshot] = await Promise.all([
      uploadBytesResumable(imageRef, upldPrjctCover),
    ]);

    // Track upload progress for image
    let imageUploadProgress = 0;
    const imageUploadTask = uploadBytesResumable(imageRef, upldPrjctCover);
    imageUploadTask.on(
      "state_changed",
      (snapshot) => {
        imageUploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Image Upload Progress: ${imageUploadProgress}%`);
        setImageUploadProgrees(imageUploadProgress);
        setUploadProgress(imageUploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Image upload complete.");
      }
    );

    // Wait for all the files to finish uploading
    await Promise.all([imageUploadTask]);
    // Get the download URLs for the files
    const [imageurl] = await Promise.all([getDownloadURL(imageSnapshot.ref)]);

    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("Email", "==", emailData));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const autoId = querySnapshot.docs[0].id;
        console.log(`AutoId: ${autoId}`);
        const userDataCollectionRef = collection(
          db,
          "Users",
          autoId,
          "project"
        );
        await addDoc(userDataCollectionRef, {
          project: imageurl,
          projectName: projectName,
          founderName: founderList,
          id: uniqueId,
        });
        if (
          MySwal.fire({
            title: <strong>Uploaded</strong>,
            icon: "success",
          })
        );
      } else {
        alert("No documents found.");
      }
      router.push("/project/editMarketplace/marketplaceSalespage");
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Error submitting form. Please try again later.");
    }
    setUploadProgress("");
  };

  return (
    <Main>
      <Dashboardsc>
        <Sidebar activeBtn={2} heading={"Project"} />
        <Initialize>
          <h1>Initialize Project</h1>
          <Grid container spacing={2}>
            <Grid sm={6}>
              <Box
                sx={{ display: "grid", placeItems: "center", height: "100%" }}
              >
                <div className="uploadProject">
                  <input type="file" onChange={handleDesImageChange} required />
                  <svg
                    width="25"
                    height="22"
                    viewBox="0 0 25 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.7 17C2.38484 16.235 1.5 14.8051 1.5 13.1674C1.5 11.1053 2.90285 9.37272 4.80122 8.88197C4.80041 8.83571 4.8 8.78935 4.8 8.7429C4.8 4.46661 8.24741 1 12.5 1C16.1211 1 19.1584 3.51348 19.9806 6.90009C22.0395 7.69955 23.5 9.70891 23.5 12.0613C23.5 13.8707 22.6359 15.4772 21.3 16.4862M12.5 21V12M12.5 12L9 15.5M12.5 12L16 15.5"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p>Upload project cover</p>
                  {ProjectCoverImg && (
                    <div className="img">
                      <Image
                        src={ProjectCoverImg}
                        width={100}
                        height={100}
                        alt="projectCover"
                      />
                    </div>
                  )}
                </div>
              </Box>
            </Grid>
            <Grid sm={6}>
              <form onSubmit={handleDataSubmit}>
                <div className="form-wraper">
                  <label htmlFor="name">Name of project (keep it simple)</label>
                  <input
                    type="text"
                    placeholder="Add a name for your project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>
                {founderList.map((singleService, index) => (
                  <div key={index} className="services">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "end",
                        padding: "8px 0px",
                      }}
                    >
                      <span>Founder {index + 1} </span>
                      <div
                        className="dltBtn"
                        onClick={() => handleServiceRemove(index)}
                      >
                        <RiDeleteBinLine />
                      </div>
                    </Box>
                    <input
                      type="text"
                      placeholder="Founder's name"
                      name="founder"
                      id="founder"
                      value={singleService.service}
                      onChange={(e) => handleServiceChange(e, index)}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={singleService.service}
                      onChange={(e) => handleServiceChange(e, index)}
                    />
                  </div>
                ))}
                <Button
                  onClick={handleServiceAdd}
                  sx={{
                    background: "#252525",
                    width: "100%",
                    borderRadius: "8px",
                    fontSize: "1.2em",
                    textTransform: "capitalize",
                    padding: "8px 0px",
                    transition: "0.3s",
                    fontWeight: "500",
                    margin: "10px 0px",
                    display: "flex",
                    gap: "8px",
                    border: "2px dashed #8A8A8E",
                    color: "#fff",
                    cursor: "pointer",
                    "&:hover ": {
                      border: "2px dashed #fff",
                    },
                  }}
                >
                  <BsPlusCircle /> Add Founder
                </Button>
                <Button
                  type="submit"
                  sx={{
                    width: "100%",
                    background:
                      "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
                    borderRadius: "8px",
                    color: "#000",
                    fontSize: "1.2em",
                    textTransform: "capitalize",
                    padding: "8px 0px",
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
                  Initialize
                </Button>
              </form>
            </Grid>
          </Grid>
        </Initialize>
      </Dashboardsc>
    </Main>
  );
}
