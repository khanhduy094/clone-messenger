import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, notification, Row, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { db } from "../../firebase-app/config";
import useFireStore from "../../hooks/useFireStore";
import "./style.scss";

function UserItem({
  iconSize,
  colLeft,
  colRight,
  userInfo,
  currentUserId,
  selectUser,

  selectedUserFunc = () => {},
}) {
  const [data, setData] = useState();
  const {selectedUser,setSelectedUser} = useApp();


  const handleSelectedUser = (userInfo) => {
    selectedUserFunc(userInfo);
    setSelectedUser(userInfo);
    // setOpenNoti(false)

  }


  let selectUserId = userInfo?.uid;

  useEffect(() => {
    const id =
      currentUserId > selectUserId
        ? `${currentUserId + selectUserId}`
        : `${selectUserId + currentUserId}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      if(doc.data()?.from !== currentUserId && doc.data()?.unread === true){
        console.log(doc.data());
     
       
      }
      setData(doc.data());
    
    });
    return () => unsub();
  }, [currentUserId, selectUserId]);
  // console.log(data);

  return (
    <Row
      align="middle"
      justify="space-between"
      className={`user ${
        selectUser.displayName === userInfo.displayName && "selected_user"
      }`}
      onClick={() => handleSelectedUser(userInfo)}
    >
    
      <Col span={colLeft}>
        {userInfo ? (
          <Avatar src={userInfo.photoURL}>
            {userInfo.photoURL
              ? ""
              : userInfo.displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
        ) : (
          <Avatar size={iconSize} icon={<UserOutlined />} />
        )}
      </Col>
      <Col span={colRight} className="user-info">
        <Typography.Title level={5} style={{ margin: 0 }}>
          {userInfo.displayName}
        </Typography.Title>
        {data?.from !== currentUserId && data?.unread && (
          <span className="unread">Mới</span>
        )}
        {data && (
          <Typography.Text style={{ fontSize: "12px" }}>
            <span styles={{ fontWeight: "bold" }}>
              {data?.from === currentUserId ? "Tôi: " : null}
            </span>
            {/* {currentUserId === userInfo.uid ? selectUserId === } */}
            {data.text}
          </Typography.Text>
        )}
      </Col>
    </Row>
  );
}

export default UserItem;
