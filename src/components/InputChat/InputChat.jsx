import React, { useState, useRef } from "react";
import { Button, Tooltip, Avatar, Form, Input, Alert, Row, Col } from "antd";
import "./style.scss";
import { db } from "../../firebase-app/config";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { addDoc, collection, Firestore } from "firebase/firestore";
import Attachment from "../Attachment/Attachment";

function InputChat({text, setText, handleSubmit, setImg}) {
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const [form] = Form.useForm();
  const {
    user: { uid, photoURL, displayName },
  } = useAuth();
  const colRef = collection(db, "messages");
  const { selectedUser } = useApp();
  const inputRef = useRef();

  // const handleInputChange = (e) => {
  //   setInput(e.target.value);
  // };
  const handleOnSubmit = () => {
    // db.collection("messages").add({
    //   text: {input, image},
    //   uid,
    //   photoURL,
    //   members: [selectedUser.uid, uid],
    //   selectedUserId: selectedUser.uid,
    //   displayName,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    // });
    // addDoc(colRef, {
    //      text: {input, image},
    //   uid,
    //   photoURL,
    //   members: [selectedUser.uid, uid],
    //   selectedUserId: selectedUser.uid,
    //   displayName,
    //   createdAt: Firestore.FieldValue.serverTimestamp(),
    // })
    // form.resetFields(["messages"]);

    // // set focus sau khi gửi tin nhắn
    // if (inputRef?.current) {
    //   setTimeout(() => {
    //     inputRef.current.focus();
    //   });
    // }
    handleSubmit();
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    // file.preview = URL.createObjectURL(file);
    setImg(file);

    // db.collection("messages").add({
    //   image: file.preview,
    //   uid,
    //   photoURL,
    //   members: [selectedUser.uid, uid],
    //   selectedUserId: selectedUser.uid,
    //   displayName,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    // });
  };

  return (
    <Form className="form-chat" form={form} >
      <Form.Item name="messages">
        <Row>
          <Col span={2}>
            <label htmlFor="fileInput">
              <Attachment />
            </label>
            <Input type="file" id="fileInput" style={{display: "none"}} onChange={(e) => setImg(e.target.files[0])} />
          </Col>
          <Col span={20}>
            {" "}
            <Input
              placeholder="Nhập tin nhắn..."
              bordered={false}
              autoComplete="off"
              onChange={e => setText(e.target.value)}
              onPressEnter={handleOnSubmit}
              value={text}
              ref={inputRef}
            />
          </Col>
          <Col span={2}>
            {" "}
            <Button
              onClick={handleOnSubmit}
              style={{ backgroundColor: "#4585FB", color: "white" }}
            >
              Gửi
            </Button>
          </Col>
          {/* <div>
            {image && <img src={image.preview} alt="dssda"/>}
          </div> */}
        </Row>
      </Form.Item>
    </Form>
  );
}

export default InputChat;
