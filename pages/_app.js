import { useState } from "react";
import App from "next/app";
import "../styles/globals.css";

import { UserAuthContextProvider } from "../configfile/UserAuthContext";
import Layout from "../components/dashboard/Layout";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let bodyClass = "";
  switch (router.pathname) {
    case "/project":
      bodyClass = "css-pr23xdf";
      break;
    case "/project/editMarketplace/marketplaceSalespage":
      bodyClass = "css-mrkt23plc2pgs";
      break;
    case "/project/editMarketplace/sales-page-editor":
      bodyClass = "css-mrkt23plc2pgs";
      break;
    case "/project/editMarketplace/thankyouPage":
      bodyClass = "css-edtw23plc2st";
      break;
    case "/project/editWebsite":
      bodyClass = "css-edtw23plc2st";
      break;
    default:
      bodyClass = "";
      break;
  }

  return (
    <div className={bodyClass}>
      <UserAuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserAuthContextProvider>
    </div>
  );
}

export default MyApp;
