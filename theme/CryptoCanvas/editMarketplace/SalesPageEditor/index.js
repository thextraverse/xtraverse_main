import { Box, Button, Grid } from "@mui/material";
import { height } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import ItemAcivity from "../../../../components/project/EditMarketplace/ItemActivity";
import {
  PreviewBox,
  ProductSec,
} from "../../../../components/styles/uploadnft.style";
function CryptoCanvasEditMarketPlaceThanksyou(props) {
  const { closingHeader, closingSubtexxt, handleDataSubmit, productData } =
    props;
  // console.log("productdata", productData);
  return (
    <>
      <PreviewBox className="salespageeditor">
        <div className="videowrap">
          <h1>{closingHeader}</h1>
          <p>{closingSubtexxt}</p>
        </div>
        <ProductSec>
          <div className="createproduct">
            <Button
              sx={{
                border: "2px solid #fff",
                height: "100%",
                width: "240px",
                fontSize: "2.3em",
                color: "#fff",
                margin: "20px 0px",
              }}
              onClick={handleDataSubmit}
            >
              <AiFillPlusCircle />
            </Button>
          </div>
          <div className="productshowcase">
            {productData.map((itm, index) => {
              <h1>{itm.page}</h1>;
            })}
          </div>
        </ProductSec>
      </PreviewBox>
    </>
  );
}

export default CryptoCanvasEditMarketPlaceThanksyou;
