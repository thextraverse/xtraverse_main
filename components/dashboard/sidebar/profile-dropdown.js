import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../images/logo/whitelogo.png";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { FiHome } from "react-icons/fi";
import Link from "next/link";
import { useUserAuth } from "../../../configfile/UserAuthContext";

import {
  Ul,
  SearchBox,
  Aside,
  ProfileDropdown,
  HeaderSection,
} from "../dashboard.styled";

import { Avatar, Dropdown } from "antd";
import { Button, Menu, MenuItem } from "@mui/material";

export const drawerWidth = 120;
const Hr = styled.hr`
  width: calc(100% - 170px);
  margin-left: auto;
`;
const LogoutIcon = () => {
  return (
    <>
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
        <path
          d="M10 2H8.4c-2.24 0-3.36 0-4.216.436a4 4 0 00-1.748 1.748C2 5.04 2 6.16 2 8.4v7.2c0 2.24 0 3.36.436 4.216a4 4 0 001.748 1.748C5.04 22 6.16 22 8.4 22H10m0-10h12m0 0l-4-4m4 4l-4 4"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
const ProfileIcons = () => {
  return (
    <>
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 18.8A4.8 4.8 0 018.8 14h6.4a4.8 4.8 0 014.8 4.8v0a3.2 3.2 0 01-3.2 3.2H7.2A3.2 3.2 0 014 18.8v0zM16 6a4 4 0 11-8 0 4 4 0 018 0z"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
const QnaIcons = () => {
  return (
    <>
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
        <path
          d="M10 10.5V10a2 2 0 114 0v.121c0 .563-.223 1.102-.621 1.5L12 13m.5 3a.5.5 0 01-1 0m1 0a.5.5 0 00-1 0m1 0h-1M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

function ProfileDropdownlayout() {
  const { user, logOut } = useUserAuth();
  // console.log(user);
  // logout
  const router = useRouter();
  // console.log(user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleLogout = () => {
    try {
      router.push("/");
      logOut();
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  // console.log(user);
  const UserProfile = () => {
    return (
      <>
        {user && user.photoURL ? (
          <Image
            src={user.photoURL}
            alt="User Profile Picture"
            width={100}
            height={100}
          />
        ) : (
          "M"
        )}
      </>
    );
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar icon={<UserProfile />} />
        {/* {username} */}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          padding: "0px",
          margin: "0px",
        }}
      >
        <ProfileDropdown>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "5px 0px",
            }}
          >
            <Avatar icon={<UserProfile />} />
            <Box>
              <h1>{user.displayName}</h1>
              <span>@{user.displayName}</span>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px 0px",
            }}
          >
            <Box>
              <h1>289</h1>
              <span>Followers</span>
            </Box>
            <Box>
              <h1>88</h1>
              <span>Followers</span>
            </Box>
          </Box>
          <hr />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 0px",
            }}
          >
            <Box>
              <ProfileIcons />
            </Box>
            <Box>
              <p>Profile</p>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 0px",
            }}
          >
            <Box>
              <QnaIcons />
            </Box>
            <Box>
              <p>Help Center</p>
            </Box>
          </Box>
          <Button
            className="absluteBtn"
            onClick={handleLogout}
            sx={{
              width: "100%",
              borderRadius: "8px",
              color: "#fff",
              border: "2px solid #04FCBC",
              fontSize: "1em",
              textTransform: "capitalize",
              padding: "10px 0px",
              transition: "0.3s",
              fontWeight: "500",
              margin: "10px 0px",
              display: "flex",
              gap: "20px",
            }}
          >
            <LogoutIcon /> Logout
          </Button>
        </ProfileDropdown>
      </Menu>
    </>
  );
}

export default ProfileDropdownlayout;
