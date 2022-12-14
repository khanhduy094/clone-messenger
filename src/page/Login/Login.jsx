import React from "react";

import { Button } from "antd";
// import firebase from 'firebase/app';
import { useNavigate } from "react-router-dom";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
// import { auth } from "../../firebase-app/config";
import "./style.scss";
import { auth, db } from "../../firebase-app/config";
import { useAuth } from "../../context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

function Login() {
  const navigate = useNavigate();
  const { createdAtUser} = useAuth();
  const handleLogin = async (provider) => {



    let { user } = await signInWithPopup(auth, provider);
    console.log(user.metadata.createdAt);
    console.log(createdAtUser);


    //lưu thông tin user vào collection
    setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      isOnline: true,
    });
    onAuthStateChanged(auth, (user) => {
      console.log({ user });
      if (user) {
        navigate("/");
      }
    });

  };


  return (
    <div className="login-container">
      <div className="login">
        <div className="login-logo">
          <img src="/img/logo.png" alt="" />
        </div>
        <Button
          size="large"
          style={{ marginBottom: "10px", width: "100%" }}
          onClick={() => handleLogin(fbProvider)}
        >
          Đăng nhập với Facebook
        </Button>
        <Button
          size="large"
          style={{ width: "100%" }}
          onClick={() => handleLogin(googleProvider)}
        >
          Đăng nhập với Google
        </Button>

      </div>
    </div>
  );
}

export default Login;
