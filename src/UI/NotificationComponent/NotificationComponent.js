import React, { Component } from "react";
import NotificationItem from "./NotificationItem/NotificationItem";
import NotificationMessages from "./notification_messages";

class NotificationComponent extends Component {
  state = {
    notifications: [""],
    typing: false
  };

  pushNewNotification = content => {
    this.setState({ notifications: [...this.state.notifications, content] });
  };

  notificationIteration = () => {
    this.setState({ typing: true });
    const NotificationItemLast = NotificationMessages["content"].length - 1;
    NotificationMessages["content"].forEach((item, i) => {
      setTimeout(() => {
        this.setState({ typing: false });
        if (NotificationItemLast !== i) {
          setTimeout(() => {
            this.setState({ typing: true });
          }, 2000);
        }
        this.pushNewNotification(<NotificationItem key={i} content={item} />);
      }, (i + 1) * 5000);
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.notificationIteration();
    }, 2000);
  }

  render() {
    return (
      <div className="NotificationComponentHolder">
        <div>{this.state.notifications}</div>
        <div
          className={
            "NotificationTypingLoaderHolder " +
            (this.state.typing ? "Visible" : "")
          }
        >
          Nikola is typing{" "}
          <span className="NotificationTypingLoader">
            <span />
            <span />
            <span />
          </span>
        </div>
      </div>
    );
  }
}

export default NotificationComponent;
