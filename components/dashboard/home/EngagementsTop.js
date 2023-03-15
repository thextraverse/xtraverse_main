import { Box } from "@mui/system";
import { EngagementsTopDiv } from "../../styles/dashboard.styled";

export default function EngagementsTop() {
  return (
    <EngagementsTopDiv>
      <p>Engagements</p>

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
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 9L9 1M9 1V6.5M9 1H3.5"
              stroke="#71DD37"
              stroke-linecap="round"
              stroke-linejoin="round"
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
    </EngagementsTopDiv>
  );
}
