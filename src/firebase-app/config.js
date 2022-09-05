// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import firebase from 'firebase/app';

// import 'firebase/analytics';
// import 'firebase/auth';
// import 'firebase/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBasXglrRhZsICm6gK9p49ek907em1sElc",
//   authDomain: "messenger-clone-80301.firebaseapp.com",
//   projectId: "messenger-clone-80301",
//   storageBucket: "messenger-clone-80301.appspot.com",
//   messagingSenderId: "504362840239",
//   appId: "1:504362840239:web:fa930db1d4f0083f38a45a",
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// const auth = firebase.auth();
// const db = firebase.firetore();

// export {auth, db};
// export default firebase;

///////////

// import firebase from 'firebase/app';

// import 'firebase/analytics';
// import 'firebase/auth';
// import 'firebase/firestore';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBasXglrRhZsICm6gK9p49ek907em1sElc",
//     authDomain: "messenger-clone-80301.firebaseapp.com",
//     projectId: "messenger-clone-80301",
//     storageBucket: "messenger-clone-80301.appspot.com",
//     messagingSenderId: "504362840239",
//     appId: "1:504362840239:web:fa930db1d4f0083f38a45a",
//   };
// /// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// const auth = firebase.auth();
// const db = firebase.firestore();

// export { db, auth };
// export default firebase;

// v9
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCNVnPZ-dSxqCUmnB87abqaJ2kdaseTnkU",
//   authDomain: "clone-chat-app-cd9c3.firebaseapp.com",
//   projectId: "clone-chat-app-cd9c3",
//   storageBucket: "clone-chat-app-cd9c3.appspot.com",
//   messagingSenderId: "516759849378",
//   appId: "1:516759849378:web:9b1401aec5198638658afb"
// };

// const firebaseConfig = { 
//   apiKey : "AIzaSyBsrQWLNk_Q4jBMdZ46ic-oUVFRdaiDjys" , 
//   authDomain : "chat-app-4d862.firebaseapp.com" , 
//   projectId : "chat-app-4d862" , 
//   storageBucket : "chat-app-4d862.appspot.com" , 
//   messagingSenderId : "891046053575" , 
//   appId : "1:891046053575:web:46d7d8178237524fe120e2" , 
//   measurementId : "G-2F83ED38TX" 
// };  


const firebaseConfig = {
  apiKey: "AIzaSyBasXglrRhZsICm6gK9p49ek907em1sElc",
  authDomain: "messenger-clone-80301.firebaseapp.com",
  projectId: "messenger-clone-80301",
  storageBucket: "messenger-clone-80301.appspot.com",
  messagingSenderId: "504362840239",
  appId: "1:504362840239:web:fa930db1d4f0083f38a45a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
