import { Button, notification } from "antd";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-app/config";
import { useAuth } from "./AuthContext";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [selectUser, setSelectUser] = useState("");
  const [openNoti, setOpenNoti] = useState(false);
  const { user } = useAuth();
  const currentUserId = user.uid;
  const selectUserId = selectUser.uid;

  const close = () => {
    console.log(
      "Notification was closed. Either the close button was clicked or duration time elapsed."
    );
  };

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => notification.close(key)}
      >
        Confirm
      </Button>
    );
    notification.open({
      message: `${openNoti?.from}`,
      description: `${openNoti.text}`,
      btn,
      key,
      onClose: close,
    });
  };

  useEffect(() => {
    let colRef = collection(db, "lastMsg");
    const id =
      currentUserId > selectUserId
        ? `${currentUserId + selectUserId}`
        : `${selectUserId + currentUserId}`;
    let unsub = onSnapshot(colRef, (snapshot) => {
      let arrMess = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data().from !== currentUserId && doc.data().unread === true) {
          arrMess.push(doc.data());
        }
        arrMess.forEach(mes => {
          if (mes.to !== selectUserId){
            openNotification()
          }
        })
        console.log(arrMess);
      });

      // if(doc.data().from !== currentUserId && doc.data().unread === true){
      //   // setOpenNoti(true)
      //    openNotification()

      // }
    });
    return () => unsub();
  }, [currentUserId, selectUserId]);

  const value = { selectUser, setSelectUser, openNoti };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
