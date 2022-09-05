import { Button, Col, Form, Input, Row } from "antd";
import React, { useRef } from "react";
import Attachment from "../Attachment/Attachment";
import "./style.scss";

function InputChat({
  text,
  img,
  showFile,
  setShowFile,
  setText,
  handleSubmit,
  setImg,
}) {

  const [form] = Form.useForm();

  const inputRef = useRef();

  // const handleInputChange = (e) => {
  //   setInput(e.target.value);
  // };
  const handleOnSubmit = () => {
    handleSubmit();
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    // file.preview = URL.createObjectURL(file);
    setImg(file);
    setShowFile(true);
  };

  return (
    <Form className="form-chat" form={form}>
      <Form.Item name="messages">
        <Row>
        {showFile && <div className="file-container">
          {img.name}
          {/* <div className="file-remove"><span>X</span></div> */}
        </div>}
          <Col span={2}>
            <label htmlFor="fileInput">
              <Attachment />
            </label>
            <Input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Col>
          <Col span={20}>
            {" "}
            <Input
              placeholder="Nhập tin nhắn..."
              bordered={false}
              autoComplete="off"
              onChange={(e) => setText(e.target.value)}
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
        </Row>
      </Form.Item>
    </Form>
  );
}

export default InputChat;
