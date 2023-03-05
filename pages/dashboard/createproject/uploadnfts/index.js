import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/dashboard/SideBar";
import Stepnav from "../../../../components/dashboard/StepNav";
import { Box } from "@mui/system";
import { db } from "../../../../configfile/firebaseConfig";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { useUserAuth } from "../../../../configfile/UserAuthContext";
import CryptoCanvasEditHome from "../../../../theme/CryptoCanvas/EditHomePage";
import CryptoCanvasUploadNftIndex from "../../../../theme/CryptoCanvas/UploadNft";
import EtherEaselUploadNftIndex from "../../../../theme/EtherEasel/UploadNft";
import PixelVaultUploadNftIndex from "../../../../theme/PixelVault/UploadNft";

const drawerWidth = 240;

const Main = styled.main`
  background: #303030;
  padding: 30px;
  .activeDot {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 30px 0px;
    li {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      list-style: none;
      background: transparent;
      border: 2px solid #fff;
      transition: all 0.3s;
      &.active {
        background: #fff;
      }
    }
  }
`;

function UploadNftindex() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailData]);

  let selectedTemplate;
  if (tempalteId === "CryptoCanvas") {
    selectedTemplate = <CryptoCanvasUploadNftIndex />;
  } else if (tempalteId === "EtherEasel") {
    selectedTemplate = <EtherEaselUploadNftIndex />;
  } else if (tempalteId === "PixelVault") {
    selectedTemplate = <PixelVaultUploadNftIndex />;
  }
  return (
    <Main>
      <Sidebar />
      <Box
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          marginLeft: "auto",
          background: "transparent",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "100%",
          alignItems: "center",
        }}
      >
        <Stepnav />
        {selectedTemplate}
      </Box>
    </Main>
  );
}

export default UploadNftindex;
