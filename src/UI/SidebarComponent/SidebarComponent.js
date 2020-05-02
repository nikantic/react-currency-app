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
    <div className="SidebarHolder">
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
        <NavLink className="SidebarItemHolder" exact to="/about">
          <SidebarItem name="about" label="About" />
        </NavLink>
        <NavLink className="SidebarItemHolder" exact to="/github">
          <SidebarItem name="github" label="GitHub" />
        </NavLink>
        <NavLink className="SidebarItemHolder" exact to="/contact">
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
    savedTransactions: state.savedTransactions,
    chartEnabled: state.chartEnabled
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleChart: () =>
      dispatch({
        type: actionTypes.TOGGLE_CHART
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);
