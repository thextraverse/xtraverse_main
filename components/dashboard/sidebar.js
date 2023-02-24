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
import Menu from "@mui/material/Menu";
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
const drawerWidth = 240;
const Ul = styled.ul`
  list-style: none;
  padding: 10px 10px;
  li {
    padding: 0px 0px;
  }
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 15px;
    border-radius: 5px;
    color: #000;
    font-weight: 500;

    svg {
      font-size: 1.4em;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: #000;
    }
  }
`;
const SearchBox = styled.div`
  position: relative;
  width: 400px;
  outline: none;
  input {
    width: 100%;
    border: 0px;
    border-radius: 10px;
    padding: 10px 10px 10px 30px;
    background: #d7dcdf;
  }
  svg {
    position: absolute;
    left: 8px;
    top: 25%;
  }
`;
function Sidebar(props) {
  const { user, logOut } = useUserAuth();
  console.log(user);
  // logout
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

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
    <Box>
      <Ul>
        <li>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              padding: "0px 15px",
              margin: "20px 0px",
            }}
          >
            <Link href="/">
              <Image src={logo} alt="" className="sideBarlogo" />
            </Link>
          </Box>
        </li>

        <li>
          <a href="#">
            <FiHome />
            <p>Dashboard</p>
          </a>
        </li>
        <li>
          <a href="#">
            <BsGrid1X2 />

            <p>Project</p>
          </a>
        </li>
        <li>
          <a href="#">
            <FiHome />
            <p>Community</p>
          </a>
        </li>
        <li>
          <a href="#">
            <FiHome />
            <p>Launch</p>
          </a>
        </li>
      </Ul>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          background: "#F6F7F9",
          color: "#000",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
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
              justifyContent: "space-between",
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
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
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
              <MenuItem>{user && user.email}</MenuItem>
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
            </Menu>
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
              background: "#F6F7F9",
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
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#F6F7F9",
              color: "#000",
              borderRight: " 1px solid rgba(255, 255, 255, 0.12)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </div>
    </>
  );
}

export default Sidebar;
