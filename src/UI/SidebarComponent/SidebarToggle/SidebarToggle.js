import React from "react";

const SidebarToggle = props => {
  return (
    <div className="SidebarToggle">
      <span className="SidebarToggleLabel">{props.label}</span>
    </div>
  );
};

export default SidebarToggle;
