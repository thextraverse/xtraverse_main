import { Box } from "@mui/system";
import { EngagementsLeftDiv } from "../../styles/dashboard.styled";

export default function EngagementsLeft() {
  return (
    <EngagementsLeftDiv>
      <p>Offers Sold</p>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2>80</h2>
      </Box>

      <span>5 new mints this week</span>
    </EngagementsLeftDiv>
  );
}
