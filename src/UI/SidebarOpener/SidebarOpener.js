import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

const SidebarOpener = props => (
  <div
    className="SidebarOpener"
    onClick={() => {
      props.toggleSidebar();
      document.addEventListener("click", props.toggleSidebar, {
        once: true
      });
    }}
  >
    <div className="SidebarOpenerInner" />
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: () =>
      dispatch({
        type: actionTypes.TOGGLE_SIDEBAR
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SidebarOpener);
