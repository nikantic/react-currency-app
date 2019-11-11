import React from "react";

const SidebarItem = props => {
  return (
    <div className={"SidebarItem " + (props.active ? "Active" : "")}>
      <a href={props.location}>{props.name}</a>
    </div>
  );
};

export default SidebarItem;
