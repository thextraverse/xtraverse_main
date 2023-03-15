import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import shadow from "../../components/images/shadow.svg";
import { db } from "../../configfile/firebaseConfig";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { Button } from "@mui/material";
import firstimg from "../../components/images/project1.png";
import Link from "next/link";
import TemplateHeader from "../../components/template/TemplateHeader";
import { Box } from "@mui/system";
import { async } from "@firebase/util";
import { useUserAuth } from "../../configfile/UserAuthContext";
import CryptoCanvas from "../../theme/CryptoCanvas";
import EtherEasel from "../../theme/EtherEasel";
import PixelVault from "../../theme/PixelVault";
import CryptoCanvasEditHome from "../../theme/CryptoCanvas/EditHomePage";
import { HomepagePreview } from "../../components/styles/homepage.styled";
import { H1 } from "../../components/dashboard/dashboard.styled";
const Main = styled.div`
  background: #fff;
  height: 150vh;
  overflow-x: hidden;
`;
const Templatepage = styled.div`
  background: #fff;
  padding: 0px;
  position: relative;
`;
function TemplateIndex() {
  const { user, logOut } = useUserAuth();
  // console.log(user.email);
  const [tempalteId, setTempalteId] = useState();
  const queryUser = collection(db, "Users");
  // console.log(users);
  const emailData = user.email;
  console.log(emailData);
  async function handleGetData() {
    if (!emailData) return;

    const q = query(queryUser, where("Email", "==", emailData));
    const querySnapshot1 = await getDocs(q);

    if (!querySnapshot1.empty) {
      const autoId = querySnapshot1.docs[0].id;
      const subcollectionRef = collection(db, "Users", autoId, "editWebsite");
      const querySnapshot2 = await getDocs(subcollectionRef);
      const docs = querySnapshot2.docs.map((doc) => doc.data());
      docs.map((data) => {
        setTempalteId(data);
      });
    }
  }
  // console.log(tempalteId);
  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailData]);

  // let selectedTemplate;
  // if (tempalteId === "CryptoCanvas") {
  //   selectedTemplate = <CryptoCanvas />;
  // } else if (tempalteId === "EtherEasel") {
  //   selectedTemplate = <EtherEasel />;
  // } else if (tempalteId === "PixelVault") {
  //   selectedTemplate = <PixelVault />;
  // }
  // console.log(tempalteId.header);
  return (
    <>
      <Main>
        <Templatepage>
          {tempalteId &&
            (console.log(tempalteId.header),
            (
              <h1>
                {tempalteId.header.navbarType}

                <HomepagePreview>
                  {/* <Box sx={{ background: websiteBgColor }}> */}
                  {/* CryptoCanvas */}

                  {/* description section */}
                  {/* <div className="homesec descriptionsc">
                    {desType === "destype3" ? (
                      <div className="herosec destype3">
                        <div className="herotxt">
                          <span>{desSubHeading}</span>
                          <h1>{desHeading}</h1>
                          <p>{desSubtext}</p>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div className="grdntsc">
                              <div className="GrdntBox"></div>
                              <h5>
                                Collections Indexed <br /> every 5mins
                              </h5>
                            </div>

                            <div className="grdntsc">
                              <div className="GrdntBox"></div>
                              <h5>
                                Difference in Floor <br /> & Estimated Value
                              </h5>
                            </div>
                          </Box>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={
                          desType === "destype2"
                            ? "herosec destype2"
                            : "herosec destype1"
                        }
                      >
                        <div className="herotxt">
                          <span>{desSubHeading}</span>
                          <h1>{desHeading}</h1>
                          <p>{desSubtext}</p>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <div className="grdntsc">
                                <div className="GrdntBox"></div>
                                <h5>
                                  Collections Indexed <br /> every 5mins
                                </h5>
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <div className="grdntsc">
                                <div className="GrdntBox"></div>
                                <h5>
                                  Difference in Floor <br /> & Estimated Value
                                </h5>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                        <div className="heroImg">
                          {desBg ? (
                            <Image
                              src={desBg}
                              alt="home background image"
                              width={100}
                              height={100}
                            />
                          ) : (
                            <Image
                              src="/images/templatePage/descriptionblock.png"
                              alt="home background image"
                              width={100}
                              height={100}
                            />
                          )}
                        </div>
                      </div>
                    )}
                    {desType === "destype3" ? (
                      <div className="bgimage">
                        {desBg ? (
                          // <Image
                          //   src={desBg}
                          //   alt="home background image"
                          //   width={100}
                          //   height={100}
                          // />
                          ""
                        ) : (
                          <Image
                            src="/images/templatePage/hdescriptionblock.svg"
                            alt="home background image"
                            width={100}
                            height={100}
                          />
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    <Box
                      component="div"
                      className="overlaybg"
                      sx={{ background: `${desOverlayColor}` }}
                    ></Box>
                  </div> */}
                  {/* </Box> */}
                </HomepagePreview>
              </h1>
            ))}
        </Templatepage>
      </Main>
    </>
  );
}

export default TemplateIndex;
