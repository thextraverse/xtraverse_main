import styled from "@emotion/styled";
import Sidebar from "../../components/dashboard/sidebar/Navbar";
import Image from "next/image";
import Link from "next/link";
import logo from "../../components/images/logo.svg";
import { Box } from "@mui/system";
import CreateProject from "../../components/dashboard/create-project";

import React from "react";

import { Avatar, Menu, Dropdown } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
  TranslationOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

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

const widgetMenu = (
  <Menu>
    <Menu.Item>
      <SolutionOutlined className="icon" />
      profile
    </Menu.Item>
    <Menu.Item>
      <LockOutlined className="icon" />
      change password
    </Menu.Item>
    <Menu.Item>
      <TranslationOutlined className="icon" />
      change language
    </Menu.Item>
    <Menu.Item>
      <PoweroffOutlined className="icon" />
      sign out
    </Menu.Item>
  </Menu>
);
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

          <Dropdown overlay={widgetMenu} placement="bottomRight">
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </Box>

        {/* <CreateProject /> */}
      </Dashboardsc>
    </Main>
  );
}
