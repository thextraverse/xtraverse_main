// // form.js
// import React, { useState, createContext } from "react";
// export const ImageContext = createContext();
// import styled from "@emotion/styled";
// import Link from "next/link";

// const Main = styled.main`
//   background: #1f1f1f;
//   height: 100vh;
//   overflow: hidden;
//   padding: 30px;
// `;

// const index = () => {
//   const [image, setImage] = useState(null);
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };
//   return (
//     <ImageContext.Provider value={{ image, setImage }}>
//       <Main>
//         <form action="/createproject/uploadnfts/nftdetails">
//           <input type="file" onChange={handleImageChange} required />
//           <button type="submit">Submit</button>
//         </form>
//       </Main>
//     </ImageContext.Provider>
//   );
// };

// export default index;
