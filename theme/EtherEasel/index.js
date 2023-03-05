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
import { Button, Container, Grid } from "@mui/material";
import firstimg from "../../components/images/project1.png";
import Link from "next/link";
import { Box } from "@mui/system";
import { async } from "@firebase/util";
import { db } from "../../configfile/firebaseConfig";
import { useUserAuth } from "../../configfile/UserAuthContext";
import Template from "../../pages/dashboard/createproject";
import TemplateHeader from "../../components/template/TemplateHeader";

const HomepagePreview = styled.div`
  background: #fff;
  padding: 0px;
  border-radius: 5px;
  height: 100vh;
  position: relative;
  display: grid;
  place-content: center;
  svg {
    position: absolute;
    width: 100%;
    left: 0%;
    z-index: 1;
    @media screen and (min-width: 1400px) {
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
  .herotxt {
    height: 100%;
    display: grid;
    place-content: center;
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
    font-size: 3em;
    font-weight: 800;
    @media screen and (min-width: 1400px) {
      font-size: 5.5em;
    }
  }
  p {
    font-size: 0.8em;
    color: rgba(0, 0, 0, 0.65);
    width: 100%;
    @media screen and (max-width: 1400px) {
      font-size: 1em;
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
  .heroimgs {
    display: flex;
    position: relative;
    width: 100%;
    margin-top: 20px;
    height: 330px;

    @media screen and (max-width: 1400px) {
      padding-top: 20px;
      padding-bottom: 50px;
    }
    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

function EtherEasel() {
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
          width="1285"
          height="337"
          viewBox="0 0 1285 337"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_403_33)">
            <circle
              cx="711"
              cy="-55"
              r="238"
              transform="rotate(180 711 -55)"
              fill={color1}
            />
          </g>
          <g filter="url(#filter1_f_403_33)">
            <circle
              cx="662"
              cy="-145"
              r="238"
              transform="rotate(180 662 -145)"
              fill={color3}
            />
          </g>
          <g filter="url(#filter2_f_403_33)">
            <circle
              cx="392"
              cy="-124"
              r="238"
              transform="rotate(180 392 -124)"
              fill={color2}
            />
          </g>
          <g filter="url(#filter3_f_403_33)">
            <circle
              cx="893"
              cy="-107"
              r="238"
              transform="rotate(180 893 -107)"
              fill={color1}
            />
          </g>
          <g filter="url(#filter4_f_403_33)">
            <circle
              cx="697"
              cy="-145"
              r="238"
              transform="rotate(180 697 -145)"
              fill={color3}
            />
          </g>
          <defs>
            <filter
              id="filter0_f_403_33"
              x="319"
              y="-447"
              width="784"
              height="784"
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
                stdDeviation="77"
                result="effect1_foregroundBlur_403_33"
              />
            </filter>
            <filter
              id="filter1_f_403_33"
              x="270"
              y="-537"
              width="784"
              height="784"
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
                stdDeviation="77"
                result="effect1_foregroundBlur_403_33"
              />
            </filter>
            <filter
              id="filter2_f_403_33"
              x="0"
              y="-516"
              width="784"
              height="784"
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
                stdDeviation="77"
                result="effect1_foregroundBlur_403_33"
              />
            </filter>
            <filter
              id="filter3_f_403_33"
              x="501"
              y="-499"
              width="784"
              height="784"
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
                stdDeviation="77"
                result="effect1_foregroundBlur_403_33"
              />
            </filter>
            <filter
              id="filter4_f_403_33"
              x="305"
              y="-537"
              width="784"
              height="784"
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
                stdDeviation="77"
                result="effect1_foregroundBlur_403_33"
              />
            </filter>
            <linearGradient
              id="paint0_linear_403_33"
              x1="711"
              y1="-293"
              x2="711"
              y2="183"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color={color1} />
              <stop offset="1" stop-color={color2} />
            </linearGradient>
            <linearGradient
              id="paint1_linear_403_33"
              x1="662"
              y1="-383"
              x2="662"
              y2="93"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color={color3} />
              <stop offset="1" stop-color={color1} />
            </linearGradient>
            <linearGradient
              id="paint2_linear_403_33"
              x1="697"
              y1="-383"
              x2="697"
              y2="93"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color={color2} />
              <stop offset="1" stop-color={color3} />
            </linearGradient>
          </defs>
        </svg>
        {/* {loading && (
            <Box component="p" sx={{ fontSize: "5em", color: "#000" }}>
              Loading...
            </Box>
          )} */}
        <Container>
          <div className="homesec">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className="herotxt">
                  <div>
                    <h3>EtherEasel</h3>
                    <h1>{heading}</h1>
                    <p>{description}</p>
                    <Button>GO TO NFTS</Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="heroimgs">
                  <div className="img">
                    <Image src={firstimg} alt="" />
                  </div>
                  <div className="img">
                    <Image src={firstimg} alt="" />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </HomepagePreview>
    </>
  );
}

export default EtherEasel;
