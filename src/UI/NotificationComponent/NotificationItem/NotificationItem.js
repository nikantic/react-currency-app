import React from "react";

const NotificationItem = props => {
  return (
    <div
      className="NotificationItem"
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  );
};

export default NotificationItem;
