import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase-app/config";
import { useAuth } from "./AuthContext";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState("");

  const { user } = useAuth();
  const currentUserId = user?.uid;
  const selectUserId = selectedUser?.uid;

    const id =
      currentUserId > selectUserId
        ? `${currentUserId + selectUserId}`
        : `${selectUserId + currentUserId}`;

  useEffect(() => {
  
    const colRef = collection(db, "lastMsg");
    // const q = query(colRef, where("uid", "not-in", [id]));

    const unsub = onSnapshot(colRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // idList.push(doc.id)
        // let filterId = idList.includes(currentUserId)
        let isCurrentUserid = currentUserId === doc.data().to;
        console.log(isCurrentUserid);

        if (
          doc.id !== id &&
          doc.data().from !== currentUserId &&
          isCurrentUserid &&
          doc.data().unread === true
        ) {
          
          let mess = doc.data().media
            ? `Đã gửi 1 hình ảnh`
            : `${doc.data().text}`;
          toast.info(`${doc.data().nameSend}: ${mess}`, {
            position: "top-right",
            autoClose: 3000,
          });
          return
        }
      });
    });
    return () => unsub();
  }, [currentUserId]);

  const value = { selectedUser, setSelectedUser };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
