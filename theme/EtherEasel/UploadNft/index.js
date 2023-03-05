import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Link from "next/link";
import { BsPlusLg } from "react-icons/bs";
import Image from "next/image";
import { Button } from "@mui/material";
import EtherEaselNftgeneral from "./NftGeneral";
import EtherEaselNftfeaures from "./NftFeatures";
import Stepnav from "../../../components/dashboard/StepNav";
import Sidebar from "../../../components/dashboard/SideBar";
const drawerWidth = 240;

function EtherEaselUploadNftIndex() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex(index === layouts.length - 1 ? 0 : index + 1);
  };
  const handlePrev = () => {
    setIndex(index === 0 ? layouts.length - 1 : index - 1);
  };

  //! nft details name, collection name,price, chain utitlity, tag
  const [nftCollectionName, setNftCollectionName] = useState("Green Gremlins");
  const [nftName, setNftName] = useState("Draken");
  const [addNftDescript, setAddNftDescript] = useState(
    "DRK is the first of its kind. Bringing AAA quality to the #NFT world with mythical creatures inside virtual realtiy space."
  );
  const [nftPrice, setNftPrice] = useState("7");
  const [nftMindBtn, setNftMindBtn] = useState("Mint Now");
  const [nftType, setNftType] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [mintType, setMintType] = useState("");

  const [imageupload, setImageUpload] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(URL.createObjectURL(imageFile));
    setImageUpload(imageFile);
  };

  //! for upload videosec
  const [videoTitle, setVideoTitle] = useState("Draken's Origin");
  const [addStory, setAddStory] = useState(
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem,provident vero numquam aperiam ratione vel corrupti maioresconsequuntur aliquid impedit"
  );
  const [uploadVideoUrl, setUploadVideoUrl] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoChange = (event) => {
    const videoFile = event.target.files[0];
    setSelectedVideo(URL.createObjectURL(videoFile));
    setUploadVideoUrl(videoFile);
  };

  const layouts = [
    <EtherEaselNftgeneral
      handleNext={handleNext}
      setNftName={setNftName}
      nftName={nftName}
      nftdescription={addNftDescript}
      nftCollectionName={nftCollectionName}
      setNftCollectionName={setNftCollectionName}
      setNftDescript={setAddNftDescript}
      nftType={nftType}
      setNftType={setNftType}
      selectedImage={selectedImage}
      handleImageChange={handleImageChange}
      nftPrice={nftPrice}
      setNftPrice={setNftPrice}
      nftMindBtn={nftMindBtn}
      setNftMindBtn={setNftMindBtn}
      key="1"
    />,
    <EtherEaselNftfeaures
      handlePrev={handlePrev}
      handleVideoChange={handleVideoChange}
      uploadVideoUrl={uploadVideoUrl}
      selectedVideo={selectedVideo}
      // selectedVideoUrl={selectedVideoUrl}
      setAddStory={setAddStory}
      addStory={addStory}
      selectedImage={selectedImage}
      nftName={nftName}
      addUntility={setAddNftDescript}
      videoTitle={videoTitle}
      setVideoTitle={setVideoTitle}
      tokenType={tokenType}
      setTokenType={setTokenType}
      mintType={mintType}
      setMintType={setMintType}
      nftCollectionName={nftCollectionName}
      addNftDescript={addNftDescript}
      nftPrice={nftPrice}
      nftMindBtn={nftMindBtn}
      imageupload={imageupload}
      key="2"
    />,
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
        <ul className="activeDot">
          <li className={index === 0 ? "active" : ""}></li>
          <li className={index === 1 ? "active" : ""}></li>
        </ul>
      </Box>
    </>
  );
}

export default EtherEaselUploadNftIndex;
