import React from "react";
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem/SidebarItem";
import SidebarSeparator from "./SidebarSeparator/SidebarSeparator";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const SidebarComponent = props => {
  return (
    <div className="SidebarHolder">
      <Logo />
      <div className="SidebarItemsHolder">
        <NavLink exact to="/">
          <SidebarItem name="home" label="Home" />
        </NavLink>
        <NavLink exact to="/transactions">
          {" "}
          <SidebarItem
            name="trans"
            label="My Transactions"
            savedTransactions={props.savedTransactions}
          />
        </NavLink>
        <NavLink exact to="/charts">
          <SidebarItem name="charts" label="Charts" />
        </NavLink>
        <SidebarSeparator />
        <NavLink exact to="/settings">
          <SidebarItem name="settings" label="Settings" />
        </NavLink>
        <NavLink exact to="/about">
          <SidebarItem name="about" label="About" />
        </NavLink>
        <NavLink exact to="/github">
          <SidebarItem name="github" label="GitHub" />
        </NavLink>
        <NavLink exact to="/contact">
          <SidebarItem name="contact" label="Contact" />
        </NavLink>
        <a
          className="SidebarSmallText"
          href="https://nikantic.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by Nikola Antic
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    savedTransactions: state.savedTransactions
  };
};

export default connect(
  mapStateToProps,
  null
)(SidebarComponent);
