import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../images/logo/whitelogo.png";
import { div } from "@mui/system";
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
      <svg width="1em" height="1em" viewBox="0 0 15 25" fill="none">
        <g clipPath="url(#prefix__clip0_217_17515)">
          <path
            d="M.23 13.57c2.603 1.387 5.318 2.838 7.415 3.961L15 13.571A3536.783 3536.783 0 017.645 24.5C5.168 20.851 2.433 16.825.23 13.57zm.283-1.095l7.14-3.822 7.048 3.795-7.044 3.826-7.144-3.799zm7.132-5.047L.23 11.345 7.613.5 15 11.369l-7.355-3.94z"
            fill="url(#prefix__paint0_linear_217_17515)"
          />
          <path
            d="M7.646 17.531L15 13.571A8509.037 8509.037 0 017.646 24.5v-6.969zm.008-8.878l7.047 3.795-7.043 3.826-.004-7.621zm-.008-1.224L7.613.5 15 11.369l-7.354-3.94z"
            fill="url(#prefix__paint1_linear_217_17515)"
          />
          <path
            d="M.516 12.476l7.14.588 7.047-.613-7.043 3.827-7.144-3.802z"
            fill="url(#prefix__paint2_linear_217_17515)"
          />
          <path
            d="M7.652 13.063l7.048-.612-7.044 3.827-.004-3.214z"
            fill="url(#prefix__paint3_linear_217_17515)"
          />
        </g>
        <defs>
          <linearGradient
            id="prefix__paint0_linear_217_17515"
            x1={7.615}
            y1={0.5}
            x2={7.615}
            y2={24.5}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#04FCBC" />
            <stop offset={1} stopColor="#40FD8F" />
          </linearGradient>
          <linearGradient
            id="prefix__paint1_linear_217_17515"
            x1={11.307}
            y1={0.5}
            x2={11.307}
            y2={24.5}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#04FCBC" />
            <stop offset={1} stopColor="#40FD8F" />
          </linearGradient>
          <linearGradient
            id="prefix__paint2_linear_217_17515"
            x1={7.609}
            y1={12.451}
            x2={7.609}
            y2={16.278}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#04FCBC" />
            <stop offset={1} stopColor="#40FD8F" />
          </linearGradient>
          <linearGradient
            id="prefix__paint3_linear_217_17515"
            x1={11.176}
            y1={12.451}
            x2={11.176}
            y2={16.278}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#04FCBC" />
            <stop offset={1} stopColor="#40FD8F" />
          </linearGradient>
          <clipPath id="prefix__clip0_217_17515">
            <path
              fill="#fff"
              transform="translate(.23 .5)"
              d="M0 0h14.769v24H0z"
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
          <div className="crytpDetails">
            <div className="image">
              <Image src={icons1} alt="icons" />
            </div>

            <p>Etherum</p>
          </div>
          <div className="crytpDetails">
            <div className="image">
              <Image src={icons2} alt="icons" />
            </div>

            <p>Polygon</p>
          </div>

          <div className="crytpDetails">
            <div className="image">
              <Image src={icons3} alt="icons" />
            </div>

            <p>Solana</p>
          </div>

          <div className="crytpDetails">
            <div className="image">
              <Image src={icons4} alt="icons" />
            </div>

            <div>
              <p>Near</p>
              <span>Comming soon</span>
            </div>
          </div>
          <div className="crytpDetails">
            <div className="image">
              <Image src={icons5} alt="icons" />
            </div>

            <div>
              <p>HBAR</p>
              <span>Comming soon</span>
            </div>
          </div>
          <div className="crytpDetails">
            <div className="image">
              <Image src={icons6} alt="icons" />
            </div>

            <div>
              <p>Cardano</p>
              <span>Comming soon</span>
            </div>
          </div>
          <div className="crytpDetails">
            <div className="image">
              <Image src={icons7} alt="icons" />
            </div>

            <div>
              <p>XRP</p>
              <span>Comming soon</span>
            </div>
          </div>

          <div className="crytpDetails">
            <div className="image">
              <Image src={icons8} alt="icons" />
            </div>

            <div>
              <p>XDC</p>
              <span>Comming soon</span>
            </div>
          </div>
        </ProfileDropdown>
      </Menu>
    </>
  );
}

export default CyptoDropdownSec;
