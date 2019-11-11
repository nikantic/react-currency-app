import React from "react";
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem/SidebarItem";
import SidebarSeparator from "./SidebarSeparator/SidebarSeparator";

const SidebarComponent = () => {
  return (
    <div className="SidebarHolder">
      <Logo />
      <div className="SidebarItemsHolder">
        <SidebarItem name="Home" location="/" active />
        <SidebarItem name="Transactions" location="/charts" />
        <SidebarItem name="Charts" location="/charts" />
        <SidebarSeparator />
        <SidebarItem name="Settings" location="/settings" />
        <SidebarItem name="About" location="/about" />
      </div>
    </div>
  );
};

export default SidebarComponent;
