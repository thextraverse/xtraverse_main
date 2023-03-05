import styled from "@emotion/styled";
import React, { useState } from "react";
import { IoIosAddCircle, IoIosArrowDropright } from "react-icons/io";
import { useRouter } from "next/router";
import { BsPlusLg } from "react-icons/bs";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import demoimg from "../../../components/images/blacklogo.svg";
import CryptoCanvaSEdithero from "./EditHero";
import Stepnav from "../../../components/dashboard/StepNav";
import Sidebar from "../../../components/dashboard/SideBar";
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

function CryptoCanvasEditHome() {
  const [index, setIndex] = useState(0);
  const [formId, setFormId] = useState(null);

  //! Edit hero
  // blur color
  const [blur1, setBlur1] = useState("#1EA573");
  const [blur2, setBlur2] = useState("#97C35E");
  const [blur3, setBlur3] = useState("#20BC83");
  const [homeLogo, setHomeLogo] = useState(demoimg);
  const [uploadLogo, setUploadLogo] = useState(demoimg);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setHomeLogo(URL.createObjectURL(imageFile));
    setUploadLogo(imageFile);
  };
  const [editHeroName, setEditHeroName] = useState("Robo Gremlins");
  const [editHeroScript, setEditHeroScript] = useState(
    "Our Fancy Shamncy NFT Project is the king of all fancy shamncy NFT projects. And we are sworn enemies of Gary v."
  );
  const handleNext = () => {
    setIndex(index === layouts.length - 1 ? 0 : index + 1);
  };
  const handlePrev = () => {
    setIndex(index === 0 ? layouts.length - 1 : index - 1);
  };
  const layouts = [
    <CryptoCanvaSEdithero
      handleNext={handleNext}
      setHomeLogo={setHomeLogo}
      homeLogo={homeLogo}
      uploadLogo={uploadLogo}
      editHeroName={editHeroName}
      setEditHeroName={setEditHeroName}
      editHeroScript={editHeroScript}
      setEditHeroScript={setEditHeroScript}
      handleImageChange={handleImageChange}
      blur1={blur1}
      blur2={blur2}
      blur3={blur3}
      setBlur1={setBlur1}
      setBlur2={setBlur2}
      setBlur3={setBlur3}
      formId={formId}
      setFormId={setFormId}
      key="1"
    />,
    // <Editfeature handleNext={handleNext} key="3" />,
    // <Editwaitlist handleNext={handleNext} key="4" />,
    // <EditFAQ handleNext={handleNext} key="5" />,
    // <Editfooter handleNext={handleNext} key="6" />,
  ];
  return (
    <>
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
        {layouts[index]}
        {/* <ul className="activeDot">
        <li className={index === 0 ? "active" : ""}></li>
        <li className={index === 1 ? "active" : ""}></li>
        <li className={index === 2 ? "active" : ""}></li>
        <li className={index === 3 ? "active" : ""}></li>
        <li className={index === 4 ? "active" : ""}></li>
        <li className={index === 5 ? "active" : ""}></li>
        <li className={index === 6 ? "active" : ""}></li>
      </ul> */}
      </Box>
    </>
  );
}

export default CryptoCanvasEditHome;
