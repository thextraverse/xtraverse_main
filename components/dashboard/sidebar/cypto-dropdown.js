import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../images/logo/whitelogo.png";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { FiHome } from "react-icons/fi";
import Link from "next/link";
import { useUserAuth } from "../../../configfile/UserAuthContext";
import icons1 from "../../images/icons/crypto/icon.svg";
import icons2 from "../../images/icons/crypto/icon-1.svg";
import icons3 from "../../images/icons/crypto/icon-2.svg";
import icons4 from "../../images/icons/crypto/icon-3.svg";
import icons5 from "../../images/icons/crypto/icon-4.svg";
import icons6 from "../../images/icons/crypto/icon-5.svg";
import icons7 from "../../images/icons/crypto/icon-6.svg";
import icons8 from "../../images/icons/crypto/Vector.svg";
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
const EtherrumIcon = () => {
  return (
    <>
      <svg
        width="15"
        height="25"
        viewBox="0 0 15 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_217_17515)">
          <path
            d="M0.230469 13.5703C2.83274 14.9568 5.54816 16.4081 7.64543 17.531L14.9997 13.5703C12.3368 17.5391 10.1181 20.8432 7.64543 24.5C5.16835 20.8513 2.43274 16.8252 0.230469 13.5703ZM0.513314 12.4755L7.65347 8.65301L14.7007 12.4476L7.65749 16.2743L0.513314 12.4755ZM7.64543 7.42833L0.230469 11.3446L7.61307 0.5L14.9997 11.3689L7.64543 7.42833Z"
            fill="url(#paint0_linear_217_17515)"
          />
          <path
            d="M7.64563 17.531L14.9999 13.5703C12.337 17.5391 7.64563 24.5 7.64563 24.5V17.531ZM7.65367 8.65301L14.7009 12.4476L7.65769 16.2743L7.65367 8.65301ZM7.64563 7.42862L7.61328 0.5L14.9999 11.3689L7.64563 7.42862Z"
            fill="url(#paint1_linear_217_17515)"
          />
          <path
            d="M0.515625 12.4757L7.65616 13.0636L14.7034 12.4514L7.6598 16.2784L0.515625 12.4757Z"
            fill="url(#paint2_linear_217_17515)"
          />
          <path
            d="M7.65234 13.0635L14.6996 12.4513L7.65636 16.2783L7.65234 13.0635Z"
            fill="url(#paint3_linear_217_17515)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_217_17515"
            x1="7.61508"
            y1="0.5"
            x2="7.61508"
            y2="24.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#04FCBC" />
            <stop offset="1" stop-color="#40FD8F" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_217_17515"
            x1="11.3066"
            y1="0.5"
            x2="11.3066"
            y2="24.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#04FCBC" />
            <stop offset="1" stop-color="#40FD8F" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_217_17515"
            x1="7.6095"
            y1="12.4514"
            x2="7.6095"
            y2="16.2784"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#04FCBC" />
            <stop offset="1" stop-color="#40FD8F" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_217_17515"
            x1="11.1759"
            y1="12.4513"
            x2="11.1759"
            y2="16.2783"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#04FCBC" />
            <stop offset="1" stop-color="#40FD8F" />
          </linearGradient>
          <clipPath id="clip0_217_17515">
            <rect
              width="14.7692"
              height="24"
              fill="white"
              transform="translate(0.230469 0.5)"
            />
          </clipPath>
        </defs>
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

function CyptoDropdownSec() {
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
        sx={{
          color: "#04FCBC",
          display: "flex",
          gap: "7px",
        }}
      >
        <EtherrumIcon /> 9 ETH
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
        <ProfileDropdown className="cryptoDropdwonw">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "40% auto",
              alignItems: "center",
              gap: "20px",
              padding: "15px 0px",
            }}
          >
            <Image src={icons1} alt="icons" />
            <p>Etherum</p>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "40% auto",
              alignItems: "center",
              gap: "20px",
              padding: "15px 0px",
            }}
          >
            <Image src={icons2} alt="icons" />
            <p>Polygon</p>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "40% auto",
              alignItems: "center",
              gap: "20px",
              padding: "15px 0px",
            }}
          >
            <Image src={icons3} alt="icons" />
            <p>Solana</p>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "40% auto",
              alignItems: "center",
              gap: "20px",
              padding: "15px 0px",
            }}
          >
            <Image src={icons4} alt="icons" />
            <Box>
              <p>Near</p>
              <span>Comming soon</span>
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "40% auto",
              alignItems: "center",
              gap: "20px",
              padding: "15px 0px",
            }}
          >
            <Image src={icons5} alt="icons" />
            <Box>
              <p>HBAR</p>
              <span>Comming soon</span>
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "20% auto",
              alignItems: "center",
              gap: "20px",
              padding: "15px 0px",
            }}
          >
            <Image src={icons6} alt="icons" />
            <Box>
              <p>Cardano</p>
              <span>Comming soon</span>
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "40% auto",
              alignItems: "center",
              gap: "20px",
              padding: "15px 0px",
            }}
          >
            <Image src={icons7} alt="icons" />
            <Box>
              <p>XRP</p>
              <span>Comming soon</span>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "40% auto",
                alignItems: "center",
                gap: "20px",
                padding: "15px 0px",
              }}
            >
              <Image src={icons8} alt="icons" />
              <Box>
                <p>XDC</p>
                <span>Comming soon</span>
              </Box>
            </Box>
          </Box>
        </ProfileDropdown>
      </Menu>
    </>
  );
}

export default CyptoDropdownSec;
