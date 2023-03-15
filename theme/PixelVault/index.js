import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import shadow from "../../components/images/shadow.svg";
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
import { Box } from "@mui/system";
import { async } from "@firebase/util";
import { db } from "../../configfile/firebaseConfig";
import { useUserAuth } from "../../configfile/UserAuthContext";
// import Template from "../../pages/dashboard/createproject";
import TemplateHeader from "../../components/template/TemplateHeader";

const HomepagePreview = styled.div`
  background: #fff;
  padding: 0px;
  border-radius: 5px;
  height: 100%;
  position: relative;
  svg {
    position: absolute;
    width: 100%;
    z-index: 1;
    &.svg1 {
      top: -15%;
      left: -20%;
    }
    &.svg2 {
      top: 45%;
      right: -50%;
    }
  }
  .homesec {
    position: relative;
    z-index: 2;
  }
  .headersc {
    display: flex;
    justify-content: space-between;
    padding: 15px;

    .logo {
      img {
        width: 40px;
        height: 25px;
      }
    }
    .headerbtn {
      button {
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 0.65em;
        font-weight: 600;
        margin: 0px 5px;
        &:last-child {
          color: #fff;
          background: #000;
        }
      }
    }
  }
  .herosec {
    display: grid;
    place-items: center;
    place-content: center;
    text-align: center;
    width: 75%;
    margin: auto;
    padding: 25px 0px 10px;
    .herotxt {
      padding: 100px 0px 0px;
    }
    h3 {
      font-size: 2em;
      background-image: linear-gradient(to left, #3e7aee, #786dff, #f66069 80%);
      -webkit-background-size: 100%;
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text; /* for Safari/Chrome */
      text-fill-color: transparent;
    }
    h1,
    p,
    span {
      color: #000;
      font-weight: 600;
    }
    h1 {
      font-size: 5em;
      font-weight: 800;
      @media screen and (min-width: 1400px) {
        font-size: 7.5em;
      }
    }
    p {
      font-size: 1.5em;
      color: rgba(0, 0, 0, 0.65);
      width: 70%;
      margin: auto;
      @media screen and (max-width: 1400px) {
        font-size: 1.3em;
        width: 70%;
      }
    }
    button {
      color: #000;
      margin: 10px 0px;
      border: 2px solid #000;
      font-size: 1em;
      padding: 8px 40px;
    }
  }
  .heroimgs {
    display: flex;
    position: relative;
    width: 100%;
    margin-top: 20px;
    height: 330px;
    justify-content: center;
    @media screen and (max-width: 1400px) {
      padding-top: 20px;
      padding-bottom: 50px;
    }
    .img {
      height: 100%;
      object-fit: cover;
      /* @media screen and (max-width: 1400px) {
        width: 120px;
        height: 150px;
      } */
    }
  }
`;

function pixelVault() {
  const { user, logOut } = useUserAuth();
  // console.log(user.email);

  const [heading, setHeading] = useState();
  const [description, setDescription] = useState();
  const [logo, setLogo] = useState();
  const [color1, setColor1] = useState();
  const [color2, setColor2] = useState();
  const [color3, setColor3] = useState();

  const queryUser = collection(db, "Users");
  const [users, loading, error] = useCollectionData(queryUser);
  // console.log(users);
  const emailData = user.email;
  console.log(emailData);
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
        // console.log(data);
        setDescription(data.description);
        setHeading(data.heading);
        setColor1(data.gradient.color1);
        setColor2(data.gradient.color2);
        setColor3(data.gradient.color3);
        setLogo(data.logo);
      });
    }
  }

  useEffect(() => {
    handleGetData();
  }, [emailData]);

  return (
    <>
      <TemplateHeader />
      <HomepagePreview>
        {/* svg  */}
        <svg
          className="svg1"
          width="661"
          height="661"
          viewBox="0 0 661 661"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_315_3)">
            <circle
              cx="330.443"
              cy="330.443"
              r="279.89"
              transform="rotate(-78.9249 330.443 330.443)"
              fill="url(#paint0_linear_315_3)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_315_3"
              x="0.5"
              y="0.500366"
              width="659.886"
              height="659.885"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="25"
                result="effect1_foregroundBlur_315_3"
              />
            </filter>
            <linearGradient
              id="paint0_linear_315_3"
              x1="330.443"
              y1="50.5531"
              x2="330.443"
              y2="610.333"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color={color1} />
              <stop offset="1" stop-color={color2} stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="svg2"
          width="661"
          height="661"
          viewBox="0 0 661 661"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_315_3)">
            <circle
              cx="330.443"
              cy="330.443"
              r="279.89"
              transform="rotate(-78.9249 330.443 330.443)"
              fill="url(#paint0_linear_315_3)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_315_3"
              x="0.5"
              y="0.500366"
              width="659.886"
              height="659.885"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="25"
                result="effect1_foregroundBlur_315_3"
              />
            </filter>
            <linearGradient
              id="paint0_linear_315_3"
              x1="330.443"
              y1="50.5531"
              x2="330.443"
              y2="610.333"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color={color3} />
              <stop offset="1" stop-color={color1} stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {/* {loading && (
            <Box component="p" sx={{ fontSize: "5em", color: "#000" }}>
              Loading...
            </Box>
          )} */}
        <div className="homesec">
          <div className="herosec">
            <div className="herotxt">
              <h3>PixelVault</h3>
              <h1>{heading}</h1>
              <p>{description}</p>
              <Button>GO TO NFTS</Button>
            </div>
            <div className="heroimgs">
              <div className="img">
                <Image src={firstimg} alt="" />
              </div>
              <div className="img">
                <Image src={firstimg} alt="" />
              </div>
              <div className="img">
                <Image src={firstimg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </HomepagePreview>
    </>
  );
}

export default pixelVault;
