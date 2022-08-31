import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase-app/config";
import { useApp } from "../context/AppContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const useFireStore = (collectionParams) => {
  const [documents, setDocuments] = useState([]);
  const { selectedUser } = useApp();
  const { user } = useAuth();
  const colRef = collection(db, collectionParams);
  useEffect(() => {
    // let collectionRef = db.collection(collection).orderBy('createdAt');
    const q = query(colRef, orderBy("createdAt"));
    // khi collection có sự thay đổi thì onSnapshot dc thực thi
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let filterDocument = [];
      if (collectionParams === "users") {
        filterDocument = documents.filter((doc) => {
          return doc.uid !== user.uid;
        });
      }
         setDocuments(filterDocument);
    });
    // const unsubscribe = collectionRef.onSnapshot((snapshot) => {
    //   const documents = snapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    // //   console.log(documents);
    //   let filterDocument = []
    //   if(collection === "users"){
    //    filterDocument = documents.filter(doc => {
    //         return doc.uid !== user.uid
    //     })
    //   }

    //   if(collection === "messages"){
    //     filterDocument = documents.filter(doc => {
    //         // check có phải selectedUser ko rồi check tn của 2 ng

    //         console.log(doc?.members?.includes(user.uid));

    //         return doc?.members?.includes(selectedUser.uid)
    //         // return doc.members.includes(user.id)
    //         // return doc.selectedUserId === selectedUser.uid && (user.uid === doc.uid || doc.uid === selectedUser.uid)
    //     })
    //   }

    //   setDocuments(filterDocument);
    // });

    return unsubscribe;
  }, [collectionParams, user.uid, selectedUser, colRef]);

  return documents;
};

export default useFireStore;
