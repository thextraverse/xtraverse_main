import { Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ItemAcivity from "../../../../components/project/EditMarketplace/ItemActivity";
import { PreviewBox } from "../../../../components/styles/uploadnft.style";
function CryptoCanvasEditMarketPlaceThanksyou(props) {
  const {
    closingTopTxt,
    closingHeader,
    closingSubtexxt,
    closingSelectedVideo,
    closingBtn,
  } = props;

  return (
    <>
      <PreviewBox>
        <div className="videowrap">
          <h2>{closingTopTxt}</h2>
          <h1>{closingHeader}</h1>
          <p>{closingSubtexxt}</p>
          <div className="videoBox">
            <video src={closingSelectedVideo} muted autoPlay controls></video>
          </div>
          <Link href={closingBtn.link}>
            <Button
              type="submit"
              sx={{
                background: "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
                borderRadius: "8px",
                color: "#000",
                fontSize: ".9em",
                textTransform: "capitalize",
                padding: "8px 25px",
                transition: "0.3s",
                fontWeight: "500",
                margin: "10px 0px",
                display: "inline-flex",

                "&:hover ": {
                  background:
                    "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                  cursor: "pointer",
                },
              }}
            >
              {closingBtn.button}
            </Button>
          </Link>
        </div>
      </PreviewBox>
    </>
  );
}

export default CryptoCanvasEditMarketPlaceThanksyou;
