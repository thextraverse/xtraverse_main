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
import { IoMdNotificationsOutline } from "react-icons/io";

export const drawerWidth = 120;
const Hr = styled.hr`
  width: calc(100% - 170px);
  margin-left: auto;
`;
const LogoutIcon = () => {
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
          d="M10 2H9.5H8.4C6.15979 2 5.03968 2 4.18404 2.43597C3.43139 2.81947 2.81947 3.43139 2.43597 4.18404C2 5.03968 2 6.15979 2 8.4V15.6C2 17.8402 2 18.9603 2.43597 19.816C2.81947 20.5686 3.43139 21.1805 4.18404 21.564C5.03968 22 6.15979 22 8.4 22H9.5H10M10 12H22M22 12L18 8M22 12L18 16"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};
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

function NotificationDropdownlayout() {
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
        sx={{ fontSize: "1.7em", color: "#fff", paddingRight: "unset" }}
      >
        <IoMdNotificationsOutline />
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
        <ProfileDropdown className="notifcationsbar">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              padding: "5px 0px",
            }}
          >
            <h1>Notifications</h1>
            <div className="buttonsc">
              <Button
                sx={{
                  color: "#fff",
                  border: "2px solid #fff",
                  fontSize: ".9em",
                  textTransform: "capitalize",
                  padding: "10px 10px",
                  height: "35px",
                  transition: "0.3s",
                  fontWeight: "400",
                  borderRadius: "50px",
                  cursor: "pointer",
                  "&:hover ": {
                    color: "#000",
                    background: "#fff",
                  },
                }}
              >
                All
              </Button>
              <Button
                sx={{
                  width: "100%",
                  color: "#fff",
                  border: "2px solid #fff",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "10px 10px",
                  transition: "0.3s",
                  fontWeight: "500",
                  display: "flex",
                  gap: "20px",
                  height: "35px",
                  borderRadius: "50px",
                  "&:hover ": {
                    color: "#000",
                    background: "#fff",
                  },
                }}
              >
                Unread
              </Button>
            </div>
          </Box>
          <div>
            <div className="notifyInfo">
              <div className="infowrap">
                <div className="img"></div>
                <div className="details">
                  <p>Annelies Pauline is now following you</p>
                  <span>Sep 30 at 19:30</span>
                </div>
              </div>
              <div className="dot"></div>
            </div>
            <div className="notifyInfo">
              <div className="infowrap">
                <div className="img"></div>
                <div className="details">
                  <p>Annelies Pauline is now following you</p>
                  <span>Sep 30 at 19:30</span>
                </div>
              </div>
              <div className="dot"></div>
            </div>
            <div className="notifyInfo">
              <div className="infowrap">
                <div className="img"></div>
                <div className="details">
                  <p>Annelies Pauline is now following you</p>
                  <span>Sep 30 at 19:30</span>
                </div>
              </div>
              <div className="dot"></div>
            </div>
          </div>
        </ProfileDropdown>
      </Menu>
    </>
  );
}

export default NotificationDropdownlayout;
