import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const separateCurrencyData = rates => {
  let labelsArray = [],
    valuesArray = [];
  for (let key in rates) {
    if (key !== "IDR" && key !== "MYR" && key !== "KRW" && key !== "HUF") {
      labelsArray.push(key);
      valuesArray.push(rates[key]);
    }
  }
  return { currencyLabels: labelsArray, currencyValues: valuesArray };
};

class ChartsComponent extends Component {
  state = {
    baseCur: this.props.data["base"],
    chartData: {}
  };

  setNewChartData = () => {
    let chartCurrencyData = separateCurrencyData(this.props.data["rates"]);

    this.setState({
      chartData: {
        labels: chartCurrencyData["currencyLabels"],
        datasets: [
          {
            data: chartCurrencyData["currencyValues"],
            label: "Values in " + this.state.baseCur,
            backgroundColor: "rgb(0, 180, 93)",
            borderColor: "rgb(0, 150, 93)"
          }
        ]
      }
    });
  };

  componentDidMount() {
    this.setNewChartData();
  }

  componentDidUpdate() {
    if (this.state.baseCur !== this.props.data["base"]) {
      this.setState({ baseCur: this.props.data["base"] }, () => {
        this.setNewChartData();
      });
    }
  }

  render() {
    return (
      <div>
        <Line data={this.state.chartData} height={30} />
      </div>
    );
  }
}

export default ChartsComponent;
