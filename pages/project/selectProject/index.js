import React, { useState } from "react";
import Slider from "react-slick";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { HiOutlineEye } from "react-icons/hi";
import template1 from "../../../components/images/theme/cryptocanvas.png";
import template2 from "../../../components/images/theme/ethereasel.png";
import template4 from "../../../components/images/theme/pixelvault.png";
import Sidebar, {
  drawerWidth,
} from "../../../components/dashboard/sidebar/Navbar";
import Stepnav from "../../../components/dashboard/step-nav";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
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
  writeBatch,
} from "firebase/firestore";
import { useUserAuth } from "../../../configfile/UserAuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import { XtraverseContainer } from "../..";

const Main = styled.main`
  background: #303030;
  padding: 30px;
  height: 100%;
  color: #fff;
`;
const SlderTemplatesc = styled.div`
  width: 100%;
  margin-top: 110px;
  height: calc(100vh -110px);

  .gridlayout {
    display: grid;
    grid-template-columns: 40% auto;
    gap: 100px;
  }
`;
const SelectTemplate = styled.div`
  position: fixed;
  width: 520px;
  margin-left: 50px;
  border-radius: 10px;
  .templateImg {
    overflow-x: hidden;
    height: 72vh;
    background: #252525;
    border-radius: 10px;

    .image {
      padding: 40px 30px;
      span {
        border-radius: 10px !important;
        overflow: hidden !important;
      }
    }

    .active.image {
      span {
        border: 5px solid #71dd37 !important;
      }
    }

    p {
      font-weight: 600;
      display: block;
      padding: 10px 0px;
    }
  }
  .image {
    width: 100%;
    img {
      object-fit: cover;
    }
  }
`;
const PreiviewBox = styled.div`
  background: #252525;
  height: 80vh;
  padding: 50px 30px;
  display: grid;
  place-items: center;
  place-content: center;
  border-radius: 10px;
  a {
    color: #fff;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
function SelectProject() {
  const [activeImage, setActiveImage] = useState("CryptoCanvas");
  const [imageChange, setImageChange] = useState(template1);
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user } = useUserAuth();
  // user !== null && user.email && (emailData = user.email);
  // user === null && router.push("/");
  const emailData = user.email;
  console.log(emailData);

  const handleDataSubmit = async () => {
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
          "template"
        );
        const querySnapshot = await getDocs(userDataCollectionRef);

        if (!querySnapshot.empty) {
          // User data exists in database, update the existing document
          const docId = querySnapshot.docs[0].id;
          const docRef = doc(userDataCollectionRef, docId);
          await updateDoc(docRef, {
            id: activeImage,
          });
          // if (
          //   MySwal.fire({
          //     title: <strong>Thanks for updating</strong>,
          //     icon: "success",
          //   })
          // );
        } else {
          // User data does not exist in database, create a new document
          await addDoc(userDataCollectionRef, {
            id: activeImage,
          });
          // if (
          //   MySwal.fire({
          //     title: <strong>Thanks for selecting</strong>,
          //     icon: "success",
          //   })
          // );
        }
        router.push("/project/editMarketplace");
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      console.log("No documents found.");
    }
  };
  // console.log(imageChange);
  return (
    <Main>
      <Sidebar activeBtn={2} heading={"Select Project"} />
      <Stepnav />
      <XtraverseContainer>
        <SlderTemplatesc>
          <div className="gridlayout">
            <div></div>
            {/* select template part */}
            <SelectTemplate>
              <div className="templateImg">
                <div
                  className={
                    activeImage === "CryptoCanvas" ? "active image" : "image"
                  }
                  onClick={() => {
                    setImageChange(template1);
                    setActiveImage("CryptoCanvas");
                  }}
                >
                  <p>Template 2</p>
                  <Image src={template1} alt="Picture of the author" />
                </div>
                <div
                  className={
                    activeImage === "EtherEasel" ? "active image" : "image"
                  }
                  onClick={() => {
                    setImageChange(template2);
                    setActiveImage("EtherEasel");
                  }}
                >
                  <p>Template 1</p>

                  <Image src={template2} alt="Picture of the author" />
                </div>
                <div
                  className={
                    activeImage === "PixelVault" ? "active image" : "image"
                  }
                  onClick={() => {
                    setImageChange(template4);
                    setActiveImage("PixelVault");
                  }}
                >
                  <p>Template 3</p>

                  <Image src={template4} alt="Picture of the author" />
                </div>
              </div>
              <Button
                onClick={handleDataSubmit}
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
                Next step
              </Button>
              {/* </Link> */}
            </SelectTemplate>
            <PreiviewBox>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0px",
                }}
              >
                <h1>{activeImage}</h1>
                <Link href="/template">
                  <a>
                    See Full Preview <HiOutlineEye />
                  </a>
                </Link>
              </Box>
              <div className="imgbox">
                <Image src={imageChange} alt="image chnage" />
              </div>
            </PreiviewBox>
          </div>
        </SlderTemplatesc>
      </XtraverseContainer>
    </Main>
  );
}

export default SelectProject;
