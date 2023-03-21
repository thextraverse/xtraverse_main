import { Button } from "@mui/material";
import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { Form } from "../../styles/homepage.styled";

// export function TeamCard({ data, onDelete, onEdit }) {
//   const { image, name, title, links } = data;

//   function handleDelete() {
//     onDelete(data);
//   }

//   function handleEdit() {
//     onEdit(data);
//   }

//   return (
//     <div className="preview_Card">
//       <img src={image} alt="Team member" />
//       <h1>{name}</h1>
//       <p>{title}</p>
//       <ul>
//         {Object.entries(links).map(([key, value]) => (
//           <li key={key}>
//             <a href={value}>{key}</a>
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleEdit}>Edit Team</button>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// }

function TeamEditor(props) {
  const {
    setTeamHeading,
    teamFormData,
    handleTeamFormChange,
    handleTeamImageChange,
    handleTeamAddCard,
    handleTeamEditCard,
    handleTeamUpdateCard,
    handleTeamDeleteCard,
    editingCardIndex,
    teamCards,
  } = props;
  // const [teamCards, setTeamCards] = useState([
  //   {
  //     image: "/images/templatePage/descriptionblock.png",
  //     name: "John Doe",
  //     title: "Developer",
  //     links: {
  //       Twitter: "https://twitter.com/johndoe",
  //       Discord: "https://discord.gg/johndoe",
  //       Instagram: "https://instagram.com/johndoe",
  //       Facebook: "https://facebook.com/johndoe",
  //     },
  //   },
  //   {
  //     image: "/images/templatePage/descriptionblock.png",
  //     name: "Jane Doe",
  //     title: "Designer",
  //     links: {
  //       Twitter: "https://twitter.com/janedoe",
  //       Discord: "https://discord.gg/janedoe",
  //       Instagram: "https://instagram.com/janedoe",
  //       Facebook: "https://facebook.com/janedoe",
  //     },
  //   },
  //   // Add two more cards here
  // ]);
  // const [teamFormData, setTeamFormData] = useState({
  //   image: "",
  //   name: "",
  //   title: "",
  //   links: {
  //     Twitter: "",
  //     Discord: "",
  //     Instagram: "",
  //     Facebook: "",
  //   },
  // });
  // const [editingCardIndex, setEditingCardIndex] = useState(null);
  // function handleTeamFormChange(event) {
  //   const { name, value } = event.target;
  //   if (name === "name" || name === "title") {
  //     setTeamFormData({
  //       ...teamFormData,
  //       [name]: value,
  //     });
  //   } else {
  //     setTeamFormData({
  //       ...teamFormData,
  //       links: {
  //         ...teamFormData.links,
  //         [name]: value,
  //       },
  //     });
  //   }
  // }
  // function handleTeamImageChange(event) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setTeamFormData({ ...teamFormData, image: reader.result });
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // }
  // function handleTeamAddCard(event) {
  //   event.preventDefault();
  //   setTeamCards([...teamCards, teamFormData]);
  //   setTeamFormData({
  //     image: "",
  //     name: "",
  //     title: "",
  //     links: {
  //       Twitter: "",
  //       Discord: "",
  //       Instagram: "",
  //       Facebook: "",
  //     },
  //   });
  // }
  // function handleTeamEditCard(index) {
  //   setTeamFormData(teamCards[index]);
  //   setEditingCardIndex(index);
  // }
  // function handleTeamUpdateCard(event) {
  //   event.preventDefault();
  //   const updatedCards = [...teamCards];
  //   updatedCards[editingCardIndex] = teamFormData;
  //   setTeamCards(updatedCards);
  //   setTeamFormData({
  //     image: "",
  //     name: "",
  //     title: "",
  //     links: {
  //       Twitter: "",
  //       Discord: "",
  //       Instagram: "",
  //       Facebook: "",
  //     },
  //   });
  //   setEditingCardIndex(null);
  // }
  // function handleTeamDeleteCard(index) {
  //   const updatedCards = teamCards.filter((_, i) => i !== index);
  //   setTeamCards(updatedCards);
  // }
  return (
    <>
      <Form className="forminput editem">
        <h1 style={{ color: "#fff", fontWeight: "500" }}>
          {editingCardIndex !== null ? "Edit Team Member" : "Add New Member"}
        </h1>
        <form
          onSubmit={
            editingCardIndex !== null ? handleTeamUpdateCard : handleTeamAddCard
          }
        >
          <br />
          <div>
            <span>AddHeading</span>
            <input
              type="text"
              placeholder="heading"
              onChange={(e) => setTeamHeading(e.target.value)}
            />
          </div>
          <div className="box">
            <div className="inputsc">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleTeamImageChange}
              />
              <span>
                <IoMdCloudUpload />
                Upload image
              </span>
            </div>
            <span>Name</span>
            <input
              type="text"
              id="name"
              name="name"
              value={teamFormData.name}
              onChange={handleTeamFormChange}
            />
            <span>Title</span>
            <input
              type="text"
              id="title"
              name="title"
              value={teamFormData.title}
              onChange={handleTeamFormChange}
            />
            <label htmlFor="twitter">Twitter:</label>
            <input
              type="text"
              id="twitter"
              name="Twitter"
              value={teamFormData.links.Twitter}
              onChange={handleTeamFormChange}
            />
            <span>Discord</span>
            <input
              type="text"
              id="discord"
              name="Discord"
              value={teamFormData.links.Discord}
              onChange={handleTeamFormChange}
            />
            <span>Instagram</span>
            <input
              type="text"
              id="instagram"
              name="Instagram"
              value={teamFormData.links.Instagram}
              onChange={handleTeamFormChange}
            />
            <span>Facebook</span>
            <input
              type="text"
              id="facebook"
              name="Facebook"
              value={teamFormData.links.Facebook}
              onChange={handleTeamFormChange}
            />
            <Button
              type="submit"
              sx={{
                width: "100%",
                background:
                  "linear-gradient(180deg, #04fcbc  0%, #40fd8f 100%)",
                borderRadius: "8px",
                color: "#000 ",
                fontSize: "1.2em",
                textTransform: "capitalize",
                border: "2px solid #fff",
                padding: "8px 0px",
                fontWeight: "500",
                margin: "10px 0px",
                "&:hover ": {
                  background:
                    "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                  color: "#000",
                  cursor: "pointer",
                },
              }}
            >
              {editingCardIndex !== null ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </Form>
      {/* {teamCards.map((card, index) => (
        <TeamCard
          key={index}
          data={card}
          onDelete={() => handleTeamDeleteCard(index)}
          onEdit={() => handleTeamEditCard(index)}
        />
      ))} */}
    </>
  );
}

export default TeamEditor;
