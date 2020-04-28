import React from "react";
import findSidebarSVG from "./SidebarSVG/SidebarSVG";

const SidebarItem = props => {
  const sidebarItemSVG = findSidebarSVG(props.name);
  return (
    <div className="SidebarItem">
      {sidebarItemSVG ? (
        <span
          className="SidebarItemSVGHolder"
          dangerouslySetInnerHTML={{ __html: sidebarItemSVG.code }}
        />
      ) : null}
      <span className="SidebarItemLabel">{props.label}</span>
      {props.savedTransactions ? (
        <span
          className={
            "NotificationIconNum " +
            (props.savedTransactions.length !== 0 ? "Active" : "")
          }
        >
          {props.savedTransactions.length}
        </span>
      ) : null}
      {props.children}
    </div>
  );
};

export default SidebarItem;
