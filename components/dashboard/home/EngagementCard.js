import { Box } from "@mui/system";
import { EngagementCard } from "../../styles/dashboard.styled";

export default function EngagementsLeft({ header, value, discription }) {
  return (
    <EngagementCard>
      <p>{header}</p>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2>{value}</h2>
      </Box>

      <span>{discription}</span>
    </EngagementCard>
  );
}
