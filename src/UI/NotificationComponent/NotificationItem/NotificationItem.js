import React from "react";

const NotificationItem = props => {
  return (
    <div
      className={"NotificationItem " + (props.disappear ? "Disappear" : "")}
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  );
};

export default NotificationItem;
