import React, { Component } from "react";
import ReactDOM from "react-dom";
import CurrencyComponent from "./CurrencyComponent/CurrencyComponent";
import BaseComponent from "./BaseComponent/BaseComponent";
import LoaderComponent from './UI/LoaderComponent/LoaderComponent';
import SidebarComponent from './UI/SidebarComponent/SidebarComponent';

import "./styles.css";

// cool loader - calculating rates, lobbying etc
// currency component - convert to/from or set as base
// calculator component
// hover effects
// mobile support - transition to top of the page when clicking
// optimization - json save and error handling (404 and for components)

class ExchangeRates extends Component {
  state = {
    baseAPICurrency: "EUR",
    data: []
  };

  fetchAPI = () => {
    const url =
      "https://api.exchangeratesapi.io/latest?base=" +
      this.state.baseAPICurrency;

    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({ data: result });
      })
      .catch(error => console.log(error.message));
  };

  componentDidMount() {
    this.fetchAPI();
  }

  ComponentClickHandler = (newCurrency) => {
    this.setState({ baseAPICurrency: newCurrency }, () => {
      this.fetchAPI();
    });
    document.querySelector('.ContentHolder').scroll({top: 0, left: 0, behavior: 'smooth' })
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
              clicked={this.ComponentClickHandler.bind(this)}
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
        </div>
      );
    } else {
      return <LoaderComponent />
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
