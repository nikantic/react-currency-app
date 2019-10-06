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

  render() {
    return (
      <li
        className="CurrencyComponent"
        key={this.props.value}
        onClick={e => this.props.clicked(this.props.name)}
      >
        <div className="CurrencyComponentLeftSide">
          <img alt={this.state.fullName} src={this.state.imgLoc} />
        </div>
        <div className="CurrencyComponentRightSide">
          <div className="CurrencyComponentRightSideTop">
            <strong>{this.props.name}</strong>
            <span>(Set as base)</span>
          </div>
          <span className="CurrencyComponentRightSideValue">
            {this.props.value.toFixed(3)}{" "}
            <small>(1 {this.props.baseCur})</small>
          </span>
          <small>{this.state.fullName}</small>
          <span className="CurrencyComponentRightSideButton">
            Convert To / From
          </span>
        </div>
      </li>
    );
  }
}

export default CurrencyComponent;
