import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userdb, setUserDb] = useState(null);
  const [addtoCartCounter, setAddToCartCounter] = useState(null);

  // register
  const registration = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // signin with google
  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  // logOut
  const logOut = () => {
    return signOut(auth);
  };

  //user Informetion seter
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [userInfo]);

  // name and photo upload
  const updateUser = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  //db single user get by current user email
  useEffect(() => {
    if (userInfo?.email) {
      fetch(`http://localhost:3000/user?email=${userInfo.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserDb(data);
        })
        .catch((err) => console.log(err.message));
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo?.email) {
      fetch(`http://localhost:3000/getAllCartItem?email=${userInfo.email}`)
        .then((res) => res.json())
        .then((data) => {
          setAddToCartCounter(data.length);
        })
        .catch((err) => console.log(err.message));
    }
  }, [userInfo]);

  const authData = {
    registration,
    login,
    userInfo,
    updateUser,
    setUserInfo,
    loading,
    logOut,
    userdb,
    setUserDb,
    addtoCartCounter,
    setAddToCartCounter,
    googleSignIn,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
