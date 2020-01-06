import React from "react";
import { withRouter } from "react-router";
import findPathname from "./header_pathnames";

const Header = props => {
  return (
    <div className="Header">
      <h1>{findPathname(props.location.pathname)}</h1>
      {props.children}
    </div>
  );
};

export default withRouter(Header);
