import React from "react";
import Logo from "../Logo/Logo";

const EmptyStateComponent = props => {
  return (
    <div className="EmptyStateComponent">
      <div>{props.children}</div>
      <Logo onlySVG />
    </div>
  );
};

export default EmptyStateComponent;
