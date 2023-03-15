import styled from "@emotion/styled";
import { Grid } from "@mui/material";

import * as React from "react";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const FilterBarDiv = styled.div`
  width: 100%;
`;

const FilterComponentsDiv = styled.div`
  width: 100%;

  .input {
    position: relative;

    input {
      width: 100%;
      padding: 6px 10px;

      background: #252525;
      border: none;
      border-radius: 8px;

      padding-left: 40px;

      color: white;
    }

    svg {
      position: absolute;
      top: 6px;
      left: 15px;
    }
  }

  .drp-up {
    width: 100%;
    padding: 6px;

    background: #252525;
    border-radius: 8px;

    display: flex;
    justify-content: center;
  }

  .sort-by {
    display: flex;
    justify-content: space-around;

    width: 100%;
    padding: 6px;
    background: #252525;
    border-radius: 8px;

    font-weight: 400;
    font-size: 0.875rem;
  }
`;

const FilterBar = () => {
  return (
    <FilterBarDiv>
      <Grid container spacing={2} style={{ alignItems: "center" }}>
        <Grid item xs={0.1}></Grid>

        <Grid item xs={9}>
          <FilterComponents />
        </Grid>

        <Grid item xs={1.9}></Grid>
      </Grid>
    </FilterBarDiv>
  );
};

function FilterComponents() {
  return (
    <FilterComponentsDiv>
      <Grid container spacing={2}>
        <Grid item xs={1} style={{ alignSelf: "center" }}>
          <Checkbox {...label} style={{ color: "#fff" }} />
        </Grid>

        <Grid item xs={2.8} style={{ alignSelf: "center" }}>
          <div className="input">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9987 14.5L11.5747 12.076M11.5747 12.076C12.6605 10.9902 13.332 9.49017 13.332 7.83331C13.332 4.5196 10.6457 1.83331 7.33203 1.83331C4.01832 1.83331 1.33203 4.5196 1.33203 7.83331C1.33203 11.147 4.01832 13.8333 7.33203 13.8333C8.98889 13.8333 10.4889 13.1617 11.5747 12.076Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>

            <input type="text" placeholder="Search" />
          </div>
        </Grid>

        <Grid item xs={1.5} style={{ alignSelf: "center" }}>
          <div className="drp-up">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.33203 9.83331V10.1666V10.1666C1.33203 11.096 1.33203 11.5606 1.40889 11.947C1.72452 13.5338 2.96491 14.7742 4.55167 15.0898C4.93807 15.1666 5.40272 15.1666 6.33203 15.1666L9.66537 15.1666C10.5947 15.1666 11.0593 15.1666 11.4457 15.0898C13.0325 14.7742 14.2729 13.5338 14.5885 11.947C14.6654 11.5606 14.6654 11.096 14.6654 10.1666V10.1666V9.83331M7.9987 9.83331L7.9987 1.83331M7.9987 1.83331L10.6654 4.49998M7.9987 1.83331L5.33203 4.49998"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </Grid>

        <Grid item xs={2} style={{ alignSelf: "center" }}>
          <div className="sort-by">
            <span>Sort by</span>

            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66667 15.1666L2 12.5M4.66667 15.1666L7.33333 12.5M4.66667 15.1666V9.83331M4.66667 2.49998V7.16665M10.6667 1.83331H14L10.6667 7.16665H14M10.6667 15.1666V13.1666M10.6667 13.1666V11.5C10.6667 10.5795 11.4129 9.83331 12.3333 9.83331C13.2538 9.83331 14 10.5795 14 11.5V13.1666M10.6667 13.1666H14M14 13.1666V15.1666"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </Grid>
        <Grid item xs={2} style={{ alignSelf: "center" }}>
          <div className="sort-by">
            <span>Filter by</span>

            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4.5H14M4 8.5H12M6.66667 12.5H9.33333"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </Grid>
      </Grid>
    </FilterComponentsDiv>
  );
}

export default FilterBar;