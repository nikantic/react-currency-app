import React, { Component } from "react";
import ReactDOM from "react-dom";
import CurrencyComponent from "./CurrencyComponent/CurrencyComponent";
import BaseComponent from "./BaseComponent/BaseComponent";
import LoaderComponent from "./UI/LoaderComponent/LoaderComponent";
import SidebarComponent from "./UI/SidebarComponent/SidebarComponent";
import ConverterComponent from "./ConverterComponent/ConverterComponent";

import "./styles.css";

class ExchangeRates extends Component {
  state = {
    baseAPICurrency: "EUR",
    targetCurrency: {
      name: "USD",
      value: 0
    },
    data: []
  };

  fetchAPI = newCur => {
    const url = "https://api.exchangeratesapi.io/latest?base=" + newCur;

    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState(prevState => ({
          baseAPICurrency: newCur,
          data: result,
          targetCurrency: {
            ...prevState.targetCurrency,
            value: result["rates"][this.state.targetCurrency.name]
          }
        }));
      })
      .catch(error => console.log(error.message));
  };

  componentDidMount() {
    this.fetchAPI(this.state.baseAPICurrency);
  }

  BaseClickHandler = newCurrency => {
    this.fetchAPI(newCurrency);
    document
      .querySelector(".ContentHolder")
      .scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  TargetClickHandler = (newCurrency, newValue) => {
    this.setState({ targetCurrency: { name: newCurrency, value: newValue } });
    document
      .querySelector(".ContentHolder")
      .scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  render() {
    if (this.state.data.length !== 0) {
      const data = this.state.data;
      const rates = data["rates"];

      const displayRates = (() => {
        let arr = [];
        for (let key in rates) {
          arr.push(
            <CurrencyComponent
              key={key}
              name={key}
              value={rates[key]}
              baseCur={data["base"]}
              clickedBase={this.BaseClickHandler.bind(this)}
              clickedTarget={this.TargetClickHandler.bind(this)}
            />
          );
        }

        return arr;
      })();

      // MAIN RENDER
      return (
        <div>
          <SidebarComponent />
          <div className="ContentHolder">
            <BaseComponent currency={data["base"]} />
            <h4>Date: {data["date"]}</h4>
            <h2>Exchange Rates:</h2>
            <ul>{displayRates}</ul>
          </div>
          <ConverterComponent
            baseCurrency={data["base"]}
            targetCurrency={this.state.targetCurrency}
          />
        </div>
      );
    } else {
      return <LoaderComponent />;
    }
  }
}

function App() {
  return (
    <div className="App">
      <ExchangeRates />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
