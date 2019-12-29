import React from "react";
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem/SidebarItem";
import SidebarSeparator from "./SidebarSeparator/SidebarSeparator";

const SidebarComponent = props => {
  return (
    <div className="SidebarHolder">
      <Logo />
      <div className="SidebarItemsHolder">
        <SidebarItem name="home" label="Home" location="/" active />
        <SidebarItem
          name="trans"
          label="My Transactions"
          location="/transactions"
          savedTransactions={props.savedTransactions}
        />
        <SidebarItem name="charts" label="Charts" location="/charts" />
        <SidebarSeparator />
        <SidebarItem name="settings" label="Settings" location="/settings" />
        <SidebarItem name="about" label="About" location="/about" />
        <SidebarItem name="contact" label="Contact" location="/about" />
        <p className="SidebarSmallText">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by Nikola Antic
        </p>
      </div>
    </div>
  );
};

export default SidebarComponent;
