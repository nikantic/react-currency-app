import React from "react";
import findSidebarSVG from "./SidebarSVG/SidebarSVG";

const SidebarItem = props => {
  const sidebarItemSVG = findSidebarSVG(props.name);
  return (
    <div className={"SidebarItem " + (props.active ? "Active" : "")}>
      <a href={props.location}>
        {sidebarItemSVG ? (
          <span
            className="SidebarItemSVGHolder"
            dangerouslySetInnerHTML={{ __html: sidebarItemSVG.code }}
          />
        ) : null}
        <span className="SidebarItemLabel">{props.label}</span>
      </a>
    </div>
  );
};

export default SidebarItem;
