import React, { useEffect, useState, createContext, useContext } from "react";
import { auth } from "./firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [headerMenuData, setHeaderMenuData] = useState("");
  const [headerLogo, setHeaderLogo] = useState();
  const [headermenu, setHeadermenu] = useState();
  const [navbarType, setNavbarType] = useState("header1");
  function signUpAuth(email, password, confirmpassword) {
    return createUserWithEmailAndPassword(
      auth,
      email,
      password,
      confirmpassword
    );
  }
  function loginAuth(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignUp() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <userAuthContext.Provider
      value={{
        user,
        signUpAuth,
        loginAuth,
        logOut,
        googleSignUp,
        headerMenuData,
        setHeaderMenuData,
        headerLogo,
        setHeaderLogo,
        headermenu,
        setHeadermenu,
        navbarType,
        setNavbarType,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
