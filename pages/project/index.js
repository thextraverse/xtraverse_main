import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Sidebar from "../../components/dashboard/sidebar/Navbar";
import Image from "next/image";
import Link from "next/link";
import NextImage from "next/image";
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
  padding: 0px;
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
  &.project {
    width: 75%;
    margin: auto;
    height: 100%;
    margin-top: 120px;
    h1 {
      display: none;
    }
    .createProjectButton {
      button {
        display: block;
      }
    }
  }
  .createProjectButton {
    display: flex;
    justify-content: end;
    width: 100%;
    button {
      display: none;
    }
  }
  .project {
    width: 100%;
    background: #9f56e9;
    padding: 20px;

    h2 {
      font-size: 1.5em;
    }
    span {
      width: 100% !important;
      object-fit: cover;
    }
  }
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
  .dltBtn {
    cursor: pointer;
  }
`;
export default function Project() {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user, setProjectData } = useUserAuth();
  // const uniqueId = v4();
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
  const projectId = projectName && projectName.split(" ").join("");
  console.log(projectId);
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
          image: imageurl,
          projectName: projectName,
          founderName: founderList,
          id: projectId,
        });
        // if (
        //   MySwal.fire({
        //     title: <strong>Uploaded</strong>,
        //     icon: "success",
        //   })
        // );
        router.push("/project/editMarketplace/marketplaceSalespage");
      } else {
        alert("No documents found.");
      }
      setProjectData(projectId);
      setIsNoProject(false);
      // Encode the data as a query parameter
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Error submitting form. Please try again later.");
    }
    setUploadProgress("");
  };
  const [isNoProject, setIsNoProject] = useState(false);

  //! projectuniqeId
  const checkEmail = user.email;
  const [isProject, setIsProject] = useState([]);
  const queryUser = collection(db, "Users");
  async function handleGetData() {
    if (!checkEmail) return;
    const q = query(queryUser, where("Email", "==", checkEmail));
    const querySnapshot1 = await getDocs(q);

    if (!querySnapshot1.empty) {
      const autoId = querySnapshot1.docs[0].id;
      const subcollectionRef = collection(db, "Users", autoId, "project");
      const querySnapshot2 = await getDocs(subcollectionRef);
      const docs = querySnapshot2.docs.map((doc) => doc.data());
      console.log(docs);
      setIsProject(docs);
    }
  }
  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailData]);
  handleGetData();

  console.log("id", isProject);

  return (
    <Main>
      <Dashboardsc>
        <Sidebar activeBtn={2} />
        <Initialize
          className={
            isProject.length != 0 ? (isNoProject ? "" : "project") : ""
          }
        >
          <h1>Initialize Project</h1>
          <div className="createProjectButton">
            <Button
              onClick={() => setIsNoProject(true)}
              sx={{
                width: "200px",
                background: "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
                borderRadius: "8px",
                color: "#000",
                fontSize: "1.2em",
                textTransform: "capitalize",
                padding: "8px 20px",
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
              Create Project
            </Button>
          </div>

          <Grid container spacing={2}>
            {isProject.length != 0 ? (
              isNoProject ? (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        height: "100%",
                      }}
                    >
                      <div className="uploadProject">
                        <input
                          type="file"
                          onChange={handleDesImageChange}
                          required
                        />
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 25 22"
                          fill="none"
                        >
                          <path
                            d="M3.7 17a4.427 4.427 0 01-2.2-3.833 4.422 4.422 0 013.301-4.285l-.001-.14C4.8 4.468 8.247 1 12.5 1c3.621 0 6.658 2.513 7.48 5.9a5.532 5.532 0 013.52 5.161c0 1.81-.864 3.416-2.2 4.425M12.5 21v-9m0 0L9 15.5m3.5-3.5l3.5 3.5"
                            stroke="#fff"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
                  <Grid item xs={6}>
                    <form onSubmit={handleDataSubmit}>
                      <div className="form-wraper">
                        <label htmlFor="name">
                          Name of project (Name of Business)
                        </label>
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
                            <span>Member {index + 1} </span>
                            <div
                              className="dltBtn"
                              onClick={() => handleServiceRemove(index)}
                            >
                              <RiDeleteBinLine />
                            </div>
                          </Box>
                          <input
                            type="text"
                            placeholder="Memeber name"
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
                        <BsPlusCircle /> Add Member
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
              ) : (
                isProject.map((prjctid, index) => {
                  return (
                    <>
                      <Grid item sm={3}>
                        <div className="project">
                          <h2>{prjctid.id}</h2>
                          <div className="image">
                            <Image
                              src={prjctid.image}
                              width={500}
                              height={500}
                              objectFit="cover"
                            />
                          </div>
                        </div>
                      </Grid>
                    </>
                  );
                })
              )
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      height: "100%",
                    }}
                  >
                    <div className="uploadProject">
                      <input
                        type="file"
                        onChange={handleDesImageChange}
                        required
                      />
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 25 22"
                        fill="none"
                      >
                        <path
                          d="M3.7 17a4.427 4.427 0 01-2.2-3.833 4.422 4.422 0 013.301-4.285l-.001-.14C4.8 4.468 8.247 1 12.5 1c3.621 0 6.658 2.513 7.48 5.9a5.532 5.532 0 013.52 5.161c0 1.81-.864 3.416-2.2 4.425M12.5 21v-9m0 0L9 15.5m3.5-3.5l3.5 3.5"
                          stroke="#fff"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                <Grid item xs={6}>
                  <form onSubmit={handleDataSubmit}>
                    <div className="form-wraper">
                      <label htmlFor="name">
                        Name of project (Name of businees)
                      </label>
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
                          <span>Memeber {index + 1} </span>
                          <div
                            className="dltBtn"
                            onClick={() => handleServiceRemove(index)}
                          >
                            <RiDeleteBinLine />
                          </div>
                        </Box>
                        <input
                          type="text"
                          placeholder="Memeber name"
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
                      <BsPlusCircle /> Add Member
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
            )}
          </Grid>
        </Initialize>
      </Dashboardsc>
    </Main>
  );
}
