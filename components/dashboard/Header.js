import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import styled from "@emotion/styled";

import Toolbar from "@mui/material/Toolbar";
import { GoSearch } from "react-icons/go";
import { useUserAuth } from "../../configfile/UserAuthContext";
import { db } from "../../configfile/firebaseConfig";

import { SearchBox } from "./dashboard.styled";
import { query, collection, getDocs, where } from "firebase/firestore";

import ProfileDropdownlayout from "./sidebar/profile-dropdown";
import NotificationDropdownlayout from "./sidebar/notification-dropdown";

import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";

const Dropdown = styled.div`
  width: 250px;
  #demo-simple-select-label,
  #demo-simple-select {
    color: #fff;
    text-align: start;
  }

  #demo-simple-select + input + svg {
    fill: #fff;
  }
`;

function MyHeader({}) {
  const { user, setProjectData } = useUserAuth();
  const router = useRouter();

  let emailData = null;

  user !== null && user.email && (emailData = user.email);
  user === null && router.push("/");

  const [activeMenu, setActiveMenu] = useState({
    key: "1",
    label: "Dashboard",
  });

  const [activeProject, setActiveProject] = useState({ id: "" });

  const checkEmail = user.email;
  const [projects, setProjects] = useState([]);
  const queryUser = collection(db, "Users");
  async function getProjects() {
    if (!checkEmail) return;
    const q = query(queryUser, where("Email", "==", checkEmail));
    const querySnapshot1 = await getDocs(q);

    if (!querySnapshot1.empty) {
      const autoId = querySnapshot1.docs[0].id;
      const subcollectionRef = collection(db, "Users", autoId, "project");
      const querySnapshot2 = await getDocs(subcollectionRef);
      const docs = querySnapshot2.docs.map((doc) => doc.data());
      setProjects(docs);
      if (docs.length) {
        setActiveProject(docs[0]);
        setProjectData(docs[0].id);
      }
    }
  }
  useEffect(() => {
    getProjects();
  }, [emailData]);

  useEffect(() => {
    const storedState = window.sessionStorage.getItem("activeMenu");
    const storedProject = window.sessionStorage.getItem("activeProject");
    if (storedState && storedState !== "undefined") {
      const storedValue = JSON.parse(storedState);
      if (storedValue.key != activeMenu?.key) {
        setActiveMenu(storedValue);
      }
    } else {
      window.sessionStorage.setItem("activeMenu", JSON.stringify(activeMenu));
    }
    if (storedProject && storedProject !== "undefined") {
      const storedProjectValue = JSON.parse(storedProject);
      if (
        projects.length &&
        activeProject.id &&
        storedProjectValue.id != activeProject?.id
      ) {
        setActiveProject(storedProjectValue);
        setProjectData(storedProjectValue.id);
      }
    } else if (projects.length) {
      window.sessionStorage.setItem(
        "activeProject",
        JSON.stringify(projects[0])
      );
    }
  });

  const namedHeader = ["Business"];

  const handleProjectChange = (e) => {
    setActiveProject({ id: e.target.value });
    setProjectData(e.target.value);
    window.sessionStorage.setItem(
      "activeProject",
      JSON.stringify({ id: e.target.value })
    );
    // router.reload();
  };

  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "0px",
        }}
      >
        {namedHeader.includes(activeMenu.label) ? (
          <Box
            sx={{
              fontSize: "2em",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {activeMenu.label}
          </Box>
        ) : (
          <Dropdown>
            <TextField
              style={{
                margin: "12px 0px",
                background: "#242424",
                borderRadius: "8px",
                maxHeight: "50px",
              }}
              label="Select Business"
              size="small"
              sx={{ width: 200 }}
              select
              id="demo-simple-select"
              value={activeProject?.id}
              onChange={handleProjectChange}
            >
              {projects.map((project, index) => (
                <MenuItem key={index} value={project.id} sx={{ color: "#fff" }}>
                  {project.projectName}
                </MenuItem>
              ))}
            </TextField>
          </Dropdown>
        )}

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
