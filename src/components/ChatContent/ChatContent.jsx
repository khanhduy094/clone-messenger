import { message } from "antd";
import React from "react";
import useFireStore from "../../hooks/useFireStore";
import Message from "../ChatMessage/Message";

function ChatContent({ msgs }) {
  // const messages = useFireStore("messages");

  return (
    <div
      style={{
        maxHeight: "100%",
        overflowY: "auto",
      }}
    >
      {msgs.length > 0
        ? msgs.map((mes, index) => {
            return (
              <Message
                key={index}
                mes={mes}
                // photoURL={mes.photoURL}
                // displayName={mes.displayName}
                // image={mes.image}
                // createdAt={mes.createdAt}
              />
            );
          })
        : ""}
    </div>
  );
}

export default ChatContent;
