import { Avatar, Col, Row, Typography } from "antd";
import { formatRelative } from "date-fns/esm";
import React, { useEffect, useRef } from "react";
import "./style.scss";

// const WrapperStyled = styled.div`
//   margin-bottom: 10px;

//   .author {
//     margin-left: 5px;
//     font-weight: bold;
//   }

//   .date {
//     margin-left: 10px;
//     font-size: 11px;
//     color: #a7a7a7;
//   }

//   .content {
//     margin-left: 30px;
//   }
// `;

function formatDate(seconds) {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function Message({
  text,
  displayName,
  createdAt,
  photoURL,
  image,
  mes
}) {
  // console.log(mes);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mes]);
  return (

    <Row className="wrapper-chat" align="middle" ref={scrollRef}>
      <Col>
        <Avatar size={"small"} src={mes.photoURL} />
        {/* <Typography.Text className="author">Khánh Duy</Typography.Text> */}
      </Col>
      <Col>
        {mes.text ? (
          <Typography.Text className="content">{mes.text}</Typography.Text>
        ) : (
          <div
            style={{
              width: "200px",
              height: "220px",
              padding: "10px",

              // backgroundColor: "rgb(69, 133, 251)",
              color: "white",
            }}
            className="text-image"
          >
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={mes.media}
              alt="dsasd"
            />
          </div>
        )}
      </Col>
      <Typography.Text className="date">
        {formatDate(mes.createdAt?.seconds)}
      </Typography.Text>
      <div>
        {/* {console.log(text)} */}

        {/* <Typography.Text className="date">
         
          5:00 PM
        </Typography.Text> */}
      </div>
    </Row>
  );
}
