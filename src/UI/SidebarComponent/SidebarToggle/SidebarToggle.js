import React from "react";

const SidebarToggle = props => {
  return (
    <div
      className={"SidebarToggle " + props.addClasses}
      onClick={props.clicked}
    >
      <span className="SidebarToggleLabel">
        {props.label}
        <span className="SidebarToggleButton" />
      </span>
    </div>
  );
};

export default SidebarToggle;
