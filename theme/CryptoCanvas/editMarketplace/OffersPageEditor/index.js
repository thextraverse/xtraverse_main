import { Box, Button, Grid } from "@mui/material";
import { height } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { AiFillPlusCircle } from "react-icons/ai";
import ItemAcivity from "../../../../components/project/EditMarketplace/ItemActivity";
import {
  PreviewBox,
  ProductSec,
} from "../../../../components/styles/uploadnft.style";

import {
  query,
  addDoc,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { useUserAuth } from "../../../../configfile/UserAuthContext";
import { RiDeleteBinLine } from "react-icons/ri";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { XtraverseContainer } from "../../../../pages/index";
import { db } from "../../../../configfile/firebaseConfig";

function CryptoCanvasMarketPlaceOfferPageEditor(props) {
  const { offerHeader, offerSubtexxt, setActiveOffer } = props;
  //! for Closing layout

  //!  upload section
  const [tempalteId, setTempalteId] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploadProgrees, setImageUploadProgrees] = useState(0);
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { user, projectData } = useUserAuth();
  const emailData = user.email;
  let idData = [];
  //! projectuniqeId
  const queryUser = collection(db, "Users");
  async function handleGetData() {
    if (!emailData) return;
    const q = query(queryUser, where("Email", "==", emailData));
    const querySnapshot1 = await getDocs(q);

    if (!querySnapshot1.empty) {
      const autoId = querySnapshot1.docs[0].id;
      const subcollectionRef = collection(db, "Users", autoId, "project");
      const querySnapshot2 = await getDocs(subcollectionRef);

      const pq = query(subcollectionRef, where("id", "==", projectData));
      const projectQuerySnapshot = await getDocs(pq);

      if (!projectQuerySnapshot.empty) {
        const projectAutoId = projectQuerySnapshot.docs[0].id;
        console.log(`productAudtoId: ${projectAutoId}`);
        const ProductDataCollectionRef = collection(
          db,
          "Users",
          autoId,
          "project"
        );
        const productQuerySnapshot2 = await getDocs(ProductDataCollectionRef);
        const docs = productQuerySnapshot2.docs.map((doc) => doc.data());
        console.log(docs);
        setTempalteId(docs);
      }
    } else {
      router.push("/project");
    }
  }

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailData]);
  console.log("data", tempalteId);

  // console.log(idData);
  // idData.map((itm, index) => {
  //   console.log(itm);
  // });
  // console.log(projectData);
  //! salespagedata
  const handleDataSubmit = async () => {
    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("Email", "==", emailData));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const autoId = querySnapshot.docs[0].id;
        console.log(`AutoId: ${autoId}`);

        const projectRef = collection(db, "Users", autoId, "project");
        const pq = query(projectRef, where("id", "==", projectData));
        const projectQuerySnapshot = await getDocs(pq);

        if (!projectQuerySnapshot.empty) {
          const projectAutoId = projectQuerySnapshot.docs[0].id;
          console.log(`productAudtoId: ${projectAutoId}`);
          const offersDataCollectionRef = collection(
            db,
            "Users",
            autoId,
            "project",
            projectAutoId, // Assuming that the first ID in idData is the one you want to use
            "OffersPageData"
          );

          await addDoc(offersDataCollectionRef, {
            offersPageEditor: {
              offerHeader: offerHeader,
              offerSubtexxt: offerSubtexxt,
            },
          });

          if (
            MySwal.fire({
              title: <strong>Uploaded</strong>,
              icon: "success",
            })
          );
        } else {
          alert("No project found.");
        }
      } else {
        alert("No user found.");
      }

      setActiveOffer(false);
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Error submitting form. Please try again later.");
    }

    setUploadProgress("");
  };

  // console.log("productdata", productData);
  return (
    <>
      <PreviewBox className="salespageeditor">
        <div className="videowrap">
          <h1>{offerHeader}</h1>
          <p>{offerSubtexxt}</p>
        </div>
        <Grid container spacing={4}>
          {/* {tempalteId &&
            tempalteId.map((prjctid, index) => {
              return (
                <>
                  <Grid item sm={4}>
                    <ProductSec>
                      <div className="createproduct">
                        <p>{prjctid.id}</p>
                        <Image src={prjctid.image} width={500} height={500} />
                      </div>
                    </ProductSec>
                  </Grid>
                </>
              );
            })} */}
          <Grid item sm={4}>
            <ProductSec>
              <div className="createproduct">
                <Button
                  sx={{
                    border: "2px solid #fff",
                    height: "100%",
                    width: "240px",
                    fontSize: "2.3em",
                    color: "#fff",
                    margin: "20px 0px",
                  }}
                  onClick={handleDataSubmit}
                >
                  <AiFillPlusCircle />
                </Button>
              </div>
            </ProductSec>
          </Grid>
        </Grid>
      </PreviewBox>
    </>
  );
}

export default CryptoCanvasMarketPlaceOfferPageEditor;
