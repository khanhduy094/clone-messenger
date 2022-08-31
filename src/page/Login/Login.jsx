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
  const { createdAtUser, setCreatedAtUser } = useAuth();
  const handleLogin = async (provider) => {
    // let {user, additionalUserInfo} = await auth.signInWithPopup(provider);
    // if(additionalUserInfo?.isNewUser){
    //   db.collection('users').add({
    //     displayName: user.displayName,
    //     email: user.email,
    //     photoURL: user.photoURL,
    //     uid: user.uid,
    //     createdAt: firebase.firestore.FieldValue.serverTimestamp()
    //   })
    // }
    // check user sau khi dn thành công
    let colRef = collection(db, "users");

    let { user } = await signInWithPopup(auth, provider);
    console.log(user.metadata.createdAt);
    console.log(createdAtUser);

    // if (!createdAtUser.includes(user.metadata.createdAt)) {
    //   setCreatedAtUser([...createdAtUser, user.metadata.createdAt]);
    //   localStorage.setItem("isNewUser", JSON.stringify(createdAtUser));

    //   addDoc(colRef, {
    //     displayName: user.displayName,
    //     email: user.email,
    //     photoURL: user.photoURL,
    //     uid: user.uid,
    //     createdAt: serverTimestamp(),
    //   });
    // }

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

    //     createdAt: "1661863910856"
    // creationTime: "Tue, 30 Aug 2022 12:51:50 GMT"
    // lastLoginAt: "1661864570789"
    // lastSignInTime: "Tue, 30 Aug 2022 13:02:50 GMT"

    //     createdAt: "1661865464813"
    // creationTime: "Tue, 30 Aug 2022 13:17:44 GMT"
    // lastLoginAt: "1661865464814"
    // lastSignInTime: "Tue, 30 Aug 2022 13:17:44 GMT"

    // createdAt: "1661865464813"
    // creationTime: "Tue, 30 Aug 2022 13:17:44 GMT"
    // lastLoginAt: "1661865464814"
    // lastSignInTime: "Tue, 30 Aug 2022 13:17:44 GMT"
  };

  //   auth.onAuthStateChanged((user) => {
  //     console.log({user});
  //     if(user){
  //         navigate("/")
  //     }
  // })
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
        {/* <div className="login-facebook">
          <FacebookOutlined style={{ fontSize: "24px" }} />
          <span className="login-text">Đăng nhập với Facebook</span>
        </div>
        <div className="login-facebook login-facebook" onClick={() =>handleLogin(googleProvider)}>
          <FacebookOutlined style={{ fontSize: "24px" }} />
          <span className="login-text">Đăng nhập với Google</span>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
