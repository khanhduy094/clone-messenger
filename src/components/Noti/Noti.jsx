import { Button, notification } from "antd";
import React from "react";

export default function Noti({newMesNoti}) {
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
      message: `${newMesNoti?.from}`,
      description:
        `${newMesNoti.text}`,
      btn,
      key,
      onClose: close,
    });
  };

  return <div>
    {newMesNoti.unread  && openNotification()}
  </div>;
}
