import React, { Component } from "react";

class ConverterComponent extends Component {
  state = {
    baseCur: this.props.baseCurrency,
    targetCur: this.props.targetCurrency["name"],
    baseInput: 1,
    targetInput: this.props.targetCurrency["value"]
  };

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
      this.state.baseCur !== this.props.baseCurrency ||
      this.state.targetCur !== this.props.targetCurrency["name"]
    ) {
      this.setState({
        baseCur: this.props.baseCurrency,
        targetCur: this.props.targetCurrency["name"]
      });
      this.CalcNewValues("baseInput");
    }
  }

  render() {
    return (
      <div className="ConverterComponent">
        <h2>Convert To / From in realtime</h2>
        <div>
          <span>Base Currency: {this.props.baseCurrency}</span>
          <input
            type="number"
            name="baseInput"
            value={this.state.baseInput}
            onChange={this.ChangeHandler}
          />
        </div>
        <div>
          <span>Target Currency: {this.props.targetCurrency["name"]}</span>
          <input
            type="number"
            name="targetInput"
            value={this.state.targetInput}
            onChange={this.ChangeHandler}
          />
        </div>
      </div>
    );
  }
}

export default ConverterComponent;
