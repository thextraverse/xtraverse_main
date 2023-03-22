import { Box } from "@mui/system";
import { EngagementsTopDiv } from "../../styles/dashboard.styled";

export default function EngagementsTop() {
  return (
    <>
      <EngagementsTopDiv>
        <div className="engrd">
          <p>Created</p>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2>120%</h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "8px",

                marginLeft: "8px",
                padding: "4px",
                background: "#252525",
                borderRadius: "4px",
              }}
            >
              <svg width="1em" height="1em" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1 9l8-8m0 0v5.5M9 1H3.5"
                  stroke="#71DD37"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                style={{
                  marginLeft: "6px",
                }}
              >
                +5.0 %
              </span>
            </div>
          </Box>
          <span>5 new mints</span>
        </div>
        <div className="engrd">
          <p>Purchased</p>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2>120%</h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "8px",

                marginLeft: "8px",
                padding: "4px",
                background: "#252525",
                borderRadius: "4px",
              }}
            >
              <svg width="1em" height="1em" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1 9l8-8m0 0v5.5M9 1H3.5"
                  stroke="#71DD37"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                style={{
                  marginLeft: "6px",
                }}
              >
                +5.0 %
              </span>
            </div>
          </Box>
          <span>5 new mints</span>
        </div>
        <div className="engrd">
          <p>Airdrop</p>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2>120%</h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "8px",

                marginLeft: "8px",
                padding: "4px",
                background: "#252525",
                borderRadius: "4px",
              }}
            >
              <svg width="1em" height="1em" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1 9l8-8m0 0v5.5M9 1H3.5"
                  stroke="#71DD37"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                style={{
                  marginLeft: "6px",
                }}
              >
                +5.0 %
              </span>
            </div>
          </Box>
          <span>5 new mints</span>
        </div>
      </EngagementsTopDiv>
    </>
  );
}
