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
const SignSec = styled.div`
  width: 350px;
  gap: 50px;
  text-decoration: none;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  .paginationUl {
    display: flex;
    gap: 10px;
    margin: 25px 0px 10px;
    li {
      background: transparent;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      list-style: none;
      border: 1px solid #fff;
      &.activeLi {
        background: rgba(255, 255, 255, 1);
        border: 1px solid #fff;
      }
    }
  }
  .BackIcon {
    position: absolute;
    top: 10px;
    font-size: 2.4em;
    color: #fff;
    cursor: pointer;
  }
  .nxtBtn {
    border: 2px solid rgba(255, 255, 255, 0.6);
    display: block;
    padding: 10px 20px;
    width: 100%;
    text-align: center;
    text-decoration: none;
    border-radius: 10px;
    font-size: 1.3em;
    cursor: pointer;
    transition: all 0.3s;
    color: #000;
    &:hover {
      background: transparent;
      color: #fff;
    }
  }
`;
const GoogleBtn = styled.a`
  border: 2px solid rgba(255, 255, 255, 0.6);
  display: block;
  padding: 10px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 50px;
  text-decoration: none;
  border-radius: 10px;
  span {
    color: rgba(255, 255, 255, 0.8);
  }
  svg {
    color: #fff;
    font-size: 2em;
  }
`;
const Form = styled.form`
  width: 100%;
  color: rgba(255, 255, 255, 0.6);
  label {
    display: block;
    padding: 8px 0px;
  }
  input {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    width: 100%;
    padding: 10px 20px;
    font-size: 1.2em;
    color: #fff;
    outline: none;
    font-family: "Open Sans", sans-serif;
  }
  input[type="submit"] {
    background-color: #fff;
    color: #2f2f2f;
    border: 2px solid #fff;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: transparent;
      color: #fff;
    }
  }
`;
const Span = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9em;
  display: block;
  padding: 20px 0px;
  display: flex;
  gap: 5px;
  a {
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

//

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
      <GoogleBtn>
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
  userName,
  agency,
  websiteName,
  signuphandleClose,
  signInhandleClickOpen,
}) => {
  console.log(userName, agency, websiteName);
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
      await signUpAuth(email, password, confirmpassword);
      // signuphandleClose();
      // signInhandleClickOpen();
      router.push("/dashboard");
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
