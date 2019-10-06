import React, { Component } from "react";

class ConverterComponent extends Component {
  state = {
    baseVal: 1,
    targetVal: 1.4,
    get ratio() {
      return this.targetVal / this.baseVal;
    }
  };

  CalcNewValues = keyName => {
    if (keyName === "baseVal") {
      this.setState({
        targetVal: (this.state.baseVal * this.state.ratio).toFixed(2)
      });
    } else if (keyName === "targetVal") {
      this.setState({
        baseVal: (this.state.targetVal / this.state.ratio).toFixed(2)
      });
    }
  };

  ChangeHandler = event => {
    const inputName = event.target.name;
    this.setState({ [inputName]: event.target.value }, () => {
      this.CalcNewValues(inputName);
    });
  };

  render() {
    return (
      <div className="ConverterComponent">
        <h2>Convert To / From in realtime</h2>
        <div>
          <span>Base Currency: {this.props.baseCurrency}</span>
          <input
            type="number"
            name="baseVal"
            value={this.state.baseVal}
            onChange={this.ChangeHandler}
          />
        </div>
        <div>
          <span>Target Currency: CAD (for now fixed)</span>
          <input
            type="number"
            name="targetVal"
            value={this.state.targetVal}
            onChange={this.ChangeHandler}
          />
        </div>
      </div>
    );
  }
}

export default ConverterComponent;
