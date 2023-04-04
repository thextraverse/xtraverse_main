import React, { useState } from "react";
import styled from "@emotion/styled";
import Sidebar from "../../components/dashboard/sidebar/Navbar";
import { useUserAuth } from "../../configfile/UserAuthContext";

import { useRouter } from "next/router";

import CustomTableContainer from "../../components/dashboard/community/CustomTableContainer";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

//selct box

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterBar from "../../components/dashboard/community/FilterBar";
//selct box

const Main = styled.main`
  background: #303030;
  padding: 30px;
  height: 100%;
  color: #fff;

  td,
  th {
    border-bottom: 1px solid #666;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
  }

  th {
    border-bottom: unset;
    padding: 6px 16px;

    font-size: 0.75rem;
    font-weight: 400;
  }

  td,
  th {
    div {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      svg {
        margin-right: 6px;
        margin-left: 6px;

        fill: #fff;
      }
    }
  }

  .last-eye-img {
    span {
      font-weight: 400;
      font-size: 0.75rem;

      text-decoration: underline;
    }

    svg {
      fill: none;
    }
  }

  .table-head {
    background-color: #252525;
    border-radius: 8px 8px 0px 0px;
  }

  .percent-cont {
    background-color: #252525;
    border-radius: 4px;
    margin-left: 4px;
    padding: 2px;

    svg {
      margin: 0 2px 0 0 !important;
    }

    span {
      font-weight: 400;
      font-size: 0.75rem;
    }
  }

  #demo-simple-select-label,
  #demo-simple-select {
    background: linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  #demo-simple-select + input + svg {
    fill: #04fcbc;
  }

  .last-eye-img {
    cursor: pointer;
  }
`;

const Dashboardsc = styled.div`
  width: 100%;
  position: relative;
  // padding: 30px;
  // margin: 10vh 0 10vh 6vw;
`;
const Initialize = styled.div`
  padding: 0px 0px 0px 100px;

  // width: 80%;
  // margin: auto;
  // margin-top: 10vh;
  gap: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .uploadProject {
    width: 100%;
    background: #252525;
    border: 2px dashed #8a8a8e;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 10px;
    height: 400px;
    cursor: pointer;
    position: relative;
    .img {
      width: 100%;
      position: absolute;
      z-index: 1;
      height: 100%;
      span {
        width: 100% !important;
        height: 100% !important;
      }
      img {
        object-fit: cover;
      }
    }
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      opacity: 0;
      z-index: 3;
    }
  }
  h1 {
    font-weight: 600;
    margin: 20px 0px;
  }
  form {
    margin: 0px 15px;
    input {
      width: 100%;
      background: #252525;
      color: #fff;
      border: none;
      padding: 15px 10px;
      border-radius: 10px;
      outline: none;
      font-size: 1.1em;
      margin: 4px 0px;
      &::placeholder {
        opacity: 0.3;
      }
    }
    label {
      font-size: 0.98em;
      padding: 3px 0px;
      display: block;
    }
    .form-wraper {
      margin-bottom: 30px;
      input {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    }
  }
`;

function Table() {
  return <CustomTableContainer />;
}

export default function Community() {
  const router = useRouter();
  const { user } = useUserAuth();
  let emailData = null;

  user !== null && user.email && (emailData = user.email);
  user === null && router.push("/");
  //typeof window !== "undefined" && router.push("/");

  //select box

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  //select box

  return (
    <Main>
      <Dashboardsc>
        {/* <Sidebar activeBtn={5} heading={"Project"} /> */}
        <Initialize>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <h2>Community</h2>

            <Box sx={{ minWidth: 150, display: "flex", alignItems: "center" }}>
              {/* <FormControl
                fullWidth
                style={{
                  marginRight: "20px",
                  color: "red",
                  background: "#242424",
                  borderRadius: "8px",
                }}
              >
                <InputLabel id="demo-simple-select-label" style={{ color: "" }}>
                  Project Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10} style={{ color: "#222" }}>
                    Project 1
                  </MenuItem>
                  <MenuItem value={20} style={{ color: "#222" }}>
                    Project 2
                  </MenuItem>
                  <MenuItem value={30} style={{ color: "#222" }}>
                    Project 3
                  </MenuItem>
                </Select>
              </FormControl> */}

              <div style={{ width: "200px" }}>
                <Button
                  type="submit"
                  sx={{
                    width: "100%",
                    background:
                      "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
                    borderRadius: "8px",
                    color: "#000",
                    fontSize: "1.2em",
                    textTransform: "capitalize",
                    padding: "8px 0px",
                    transition: "0.3s",
                    fontWeight: "500",
                    margin: "10px 0px",
                    "&:hover ": {
                      background:
                        "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                      cursor: "pointer",
                    },
                  }}
                >
                  Create
                </Button>
              </div>
            </Box>
          </Box>

          <FilterBar />

          <div style={{ width: "100%" }}>
            <Table />
          </div>
        </Initialize>
      </Dashboardsc>
    </Main>
  );
}
