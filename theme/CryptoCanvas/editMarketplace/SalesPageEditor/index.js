import { Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ItemAcivity from "../../../../components/project/EditMarketplace/ItemActivity";
import { PreviewBox } from "../../../../components/styles/uploadnft.style";
function CryptoCanvasEditMarketPlaceSalePage(props) {
  const { closingHeader, closingSubtexxt } = props;

  return (
    <>
      <PreviewBox>
        <div className="videowrap">
          <h1>{closingHeader}</h1>
          <p>{closingSubtexxt}</p>
        </div>
      </PreviewBox>
    </>
  );
}

export default CryptoCanvasEditMarketPlaceSalePage;
