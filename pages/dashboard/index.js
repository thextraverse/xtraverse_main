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
        <Sidebar activeBtn={1} />
        <CreateProject />
      </Dashboardsc>
    </Main>
  );
}
