import React, { Component } from "react";
import NotificationItem from "./NotificationItem/NotificationItem";
// import NotificationMessages from "./notification_messages";

class NotificationComponent extends Component {
  state = {
    notifications: this.props.notifications,
    open: false
  };

  toggleNotificationHolder = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open) {
        document.addEventListener("mousedown", this.HandleClick, false);
      } else {
        document.removeEventListener("mousedown", this.HandleClick, false);
      }
    });
  };

  // notificationOnboarding = () => {
  //   NotificationMessages["content"].forEach((item, i) => {
  //     setTimeout(() => {
  //       this.pushNewNotification(item);
  //     }, i * 2000);
  //   });
  // };

  componentDidMount() {
    setTimeout(() => {
      this.toggleNotificationHolder();
      // this.notificationOnboarding();
    }, 1000);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.HandleClick, false);
  }

  HandleClick = e => {
    if (this.refs.NotificationComponentHolder.contains(e.target)) {
      return;
    }
    // Toggle Notification Holder on click outside
    this.toggleNotificationHolder();
  };

  render() {
    let notificationItemsDisplay = [];
    this.props.notifications.forEach((item, i) => {
      notificationItemsDisplay.push(
        <NotificationItem key={i} content={item} />
      );
    });

    return (
      <div
        ref="NotificationComponentHolder"
        className={
          "NotificationComponentHolder " + (this.state.open ? "Open" : "")
        }
      >
        <div
          className="NotificationIcon"
          onClick={this.toggleNotificationHolder}
        >
          <svg x="0px" y="0px" viewBox="0 0 512 512">
            <g>
              <g>
                <path d="M467.819,431.851l-36.651-61.056c-16.896-28.181-25.835-60.437-25.835-93.312V224    c0-82.325-67.008-149.333-149.333-149.333S106.667,141.675,106.667,224v53.483c0,32.875-8.939,65.131-25.835,93.312    l-36.651,61.056c-1.984,3.285-2.027,7.403-0.149,10.731c1.899,3.349,5.461,5.419,9.301,5.419h405.333    c3.84,0,7.403-2.069,9.301-5.419C469.845,439.253,469.803,435.136,467.819,431.851z M72.171,426.667l26.944-44.907    C118.016,350.272,128,314.219,128,277.483V224c0-70.592,57.408-128,128-128s128,57.408,128,128v53.483    c0,36.736,9.984,72.789,28.864,104.277l26.965,44.907H72.171z" />
              </g>
            </g>
            <g>
              <g>
                <path d="M256,0c-23.531,0-42.667,19.136-42.667,42.667v42.667C213.333,91.221,218.112,96,224,96s10.667-4.779,10.667-10.667    V42.667c0-11.776,9.557-21.333,21.333-21.333s21.333,9.557,21.333,21.333v42.667C277.333,91.221,282.112,96,288,96    s10.667-4.779,10.667-10.667V42.667C298.667,19.136,279.531,0,256,0z" />
              </g>
            </g>
            <g>
              <g>
                <path d="M302.165,431.936c-3.008-5.077-9.515-6.741-14.613-3.819c-5.099,2.987-6.805,9.536-3.819,14.613    c2.773,4.715,4.288,10.368,4.288,15.936c0,17.643-14.357,32-32,32c-17.643,0-32-14.357-32-32c0-5.568,1.515-11.221,4.288-15.936    c2.965-5.099,1.259-11.627-3.819-14.613c-5.141-2.923-11.627-1.259-14.613,3.819c-4.715,8.064-7.211,17.301-7.211,26.731    C202.667,488.085,226.581,512,256,512s53.333-23.915,53.376-53.333C309.376,449.237,306.88,440,302.165,431.936z" />
              </g>
            </g>
          </svg>
        </div>
        <div className="NotificationComponentInnerHolder">
          <div>
            <strong>Notifications</strong>
          </div>
          <div>{notificationItemsDisplay}</div>
          <div
            className="ClearAllButton"
            onClick={this.props.clearNotifications}
          >
            Clear All
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationComponent;
