import React, { Component } from "react";
import ReactDOM from "react-dom";
import CurrencyComponent from "./CurrencyComponent/CurrencyComponent";
import LoaderComponent from "./UI/LoaderComponent/LoaderComponent";
import SidebarComponent from "./UI/SidebarComponent/SidebarComponent";
import ConverterComponent from "./ConverterComponent/ConverterComponent";
import BackToTop from "./UI/BackToTop/BackToTop";

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

  scrollToTop = () => {
    document
      .querySelector(".ContentHolder")
      .scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  componentDidMount() {
    this.fetchAPI(this.state.baseAPICurrency);
  }

  BaseClickHandler = (e, newCurrency) => {
    e.stopPropagation();
    this.fetchAPI(newCurrency);
    this.scrollToTop();
  };

  TargetClickHandler = (e, newCurrency, newValue) => {
    e.stopPropagation();
    this.setState({ targetCurrency: { name: newCurrency, value: newValue } });
    this.scrollToTop();
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
            <ConverterComponent
              baseCurrency={data["base"]}
              targetCurrency={this.state.targetCurrency}
            />
            <div className="ExchangeRatesContent">
              <h2>Exchange Rates</h2>
              <h4>Date: {data["date"]}</h4>
              <ul>{displayRates}</ul>
            </div>
          </div>
          <BackToTop clicked={this.scrollToTop} />
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
