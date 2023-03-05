import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState } from "react";
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import logo from "../../components/images/logo.svg";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Box } from "@mui/system";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useUserAuth } from "../../configfile/UserAuthContext";
import { GoogleBtn, Form, Span, SignSec } from "./signup.styled";
import { auth, db } from "../../configfile/firebaseConfig";

import {
  addDoc,
  getDocs,
  doc,
  collection,
  query,
  where,
} from "firebase/firestore";
function Signup({ signuphandleClose, signupOpen, signInhandleClickOpen }) {
  const [index, setIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [agency, setAgency] = useState("");
  const [websiteName, setWebsiteName] = useState("");

  const handleNext = () => {
    setIndex(index === layouts.length - 0 ? 1 : index + 1);
  };

  const handlePrev = () => {
    setIndex(index === 0 ? layouts.length - 1 : index - 1);
  };

  const layouts = [
    <Step1
      key="step1"
      handleNext={handleNext}
      signuphandleClose={signuphandleClose}
      signInhandleClickOpen={signInhandleClickOpen}
      userName={userName}
      setUserName={setUserName}
      agency={agency}
      setAgency={setAgency}
      websiteName={websiteName}
      setWebsiteName={setWebsiteName}
    />,
    <Step2
      key="step2"
      handlePrev={handlePrev}
      useUserAuth={useUserAuth}
      userName={userName}
      agency={agency}
      websiteName={websiteName}
      signuphandleClose={signuphandleClose}
      signInhandleClickOpen={signInhandleClickOpen}
      // signUpAuth={signUpAuth}
    />,
  ];

  return (
    <>
      <Dialog
        open={signupOpen}
        onClose={signuphandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            background: "#1f1f1f",
            border: "2px solid #fff",
            borderRadius: "10px",
          }}
        >
          <SignSec>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "15px 0px 15px",
              }}
            >
              <Image src={logo} alt="logo" />

              <ul className="paginationUl">
                <li className={index === 0 ? "activeLi" : ""}>
                  <span></span>
                </li>
                <li className={index === 1 ? "activeLi" : ""}>
                  <span></span>
                </li>
              </ul>
            </Box>
            {layouts[index]}
          </SignSec>
        </DialogContent>
      </Dialog>
    </>
  );
}
const Step1 = ({
  handleNext,
  signuphandleClose,
  signInhandleClickOpen,
  userName,
  setUserName,
  agency,
  setAgency,
  websiteName,
  setWebsiteName,
}) => {
  const { loginAuth, googleSignUp } = useUserAuth();
  const [error, setError] = useState("");
  const router = useRouter();
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignUp();
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <Form action="#">
        <Box
          sx={{
            margin: "5px 0px 12px",
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            margin: "12px 0px",
          }}
        >
          <label htmlFor="agency">Agency</label>
          <input
            type="text"
            id="agency"
            required
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            margin: "12px 0px 20px",
          }}
        >
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            required
          />
        </Box>
        <button className="nxtBtn " onClick={() => handleNext()}>
          <span>Next</span>
        </button>
      </Form>
      <Span>
        Already have an account?
        <a
          onClick={() => {
            signuphandleClose();
            signInhandleClickOpen();
          }}
        >
          Sign in
        </a>
      </Span>
      <GoogleBtn onClick={handleGoogleSignIn}>
        <AiFillGoogleCircle />
        <span>Sign up with Google</span>
      </GoogleBtn>
      <br />
    </>
  );
};
const Step2 = ({
  handlePrev,
  useUserAuth,
  signuphandleClose,
  signInhandleClickOpen,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [error, setError] = useState("");
  const { signUpAuth } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signUpAuth(email, password);

      const userDataCollectionRef = collection(db, "Users");
      const querySnapshot = await getDocs(
        query(userDataCollectionRef, where("Email", "==", result.user.email))
      );
      if (querySnapshot.docs.length > 0) {
        // User exists in Firestore, sign them in without creating a new collection
        router.push("/dashboard");
      } else {
        // User doesn't exist in Firestore, create a new collection for them
        await addDoc(userDataCollectionRef, {
          Uid: result.user.uid,
          // Provider: result.user.providerData[0].providerId,
          Email: result.user.email,
        });
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className=" BackIcon" onClick={handlePrev}>
        <IoIosArrowDropleftCircle />
      </div>

      <Form onSubmit={handleSubmit}>
        <Box
          sx={{
            margin: "25px 0px",
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p>{`vai ${error}`}</p>}
        </Box>
        <Box
          sx={{
            margin: "25px 0px",
          }}
        >
          <label htmlFor="password">Pasword</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p>{`vai ${error}`}</p>}
        </Box>
        <Box
          sx={{
            margin: "25px 0px",
          }}
        >
          <label htmlFor="ConfirmPass" required>
            Confirm Password
          </label>
          <input
            type="password"
            id="ConfirmPass"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
        </Box>
        <input type="submit" value="Sign in" />
      </Form>
      <br />
    </>
  );
};

export default Signup;
