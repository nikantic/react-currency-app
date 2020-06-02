import React, { Component } from "react";
import findCurrencyData from "../currency_data";

class CurrencyComponent extends Component {
  state = {
    country: "",
    fullName: "",
    imgLoc: "../assets/img/" + this.props.name + ".png"
  };

  componentDidMount() {
    const curInfo = findCurrencyData(this.props.name);
    if (curInfo !== undefined) {
      this.setState({
        country: curInfo["country"],
        fullName: curInfo["name"]
      });
    }
  }

  componentDidUpdate() {
    if (this.props.isAnimating) {
      const curItem = this.refs[this.props.name];
      curItem.style.transitionDelay = "0s";
      curItem.classList.add("isAnimating");
    } else {
      const curItem = this.refs[this.props.name];
      curItem.style.transitionDelay = this.props.itemIndex * 20 + "ms";
      curItem.classList.remove("isAnimating");
    }
  }

  render() {
    return (
      <li
        ref={this.props.name}
        data-key={this.props.name}
        className={
          "CurrencyComponent " +
          (this.props.baseCur === this.props.name
            ? "CurrencyComponentIsBase"
            : "") +
          (this.props.transactionItem ? "CurrencyComponentTransactionItem" : "")
        }
        key={this.props.value}
        onClick={e => this.props.clickedBase(e, this.props.name)}
      >
        <div className="CurrencyComponentLeftSide">
          <img alt={this.state.fullName} src={this.state.imgLoc} />
        </div>
        <div className="CurrencyComponentRightSide">
          <div className="CurrencyComponentRightSideTop">
            <strong>{this.props.name}</strong>
            <span onClick={e => this.props.clickedBase(e, this.props.name)}>
              (Set as base)
            </span>
          </div>
          <span className="CurrencyComponentRightSideValue">
            {typeof this.props.value === "string"
              ? this.props.value
              : this.props.value.toFixed(3)}{" "}
            {this.props.baseCur ? (
              <small>(1 {this.props.baseCur})</small>
            ) : null}
          </span>
          <small className="CurrencyComponentRightSideCurrency">
            {this.state.fullName}
          </small>
          <span
            className="CurrencyComponentRightSideButton"
            onClick={e => this.props.clickedTarget(e, this.props.name)}
          >
            Set as target
          </span>
        </div>
      </li>
    );
  }
}

export default CurrencyComponent;
