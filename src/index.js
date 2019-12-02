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
    data: [],
    loading: false
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
        this.animateCurrencyComponentsIn();
        this.setState({ loading: false });
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
    this.animateCurrencyComponentsIn();
  }

  animateCurrencyComponentsIn = () => {
    setTimeout(() => {
      this.refs.CurrencyComponentHolder.querySelectorAll(
        ".CurrencyComponent"
      ).forEach((item, index) => {
        item.style.transitionDelay = index * 0.01 + "s";
        item.classList.add("Appear");
      });
    }, 100);
  };

  animateCurrencyComponentsOut = () => {
    this.refs.CurrencyComponentHolder.querySelectorAll(
      ".CurrencyComponent"
    ).forEach(item => {
      item.style.transitionDelay = "0s";
      item.classList.remove("Appear");
    });
  };

  BaseClickHandler = (e, newCurrency) => {
    this.setState({ loading: true });
    this.refs.ConverterComponent.refs.ConverterComponentBase.classList.add(
      "Updating"
    );
    e.stopPropagation();
    this.animateCurrencyComponentsOut();
    setTimeout(() => {
      this.scrollToTop();
    }, 100);
    setTimeout(() => {
      this.fetchAPI(newCurrency);
    }, 300);
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
              ref="ConverterComponent"
              baseCurrency={data["base"]}
              targetCurrency={this.state.targetCurrency}
              loading={this.state.loading}
            />
            <div className="ExchangeRatesContent">
              <h2>Exchange Rates</h2>
              <h4>Date: {data["date"]}</h4>
              <ul
                className="CurrencyComponentHolder"
                ref="CurrencyComponentHolder"
              >
                {this.state.loading ? (
                  <div className="CurrencyComponentHolderLoader">
                    <LoaderComponent />
                  </div>
                ) : null}
                {displayRates}
              </ul>
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
