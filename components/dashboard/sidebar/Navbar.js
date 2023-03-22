import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../images/logo/whitelogo.png";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { FiHome } from "react-icons/fi";
// import Avatar from "@mui/material/Avatar";
// import Menu from "@mui/material/Menu";

import { GoSearch } from "react-icons/go";
import { BsGrid1X2 } from "react-icons/bs";
import Link from "next/link";

import { Ul, SearchBox, Aside, ProfileDropdown } from "../dashboard.styled";
import { Avatar, Menu, Dropdown, Button } from "antd";

import { AiFillProfile } from "react-icons/ai";
import ProfileDropdownlayout from "./profile-dropdown";
import CyptoDropdownSec from "./cypto-dropdown";
import NotificationDropdownlayout from "./notification-dropdown";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

export const drawerWidth = 120;
const Hr = styled.hr`
  width: calc(100% - 170px);
  margin-left: auto;
`;
import Select from "react-select";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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
function getItemAgain(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
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
  getItemAgain(
    "Business",
    "sub1",
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 5.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C3.52 2 4.08 2 5.2 2h1.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C10 3.52 10 4.08 10 5.2v3.6c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C8.48 12 7.92 12 6.8 12H5.2c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C2 10.48 2 9.92 2 8.8V5.2zM2 19c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C3.602 16 4.068 16 5 16h2c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C10 17.602 10 18.068 10 19v0c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C8.398 22 7.932 22 7 22H5c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C2 20.398 2 19.932 2 19v0zM14 5c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C15.602 2 16.068 2 17 2h2c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C22 3.602 22 4.068 22 5v0c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C20.398 8 19.932 8 19 8h-2c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C14 6.398 14 5.932 14 5v0zM14 15.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C15.52 12 16.08 12 17.2 12h1.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C22 13.52 22 14.08 22 15.2v3.6c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C20.48 22 19.92 22 18.8 22h-1.6c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C14 20.48 14 19.92 14 18.8v-3.6z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    [
      getItem("Website", "2", "", "project/editWebsite"),
      getItem("Shop", "4", "", "project/editMarketplace/marketplaceSalespage"),
      getItem("Community", "5", "", "Community"),
      getItem("Launch", "6", "", "Launch"),
    ]
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
// const items = [
//   getItem(
//     "Dashboards",
//     "1",
// <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24">
//   <path
//     stroke="#fff"
//     d="M22 17v-5.155c0-1.412 0-2.118-.18-2.77a5.001 5.001 0 00-.772-1.606c-.397-.548-.948-.989-2.05-1.871l-2-1.6c-1.784-1.427-2.676-2.14-3.665-2.414a5 5 0 00-2.666 0c-.99.274-1.881.987-3.665 2.414l-2 1.6C3.9 6.48 3.35 6.921 2.952 7.468a5 5 0 00-.772 1.607C2 9.727 2 10.433 2 11.845V17a5 5 0 005 5 2 2 0 002-2v-4a3 3 0 016 0v4a2 2 0 002 2 5 5 0 005-5z"
//   />
// </svg>,
//     "dashboard"
//   ),
//   getItemAgain(
//     "Business",
//     "sub1",
// <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
//   <path
//     d="M2 5.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C3.52 2 4.08 2 5.2 2h1.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C10 3.52 10 4.08 10 5.2v3.6c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C8.48 12 7.92 12 6.8 12H5.2c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C2 10.48 2 9.92 2 8.8V5.2zM2 19c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C3.602 16 4.068 16 5 16h2c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C10 17.602 10 18.068 10 19v0c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C8.398 22 7.932 22 7 22H5c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C2 20.398 2 19.932 2 19v0zM14 5c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C15.602 2 16.068 2 17 2h2c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C22 3.602 22 4.068 22 5v0c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C20.398 8 19.932 8 19 8h-2c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C14 6.398 14 5.932 14 5v0zM14 15.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C15.52 12 16.08 12 17.2 12h1.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C22 13.52 22 14.08 22 15.2v3.6c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C20.48 22 19.92 22 18.8 22h-1.6c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C14 20.48 14 19.92 14 18.8v-3.6z"
//     stroke="#fff"
//     strokeWidth={1.5}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   />
// </svg>,
//     [
//       getItem("Website", "3", "", "project"),
//       getItem("Shop", "4", "", "project/editWebsite"),
//       getItem("Community", "5", "", "community"),
//       getItem("Launch", "6", "", "launch"),
//     ]
//   ),

//   getItem(
//     "Setting",
//     "7",
// <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
//   <path
//     d="M12 4c-.697 0-1.387-.262-1.814-.813l-.452-.583a2 2 0 00-2.58-.507l-1.307.754a2 2 0 00-.851 2.489l.279.683c.264.645.147 1.37-.203 1.974v0C4.723 8.6 4.15 9.07 3.46 9.165l-.73.1A2 2 0 001 11.244v1.51a2 2 0 001.73 1.98l.73.1c.69.095 1.263.565 1.612 1.168v0c.35.604.467 1.329.203 1.974l-.28.683a2 2 0 00.852 2.49l1.306.754a2 2 0 002.581-.508l.452-.583C10.613 20.262 11.303 20 12 20v0c.697 0 1.387.262 1.814.813l.452.583a2 2 0 002.58.507l1.307-.754a2 2 0 00.852-2.489l-.28-.683c-.264-.645-.147-1.37.203-1.974v0c.349-.603.922-1.073 1.612-1.168l.73-.1a2 2 0 001.73-1.98v-1.51a2 2 0 00-1.73-1.98l-.73-.1c-.69-.095-1.263-.565-1.612-1.168v0c-.35-.604-.467-1.329-.203-1.974l.28-.683a2 2 0 00-.852-2.49l-1.306-.753a2 2 0 00-2.581.507l-.452.583C13.387 3.738 12.697 4 12 4v0z"
//     stroke="#fff"
//     strokeWidth={1.5}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   />
//   <path
//     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//     stroke="#fff"
//     strokeWidth={1.5}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   />
// </svg>,
//     "dashboard/createproject/connection"
//   ),
// ];
const colorStyles = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: "#252525",
    color: "#fff",
    border: "transparent",
    padding: "10px 0px",
    margin: "10px 0px",
    width: "180px",
    "& input": {
      color: "#fff !important",
    },
  }),
  highlight: (styles, state) => ({
    ...styles,
    backgroundColor: "yellow",
    color: "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "#000",
    backgroundColor: state.isSelected ? "#04fcbc" : "#fff",
    "&:active": {
      backgroundColor: "blue",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "white", // Change this to your desired color
  }),
  menu: (provided) => ({
    ...provided,
    maxHeight: "150px",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "150px",
    overflowY: "auto",
  }),
};
function Sidebar({ activeBtn, heading }) {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const router = useRouter();
  const isDashboardPage = router.pathname === "/dashboard";

  const active = activeBtn.toString();

  const [projectSelection, setProjectSelection] = useState({});

  const handleSelectProject = (selectedOption) => {
    setProjectSelection(selectedOption);
    // console.log("handleChange", selectedOption);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const options1 = [
    { value: "project1", label: "Project 1" },
    { value: "project2", label: "Project 2" },
    { value: "project3", label: "Project 3" },
    { value: "project4", label: "Project 4" },
  ];

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
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {isDashboardPage && (
              <Select
                styles={colorStyles}
                options={options1}
                // defaultValue={{ value: "H1", label: "H1" }}
                isSearchable={true}
                onChange={handleSelectProject}
                placeholder="Select Project"
              />
            )}
            <Box
              component="h1"
              sx={{ fontSize: "2.4em", fontWeight: "500", color: "#fff" }}
            >
              {heading}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Box>{/* <CyptoDropdownSec /> */}</Box>
            <SearchBox>
              <GoSearch />
              <input type="text" placeholder="Search..." />
            </SearchBox>
            <NotificationDropdownlayout />
            <Box>
              <ProfileDropdownlayout />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Aside>
        <div className={collapsed ? "nav" : "nav activenav"}>
          <Button
            onClick={toggleCollapsed}
            style={{
              marginBottom: 16,
              border: "none",
              background: "#fff",
              position: "absolute",
              top: "50%",
              left: "100%",
              transform: "translate(-50%,-50%)",
              zIndex: "999",
              padding: "5px 8px",
              fontSize: "1.1em",
            }}
          >
            {collapsed ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </Button>
          <Link href="/">
            <div className="logo">
              <Image src={logo} alt="logo" />
            </div>
          </Link>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
          />
        </div>
      </Aside>
    </>
  );
}

export default Sidebar;
