import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import { GoSearch } from "react-icons/go";
import { useUserAuth } from "../../configfile/UserAuthContext";
import { SearchBox } from "./dashboard.styled";

import ProfileDropdownlayout from "./sidebar/profile-dropdown";
import NotificationDropdownlayout from "./sidebar/notification-dropdown";

function MyHeader({}) {
  const { user } = useUserAuth();

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
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "0px",
        }}
      >
        <Box
          sx={{
            fontSize: "2em",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {activeMenu.label}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end",
          }}
        >
          <SearchBox>
            <GoSearch />
            <input type="text" placeholder="Search..." />
          </SearchBox>
          <Box>
            <NotificationDropdownlayout />
          </Box>
          {user && (
            <Box>
              <ProfileDropdownlayout />
            </Box>
          )}
        </Box>
      </Toolbar>
    </>
  );
}

export default MyHeader;
