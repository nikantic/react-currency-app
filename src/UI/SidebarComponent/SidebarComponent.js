import React from "react";
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem/SidebarItem";
import SidebarSeparator from "./SidebarSeparator/SidebarSeparator";
import SidebarToggle from "./SidebarToggle/SidebarToggle";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

const SidebarComponent = props => {
  return (
    <div
      className={
        "SidebarHolder" + (props.isSidebarOpen ? " SidebarOpened" : "")
      }
    >
      <Logo />
      <div className="SidebarItemsHolder">
        <NavLink className="SidebarItemHolder" exact to="/">
          <SidebarItem name="home" label="Home" />
        </NavLink>
        <NavLink className="SidebarItemHolder" exact to="/transactions">
          {" "}
          <SidebarItem
            name="trans"
            label="My Transactions"
            savedTransactions={props.savedTransactions}
            unreadSaved={props.unreadSaved}
            clicked={props.resetUnreadSaved}
          />
        </NavLink>
        <div className="SidebarItemHolder">
          <SidebarToggle
            addClasses={props.chartEnabled ? "Active" : ""}
            label="Enable Chart"
            clicked={props.toggleChart}
          />
        </div>
        <SidebarSeparator />
        <a className="SidebarItemHolder" href="https://github.com/nikantic/react-currency-app" target="_blank" rel="noopener noreferrer">
          <SidebarItem name="github" label="GitHub" />
        </a>
        <a className="SidebarItemHolder" href="https://nikantic.github.io/" target="_blank" rel="noopener noreferrer">
          <SidebarItem name="contact" label="Contact" />
        </a>
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
    savedTransactions: state.savedTransactions,
    unreadSaved: state.unreadSaved,
    chartEnabled: state.chartEnabled,
    isSidebarOpen: state.isSidebarOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleChart: () =>
      dispatch({
        type: actionTypes.TOGGLE_CHART
      }),
    resetUnreadSaved: () =>
      dispatch({
        type: actionTypes.RESET_UNREAD_SAVED
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);
