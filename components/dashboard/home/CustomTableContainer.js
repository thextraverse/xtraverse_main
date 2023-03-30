// for table
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// for table

export default function CustomTableContainer() {
  function createData(name, calories, fat, carbs, protein, ext, stp, tsp, op) {
    return { name, calories, fat, carbs, protein, ext, stp, tsp, op };
  }

  const rows = [
    createData("Pudgy Penguin", 120, 120, 0.5, 0.99, 0.99, 78, 86.0, 1),
    createData("Pudgy Penguin", 120, 120, 0.5, 0.99, 0.99, 78, 86.0, 2),
    createData("Pudgy Penguin", 120, 120, 0.5, 0.99, 0.99, 78, 86.0, 3),
    createData("Pudgy Penguin", 120, 120, 0.5, 0.99, 0.99, 78, 86.0, 4),
    createData("Pudgy Penguin", 120, 120, 0.5, 0.99, 0.99, 78, 86.0, 5),
  ];

  return (
    <TableContainer
      component={Paper}
      style={{ backgroundColor: "transparent", boxShadow: "unset" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell>COLLECTION</TableCell>
            <TableCell align="right">
              <HeaderMiniCells name="SALES" />
            </TableCell>
            <TableCell align="right">
              <HeaderMiniCells name="VOLUME" />
            </TableCell>
            <TableCell align="right">
              <HeaderMiniCells name="LOWEST PRICE" />
            </TableCell>
            <TableCell align="right">
              <HeaderMiniCells name="BEST OFFER" />
            </TableCell>
            <TableCell align="right">
              <HeaderMiniCells name="TOTAL GAS" />
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.op}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">
                <TableDataMiniCells name={row.calories} pr={row.stp} />
              </TableCell>
              <TableCell>
                <TableDataMiniCells name={row.fat} pr={row.tsp} />
              </TableCell>
              <TableCell align="right">
                <TableDataMiniCells name={row.carbs} pr={row.op} />
              </TableCell>
              <TableCell>
                <TableDataMiniCells name={row.protein} pr={row.op} />
              </TableCell>
              <TableCell>
                <TableDataMiniCells name={row.ext} pr={row.op} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function HeaderMiniCells({ name }) {
  return (
    <div>
      {name}
      <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
        <path
          d="M7.999 10.667V7.333m.333-2a.333.333 0 11-.667 0m.667 0a.333.333 0 00-.667 0m.667 0h-.667m7 2.667A6.667 6.667 0 111.332 8a6.667 6.667 0 0113.333 0z"
          stroke="#8A8A8E"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function TableDataMiniCells({ name, pr }) {
  return (
    <div>
      {/* <svg width="1em" height="1em" viewBox="0 0 10 17" fill="none">
        <g clipPath="url(#prefix__clip0_217_3217)" fill="#8A8A8E">
          <path d="M0 9.214c1.735.924 3.545 1.891 4.943 2.64l4.903-2.64A2343.602 2343.602 0 014.943 16.5C3.292 14.068 1.468 11.383 0 9.214zm.189-.73l4.76-2.549 4.698 2.53-4.696 2.551L.19 8.484zm4.754-3.365L0 7.729 4.922.5l4.924 7.246-4.903-2.627z" />
          <path d="M4.943 11.854l4.903-2.64C8.071 11.859 4.943 16.5 4.943 16.5v-4.646zm.006-5.919l4.698 2.53-4.696 2.551-.002-5.08zm-.006-.816L4.922.5l4.924 7.246-4.903-2.627z" />
          <path d="M.188 8.484l4.76.392 4.698-.408-4.696 2.55L.187 8.485z" />
          <path d="M4.95 8.876l4.697-.408-4.695 2.55-.003-2.142z" />
        </g>
        <defs>
          <clipPath id="prefix__clip0_217_3217">
            <path
              fill="#fff"
              transform="translate(0 .5)"
              d="M0 0h9.846v16H0z"
            />
          </clipPath>
        </defs>
      </svg> */}
      $ {name}
      <div className="percent-cont">
        <svg width="1em" height="1em" viewBox="0 0 13 13" fill="none">
          <path
            d="M2.848 10.5l8-8m0 0V8m0-5.5h-5.5"
            stroke="#71DD37"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>{`${pr}%`}</span>
      </div>
    </div>
  );
}
