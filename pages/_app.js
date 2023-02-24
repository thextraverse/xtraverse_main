import { useState } from "react";
import "../styles/globals.css";
import { UserAuthContextProvider } from "../configfile/UserAuthContext";
function MyApp({ Component, pageProps }) {
  return (
    <UserAuthContextProvider>
      <Component {...pageProps} />
    </UserAuthContextProvider>
  );
}

export default MyApp;
