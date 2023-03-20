import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { IoMdCloudUpload } from "react-icons/io";
import { RiTicketLine } from "react-icons/ri";
import { HomepagePreview } from "./edithomepage.style";
import firstimg from "../../images/project1.png";
import { useRouter } from "next/router";
import { Form, Headlines } from "../../styles/homepage.styled";
import { RiDeleteBinLine } from "react-icons/ri";
import ColorPicker from "react-best-gradient-color-picker";
import { auth, db, storage } from "../../../configfile/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import {
  query,
  addDoc,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useUserAuth } from "../../../configfile/UserAuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import { AiOutlinePlus } from "react-icons/ai";
function EditRaodmap(props) {
  const {
    handleSubmit,
    handleInputChange,
    formData,
    editMode,
    setRoadmapHeading,
  } = props;

  return (
    <>
      <Headlines>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <span>Add Headline</span>
            <input
              type="text"
              onChange={(e) => setRoadmapHeading(e.target.value)}
              placeholder="headline"
            />
          </Grid>
        </Grid>
      </Headlines>
      <Form className="forminput" onSubmit={handleSubmit}>
        <div>
          <span>Title</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <br />
          <span>Heading</span>
          <input
            type="text"
            name="explain"
            value={formData.explain}
            onChange={handleInputChange}
            placeholder="Heading"
          />
          <br />
          <span>Subtext</span>

          <textarea
            name="subtext"
            value={formData.subtext}
            onChange={handleInputChange}
            placeholder="Subtext"
          />
          <br />
          <span>List</span>
          <ul style={{ listStyle: "none" }} className="radmapul">
            {formData.list.map((item, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="List.."
                />
              </li>
            ))}
          </ul>
          <br />
          <Button
            type="submit"
            sx={{
              width: "100%",
              background: "linear-gradient(180deg, #04fcbc  0%, #40fd8f 100%)",
              borderRadius: "8px",
              color: "#000 ",
              fontSize: "1.2em",
              textTransform: "capitalize",
              border: "2px solid #fff",
              padding: "8px 0px",
              fontWeight: "500",
              margin: "10px 0px",
              "&:hover ": {
                background: "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                color: "#000",
                cursor: "pointer",
              },
            }}
          >
            {editMode ? "Update" : "Add New Roadmap"}
          </Button>
          <br />
        </div>
      </Form>
    </>
  );
}

// export function Cards({ cards }) {
//   return (
//     <>
//       {cards.map((card) => (
//         <div key={card.id}>
//           <h2>{card.title}</h2>
//           <p>{card.explain}</p>
//           <p>{card.subtext}</p>
//           <ul>
//             {card.list.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//           <button onClick={() => handleEdit(card)}>Edit</button>
//           <button onClick={() => handleDelete(card)}>Delete</button>
//         </div>
//       ))}
//     </>
//   );
// }
export default EditRaodmap;
