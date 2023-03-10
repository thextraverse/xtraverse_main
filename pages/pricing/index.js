import React, { useState } from "react";
import logo from "../../components/images/logo/whitelogo.png";
import styled from "@emotion/styled";
import { db } from "../../configfile/firebaseConfig";
import {
  query,
  addDoc,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useUserAuth } from "../../configfile/UserAuthContext";
import { Box } from "@mui/system";
import { Button } from "@mui/joy";
import { BiDollar } from "react-icons/bi";

import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
const Infosec = styled.section`
  height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
  header {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100%;
    display: flex;
    justify-content: start;
    z-index: 9;
    span {
      cursor: pointer;
    }
  }
`;
const Bgblur = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  height: 100vh;
  .blurwrap {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;
const Bgblur1 = styled.div`
  z-index: 3;
  position: absolute;
  width: 35rem;
  height: 36rem;
  bottom: -35%;
  right: 50%;
  background: linear-gradient(180deg, #195f64 0%, #06e9fe 100%);
  filter: blur(127px);
  transform: rotate(-21.24deg);
  animation: 10s linear 0s infinite reverse none running rotate1;
  @media screen and (max-width: 1536px) {
    width: 20rem;
    height: 26rem;
  }
  @keyframes rotate1 {
    0% {
      transform: translate(48vw, -16rem) rotate(0deg);
    }

    100% {
      transform: translate(48vw, -16rem) rotate(360deg);
    }
  }
`;

const Bgblur2 = styled.div`
  z-index: 1;
  position: absolute;
  width: 23rem;
  height: 20rem;
  bottom: -27%;
  right: 68%;
  background: linear-gradient(rgb(228, 241, 46) 0%, rgb(86, 219, 99) 100%);
  filter: blur(4rem);
  border-radius: 50%;
  transform: translate(-29vw, -30rem);
  animation: 10s linear 0s infinite reverse none running rotate3;
  @media screen and (max-width: 1536px) {
    width: 16rem;
    height: 15rem;
    bottom: -43%;
    right: 65%;
  }
  @keyframes rotate3 {
    0% {
      transform: translate(48vw, -16rem) rotate(0deg);
    }

    100% {
      transform: translate(48vw, -16rem) rotate(360deg);
    }
  }
`;
const PricePlan = styled.div`
  width: 280px;
  border-radius: 10px;
  overflow: hidden;
  background: #000;
  height: 280px;
  position: relative;
  margin: 40px 0px;
  border: 2px solid transparent;
  &.active {
    border: 2px solid #fff;
  }
  .title {
    background: linear-gradient(263.09deg, #ea05aa 2.48%, #f60e5c 96.02%);
    padding: 20px;
    color: #fff;
    text-align: center;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    p {
      padding: 0px 0px 15px 0px;
      font-weight: 600;
    }
    span {
      font-size: 0.75em;
      font-weight: 600;
      display: block;
      padding: 6px 0px;
    }
    sub {
      font-size: 1em;
      font-weight: 600;
    }
    h1 {
      display: flex;
      align-items: center;
      font-size: 2.5em;
      line-height: 100%;
    }
    &.scnd-title {
      background: linear-gradient(
        98.02deg,
        #05d9fc -1.71%,
        rgba(0, 110, 172, 0.92) 100.12%
      );
    }
  }
  text-align: center;
  .btndiv {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    text-align: center;
  }
  button {
    margin: 15px 0px;
    &.active {
    }
  }
  ul {
    padding: 10px 30px;
    li {
      text-align: left;
      font-size: 0.9em;
      color: #fff;
      opacity: 0.8;
      text-transform: capitalize;
    }
  }
`;
export const Form = styled.form`
  color: rgba(255, 255, 255, 0.6);
  position: relative;
  z-index: 5;
  padding: 50px 40px;
  /* background: #2f2f2f; */
  position: relative;
  border-radius: 10px;
  border: 1px solid #444;
  overflow: hidden;
  backdrop-filter: blur(53px);
  .logo {
    display: flex;
    justify-content: center;
  }
  label {
    display: block;
    padding: 8px 0px;
    color: #fff;
  }
  input {
    border: none;
    border-radius: 10px;
    width: 100%;
    padding: 15px 15px;
    font-size: 1.1em;
    color: #fff;
    outline: none;
    font-family: "Open Sans", sans-serif;
    background: #252525;
    &::placeholder {
      opacity: 0.25;
    }
  }
  input[type="submit"] {
    width: 100%;
    background: linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%);
    opacity: 0.7;
    border-radius: 8px;
    color: #000;
    font-size: 1.2em;
    text-transform: capitalize;
    padding: 15px 0px;
    transition: 0.3s;
    font-weight: 600;
    &:hover {
      background: linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%);
      opacity: 1;
      cursor: pointer;
    }
  }
`;
function Pricing() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [priceSelector, setPriceSelector] = useState("");
  const { user } = useUserAuth();
  const emailData = user.email;
  // console.log(emailData);
  // console.log(user);
  console.log(priceSelector);
  const handleDataSubmit = async (e) => {
    e.preventDefault();
    // Check if user already exists in database
    const usersRef = collection(db, "Users");
    const querySnapshot = await getDocs(
      query(usersRef, where("Email", "==", emailData))
    );

    if (!querySnapshot.empty) {
      //   const autoId = querySnapshot.docs[0].id;
      //   console.log(`AutoId: ${autoId}`);
      //   console.log(autoId);
      try {
        if (!querySnapshot.empty) {
          // User data exists in database, update the existing document
          const docId = querySnapshot.docs[0].id;
          const docRef = doc(usersRef, docId);
          await updateDoc(docRef, {
            Pricing: priceSelector,
          });
          if (router.push("/dashboard"));
        } else {
          // User data does not exist in database, create a new document
          await addDoc(usersRef, {
            Pricing: priceSelector,
          });
          if (router.push("/dashboard"));
        }
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      console.log("No documents found.");
    }
  };

  return (
    <>
      <Infosec>
        <header>
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
        </header>
        <Bgblur>
          <div className="blurwrap">
            <Bgblur1></Bgblur1>
            <Bgblur2></Bgblur2>
          </div>
        </Bgblur>
        <Form onSubmit={handleDataSubmit}>
          <div className="logo">
            <Image src={logo} alt="logo" />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <PricePlan
                className={priceSelector === "19/month" ? "active" : ""}
              >
                <div className="title">
                  <p>Xtravarse Passport</p>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "center",
                    }}
                  >
                    <h1>
                      <BiDollar />
                      19
                    </h1>
                    <sub>/ Mo</sub>
                  </Box>

                  <span>or $199 yearly</span>
                </div>
                <ul>
                  <li>Minting page generator</li>
                  <li>NFT creator studio</li>
                </ul>
                <div className="btndiv">
                  <Button
                    onClick={() => setPriceSelector("19/month")}
                    sx={{
                      background: "#fff",
                      borderRadius: "8px",
                      color: "#C1C1C1",
                      fontSize: "1em",
                      textTransform: "capitalize",
                      color: "#000",
                      padding: "12px 18px",
                      border: "1px solid #fff",
                      transition: ".3s",
                      "&:hover": {
                        border: "1px solid #fff",
                        background: "#000",
                        color: "#fff",
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </PricePlan>
            </Grid>
            <Grid item xs={6}>
              <PricePlan
                className={priceSelector === "200/month" ? "active" : ""}
              >
                <div className="title scnd-title">
                  <p>Xtravarse Passport</p>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "center",
                    }}
                  >
                    <h1>
                      <BiDollar />
                      197
                    </h1>
                    <sub>/ Mo</sub>
                  </Box>

                  <span>or $199 yearly</span>
                </div>
                <ul>
                  <li>all the features</li>
                </ul>
                <div className="btndiv">
                  <Button
                    onClick={() => setPriceSelector("200/month")}
                    sx={{
                      background: "#fff",
                      borderRadius: "8px",
                      color: "#C1C1C1",
                      fontSize: "1em",
                      textTransform: "capitalize",
                      color: "#000",
                      padding: "12px 18px",
                      border: "1px solid #fff",
                      transition: ".3s",
                      "&:hover": {
                        border: "1px solid #fff",
                        background: "#000",
                        color: "#fff",
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </PricePlan>
            </Grid>
          </Grid>

          {priceSelector ? <input type="submit" value="Next" /> : ""}
        </Form>
      </Infosec>
    </>
  );
}

export default Pricing;
