import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import shadow from "../../components/images/shadow.svg";
import { db } from "../../configfile/firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Button } from "@mui/material";
import firstimg from "../../components/images/project1.png";
import Link from "next/link";
import TemplateHeader from "./templateheader";
const Main = styled.div`
  background: #fff;
  height: 150vh;
`;
const Templatepage = styled.div`
  background: #fff;
  padding: 0px;
  position: relative;
`;
const HomepagePreview = styled.div`
  background: #fff;
  padding: 0px;
  border-radius: 5px;
  height: 100%;
  position: relative;
  svg {
    position: absolute;
    width: 100%;
    top: -15%;
    z-index: 1;
    @media screen and (min-width: 1400px) {
      top: 0%;
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
    h1,
    p,
    span {
      color: #000;
      font-weight: 600;
    }
    h1 {
      font-size: 8em;
      font-weight: 800;
      @media screen and (max-width: 1400px) {
        font-size: 6.5em;
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

    @media screen and (max-width: 1400px) {
      padding-top: 20px;
      padding-bottom: 50px;
    }
    .img {
      position: absolute;
      top: 0%;
      left: 50%;

      width: 250px;
      height: 100%;
      object-fit: cover;
      /* @media screen and (max-width: 1400px) {
        width: 120px;
        height: 150px;
      } */
      &:nth-of-type(1) {
        transform: translate(-120%, 14%) rotate(-15deg);
        z-index: 2;
      }
      &:nth-of-type(2) {
        z-index: 1;
        transform: translate(-50%, 3%) rotate(-5deg);
      }
      &:nth-of-type(3) {
        transform: translate(20%, 10%) rotate(15deg);
      }
    }
  }
`;

function TemplateIndex() {
  const [template, setTemplate] = useState([]);
  const [heading, setHeading] = useState();
  const [description, setDescription] = useState();
  const [logo, setLogo] = useState();
  const [color1, setColor1] = useState();
  const [color2, setColor2] = useState();
  const [color3, setColor3] = useState();
  useEffect(() => {
    getTemplates();
  }, []);
  useEffect(() => {
    {
      template.map((tmplte) => {
        setHeading(tmplte.data.heading),
          setDescription(tmplte.data.description),
          setDescription(tmplte.data.description);
        setLogo(tmplte.data.logo);
        setColor1(tmplte.data.gradient.color1);
        setColor3(tmplte.data.gradient.color2);
        setColor2(tmplte.data.gradient.color3);
      });
    }
  }, [template]);
  function getTemplates() {
    const templateDataRef = collection(db, "templateData");
    getDocs(templateDataRef)
      .then((response) => {
        console.log(response.docs);
        const datas = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setTemplate(datas);
        // const tpltDt = response.
      })
      .catch((error) => {
        console.log(error.messages);
      });
  }

  return (
    <Main>
      <Templatepage>
        <TemplateHeader logo={logo} />
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

          <div className="homesec">
            <div className="herosec">
              <div className="herotxt">
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
      </Templatepage>
    </Main>
  );
}

export default TemplateIndex;
