import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../images/blacklogo.svg";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { FiHome } from "react-icons/fi";
import Avatar from "@mui/material/Avatar";
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
import { Ul, SearchBox, Aside } from "../dashboard.styled";
import { Menu, Icon, Button } from "antd";
import settings from "../../images/icons/settings.png";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
export const drawerWidth = 300;
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
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 17V11.845C22 10.433 22 9.72701 21.8204 9.07517C21.6613 8.49771 21.3998 7.95353 21.0483 7.46857C20.6514 6.92115 20.1001 6.48011 18.9976 5.59805L16.9976 3.99805C15.214 2.57118 14.3222 1.85774 13.3332 1.58413C12.4608 1.34279 11.5392 1.34279 10.6668 1.58413C9.67783 1.85774 8.78603 2.57118 7.00244 3.99805L5.00244 5.59805C3.89986 6.48011 3.34857 6.92115 2.95174 7.46857C2.6002 7.95353 2.33865 8.49771 2.17957 9.07517C2 9.72701 2 10.433 2 11.845V17C2 19.7614 4.23858 22 7 22C8.10457 22 9 21.1046 9 20V15.9999C9 14.3431 10.3431 12.9999 12 12.9999C13.6569 12.9999 15 14.3431 15 15.9999V20C15 21.1046 15.8954 22 17 22C19.7614 22 22 19.7614 22 17Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>,
    "dashboard"
  ),
  getItemAgain(
    "Project",
    "sub1",
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.07989 2 5.2 2H6.8C7.92011 2 8.48016 2 8.90798 2.21799C9.28431 2.40973 9.59027 2.71569 9.78201 3.09202C10 3.51984 10 4.07989 10 5.2V8.8C10 9.92011 10 10.4802 9.78201 10.908C9.59027 11.2843 9.28431 11.5903 8.90798 11.782C8.48016 12 7.92011 12 6.8 12H5.2C4.07989 12 3.51984 12 3.09202 11.782C2.71569 11.5903 2.40973 11.2843 2.21799 10.908C2 10.4802 2 9.92011 2 8.8V5.2Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2 19C2 18.0681 2 17.6022 2.15224 17.2346C2.35523 16.7446 2.74458 16.3552 3.23463 16.1522C3.60218 16 4.06812 16 5 16H7C7.93188 16 8.39782 16 8.76537 16.1522C9.25542 16.3552 9.64477 16.7446 9.84776 17.2346C10 17.6022 10 18.0681 10 19V19C10 19.9319 10 20.3978 9.84776 20.7654C9.64477 21.2554 9.25542 21.6448 8.76537 21.8478C8.39782 22 7.93188 22 7 22H5C4.06812 22 3.60218 22 3.23463 21.8478C2.74458 21.6448 2.35523 21.2554 2.15224 20.7654C2 20.3978 2 19.9319 2 19V19Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 5C14 4.06812 14 3.60218 14.1522 3.23463C14.3552 2.74458 14.7446 2.35523 15.2346 2.15224C15.6022 2 16.0681 2 17 2H19C19.9319 2 20.3978 2 20.7654 2.15224C21.2554 2.35523 21.6448 2.74458 21.8478 3.23463C22 3.60218 22 4.06812 22 5V5C22 5.93188 22 6.39782 21.8478 6.76537C21.6448 7.25542 21.2554 7.64477 20.7654 7.84776C20.3978 8 19.9319 8 19 8H17C16.0681 8 15.6022 8 15.2346 7.84776C14.7446 7.64477 14.3552 7.25542 14.1522 6.76537C14 6.39782 14 5.93188 14 5V5Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 15.2C14 14.0799 14 13.5198 14.218 13.092C14.4097 12.7157 14.7157 12.4097 15.092 12.218C15.5198 12 16.0799 12 17.2 12H18.8C19.9201 12 20.4802 12 20.908 12.218C21.2843 12.4097 21.5903 12.7157 21.782 13.092C22 13.5198 22 14.0799 22 15.2V18.8C22 19.9201 22 20.4802 21.782 20.908C21.5903 21.2843 21.2843 21.5903 20.908 21.782C20.4802 22 19.9201 22 18.8 22H17.2C16.0799 22 15.5198 22 15.092 21.782C14.7157 21.5903 14.4097 21.2843 14.218 20.908C14 20.4802 14 19.9201 14 18.8V15.2Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>,
    [
      getItem("Website", "4", "", "dashboard/createproject"),
      getItem("Marketplace", "5", "", "dashboard/createproject/uploadnfts"),
      getItem("Community", "6", "", "dashboard/createproject/edithomepage"),
    ]
  ),
  getItem(
    "Launch",
    "2",
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 10.5L2 7.9999L3.07801 6.92193C3.96351 6.03644 4.40627 5.5937 4.93021 5.31387C5.39405 5.06614 5.90218 4.91229 6.42554 4.86114C7.01671 4.80336 7.63069 4.92616 8.85865 5.17177L10.4995 5.49997M18.4995 13.5L18.8279 15.1408C19.0737 16.3689 19.1966 16.983 19.1389 17.5743C19.0878 18.0977 18.9339 18.6059 18.6862 19.0698C18.4063 19.5939 17.9635 20.0367 17.0778 20.9224L16.0002 22L13.5002 18.5M6.99951 16.9998L8.99936 15M17.002 8.99951C17.002 10.1041 16.1065 10.9995 15.002 10.9995C13.8974 10.9995 13.002 10.1041 13.002 8.99951C13.002 7.89494 13.8974 6.99951 15.002 6.99951C16.1065 6.99951 17.002 7.89494 17.002 8.99951ZM17.1987 2L16.6498 2C15.6714 2 15.1821 2 14.7218 2.11053C14.3136 2.20853 13.9234 2.37016 13.5655 2.58949C13.1618 2.83688 12.8159 3.18282 12.1241 3.87469L6.9992 9C5.90878 10.0905 5.36357 10.6358 5.07213 11.2239C4.51761 12.343 4.51764 13.6569 5.0722 14.776C5.36367 15.3642 5.9089 15.9094 6.99936 16.9998V16.9998C8.0899 18.0904 8.63517 18.6357 9.22337 18.9271C10.3425 19.4817 11.6565 19.4817 12.7756 18.9271C13.3638 18.6356 13.909 18.0903 14.9995 16.9997L20.1243 11.8745C20.8161 11.1827 21.1619 10.8368 21.4093 10.4331C21.6286 10.0753 21.7902 9.6851 21.8881 9.27697C21.9987 8.81664 21.9987 8.32749 21.9987 7.34918L21.9987 6.8C21.9987 5.11984 21.9987 4.27976 21.6717 3.63803C21.3841 3.07354 20.9251 2.6146 20.3606 2.32698C19.7189 2 18.8788 2 17.1987 2Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>,
    "dashboard/createproject/domain"
  ),
  getItem(
    "Setting",
    "3",
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.00004C11.303 4.00004 10.6132 3.73831 10.1864 3.18734L9.73424 2.60372C9.12172 1.81308 8.01933 1.59645 7.15318 2.09652L5.84684 2.85074C4.98069 3.35081 4.6171 4.41383 4.99556 5.3396L5.27481 6.02271C5.5387 6.66822 5.42168 7.39321 5.0722 7.99668V7.99668C4.72303 8.59962 4.15039 9.07044 3.46003 9.16458L2.72977 9.26416C1.7388 9.39929 1 10.2457 1 11.2458V12.7543C1 13.7544 1.7388 14.6008 2.72977 14.7359L3.46006 14.8355C4.1504 14.9296 4.72303 15.4004 5.07219 16.0034V16.0034C5.42166 16.6068 5.53867 17.3318 5.27479 17.9773L4.99554 18.6604C4.61708 19.5862 4.98067 20.6492 5.84682 21.1493L7.15316 21.9035C8.01931 22.4035 9.1217 22.1869 9.73422 21.3963L10.1863 20.8128C10.6131 20.2618 11.303 20 12 20V20V20C12.6971 20 13.387 20.2618 13.8139 20.8129L14.2658 21.3961C14.8783 22.1867 15.9807 22.4034 16.8468 21.9033L18.1532 21.1491C19.0193 20.649 19.3829 19.586 19.0045 18.6602L18.7252 17.9772C18.4614 17.3317 18.5784 16.6068 18.9278 16.0033V16.0033C19.277 15.4004 19.8496 14.9296 20.5399 14.8355L21.2702 14.7359C22.2612 14.6008 23 13.7544 23 12.7543V11.2458C23 10.2457 22.2612 9.39929 21.2702 9.26416L20.5399 9.16458C19.8496 9.07044 19.277 8.59963 18.9278 7.99671V7.99671C18.5784 7.39326 18.4613 6.6683 18.7252 6.02281L19.0044 5.33977C19.3829 4.414 19.0193 3.35099 18.1532 2.85092L16.8468 2.0967C15.9807 1.59663 14.8783 1.81326 14.2658 2.6039L13.8138 3.18725C13.3869 3.73829 12.697 4.00004 12 4.00004V4.00004V4.00004Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>,
    "dashboard/createproject/connection"
  ),
];
// const items = [
//   {
//     key: "1",
//     label: "Dashboards",
//     icon: (
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M22 17V11.845C22 10.433 22 9.72701 21.8204 9.07517C21.6613 8.49771 21.3998 7.95353 21.0483 7.46857C20.6514 6.92115 20.1001 6.48011 18.9976 5.59805L16.9976 3.99805C15.214 2.57118 14.3222 1.85774 13.3332 1.58413C12.4608 1.34279 11.5392 1.34279 10.6668 1.58413C9.67783 1.85774 8.78603 2.57118 7.00244 3.99805L5.00244 5.59805C3.89986 6.48011 3.34857 6.92115 2.95174 7.46857C2.6002 7.95353 2.33865 8.49771 2.17957 9.07517C2 9.72701 2 10.433 2 11.845V17C2 19.7614 4.23858 22 7 22C8.10457 22 9 21.1046 9 20V15.9999C9 14.3431 10.3431 12.9999 12 12.9999C13.6569 12.9999 15 14.3431 15 15.9999V20C15 21.1046 15.8954 22 17 22C19.7614 22 22 19.7614 22 17Z"
//           stroke="white"
//           stroke-width="1.5"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         />
//       </svg>
//     ),
//     link: "/dashboard",
//   },
//   {
//     key: "2",
//     label: "Project",
//     icon: (
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M5.5 10.5L2 7.9999L3.07801 6.92193C3.96351 6.03644 4.40627 5.5937 4.93021 5.31387C5.39405 5.06614 5.90218 4.91229 6.42554 4.86114C7.01671 4.80336 7.63069 4.92616 8.85865 5.17177L10.4995 5.49997M18.4995 13.5L18.8279 15.1408C19.0737 16.3689 19.1966 16.983 19.1389 17.5743C19.0878 18.0977 18.9339 18.6059 18.6862 19.0698C18.4063 19.5939 17.9635 20.0367 17.0778 20.9224L16.0002 22L13.5002 18.5M6.99951 16.9998L8.99936 15M17.002 8.99951C17.002 10.1041 16.1065 10.9995 15.002 10.9995C13.8974 10.9995 13.002 10.1041 13.002 8.99951C13.002 7.89494 13.8974 6.99951 15.002 6.99951C16.1065 6.99951 17.002 7.89494 17.002 8.99951ZM17.1987 2L16.6498 2C15.6714 2 15.1821 2 14.7218 2.11053C14.3136 2.20853 13.9234 2.37016 13.5655 2.58949C13.1618 2.83688 12.8159 3.18282 12.1241 3.87469L6.9992 9C5.90878 10.0905 5.36357 10.6358 5.07213 11.2239C4.51761 12.343 4.51764 13.6569 5.0722 14.776C5.36367 15.3642 5.9089 15.9094 6.99936 16.9998V16.9998C8.0899 18.0904 8.63517 18.6357 9.22337 18.9271C10.3425 19.4817 11.6565 19.4817 12.7756 18.9271C13.3638 18.6356 13.909 18.0903 14.9995 16.9997L20.1243 11.8745C20.8161 11.1827 21.1619 10.8368 21.4093 10.4331C21.6286 10.0753 21.7902 9.6851 21.8881 9.27697C21.9987 8.81664 21.9987 8.32749 21.9987 7.34918L21.9987 6.8C21.9987 5.11984 21.9987 4.27976 21.6717 3.63803C21.3841 3.07354 20.9251 2.6146 20.3606 2.32698C19.7189 2 18.8788 2 17.1987 2Z"
//           stroke="white"
//           stroke-width="1.5"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         />
//       </svg>
//     ),
//     link: "/project",
//   },
//   {
//     key: "3",
//     label: "Project",
//     icon: (
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M5.5 10.5L2 7.9999L3.07801 6.92193C3.96351 6.03644 4.40627 5.5937 4.93021 5.31387C5.39405 5.06614 5.90218 4.91229 6.42554 4.86114C7.01671 4.80336 7.63069 4.92616 8.85865 5.17177L10.4995 5.49997M18.4995 13.5L18.8279 15.1408C19.0737 16.3689 19.1966 16.983 19.1389 17.5743C19.0878 18.0977 18.9339 18.6059 18.6862 19.0698C18.4063 19.5939 17.9635 20.0367 17.0778 20.9224L16.0002 22L13.5002 18.5M6.99951 16.9998L8.99936 15M17.002 8.99951C17.002 10.1041 16.1065 10.9995 15.002 10.9995C13.8974 10.9995 13.002 10.1041 13.002 8.99951C13.002 7.89494 13.8974 6.99951 15.002 6.99951C16.1065 6.99951 17.002 7.89494 17.002 8.99951ZM17.1987 2L16.6498 2C15.6714 2 15.1821 2 14.7218 2.11053C14.3136 2.20853 13.9234 2.37016 13.5655 2.58949C13.1618 2.83688 12.8159 3.18282 12.1241 3.87469L6.9992 9C5.90878 10.0905 5.36357 10.6358 5.07213 11.2239C4.51761 12.343 4.51764 13.6569 5.0722 14.776C5.36367 15.3642 5.9089 15.9094 6.99936 16.9998V16.9998C8.0899 18.0904 8.63517 18.6357 9.22337 18.9271C10.3425 19.4817 11.6565 19.4817 12.7756 18.9271C13.3638 18.6356 13.909 18.0903 14.9995 16.9997L20.1243 11.8745C20.8161 11.1827 21.1619 10.8368 21.4093 10.4331C21.6286 10.0753 21.7902 9.6851 21.8881 9.27697C21.9987 8.81664 21.9987 8.32749 21.9987 7.34918L21.9987 6.8C21.9987 5.11984 21.9987 4.27976 21.6717 3.63803C21.3841 3.07354 20.9251 2.6146 20.3606 2.32698C19.7189 2 18.8788 2 17.1987 2Z"
//           stroke="white"
//           stroke-width="1.5"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         />
//       </svg>
//     ),
//     link: "/project",
//   },
// ];
function Sidebar({ activeBtn }) {
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
  const handleLogout = () => {
    try {
      router.push("/");
      logOut();
    } catch (err) {
      console.log(err);
    }
  };
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
  const svg = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.00004C11.303 4.00004 10.6132 3.73831 10.1864 3.18734L9.73424 2.60372C9.12172 1.81308 8.01933 1.59645 7.15318 2.09652L5.84684 2.85074C4.98069 3.35081 4.6171 4.41383 4.99556 5.3396L5.27481 6.02271C5.5387 6.66822 5.42168 7.39321 5.0722 7.99668V7.99668C4.72303 8.59962 4.15039 9.07044 3.46003 9.16458L2.72977 9.26416C1.7388 9.39929 1 10.2457 1 11.2458V12.7543C1 13.7544 1.7388 14.6008 2.72977 14.7359L3.46006 14.8355C4.1504 14.9296 4.72303 15.4004 5.07219 16.0034V16.0034C5.42166 16.6068 5.53867 17.3318 5.27479 17.9773L4.99554 18.6604C4.61708 19.5862 4.98067 20.6492 5.84682 21.1493L7.15316 21.9035C8.01931 22.4035 9.1217 22.1869 9.73422 21.3963L10.1863 20.8128C10.6131 20.2618 11.303 20 12 20V20V20C12.6971 20 13.387 20.2618 13.8139 20.8129L14.2658 21.3961C14.8783 22.1867 15.9807 22.4034 16.8468 21.9033L18.1532 21.1491C19.0193 20.649 19.3829 19.586 19.0045 18.6602L18.7252 17.9772C18.4614 17.3317 18.5784 16.6068 18.9278 16.0033V16.0033C19.277 15.4004 19.8496 14.9296 20.5399 14.8355L21.2702 14.7359C22.2612 14.6008 23 13.7544 23 12.7543V11.2458C23 10.2457 22.2612 9.39929 21.2702 9.26416L20.5399 9.16458C19.8496 9.07044 19.277 8.59963 18.9278 7.99671V7.99671C18.5784 7.39326 18.4613 6.6683 18.7252 6.02281L19.0044 5.33977C19.3829 4.414 19.0193 3.35099 18.1532 2.85092L16.8468 2.0967C15.9807 1.59663 14.8783 1.81326 14.2658 2.6039L13.8138 3.18725C13.3869 3.73829 12.697 4.00004 12 4.00004V4.00004V4.00004Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          background: "#aaa0",
          backdropFilter: "blur(10px)",
          color: "#000",
          borderBottom: "2px solid #212121",
          boxShadow: "0px 0px 0px transparent",
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <SearchBox>
              <GoSearch />
              <input type="text" placeholder="Search..." />
            </SearchBox>
            <Box>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleProfileDropdown}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>n</Avatar>
                </IconButton>
              </Tooltip>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleProfileDropdown}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt="User Profile Picture"
                        width={100}
                        height={100}
                      />
                    ) : (
                      "M"
                    )}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <div
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
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
          <div className="logo"></div>
          <Menu
            defaultSelectedKeys={[active]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={true}
          >
            <Menu.Item key="1">
              <AppstoreOutlined />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              {svg}
              <span>Option 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <span>Option 3</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <span>Navigation One</span>
                </span>
              }
            >
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <span>Navigation Two</span>
                </span>
              }
            >
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Aside>
      </div>
    </>
  );
}

export default Sidebar;
