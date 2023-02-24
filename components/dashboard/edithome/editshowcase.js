import React from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { Form } from "@/app/dashboard/createproject/edithomepage/page";
const Wrapper = styled.div`
  width: 500px;
  margin: auto;
`;
const Step = styled.div``;

function Editshowcase({ handleNext }) {
  return (
    <div>
      <Wrapper>
        <Step>
          <span>Step 5</span>
          <h1>Edit Homepage</h1>
        </Step>
        <Form>
          <Box
            sx={{
              margin: "25px 0px",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "25px",
            }}
          >
            <Box>
              <label htmlFor="" style={{ color: "#fff" }}>
                Blur 1
              </label>
              <input
                type="text"
                required
                placeholder="

            #20BC83
              "
              />
            </Box>
            <Box>
              <label htmlFor="" style={{ color: "#fff" }}>
                Blur 2
              </label>

              <input
                type="text"
                required
                placeholder="
            #97C35E
              "
              />
            </Box>
            <Box>
              <label htmlFor="" style={{ color: "#fff" }}>
                Blur 3
              </label>

              <input
                type="text"
                required
                placeholder="
            #1EA573
              "
              />
            </Box>
          </Box>
          <Button
            sx={{
              background: "#a3f6ab",
              border: "none",
              width: "100%",
              display: "block",
              padding: "15px ",
              color: "#000",
              margin: "15px 0px",
              "&:hover": {
                background: "#fff",
              },
            }}
          >
            Update blurs
          </Button>
          <Button
            sx={{
              background: "transparent",
              border: "2px solid #fff",
              width: "100%",
              display: "block",
              padding: "10px ",
              color: "#000",
              margin: "15px 0px",
              color: "#fff",
              "&:hover": {
                background: "#fff",
                color: "#000",
              },
            }}
            onClick={handleNext}
          >
            Continue
          </Button>
        </Form>
      </Wrapper>
    </div>
  );
}

export default Editshowcase;
