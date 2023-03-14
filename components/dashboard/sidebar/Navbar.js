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
import { Button, Menu } from "antd";
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
  getItem(
    "Project",
    "2",
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
    // [
    //   getItem("Website", "4", "", "dashboard/createproject"),
    //   getItem("Marketplace", "5", "", "dashboard/createproject/uploadnfts"),
    //   getItem("Community", "6", "", "dashboard/createproject/edithomepage"),
    // ]
    "/project"
  ),

  getItem(
    "Marketplace",
    "3",
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 8V8C5 7.06812 5 6.60218 5.15224 6.23463C5.35523 5.74458 5.74458 5.35523 6.23463 5.15224C6.60218 5 7.06812 5 8 5H13.8C14.9201 5 15.4802 5 15.908 5.21799C16.2843 5.40973 16.5903 5.71569 16.782 6.09202C17 6.51984 17 7.0799 17 8.2V14C17 14.9319 17 15.3978 16.8478 15.7654C16.6448 16.2554 16.2554 16.6448 15.7654 16.8478C15.3978 17 14.9319 17 14 17V17M9 4V4C9 3.06812 9 2.60218 9.15224 2.23463C9.35523 1.74458 9.74458 1.35523 10.2346 1.15224C10.6022 1 11.0681 1 12 1H17.8C18.9201 1 19.4802 1 19.908 1.21799C20.2843 1.40973 20.5903 1.71569 20.782 2.09202C21 2.51984 21 3.0799 21 4.2V10C21 10.9319 21 11.3978 20.8478 11.7654C20.6448 12.2554 20.2554 12.6448 19.7654 12.8478C19.3978 13 18.9319 13 18 13V13M4.2 21H9.8C10.9201 21 11.4802 21 11.908 20.782C12.2843 20.5903 12.5903 20.2843 12.782 19.908C13 19.4802 13 18.9201 13 17.8V12.2C13 11.0799 13 10.5198 12.782 10.092C12.5903 9.71569 12.2843 9.40973 11.908 9.21799C11.4802 9 10.9201 9 9.8 9H4.2C3.0799 9 2.51984 9 2.09202 9.21799C1.71569 9.40973 1.40973 9.71569 1.21799 10.092C1 10.5198 1 11.0799 1 12.2V17.8C1 18.9201 1 19.4802 1.21799 19.908C1.40973 20.2843 1.71569 20.5903 2.09202 20.782C2.51984 21 3.07989 21 4.2 21Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>,
    "project/editMarketplace"
  ),
  getItem(
    "Website",
    "4",
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_327_12009)">
        <path
          d="M11.0013 0.916626C9.00701 0.916626 7.05749 1.508 5.39928 2.61597C3.74111 3.72395 2.4487 5.29875 1.68552 7.14125C0.922339 8.9837 0.722653 11.0111 1.11172 12.9671C1.50079 14.9231 2.46113 16.7198 3.87132 18.13C5.28149 19.5401 7.07816 20.5005 9.03414 20.8896C10.9901 21.2786 13.0176 21.0789 14.86 20.3157C16.7025 19.5525 18.2773 18.2601 19.3853 16.6019C20.4933 14.9438 21.0846 12.9943 21.0846 11C21.0816 8.32664 20.0183 5.76364 18.1279 3.87332C16.2376 1.98298 13.6746 0.91966 11.0013 0.916626ZM19.3971 14.6666H16.5609C16.7934 13.6122 16.9225 12.5377 16.9464 11.4583H20.1446C20.0929 12.5643 19.8395 13.6516 19.3971 14.6666ZM1.85801 11.4583H5.05627C5.08015 12.5377 5.20926 13.6122 5.44173 14.6666H2.60555C2.16309 13.6516 1.90975 12.5643 1.85801 11.4583ZM2.60555 7.33329H5.44173C5.20926 8.38769 5.08015 9.4622 5.05627 10.5416H1.85801C1.90975 9.43558 2.16309 8.34832 2.60555 7.33329ZM11.4596 6.41663V1.87546C13.1275 2.15046 14.5598 3.90863 15.361 6.41663H11.4596ZM15.619 7.33329C15.8675 8.38553 16.0058 9.46078 16.0315 10.5416H11.4596V7.33329H15.619ZM10.543 1.87546V6.41663H6.64164C7.44281 3.90863 8.8751 2.15046 10.543 1.87546ZM10.543 7.33329V10.5416H5.97248C5.99823 9.46078 6.13651 8.38553 6.38498 7.33329H10.543ZM5.97248 11.4583H10.543V14.6666H6.3836C6.1356 13.6143 5.99778 12.5391 5.97248 11.4583ZM10.543 15.5833V20.1245C8.8751 19.8495 7.44281 18.0913 6.64164 15.5833H10.543ZM11.4596 20.1245V15.5833H15.361C14.5598 18.0913 13.1275 19.8495 11.4596 20.1245ZM11.4596 14.6666V11.4583H16.0301C16.0044 12.5391 15.8661 13.6144 15.6176 14.6666H11.4596ZM16.9464 10.5416C16.9225 9.4622 16.7934 8.38769 16.5609 7.33329H19.3971C19.8395 8.34832 20.0929 9.43558 20.1446 10.5416H16.9464ZM18.9277 6.41663H16.3239C15.9261 4.92315 15.1781 3.54599 14.1418 2.39933C16.1568 3.13936 17.8497 4.5604 18.9277 6.41663ZM7.86081 2.39933C6.82452 3.54599 6.07647 4.92315 5.67868 6.41663H3.07489C4.15292 4.5604 5.84584 3.13936 7.86081 2.39933ZM3.07489 15.5833H5.67868C6.07647 17.0768 6.82452 18.4539 7.86081 19.6006C5.84584 18.8606 4.15292 17.4395 3.07489 15.5833ZM14.1418 19.6006C15.1781 18.4539 15.9261 17.0768 16.3239 15.5833H18.9277C17.8497 17.4395 16.1568 18.8606 14.1418 19.6006Z"
          fill="#FFEAEA"
        />
      </g>
      <defs>
        <clipPath id="clip0_327_12009">
          <rect width="22" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>,
    "project/editWebsite"
  ),
  getItem(
    "Community",
    "5",
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 10C17.2091 10 19 8.20914 19 6C19 3.79086 17.2091 2 15 2M17 22H19.8C21.5673 22 23 20.5673 23 18.8V18.8C23 16.149 20.851 14 18.2 14H17M12 6C12 8.20914 10.2091 10 8 10C5.79086 10 4 8.20914 4 6C4 3.79086 5.79086 2 8 2C10.2091 2 12 3.79086 12 6ZM4.2 22H11.8C13.5673 22 15 20.5673 15 18.8V18.8C15 16.149 12.851 14 10.2 14H5.8C3.14903 14 1 16.149 1 18.8V18.8C1 20.5673 2.43269 22 4.2 22Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>,
    "project/editMarketplace"
  ),
  getItem(
    "Launch",
    "6",
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 9.5L1 6.9999L2.07801 5.92193C2.96351 5.03644 3.40627 4.5937 3.93021 4.31387C4.39405 4.06614 4.90218 3.91229 5.42554 3.86114C6.01671 3.80336 6.63069 3.92616 7.85865 4.17177L9.49951 4.49997M17.4995 12.5L17.8279 14.1408C18.0737 15.3689 18.1966 15.983 18.1389 16.5743C18.0878 17.0977 17.9339 17.6059 17.6862 18.0698C17.4063 18.5939 16.9635 19.0367 16.0778 19.9224L15.0002 21L12.5002 17.5M5.99951 15.9998L7.99936 14M16.002 7.99951C16.002 9.10408 15.1065 9.99951 14.002 9.99951C12.8974 9.99951 12.002 9.10408 12.002 7.99951C12.002 6.89494 12.8974 5.99951 14.002 5.99951C15.1065 5.99951 16.002 6.89494 16.002 7.99951ZM16.1987 0.999997L15.6498 0.999997C14.6714 0.999998 14.1821 0.999998 13.7218 1.11053C13.3136 1.20853 12.9234 1.37016 12.5655 1.58949C12.1618 1.83688 11.8159 2.18282 11.1241 2.87469L5.9992 8C4.90878 9.0905 4.36357 9.63576 4.07213 10.2239C3.51761 11.343 3.51764 12.6569 4.0722 13.776C4.36367 14.3642 4.9089 14.9094 5.99936 15.9998V15.9998C7.0899 17.0904 7.63517 17.6357 8.22337 17.9271C9.34251 18.4817 10.6565 18.4817 11.7756 17.9271C12.3638 17.6356 12.909 17.0903 13.9995 15.9997L19.1243 10.8745C19.8161 10.1827 20.1619 9.83679 20.4093 9.43313C20.6286 9.07526 20.7902 8.6851 20.8881 8.27697C20.9987 7.81664 20.9987 7.32749 20.9987 6.34918L20.9987 5.8C20.9987 4.11984 20.9987 3.27976 20.6717 2.63803C20.3841 2.07354 19.9251 1.6146 19.3606 1.32698C18.7189 0.999997 17.8788 0.999997 16.1987 0.999997Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>,
    "project/launch"
  ),
  getItem(
    "Setting",
    "7",
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
          <Box
            component="h2"
            sx={{ fontSize: "1.8em", fontWeight: "600", color: "#fff" }}
          >
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
