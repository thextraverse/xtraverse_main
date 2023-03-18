import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../images/logo/whitelogo.png";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { FiHome } from "react-icons/fi";
// import Avatar from "@mui/material/Avatar";
// import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { GoSearch } from "react-icons/go";
import { BsGrid1X2 } from "react-icons/bs";
import Link from "next/link";
import { useUserAuth } from "../../../configfile/UserAuthContext";
import { async } from "@firebase/util";
import { Router } from "next/router";
import dashboard from "../../images/icons/home.png";
import project from "../../images/icons/project.png";
import community from "../../images/icons/users.png";
import launch from "../../images/icons/launch.png";
import { Ul, SearchBox, Aside, ProfileDropdown } from "../dashboard.styled";
import settings from "../../images/icons/settings.png";
import { Avatar, Menu, Dropdown } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
  TranslationOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { AiFillProfile } from "react-icons/ai";
import ProfileDropdownlayout from "./profile-dropdown";
import CyptoDropdownSec from "./cypto-dropdown";
import NotificationDropdownlayout from "./notification-dropdown";

export const drawerWidth = 120;
const Hr = styled.hr`
  width: calc(100% - 170px);
  margin-left: auto;
`;
function getItem(label, key, icon, link, children) {
  return {
    key,
    icon,
    link,
    children,
    label: (
      <Link href={`/${link}`}>
        <a className="active">{label}</a>
      </Link>
    ),
  };
}
// function getItemAgain(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
const items = [
  getItem(
    "Dashboards",
    "1",
    <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24">
      <path
        stroke="#fff"
        d="M22 17v-5.155c0-1.412 0-2.118-.18-2.77a5.001 5.001 0 00-.772-1.606c-.397-.548-.948-.989-2.05-1.871l-2-1.6c-1.784-1.427-2.676-2.14-3.665-2.414a5 5 0 00-2.666 0c-.99.274-1.881.987-3.665 2.414l-2 1.6C3.9 6.48 3.35 6.921 2.952 7.468a5 5 0 00-.772 1.607C2 9.727 2 10.433 2 11.845V17a5 5 0 005 5 2 2 0 002-2v-4a3 3 0 016 0v4a2 2 0 002 2 5 5 0 005-5z"
      />
    </svg>,
    "dashboard"
  ),
  getItem(
    "Project",
    "2",
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 5.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C3.52 2 4.08 2 5.2 2h1.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C10 3.52 10 4.08 10 5.2v3.6c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C8.48 12 7.92 12 6.8 12H5.2c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C2 10.48 2 9.92 2 8.8V5.2zM2 19c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C3.602 16 4.068 16 5 16h2c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C10 17.602 10 18.068 10 19v0c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C8.398 22 7.932 22 7 22H5c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C2 20.398 2 19.932 2 19v0zM14 5c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C15.602 2 16.068 2 17 2h2c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C22 3.602 22 4.068 22 5v0c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C20.398 8 19.932 8 19 8h-2c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C14 6.398 14 5.932 14 5v0zM14 15.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C15.52 12 16.08 12 17.2 12h1.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C22 13.52 22 14.08 22 15.2v3.6c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C20.48 22 19.92 22 18.8 22h-1.6c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C14 20.48 14 19.92 14 18.8v-3.6z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    // [
    //   getItem("Website", "4", "", "dashboard/createproject"),
    //   getItem("Marketplace", "5", "", "dashboard/createproject/uploadnfts"),
    //   getItem("Community", "6", "", "dashboard/createproject/edithomepage"),
    // ]
    "project"
  ),

  getItem(
    "Marketplace",
    "3",
    <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none">
      <path
        d="M5 8v0c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C6.602 5 7.068 5 8 5h5.8c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C17 6.52 17 7.08 17 8.2V14c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C15.398 17 14.932 17 14 17v0M9 4v0c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C10.602 1 11.068 1 12 1h5.8c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C21 2.52 21 3.08 21 4.2V10c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C19.398 13 18.932 13 18 13v0M4.2 21h5.6c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874C13 19.48 13 18.92 13 17.8v-5.6c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C11.48 9 10.92 9 9.8 9H4.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C1 10.52 1 11.08 1 12.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C2.52 21 3.08 21 4.2 21z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    "project/editMarketplace/sales-page-editor"
  ),
  getItem(
    "Website",
    "4",
    <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none">
      <g clipPath="url(#prefix__clip0_327_12009)">
        <path
          d="M11.001.917A10.083 10.083 0 1021.085 11 10.094 10.094 0 0011 .917zm8.396 13.75h-2.836c.232-1.055.361-2.13.385-3.209h3.199a9.092 9.092 0 01-.748 3.209zM1.858 11.458h3.198c.024 1.08.153 2.154.386 3.209H2.606a9.092 9.092 0 01-.748-3.209zm.748-4.125h2.836a16.607 16.607 0 00-.386 3.209H1.858a9.092 9.092 0 01.748-3.209zm8.854-.916V1.875c1.667.275 3.1 2.034 3.901 4.542H11.46zm4.159.916a15.57 15.57 0 01.413 3.209H11.46V7.333h4.159zm-5.076-5.458v4.542H6.642c.8-2.508 2.233-4.267 3.901-4.542zm0 5.458v3.209h-4.57c.025-1.081.164-2.156.412-3.209h4.158zm-4.57 4.125h4.57v3.209h-4.16a15.575 15.575 0 01-.41-3.209zm4.57 4.125v4.542c-1.668-.276-3.1-2.034-3.901-4.542h3.901zm.917 4.542v-4.542h3.901c-.801 2.508-2.234 4.266-3.901 4.542zm0-5.458v-3.209h4.57a15.569 15.569 0 01-.412 3.209H11.46zm5.486-4.125a16.606 16.606 0 00-.385-3.209h2.836a9.093 9.093 0 01.748 3.209h-3.199zm1.982-4.125h-2.604a9.724 9.724 0 00-2.182-4.018 9.204 9.204 0 014.786 4.018zM7.86 2.399a9.724 9.724 0 00-2.182 4.018H3.075A9.204 9.204 0 017.86 2.399zM3.075 15.583h2.604a9.724 9.724 0 002.182 4.018 9.204 9.204 0 01-4.786-4.018zm11.067 4.018a9.724 9.724 0 002.182-4.018h2.604a9.204 9.204 0 01-4.786 4.018z"
          fill="#FFEAEA"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_327_12009">
          <path fill="#fff" d="M0 0h22v22H0z" />
        </clipPath>
      </defs>
    </svg>,
    "project/editWebsite"
  ),
  getItem(
    "Community",
    "5",
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 10a4 4 0 000-8m2 20h2.8a3.2 3.2 0 003.2-3.2v0a4.8 4.8 0 00-4.8-4.8H17m-5-8a4 4 0 11-8 0 4 4 0 018 0zM4.2 22h7.6a3.2 3.2 0 003.2-3.2v0a4.8 4.8 0 00-4.8-4.8H5.8A4.8 4.8 0 001 18.8v0A3.2 3.2 0 004.2 22z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    "community"
  ),
  getItem(
    "Launch",
    "6",
    <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none">
      <path
        d="M4.5 9.5L1 7l1.078-1.078c.886-.886 1.328-1.328 1.852-1.608a4 4 0 011.496-.453c.59-.058 1.205.065 2.433.31l1.64.329m8 8l.329 1.64c.246 1.229.369 1.843.31 2.434a4 4 0 01-.452 1.496c-.28.524-.723.967-1.608 1.852L15 21l-2.5-3.5M6 16l2-2m8.002-6a2 2 0 11-4 0 2 2 0 014 0zm.197-7h-.55c-.978 0-1.467 0-1.927.11a4 4 0 00-1.156.48c-.404.247-.75.593-1.442 1.285L6 8c-1.09 1.09-1.635 1.636-1.927 2.224a4 4 0 000 3.552C4.364 14.364 4.91 14.909 6 16v0c1.09 1.09 1.636 1.636 2.224 1.927a4 4 0 003.553 0c.588-.291 1.133-.837 2.223-1.927l5.125-5.126c.692-.691 1.038-1.037 1.285-1.44.22-.359.381-.749.48-1.157.11-.46.11-.95.11-1.928V5.8c0-1.68 0-2.52-.327-3.162a3 3 0 00-1.311-1.311C18.719 1 17.879 1 16.199 1z"
        stroke="#fff"
      />
    </svg>,
    "launch"
  ),
  getItem(
    "Setting",
    "7",
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4c-.697 0-1.387-.262-1.814-.813l-.452-.583a2 2 0 00-2.58-.507l-1.307.754a2 2 0 00-.851 2.489l.279.683c.264.645.147 1.37-.203 1.974v0C4.723 8.6 4.15 9.07 3.46 9.165l-.73.1A2 2 0 001 11.244v1.51a2 2 0 001.73 1.98l.73.1c.69.095 1.263.565 1.612 1.168v0c.35.604.467 1.329.203 1.974l-.28.683a2 2 0 00.852 2.49l1.306.754a2 2 0 002.581-.508l.452-.583C10.613 20.262 11.303 20 12 20v0c.697 0 1.387.262 1.814.813l.452.583a2 2 0 002.58.507l1.307-.754a2 2 0 00.852-2.489l-.28-.683c-.264-.645-.147-1.37.203-1.974v0c.349-.603.922-1.073 1.612-1.168l.73-.1a2 2 0 001.73-1.98v-1.51a2 2 0 00-1.73-1.98l-.73-.1c-.69-.095-1.263-.565-1.612-1.168v0c-.35-.604-.467-1.329-.203-1.974l.28-.683a2 2 0 00-.852-2.49l-1.306-.753a2 2 0 00-2.581.507l-.452.583C13.387 3.738 12.697 4 12 4v0z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    "dashboard/createproject/connection"
  ),
];
const ProfileIcons = () => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 18.8C4 16.149 6.14903 14 8.8 14H15.2C17.851 14 20 16.149 20 18.8V18.8C20 20.5673 18.5673 22 16.8 22H7.2C5.43269 22 4 20.5673 4 18.8V18.8Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};
const QnaIcons = () => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 10.5V10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10V10.1213C14 10.6839 13.7765 11.2235 13.3787 11.6213L12 13M12.5 16C12.5 16.2761 12.2761 16.5 12 16.5C11.7239 16.5 11.5 16.2761 11.5 16M12.5 16C12.5 15.7239 12.2761 15.5 12 15.5C11.7239 15.5 11.5 15.7239 11.5 16M12.5 16H11.5M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};
function Sidebar({ activeBtn, heading }) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const active = activeBtn.toString();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const { user, logOut } = useUserAuth();
  // console.log(user);
  // logout
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState();
  // console.log(user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleProfileDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const currentPath = router.pathname;
  const item = items.find((item) => item.link === currentPath);

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: "calc(100% - 100px)" },
          background: "#303030",
          backdropFilter: "blur(10px)",
          borderBottom: "2px solid #252525",
          color: "#000",
          boxShadow: "0px 0px 0px transparent",
          paddingLeft: "50px",
          // ml: { sm: `${drawerWidth}px` },
          position: "fixed",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px 0px",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ fontSize: "2.4em", fontWeight: "500", color: "#fff" }}>
            {heading}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Box>
              <CyptoDropdownSec />
            </Box>
            <SearchBox>
              <GoSearch />
              <input type="text" placeholder="Search..." />
            </SearchBox>
            <Box>
              <NotificationDropdownlayout />
            </Box>
            <Box>
              <ProfileDropdownlayout />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Aside>
        {/* <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button> */}
        <div className="nav">
          <Link href="/">
            <div className="logo">
              <Image src={logo} alt="logo" />
            </div>
          </Link>
          <Menu
            defaultSelectedKeys={[active]}
            // defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={true}
            items={items}
          />
        </div>
      </Aside>
    </>
  );
}

export default Sidebar;
