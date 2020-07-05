import React from "react";
import { withRouter } from "react-router";
import findPathname from "./header_pathnames";
import SidebarOpener from "../SidebarOpener/SidebarOpener";

const Header = props => {
  return (
    <div className="Header">
      {window.innerWidth < 1231 ? <SidebarOpener /> : null}
      <h1>{findPathname(props.location.pathname)}</h1>
      {props.children}
    </div>
  );
};

export default withRouter(Header);
