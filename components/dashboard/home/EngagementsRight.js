import { Box } from "@mui/system";
import { EngagementsRightDiv } from "../../styles/dashboard.styled";

export default function EngagementsRight() {
  return (
    <EngagementsRightDiv>
      <p>Unsold Offers</p>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2>8</h2>
      </Box>

      <span>5 new mints this week</span>
    </EngagementsRightDiv>
  );
}
