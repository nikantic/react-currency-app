import React, { Component } from "react";
import findCurrencyData from "../currency_data";

class ConverterComponent extends Component {
  state = {
    baseCur: {
      name: this.props.baseCurrency,
      img: "../assets/img/" + this.props.baseCurrency + ".png",
      other: findCurrencyData(this.props.baseCurrency)
    },
    targetCur: {
      name: this.props.targetCurrency["name"],
      img: "../assets/img/" + this.props.targetCurrency["name"] + ".png",
      other: findCurrencyData(this.props.targetCurrency["name"])
    },
    baseInput: 1,
    targetInput: this.props.targetCurrency["value"]
  };

  // const baseCur = props.currency,
  // baseImgUrl = "../assets/img/" + baseCur + ".png",
  // baseCurInfo = findCurrencyData(this.props.baseCurrency);

  CalcNewValues = keyName => {
    if (keyName === "baseInput") {
      this.setState({
        targetInput: parseFloat(
          (this.state.baseInput * this.props.targetCurrency["value"]).toFixed(2)
        )
      });
    } else if (keyName === "targetInput") {
      this.setState({
        baseInput: parseFloat(
          (this.state.targetInput / this.props.targetCurrency["value"]).toFixed(
            2
          )
        )
      });
    }
  };

  ChangeHandler = event => {
    const inputName = event.target.name;
    this.setState({ [inputName]: parseFloat(event.target.value) }, () => {
      this.CalcNewValues(inputName);
    });
  };

  componentDidUpdate() {
    // update input values in case currencies props change
    if (
      this.state.baseCur["name"] !== this.props.baseCurrency ||
      this.state.targetCur["name"] !== this.props.targetCurrency["name"]
    ) {
      this.setState({
        baseCur: {
          name: this.props.baseCurrency,
          img: "../assets/img/" + this.props.baseCurrency + ".png",
          other: findCurrencyData(this.props.baseCurrency)
        },
        targetCur: {
          name: this.props.targetCurrency["name"],
          img: "../assets/img/" + this.props.targetCurrency["name"] + ".png",
          other: findCurrencyData(this.props.targetCurrency["name"])
        }
      });
      this.CalcNewValues("baseInput");
    }
  }

  render() {
    return (
      <div className="ConverterComponent">
        <h2>Convert To / From in realtime</h2>
        <div>
          <div>Full Name: {this.state.baseCur["other"]["name"]}</div>
          <div>Country: {this.state.baseCur["other"]["country"]}</div>
          <img alt={this.props.baseCurrency} src={this.state.baseCur["img"]} />
          <div className="ConverterComponentInputHolder">
            <input
              type="number"
              name="baseInput"
              value={this.state.baseInput}
              onChange={this.ChangeHandler}
            />
            <span>{this.props.baseCurrency}</span>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div>
          <div>Full Name: {this.state.targetCur["other"]["name"]}</div>
          <div>Country: {this.state.targetCur["other"]["country"]}</div>
          <img
            alt={this.props.targetCurrency["name"]}
            src={this.state.targetCur["img"]}
          />
          <div className="ConverterComponentInputHolder">
            <input
              type="number"
              name="targetInput"
              value={this.state.targetInput}
              onChange={this.ChangeHandler}
            />
            <span>{this.props.targetCurrency["name"]}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ConverterComponent;
