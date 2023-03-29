// for table
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
// for table

//for modal
import Modal from "@mui/material/Modal";

//for modal

// for Checkbox
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
// for Checkbox

import metamsk from "../../images/icons/metamsk.svg";
import coinbase from "../../images/icons/coinbase.svg";
import twitter from "../../images/icons/twitter.svg";
import money from "../../images/icons/money.svg";

import styled from "@emotion/styled";
import { Grid } from "@mui/material";

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 70vw;
  max-height: 90vh;
  @media screen and (min-width: 1536px) {
    width: 900px;
  }
  background-color: #303030;
  padding: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalLeftDataDiv = styled.div`
  div {
    margin-bottom: 20px;
  }
`;

const ModalMiddleDataDiv = styled.div`
  div {
    margin-bottom: 20px;

    div {
      display: flex;
    }
  }

  .percent-cont {
    background-color: #252525;
    border-radius: 4px;
    margin: 4px 0 0 4px;
    padding: 2px;

    svg {
      margin: 0 2px 0 0 !important;
    }

    span {
      font-weight: 400;
      font-size: 0.75rem;
    }
  }
`;

const ModalRightDataDiv = styled.div`
  padding: 16px;
  background: #252525;
  border-radius: 8px;

  height: 100%;
  width: 100%;

  div {
    margin-bottom: 10px;
  }

  .last-cont {
    display: flex;

    div {
      margin-left: 8px;
    }
  }
`;

export default function CustomTableContainer() {
  const [open, setOpen] = React.useState(false);
  const [showData, setShowData] = React.useState({});
  const handleOpen = (obj) => {
    setShowData(obj);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const columns = [
    {
      title: "NAME",
    },
    {
      title: "EMAIL",
    },
    {
      title: "PHONE",
    },
    {
      title: "ENGAGEMENTS",
    },
    {
      title: "CONNECTIONS",
    },
    {
      title: "OWNER",
    },
    {
      title: "",
    },
  ];

  const data = [
    {
      name: "Pedgy Penguin",
      email: "Pedgy@gpenguin.com",
      phone: "+XX (123)345-6789",
      engagement: ["120"],
      connection: "",
      owner: "pudgy penguin",
      seeDetails: "See Details",
    },
    {
      name: "Pedgy Penguin",
      email: "Pedgy@gpenguin.com",
      phone: "+XX (123)345-6789",
      engagement: ["120"],
      connection: "",
      owner: "pudgy penguin",
      seeDetails: "See Details",
    },
    {
      name: "Pedgy Penguin",
      email: "Pedgy@gpenguin.com",
      phone: "+XX (123)345-6789",
      engagement: ["120"],
      connection: "",
      owner: "pudgy penguin",
      seeDetails: "See Details",
    },
    {
      name: "Pedgy Penguin",
      email: "Pedgy@gpenguin.com",
      phone: "+XX (123)345-6789",
      engagement: ["120"],
      connection: "",
      owner: "pudgy penguin",
      seeDetails: "See Details",
    },
    {
      name: "Pedgy Penguin",
      email: "Pedgy@gpenguin.com",
      phone: "+XX (123)345-6789",
      engagement: ["120"],
      connection: "",
      owner: "pudgy penguin",
      seeDetails: "See Details",
    },
    {
      name: "Pedgy Penguin",
      email: "Pedgy@gpenguin.com",
      phone: "+XX (123)345-6789",
      engagement: ["120"],
      connection: "",
      owner: "pudgy penguin",
      seeDetails: "See Details",
    },
    {
      name: "Pedgy Penguin",
      email: "Pedgy@gpenguin.com",
      phone: "+XX (123)345-6789",
      engagement: ["120"],
      connection: "",
      owner: "pudgy penguin",
      seeDetails: "See Details",
    },
    {
      name: "Pedgy Penguin",
      email: "Pedgy@gpenguin.com",
      phone: "+XX (123)345-6789",
      engagement: ["120"],
      connection: "",
      owner: "pudgy penguin",
      seeDetails: "See Details",
    },
    {
      name: "Pedgy Penguin",
      email: "Pedgy@gpenguin.com",
      phone: "+XX (123)345-6789",
      engagement: ["120"],
      connection: "",
      owner: "pudgy penguin",
      seeDetails: "See Details",
    },
    {
      name: "Pedgy Penguin",
      email: "Pedgy@gpenguin.com",
      phone: "+XX (123)345-6789",
      engagement: ["120"],
      connection: "",
      owner: "pudgy penguin",
      seeDetails: "See Details",
    },
    {
      name: "Pedgy Penguin",
      email: "Pedgy@gpenguin.com",
      phone: "+XX (123)345-6789",
      engagement: ["120"],
      connection: "",
      owner: "pudgy penguin",
      seeDetails: "See Details",
    },
  ];

  return (
    <TableContainer
      component={Paper}
      style={{
        backgroundColor: "transparent",
        boxShadow: "unset",
        // padding: "30px",
      }}
    >
      <Table aria-label="simple table">
        <TableHead className="table-head">
          <TableRow>
            {columns.map((column, i) => (
              <TableCell key={i}>
                <div>
                  {column.title}

                  {i < columns.length - 1 && (
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 5L4 3L6 5"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2 9L4 11L6 9"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record, index) => (
            <TableRow key={index}>
              <TableCell style={{ whiteSpace: "nowrap" }}>
                <div>
                  <Checkbox {...label} />

                  {record.name}
                </div>
              </TableCell>

              <TableCell style={{ whiteSpace: "nowrap" }}>
                {record.email}
              </TableCell>

              <TableCell style={{ whiteSpace: "nowrap" }}>
                {record.phone}
              </TableCell>

              <TableCell style={{ whiteSpace: "nowrap" }}>
                <TableDataMiniCells
                  name={record.engagement[0]}
                  pr={record.engagement[1]}
                />
              </TableCell>

              <TableCell style={{ whiteSpace: "nowrap" }}>
                <span style={{ marginRight: "14px" }}>
                  <Image src={metamsk} alt="" />
                </span>
                <Image src={coinbase} alt="" />
              </TableCell>

              <TableCell style={{ whiteSpace: "nowrap" }}>
                {record.owner}
              </TableCell>

              <TableCell style={{ whiteSpace: "nowrap" }}>
                <div
                  className="last-eye-img"
                  onClick={() => {
                    handleOpen(record);
                  }}
                >
                  <span>{record.seeDetails}</span>

                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6654 8.50002C14.6654 10.1667 12.6654 13.8334 7.9987 13.8334C3.33203 13.8334 1.33203 10.1667 1.33203 8.50002C1.33203 6.83335 3.33203 3.16669 7.9987 3.16669C12.6654 3.16669 14.6654 6.83335 14.6654 8.50002Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M9.9987 8.50002C9.9987 9.60459 9.10327 10.5 7.9987 10.5C6.89413 10.5 5.9987 9.60459 5.9987 8.50002C5.9987 7.39545 6.89413 6.50002 7.9987 6.50002C9.10327 6.50002 9.9987 7.39545 9.9987 8.50002Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <ModalLeftData showData={showData} />
            </Grid>
            <Grid item xs={3}>
              <ModalMiddleData showData={showData} />
            </Grid>
            <Grid item xs={5}>
              <ModalRightData showData={showData} />
            </Grid>
          </Grid>
        </ModalBox>
      </Modal>
    </TableContainer>
  );
}

function TableDataMiniCells({ name, pr }) {
  return (
    <div style={{ justifyContent: "center" }}>
      {name}

      {/* <div className="percent-cont">
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.84766 10.5L10.8477 2.5M10.8477 2.5V8M10.8477 2.5H5.34766"
            stroke="#71DD37"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <span>{`${pr}`}</span>
      </div> */}
    </div>
  );
}

function ModalLeftData({ showData }) {
  return (
    <ModalLeftDataDiv>
      <div>
        <p>Name</p>
        <h4>{showData.name}</h4>
      </div>

      <div>
        <p>Email</p>
        <h4>{showData.email}</h4>
      </div>

      <div>
        <p>Phone</p>
        <h4>{showData.phone}</h4>
      </div>

      <div>
        <p>Wallet</p>
        <div>
          <span style={{ marginRight: "14px" }}>
            <Image src={metamsk} alt="" />
          </span>
          <Image src={coinbase} alt="" />
        </div>
      </div>
    </ModalLeftDataDiv>
  );
}

function ModalMiddleData({ showData }) {
  return (
    <ModalMiddleDataDiv>
      <div>
        <p>Engagement</p>
        <TableDataMiniCells
          name={showData.engagement[0]}
          pr={showData.engagement[1]}
        />
      </div>

      <div>
        <p>Twitter</p>
        <TableDataMiniCells
          name={showData.engagement[0]}
          pr={showData.engagement[1]}
        />
      </div>

      <div>
        <p>Discord</p>
        <TableDataMiniCells
          name={showData.engagement[0]}
          pr={showData.engagement[1]}
        />
      </div>

      <div>
        <p>Waitlist</p>
        <TableDataMiniCells
          name={showData.engagement[0]}
          pr={showData.engagement[1]}
        />
      </div>
    </ModalMiddleDataDiv>
  );
}

function ModalRightData({ showData }) {
  return (
    <ModalRightDataDiv>
      <div>
        <p>Owner</p>
      </div>

      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="last-cont">
              <Image src={twitter} alt="" />
              <div>
                <h4>12K</h4>
                <p>Followers</p>
              </div>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="last-cont">
              <Image src={money} alt="" />
              <div>
                <h4>12K</h4>
                <p>Followers</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </ModalRightDataDiv>
  );
}
