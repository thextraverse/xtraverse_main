import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import logo from "../../components/images/logo.svg";
import { Box } from "@mui/system";
import { db } from "../../configfile/firebaseConfig";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useUserAuth } from "../../configfile/UserAuthContext";
const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0px;
  z-index: 9;
  padding: 20px 40px;
  .logo {
    width: 60px;
    span {
      width: 100% !important;
    }
  }
  .btnsc {
    display: flex;
    gap: 15px;
    align-items: center;
    a {
      text-decoration: none;
      text-align: center;
      color: #212121;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      font-weight: 600;

      &:last-child {
        margin-left: 30px;
        background: #212121;
        border: 2px solid #212121;
        color: #fff;
        width: 150px;
        height: 42px;
      }
      &:hover {
        text-decoration: underline;
        &:last-child {
          color: #000;
          background: #fff;
          text-decoration: none;
        }
      }
    }
  }
`;

export default function TemplateHeader({ Logo }) {
  const [logo, setLogo] = useState();
  const { user, logOut } = useUserAuth();

  const queryUser = collection(db, "Users");
  const [users, loading, error] = useCollectionData(queryUser);

  const emailData = user.email;
  async function handleGetData() {
    if (!emailData) return;

    const q = query(queryUser, where("Email", "==", emailData));
    const querySnapshot1 = await getDocs(q);

    if (!querySnapshot1.empty) {
      const autoId = querySnapshot1.docs[0].id;
      const subcollectionRef = collection(db, "Users", autoId, "homepage");
      const querySnapshot2 = await getDocs(subcollectionRef);
      const docs = querySnapshot2.docs.map((doc) => doc.data());
      docs.map((data) => {
        setLogo(data.logo);
      });
    }
  }

  useEffect(() => {
    handleGetData();
  }, [emailData]);
  return (
    <Header>
      <div className="logo">
        <Image src={logo} alt="logo" width={100} height={100} />
      </div>
      <div className="btnsc">
        <Link href="/template/marketplace">Marketplace</Link>
        <Link href="/template/waitlist">Waitlist</Link>
        <Link href="/">Connect Wallet</Link>
      </div>
    </Header>
  );
}
