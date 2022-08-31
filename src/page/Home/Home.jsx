import { LoginOutlined } from "@ant-design/icons";
import { Col, Layout, Row, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Attachment from "../../components/Attachment/Attachment";
import ChatContent from "../../components/ChatContent/ChatContent";
import InputChat from "../../components/InputChat/InputChat";
import UserItem from "../../components/UserItem/UserItem";
import { useAuth } from "../../context/AuthContext";
import { auth, db, storage } from "../../firebase-app/config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import "./style.scss";
import Message from "../../components/ChatMessage/Message";
import Noti from "../../components/Noti/Noti";
const { Header, Sider, Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [newMesNoti, setNewMesNoti] = useState({});
  const { user } = useAuth();
  // const { selectedUser } = useApp();
  // const users = useFireStore("users");
  // const currentUser = auth.currentUser?.uid;
  const currentUser = user?.uid;
  const handleLogout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
  };

  useEffect(() => {

    // tạo query filter ra list user trừ currentUser
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [currentUser]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, [currentUser]);


  useEffect(() => {

  }, [])


  const handleSelectedUser = async (user) => {
    // console.log(user);
    setChat(user);
    let selectecUser = user.uid;
    const id =
      currentUser > selectecUser
        ? `${currentUser + selectecUser}`
        : `${selectecUser + currentUser}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    //update ui khi có tin nhắn mới
    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });


      // get last message b/w logged in user and selected user
      const docSnap = await getDoc(doc(db, "lastMsg", id));
      // if last message exists and message is from selected user
      if (docSnap.data() && docSnap.data().from !== currentUser) {
        // update last message doc, set unread to false
        await updateDoc(doc(db, "lastMsg", id), { unread: false });
      }
  };
  // console.log(msgs);
  console.log(newMesNoti);

  const handleSubmit = async () => {
    // e.preventDefault();
    const selectUser = chat.uid;
    const id =
      currentUser > selectUser
        ? `${currentUser + selectUser}`
        : `${selectUser + currentUser}`;
    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    // thêm message mới vào collection
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      photoURL: user.photoURL,
      from: currentUser,
      to: selectUser,
      createdAt: serverTimestamp(),
      media: url || "",
    });

    // thêm tin nhắn chưa đọc
    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: currentUser,
      to: selectUser,
      createdAt: serverTimestamp(),
      media: url || "",
      unread: true,
    });
    console.log("nhap tn");
    setText("");
    setImg("");
  };
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="chat-sider"
        ant-layout-sider
        width={"360px"}
        theme="light"
      >
        <Row className="sidebar-info" justify="space-between" align="middle">
          <Col span={6}>
            <Avatar src={user.photoURL} />
          </Col>
          <Col span={12}>
            <Typography.Text
              strong
              style={{ display: "block", textAlign: "center" }}
            >
              Chat
            </Typography.Text>
          </Col>
          <Col span={6} style={{ textAlign: "end" }}>
            <LoginOutlined
              onClick={handleLogout}
              style={{ fontSize: "20px" }}
            />
          </Col>
        </Row>
        {/* users */}

        <div
          className="user-list"
          style={{
            padding: "0 4px",
            maxHeight: "calc(100vh - 80px)",
            overflowY: "auto",
          }}
        >
          {users.map((userItem) => (
            <UserItem
              iconSize={"large"}
              text="asdsdds da sdadad sda"
              colLeft={3}
              colRight={20}
              userInfo={userItem}
              key={userItem.uid}
              selectedUserFunc={handleSelectedUser}
              currentUserId={currentUser}
              selectUser={chat}
              setNewMesNoti={setNewMesNoti}
            />
          ))}
          {console.log("re-render")}
        </div>
      </Sider>
      {chat ? (
        <Layout className="site-layout">
          <Header className="chat-header">
            {/* {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )} */}
            {/* <Row justify="space-between" align="middle">
            <Col span={3}>
            <UserItem iconSize={"default"} text="hoạt động 2 giờ trước" colLeft={5} colRight={19}/>
            </Col>
            <Col span={2}>
              ádasđ
              <Button>áds</Button>
            </Col>
          </Row> */}

            <Row>
              <Col>
                <Avatar src={chat.photoURL} />
              </Col>
              <Typography.Text strong style={{ marginLeft: "10px" }}>
                {chat.displayName}
              </Typography.Text>
            </Row>
          </Header>
          <div className="chat-content">
            <div
              style={{
                maxHeight: "100%",
                overflowY: "auto",
              }}
            > {msgs.length
              ? msgs.map((msg, index) => (
                  <Message key={index} mes={msg} currentUserChat={currentUser} />
                  
                ))
              : null}

            </div>
            {/* <ChatContent msgs={msgs} /> */}
            <InputChat
              text={text}
              setText={setText}
              setImg={setImg}
              handleSubmit={handleSubmit}
            />
          </div>
        </Layout>
      ) : (
        <div className="site-layout" style={{width: "100%", padding: "20px 0"}}>
          <div style={{texAlign:"center", margin: "auto", maxWidth: "600px", fontSize: "30px", fontWeight: "bold"}}>Hãy chọn bạn để bắt đầu trò chuyện !!!!</div>
          
        </div>
      )}
      <Noti newMesNoti={newMesNoti}/>
    </Layout>
  );
};

export default Home;
