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

const options = {
  maintainAspectRatio: false,
  animation: {
    easing: "easeInOutExpo"
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: "rgba(0,0,0,0.5)",
          fontStyle: "bold",
          beginAtZero: true,
          maxTicksLimit: 5,
          padding: 20
        },
        gridLines: {
          drawTicks: false,
          display: true,
          borderDash: [8, 4]
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          zeroLineColor: "transparent",
          display: false
        },
        ticks: {
          padding: 20,
          fontColor: "rgba(0,0,0,0.5)",
          fontStyle: "bold"
        }
      }
    ]
  }
};

class ChartsComponent extends Component {
  state = {
    baseCur: this.props.baseData["base"],
    targetCur: this.props.targetData["base"],
    chartData: {}
  };

  setNewChartData = () => {
    let ctx = document.getElementById("my-chart").getContext("2d");

    let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "rgba(206,180,247, 1)");
    gradientStroke.addColorStop(1, "rgba(206,180,247, 1)");

    let gradientFill = ctx.createLinearGradient(250.0, 0.0, 150.0, 500.0);
    gradientFill.addColorStop(0, "rgba(206,203,247, 0.5)");
    gradientFill.addColorStop(1, "rgba(206,203,247, 0.0)");

    let gradientStrokeActual = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStrokeActual.addColorStop(0, "rgba(49,220,240, 1)");
    gradientStrokeActual.addColorStop(1, "rgba(49,190,240, 1)");

    let gradientFillActual = ctx.createLinearGradient(250.0, 0.0, 150.0, 500.0);
    gradientFillActual.addColorStop(0, "rgba(49,190,240, .5)");
    gradientFillActual.addColorStop(1, "rgba(55, 255, 55, 1)");

    let chartBaseCurrencyData = separateCurrencyData(
        this.props.baseData["rates"]
      ),
      chartTargetCurrencyData = separateCurrencyData(
        this.props.targetData["rates"]
      );

    this.setState({
      chartData: {
        labels: chartBaseCurrencyData["currencyLabels"],
        datasets: [
          {
            data: chartBaseCurrencyData["currencyValues"],
            label: "Values in " + this.state.baseCur,
            borderColor: gradientStrokeActual,
            backgroundColor: gradientFillActual,
            fill: true,
            borderWidth: 2
          },
          {
            data: chartTargetCurrencyData["currencyValues"],
            label: "Values in " + this.state.targetCur,
            borderColor: gradientStroke,
            backgroundColor: gradientFill,
            fill: true,
            borderWidth: 2
          }
        ]
      }
    });
  };

  componentDidMount() {
    this.setNewChartData();
  }

  componentDidUpdate() {
    if (this.state.baseCur !== this.props.baseData["base"]) {
      this.setState({ baseCur: this.props.baseData["base"] }, () => {
        this.setNewChartData();
      });
    } else if (this.state.targetCur !== this.props.targetData["base"]) {
      this.setState({ targetCur: this.props.targetData["base"] }, () => {
        this.setNewChartData();
      });
    }
  }

  render() {
    return (
      <div className="ChartHolder">
        <Line
          id="my-chart"
          data={this.state.chartData}
          height={270}
          options={options}
        />
      </div>
    );
  }
}

export default ChartsComponent;
