import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import logo from "../../components/images/logo.svg";
import { Box } from "@mui/system";
import Sidebar from "../../components/dashboard/sidebar";
import CreateProject from "../../components/dashboard/createproject";

const Main = styled.main`
  background: #1f1f1f;
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
        <Sidebar />
        <CreateProject />
      </Dashboardsc>
    </Main>
  );
}
