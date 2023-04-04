import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../images/logo/3d-logo.png";

import Link from "next/link";
import { useUserAuth } from "../../../configfile/UserAuthContext";

import { Aside } from "../dashboard.styled";
import { Menu } from "antd";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
export const drawerWidth = 120;

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

const menuList = {
  1: { key: "1", label: "Dashboard" },
  2: { key: "2", label: "Business" },
  3: { key: "3", label: "Shop" },
  4: { key: "4", label: "Website" },
  5: { key: "5", label: "Community" },
  6: { key: "6", label: "Integations" },
  7: { key: "7", label: "Setting" },
};
const items = [
  getItem(
    "Dashboard",
    "1",
    <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24">
      <path
        stroke="#fff"
        d="M22 17v-5.155c0-1.412 0-2.118-.18-2.77a5.001 5.001 0 00-.772-1.606c-.397-.548-.948-.989-2.05-1.871l-2-1.6c-1.784-1.427-2.676-2.14-3.665-2.414a5 5 0 00-2.666 0c-.99.274-1.881.987-3.665 2.414l-2 1.6C3.9 6.48 3.35 6.921 2.952 7.468a5 5 0 00-.772 1.607C2 9.727 2 10.433 2 11.845V17a5 5 0 005 5 2 2 0 002-2v-4a3 3 0 016 0v4a2 2 0 002 2 5 5 0 005-5z"
      />
    </svg>,
    "dashboard"
  ),
  // getItem(
  //   "Business",
  //   "2",
  //   <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
  //     <path
  //       d="M2 5.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C3.52 2 4.08 2 5.2 2h1.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C10 3.52 10 4.08 10 5.2v3.6c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C8.48 12 7.92 12 6.8 12H5.2c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C2 10.48 2 9.92 2 8.8V5.2zM2 19c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C3.602 16 4.068 16 5 16h2c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C10 17.602 10 18.068 10 19v0c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C8.398 22 7.932 22 7 22H5c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C2 20.398 2 19.932 2 19v0zM14 5c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C15.602 2 16.068 2 17 2h2c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C22 3.602 22 4.068 22 5v0c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C20.398 8 19.932 8 19 8h-2c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C14 6.398 14 5.932 14 5v0zM14 15.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C15.52 12 16.08 12 17.2 12h1.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C22 13.52 22 14.08 22 15.2v3.6c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C20.48 22 19.92 22 18.8 22h-1.6c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C14 20.48 14 19.92 14 18.8v-3.6z"
  //       stroke="#fff"
  //       strokeWidth={1.5}
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     />
  //   </svg>,
  //   "project",
  //   [
  //     // getItem("Business", "2", <AddBusinessIcon />, "project"),

  //     getItem("Website", "4", <DevicesOutlinedIcon />, "project/editWebsite"),
  //     getItem(
  //       "Shop",
  //       "3",
  //       <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none">
  //         <path
  //           d="M5 8v0c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C6.602 5 7.068 5 8 5h5.8c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C17 6.52 17 7.08 17 8.2V14c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C15.398 17 14.932 17 14 17v0M9 4v0c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C10.602 1 11.068 1 12 1h5.8c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C21 2.52 21 3.08 21 4.2V10c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C19.398 13 18.932 13 18 13v0M4.2 21h5.6c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874C13 19.48 13 18.92 13 17.8v-5.6c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C11.48 9 10.92 9 9.8 9H4.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C1 10.52 1 11.08 1 12.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C2.52 21 3.08 21 4.2 21z"
  //           stroke="#fff"
  //           strokeWidth={1.5}
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //         />
  //       </svg>,
  //       "project/editMarketplace/marketplaceSalespage"
  //     ),
  //     getItem(
  //       "Community",
  //       "5",
  //       <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
  //         <path
  //           d="M15 10a4 4 0 000-8m2 20h2.8a3.2 3.2 0 003.2-3.2v0a4.8 4.8 0 00-4.8-4.8H17m-5-8a4 4 0 11-8 0 4 4 0 018 0zM4.2 22h7.6a3.2 3.2 0 003.2-3.2v0a4.8 4.8 0 00-4.8-4.8H5.8A4.8 4.8 0 001 18.8v0A3.2 3.2 0 004.2 22z"
  //           stroke="#fff"
  //           strokeWidth={1.5}
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //         />
  //       </svg>,
  //       "community"
  //     ),
  //     getItem(
  //       "Integations",
  //       "6",
  //       <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none">
  //         <path
  //           d="M4.5 9.5L1 7l1.078-1.078c.886-.886 1.328-1.328 1.852-1.608a4 4 0 011.496-.453c.59-.058 1.205.065 2.433.31l1.64.329m8 8l.329 1.64c.246 1.229.369 1.843.31 2.434a4 4 0 01-.452 1.496c-.28.524-.723.967-1.608 1.852L15 21l-2.5-3.5M6 16l2-2m8.002-6a2 2 0 11-4 0 2 2 0 014 0zm.197-7h-.55c-.978 0-1.467 0-1.927.11a4 4 0 00-1.156.48c-.404.247-.75.593-1.442 1.285L6 8c-1.09 1.09-1.635 1.636-1.927 2.224a4 4 0 000 3.552C4.364 14.364 4.91 14.909 6 16v0c1.09 1.09 1.636 1.636 2.224 1.927a4 4 0 003.553 0c.588-.291 1.133-.837 2.223-1.927l5.125-5.126c.692-.691 1.038-1.037 1.285-1.44.22-.359.381-.749.48-1.157.11-.46.11-.95.11-1.928V5.8c0-1.68 0-2.52-.327-3.162a3 3 0 00-1.311-1.311C18.719 1 17.879 1 16.199 1z"
  //           stroke="#fff"
  //         />
  //       </svg>,
  //       "launch"
  //     ),
  //   ]
  // ),

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
    "Integations",
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
    "Settings",
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

function Sidebar({}) {
  const { user, logOut } = useUserAuth();
  const [activeMenu, setActiveMenu] = useState({
    key: "1",
    label: "Dashboard",
  });

  useEffect(() => {
    const storedState = window.sessionStorage.getItem("activeMenu");
    if (storedState) {
      const storedValue = JSON.parse(storedState);
      if (storedValue.key != activeMenu?.key) {
        setActiveMenu(storedValue);
      }
    } else {
      window.sessionStorage.setItem("activeMenu", JSON.stringify(activeMenu));
    }
  });

  return (
    <>
      <Aside>
        <div className="nav">
          <Link href="/">
            <div className="logo">
              <Image src={logo} alt="logo" />
            </div>
          </Link>
          <Menu
            selectedKeys={[activeMenu.key]}
            // defaultOpenKeys={["2"]}
            onClick={(e) => {
              console.log(e, "test on click");
              setActiveMenu(menuList[e.key]);
              window.sessionStorage.setItem(
                "activeMenu",
                JSON.stringify(menuList[e.key])
              );
            }}
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
