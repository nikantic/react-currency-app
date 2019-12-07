import React from 'react';
import NotificationComponent from "../NotificationComponent/NotificationComponent";

const Header = () => {
  return(
    <div className="Header">
      <h1>Dashboard</h1>
      <NotificationComponent />
    </div>
  );
}

export default Header;