import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import shadow from "../../components/images/shadow.svg";
import { db } from "../../configfile/firebaseConfig";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { Button } from "@mui/material";
import firstimg from "../../components/images/project1.png";
import Link from "next/link";
import TemplateHeader from "../../components/template/TemplateHeader";
import { Box } from "@mui/system";
import { async } from "@firebase/util";
import { useUserAuth } from "../../configfile/UserAuthContext";
import CryptoCanvas from "../../theme/CryptoCanvas";
import EtherEasel from "../../theme/EtherEasel";
import PixelVault from "../../theme/PixelVault";

function TemplateIndex() {
  const { user, logOut } = useUserAuth();
  // console.log(user.email);
  const [tempalteId, setTempalteId] = useState();
  const queryUser = collection(db, "Users");
  // console.log(users);
  const emailData = user.email;
  console.log(emailData);
  async function handleGetData() {
    if (!emailData) return;

    const q = query(queryUser, where("Email", "==", emailData));
    const querySnapshot1 = await getDocs(q);

    if (!querySnapshot1.empty) {
      const autoId = querySnapshot1.docs[0].id;
      const subcollectionRef = collection(db, "Users", autoId, "template");
      const querySnapshot2 = await getDocs(subcollectionRef);
      const docs = querySnapshot2.docs.map((doc) => doc.data());
      docs.map((data) => {
        setTempalteId(data.id);
      });
    }
  }

  useEffect(() => {
    handleGetData();
  }, [emailData]);

  let selectedTemplate;
  if (tempalteId === "CryptoCanvas") {
    selectedTemplate = <CryptoCanvas />;
  } else if (tempalteId === "EtherEasel") {
    selectedTemplate = <EtherEasel />;
  } else if (tempalteId === "PixelVault") {
    selectedTemplate = <PixelVault />;
  }
  return <>{selectedTemplate}</>;
}

export default TemplateIndex;
