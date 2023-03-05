import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import TemplateHeader from "../../../components/template/TemplateHeader";
import Grid from "@mui/material/Grid";
import { Box, Container } from "@mui/system";
import { RiTicketLine } from "react-icons/ri";
import { db } from "../../../configfile/firebaseConfig";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import { useUserAuth } from "../../../configfile/UserAuthContext";

const Main = styled.div`
  background: #fff;
  height: 100%;
  padding-bottom: 50px;
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
const NftImage = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  span {
    width: 100% !important;
    height: 100% !important;
    border-radius: 10px;
  }
  img {
    object-fit: cover;
  }
`;
function MarketPlace() {
  const { user, logOut } = useUserAuth();
  const [uploadData, setUploadata] = useState([]);
  const queryUser = collection(db, "Users");
  const [users, error] = useCollectionData(queryUser);
  // console.log(users);
  const emailData = user.email;
  // console.log(emailData);
  async function handleGetData() {
    if (!emailData) return;

    const q = query(queryUser, where("Email", "==", emailData));
    const querySnapshot1 = await getDocs(q);

    if (!querySnapshot1.empty) {
      const autoId = querySnapshot1.docs[0].id;
      const subcollectionRef = collection(db, "Users", autoId, "nftData");
      const querySnapshot2 = await getDocs(subcollectionRef);
      const docs = querySnapshot2.docs.map((doc) => doc.data());
      setUploadata(docs);
    }
  }

  useEffect(() => {
    handleGetData();
  }, [emailData]);

  // console.log(uploadData, emailData);
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
          {uploadData.length === 0 && <p>Loading...</p>}
          {uploadData.map((data, index) => (
            <Link
              href={"/template/marketplace/" + data.id}
              key={data.id}
              className="newpglnk ancbtn"
            >
              <img
                src={data.nftimage}
                alt="amneiimage"
                width={100}
                height={100}
              />
            </Link>
          ))}

          {uploadData.map((uploadData, index) => {
            // const imagefromserver = uploadData.data.nftimage;
            console.log(uploadData.id);
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
                        borderRadius: "10px",
                        lg: "250px",
                        background: "#202020",
                        // height: {},
                      }}
                    >
                      <NftImage>
                        <Image
                          src={uploadData.nftimage}
                          alt="amneiimage"
                          width={100}
                          height={100}
                        />
                      </NftImage>
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
                        {uploadData.nftname}
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
                      <p>{uploadData.description}</p>
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
                        $ <span> {uploadData.price}</span>
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
