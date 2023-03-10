import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import logo from "../../components/images/logo.svg";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Box } from "@mui/system";
import Signup from "./sign-up";
import { useUserAuth } from "../../configfile/UserAuthContext";
import Alert from "@mui/material/Alert";
import { Span, Form, Hr, GoogleBtn, Btn, SignSec } from "./singin.styled";
import {
  addDoc,
  getDocs,
  doc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../configfile/firebaseConfig";
function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [error, setError] = useState("");
  const { loginAuth, googleSignUp, user, data } = useUserAuth();
  const userDataCollectionRef = collection(db, "Users");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const signuphandleClickOpen = () => {
    setTimeout(() => {
      setSignupOpen(true);
    }, 200);
  };

  const signuphandleClose = () => {
    setSignupOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginAuth(email, password);

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await googleSignUp();
      const userDataCollectionRef = collection(db, "Users");
      const querySnapshot = await getDocs(
        query(userDataCollectionRef, where("Email", "==", result.user.email))
      );
      if (querySnapshot.docs.length > 0) {
        // User exists in Firestore, sign them in without creating a new collection
        router.push("/info");
      } else {
        // User doesn't exist in Firestore, create a new collection for them
        await addDoc(userDataCollectionRef, {
          Uid: result.user.uid,
          Provider: result.user.providerData[0].providerId,
          Email: result.user.email,
        });
        router.push("/info");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "inline-flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Btn>Contact Sales</Btn>
        <Btn onClick={handleGoogleSignIn}>Start Building</Btn>
      </Box>
      {/* <Dialog
        open={open}
        onClose={handleClose}
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
                margin: "15px 0px 60px",
              }}
            >
              <Image src={logo} alt="logo" />
            </Box>

            //  google signin button
            <GoogleBtn onClick={handleGoogleSignIn}>
              <AiFillGoogleCircle />
              <span>Sign in with Google</span>
            </GoogleBtn>
            <Hr></Hr>

          //  form for signin 
            <Form onSubmit={handleSubmit}>
              {error && <Alert severity="error">{error}</Alert>}
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
              </Box>
              <input type="submit" value="Sign in" />
            </Form>
            <Span>
              No account?
              <a
                onClick={() => {
                  handleClose();
                  signuphandleClickOpen();
                }}
              >
                Sign up
              </a>
            </Span>
          </SignSec>
        </DialogContent>
      </Dialog> 
       <Signup
        signuphandleClickOpen={signuphandleClickOpen}
        signuphandleClose={signuphandleClose}
        signInhandleClickOpen={handleClickOpen}
        signupOpen={signupOpen}
      /> */}
    </>
  );
}

export default Signin;
