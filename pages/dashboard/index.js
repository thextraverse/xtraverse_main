import styled from "@emotion/styled";
import Sidebar from "../../components/dashboard/sidebar/Navbar";
import Image from "next/image";
import Link from "next/link";
import logo from "../../components/images/logo.svg";
import { Box } from "@mui/system";
import CreateProject from "../../components/dashboard/create-project";

const Main = styled.main`
  background: #303030;
  padding: 30px;
  height: 100%;
  color: #fff;
`;

const Dashboardsc = styled.div`
  width: 100%;
  position: relative;
`;

export default function layout() {
  return (
    <Main>
      <Dashboardsc>
        <Sidebar activeBtn={1} heading={"Dashboard"} />
        <Box
          sx={{
            display: "grid",
            placeItems: "center",

            height: "100vh",
            width: "100%",
          }}
        >
          <h1>Hey don't ignore me, I'm the dashboard</h1>
        </Box>

        {/* <CreateProject /> */}
      </Dashboardsc>
    </Main>
  );
}
