import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Link from "next/link";
import { BsPlusLg } from "react-icons/bs";
import Image from "next/image";
import { Button } from "@mui/material";
import Nftgeneral from "../../../../components/dashboard/upladnft/nftgeneral";
import Nftfeaures from "../../../../components/dashboard/upladnft/nftfeatures";
import Sidebar from "../../../../components/dashboard/sidebar";
import Stepnav from "../../../../components/dashboard/stepnav";
import { drawerWidth } from "../../../../components/dashboard/createproject";
const Main = styled.main`
  background: #1f1f1f;
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
function Uploadnfts() {
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

  // for upload image to firebase

  // for image url
  const [selectedImage, setSelectedImage] = useState();
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
    const reader = new FileReader();
    reader.onload = () => setSelectedImage(reader.result);
    reader.readAsDataURL(imageFile);
  };
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  //! for upload videosec
  const [videoTitle, setVideoTitle] = useState("Draken's Origin");
  const [addStory, setAddStory] = useState(
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem,provident vero numquam aperiam ratione vel corrupti maioresconsequuntur aliquid impedit"
  );
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const handleVideoChange = (event) => {
    const videoFile = event.target.files[0];
    setSelectedVideo(videoFile);
    const videoUrl = URL.createObjectURL(videoFile);
    setSelectedVideoUrl(videoUrl);
  };

  //for tags
  const [tags, setTags] = useState([]);

  const layouts = [
    <Nftgeneral
      handleNext={handleNext}
      setNftName={setNftName}
      nftName={nftName}
      nftdescription={addNftDescript}
      nftCollectionName={nftCollectionName}
      setNftCollectionName={setNftCollectionName}
      setNftDescript={setAddNftDescript}
      setTags={setTags}
      nftType={nftType}
      setNftType={setNftType}
      selectedImage={selectedImage}
      handleImageChange={handleImageChange}
      removeSelectedImage={removeSelectedImage}
      nftPrice={nftPrice}
      setNftPrice={setNftPrice}
      nftMindBtn={nftMindBtn}
      setNftMindBtn={setNftMindBtn}
      key="1"
    />,
    <Nftfeaures
      handlePrev={handlePrev}
      handleVideoChange={handleVideoChange}
      selectedVideoUrl={selectedVideoUrl}
      setAddStory={setAddStory}
      addStory={addStory}
      selectedImage={selectedImage}
      nftName={nftName}
      addUntility={setAddNftDescript}
      tags={tags}
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
      key="2"
    />,
  ];

  return (
    <Main>
      <Sidebar />
      <Box
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          marginLeft: "auto",
          background: "#1f1f1f",
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
    </Main>
  );
}

export default Uploadnfts;
