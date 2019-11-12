import React from "react";
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem/SidebarItem";
import SidebarSeparator from "./SidebarSeparator/SidebarSeparator";

const SidebarComponent = () => {
  return (
    <div className="SidebarHolder">
      <Logo />
      <div className="SidebarItemsHolder">
        <SidebarItem name="home" label="Home" location="/" active />
        <SidebarItem
          name="trans"
          label="My Transactions"
          location="/transactions"
        />
        <SidebarItem name="charts" label="Charts" location="/charts" />
        <SidebarSeparator />
        <SidebarItem name="settings" label="Settings" location="/settings" />
        <SidebarItem name="about" label="About" location="/about" />
        <SidebarItem name="contact" label="Contact" location="/about" />
      </div>
    </div>
  );
};

export default SidebarComponent;
