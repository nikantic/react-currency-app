import React, { Component } from "react";

class BackToTop extends Component {
  state = {
    visible: false,
    threshold: 700
  };

  BackToTopAppear = () => {
    const contentHolder = document.querySelector(".ContentHolder");
    contentHolder.addEventListener("scroll", () => {
      if (
        contentHolder.scrollTop > this.state.threshold &&
        !this.state.visible
      ) {
        this.setState({ visible: true });
      } else if (
        contentHolder.scrollTop < this.state.threshold &&
        this.state.visible
      ) {
        this.setState({ visible: false });
      }
    });
  };

  checkClasses = () => {
    if (this.state.visible) {
      return "Visible";
    } else {
      return "";
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.BackToTopAppear();
    }, 300);
  }

  render() {
    return (
      <div
        className={"BackToTop " + this.checkClasses()}
        onClick={this.props.clicked}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 31.479 31.479"
        >
          <path d="M26.477,10.274c0.444,0.444,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-8.047-8.047  v26.555c0,0.619-0.492,1.111-1.111,1.111c-0.619,0-1.127-0.492-1.127-1.111V3.813l-8.031,8.047c-0.444,0.429-1.159,0.429-1.587,0  c-0.444-0.444-0.444-1.143,0-1.587l9.952-9.952c0.429-0.429,1.143-0.429,1.571,0L26.477,10.274z" />
        </svg>
      </div>
    );
  }
}

export default BackToTop;
