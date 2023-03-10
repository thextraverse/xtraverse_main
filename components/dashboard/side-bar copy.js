import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../images/blacklogo.svg";
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
import { useUserAuth } from "../../configfile/UserAuthContext";
import { async } from "@firebase/util";
import { Router } from "next/router";
import dashboard from "../images/icons/home.png";
import project from "../images/icons/project.png";
import community from "../images/icons/users.png";
import launch from "../images/icons/launch.png";
import { Menu } from "antd";
import { Ul, SearchBox } from "./dashboard.styled";
import settings from "../images/icons/settings.png";
// import {
//   AppstoreOutlined,
//   ContainerOutlined,
//   MenuFoldOutlined,
//   PieChartOutlined,
//   MailOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Project", "sub1", <Image src={project} alt="project" />, [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
];
// submenu keys of first level
const rootSubmenuKeys = ["sub1"];

export const drawerWidth = 300;

function Sidebar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
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
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <>
      <Box
        sx={{
          boxSizing: "border-box",
          width: "90%",
          background: "#252525",
          borderRadius: "10px",
          height: "95%",
          margin: "auto",
          marginTop: "6%",
          color: "#000",
        }}
      >
        <Ul>
          <li>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "0px 15px",
                margin: "20px 0px 40px",
              }}
            >
              <Link href="/">
                <Image src={logo} alt="" className="sideBarlogo" />
              </Link>
            </Box>
          </li>

          <li>
            <a href="#">
              <Image src={dashboard} alt="dashboard" />
              <p>Dashboard</p>
            </a>
          </li>
          <li>
            <div
              className={
                isOpen
                  ? "dropdown-menu-container active"
                  : "dropdown-menu-container"
              }
            >
              <button className="dropdown-menu-toggle" onClick={handleToggle}>
                Menu
              </button>

              <ul className="dropdown-menu-list">
                <li className="dropdown-menu-item">Item 1</li>
                <li className="dropdown-menu-item">Item 2</li>
                <li className="dropdown-menu-item">Item 3</li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">
              <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                className="project-menu"
                style={{
                  width: 256,
                }}
                items={items}
              />
            </a>
          </li>
          <li>
            <a href="#">
              <Image src={community} alt="community" />
              <p>Community</p>
            </a>
          </li>
          <li>
            <a href="#">
              <Image src={launch} alt="launch" />
              <p>Launch</p>
            </a>
          </li>
        </Ul>
      </Box>
    </>
  );
  // console.log(user.photoURL);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
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
            {/* <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                {user.displayName ? user.displayName : user.email}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu> */}
          </Box>
        </Toolbar>
      </AppBar>
      <div
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#252525",
              color: "#000",
              borderRight: "1px solid rgba(255, 255, 255, 0.12)",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background: "transparent",
              height: "100%",
              color: "#000",
              borderLeft: "none",
            },
          }}
          open
        >
          kire
        </Drawer>
      </div>
    </>
  );
}

export default Sidebar;
