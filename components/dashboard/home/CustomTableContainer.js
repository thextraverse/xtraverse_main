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
    createData("Pudgy Penguin", 120, 120, 0.5, 0.99, 0.99, 78, 86.0, 1),
    createData("Pudgy Penguin", 120, 120, 0.5, 0.99, 0.99, 78, 86.0, 1),
    createData("Pudgy Penguin", 120, 120, 0.5, 0.99, 0.99, 78, 86.0, 1),
    createData("Pudgy Penguin", 120, 120, 0.5, 0.99, 0.99, 78, 86.0, 1),
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
              <HeaderMiniCells name="FLOOR PRICE" />
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
              key={row.name}
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
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.9987 10.6666V7.33325M8.33203 5.33325C8.33203 5.51735 8.18279 5.66659 7.9987 5.66659C7.8146 5.66659 7.66536 5.51735 7.66536 5.33325M8.33203 5.33325C8.33203 5.14916 8.18279 4.99992 7.9987 4.99992C7.8146 4.99992 7.66536 5.14916 7.66536 5.33325M8.33203 5.33325H7.66536M14.6654 7.99992C14.6654 11.6818 11.6806 14.6666 7.9987 14.6666C4.3168 14.6666 1.33203 11.6818 1.33203 7.99992C1.33203 4.31802 4.3168 1.33325 7.9987 1.33325C11.6806 1.33325 14.6654 4.31802 14.6654 7.99992Z"
          stroke="#8A8A8E"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

function TableDataMiniCells({ name, pr }) {
  return (
    <div>
      <svg
        width="10"
        height="17"
        viewBox="0 0 10 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_217_3217)">
          <path
            d="M0 9.21351C1.73485 10.1378 3.54513 11.1054 4.94331 11.854L9.84615 9.21351C8.07091 11.8594 6.59175 14.0622 4.94331 16.5C3.29192 14.0675 1.46818 11.3835 0 9.21351ZM0.188564 8.48368L4.94867 5.93534L9.64681 8.46504L4.95135 11.0162L0.188564 8.48368ZM4.94331 5.11889L0 7.72971L4.92174 0.5L9.84615 7.7459L4.94331 5.11889Z"
            fill="#8A8A8E"
          />
          <path
            d="M4.94344 11.854L9.84629 9.21351C8.07105 11.8594 4.94344 16.5 4.94344 16.5V11.854ZM4.9488 5.93534L9.64694 8.46504L4.95148 11.0162L4.9488 5.93534ZM4.94344 5.11908L4.92188 0.5L9.84629 7.7459L4.94344 5.11908Z"
            fill="#8A8A8E"
          />
          <path
            d="M0.1875 8.48373L4.94786 8.87566L9.646 8.46753L4.95028 11.0189L0.1875 8.48373Z"
            fill="#8A8A8E"
          />
          <path
            d="M4.94922 8.87566L9.64736 8.46753L4.9519 11.0189L4.94922 8.87566Z"
            fill="#8A8A8E"
          />
        </g>
        <defs>
          <clipPath id="clip0_217_3217">
            <rect
              width="9.84615"
              height="16"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>

      {name}

      <div className="percent-cont">
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

        <span>{`${pr}%`}</span>
      </div>
    </div>
  );
}
