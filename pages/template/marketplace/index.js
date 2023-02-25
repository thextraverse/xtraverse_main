import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import TemplateHeader from "../templateheader";
import Grid from "@mui/material/Grid";
import { Box, Container } from "@mui/system";
import { RiTicketLine } from "react-icons/ri";
import { db } from "../../../configfile/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Main = styled.div`
  background: #fff;
  height: 150vh;
  color: #000000;
`;
const Heading = styled.div`
  padding-top: 120px;
  color: #000;
  text-align: center;
  h1 {
    font-size: 3.5em;
  }
  p {
    font-family: "Open Sans", sans-serif;
    font-weight: 500;
    color: #000000;
  }
`;
function MarketPlace() {
  const [uploadData, setUploadData] = useState([]);

  useEffect(() => {
    getTemplates();
  }, []);
  useEffect(() => {
    console.log(uploadData);
  }, [uploadData]);

  function getTemplates() {
    const getUploadDataRef = collection(db, "uploadNfts");
    getDocs(getUploadDataRef)
      .then((response) => {
        console.log(response.docs);
        const datas = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setUploadData(datas);
        // const tpltDt = response.
      })
      .catch((error) => {
        console.log(error.messages);
      });
  }

  return (
    <Main>
      <TemplateHeader />
      <Heading>
        <h1>Marketplace</h1>
        <p>
          Robpp gremlins was inspired by the amazing song by Kodak Back <br />{" "}
          titled “Super Gremlins.” Join our Gremlin gang to be a top G.
        </p>
      </Heading>
      <Container sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "20px",
          }}
        >
          {uploadData.map((uploadData, index) => {
            // const imagefromserver = uploadData.data.nftimage;
            // console.log(imagefromserver);
            return (
              <>
                <Grid item xs={3} key={index}>
                  <Box
                    sx={{
                      background: "#D9D9D9",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        height: {
                          borderRadius: "10px",
                          lg: "250px",
                          background: "#202020",
                        },
                      }}
                    >
                      <Image src="" alt="amneiimage" width={100} height={100} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0px",
                      }}
                    >
                      <Box
                        component="p"
                        sx={{
                          fontWeight: "500",
                        }}
                      >
                        {uploadData.data.nftname}
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          fontWeight: "700",
                          color: "#212121",
                        }}
                      >
                        1 of 10
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: ".8em",
                      }}
                    >
                      <p>{uploadData.data.description}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0px 0px",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px 0px",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <RiTicketLine />
                        <Box
                          component="span"
                          sx={{
                            fontWeight: "600",
                          }}
                        >
                          Duck
                        </Box>
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          fontWeight: "700",
                          color: "#212121",
                        }}
                      >
                        $ <span> {uploadData.data.price}</span>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Container>
    </Main>
  );
}

export default MarketPlace;
