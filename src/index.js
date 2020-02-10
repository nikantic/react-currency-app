import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import CurrencyComponent from "./CurrencyComponent/CurrencyComponent";
import LoaderComponent from "./UI/LoaderComponent/LoaderComponent";
import SidebarComponent from "./UI/SidebarComponent/SidebarComponent";
import ConverterComponent from "./ConverterComponent/ConverterComponent";
import BackToTop from "./UI/BackToTop/BackToTop";
import SearchComponent from "./SearchComponent/SearchComponent";
import Header from "./UI/Header/Header";
import NotificationComponent from "./UI/NotificationComponent/NotificationComponent";
import TransactionsComponent from "./TransactionsComponent/TransactionsComponent";
import EmptyStateComponent from "./UI/EmptyState/EmptyStateComponent";
import ChartsComponent from "./ChartsComponent/ChartsComponent";

import "./styles.css";

class ExchangeRates extends Component {
  state = {
    baseAPICurrency: "EUR",
    targetCurrency: {
      name: "USD",
      value: 0,
      data: []
    },
    data: [],
    loading: false,
    notifications: [],
    savedTransactions: []
  };

  AddNewNotification = notification => {
    this.setState({
      notifications: [notification, ...this.state.notifications]
    });
  };

  SaveTransaction = transaction => {
    this.setState({
      savedTransactions: [transaction, ...this.state.savedTransactions]
    });
  };

  RemoveSavedTransaction = transactionId => {
    let savedTransactionArr = this.state.savedTransactions;
    savedTransactionArr.splice(transactionId, 1);
    this.setState({ savedTransaction: savedTransactionArr });
  };

  ClearSavedTransactions = () => {
    this.setState({ savedTransactions: [] });
  };

  ClearNotifications = () => {
    this.setState({ notifications: [] });
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
        this.AddNewNotification(
          "<strong>New base curreny:</strong> " + this.state.baseAPICurrency
        );
      })
      .catch(error => console.log(error.message));
  };

  fetchTargetAPI = newCur => {
    const url = "https://api.exchangeratesapi.io/latest?base=" + newCur;

    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState(prevState => ({
          targetCurrency: {
            ...prevState.targetCurrency,
            data: result
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
    this.fetchTargetAPI(this.state.targetCurrency["name"]);
  }

  animateCurrencyComponentsIn = () => {
    setTimeout(() => {
      document.querySelectorAll(".CurrencyComponent").forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("Appear");
        }, index * 20);
      });
    }, 100);
  };

  animateCurrencyComponentsOut = () => {
    document.querySelectorAll(".CurrencyComponent").forEach(item => {
      item.style.transitionDelay = "0s";
      item.classList.remove("Appear");
    });
  };

  BaseClickHandler = (e, newCurrency) => {
    this.setState({ loading: true });
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
    this.setState(prevState => ({
      targetCurrency: {
        ...prevState.targetCurrency,
        name: newCurrency,
        value: newValue
      }
    }));
    this.scrollToTop();
    setTimeout(() => {
      this.fetchTargetAPI(this.state.targetCurrency["name"]);
    }, 0);
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

      const componentArray = (() => {
        let arr = [];
        for (let key in rates) {
          arr.push(key);
        }
        return arr;
      })();

      // MAIN RENDER
      return (
        <div>
          <Router>
            <SidebarComponent
              savedTransactions={this.state.savedTransactions}
            />

            <div className="ContentHolder">
              <Header>
                <NotificationComponent
                  notifications={this.state.notifications}
                  clearNotifications={this.ClearNotifications.bind(this)}
                />
              </Header>
              <BackToTop clicked={this.scrollToTop} />

              <Switch>
                <Route
                  exact
                  path="/transactions"
                  render={props => (
                    <div>
                      <TransactionsComponent
                        {...props}
                        savedTransactions={this.state.savedTransactions}
                        clearTransactions={this.ClearSavedTransactions.bind(
                          this
                        )}
                        removeTransaction={this.RemoveSavedTransaction.bind(
                          this
                        )}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={props => (
                    <div>
                      <ChartsComponent
                        {...props}
                        baseData={data}
                        targetData={this.state.targetCurrency.data}
                      />
                      <ConverterComponent
                        {...props}
                        baseCurrency={data["base"]}
                        targetCurrency={this.state.targetCurrency}
                        loading={this.state.loading}
                        addNewNotification={this.AddNewNotification}
                        saveTransaction={this.SaveTransaction}
                      />
                      <div className="ExchangeRatesContent">
                        <div className="ContentTopHolder">
                          <div className="ContentTopHolderLeft">
                            <h2>Exchange Rates</h2>
                            <h4>Date: {data["date"]}</h4>
                            <h5>Source: European Central Bank</h5>
                          </div>
                          <div>
                            <SearchComponent componentArray={componentArray} />
                          </div>
                        </div>
                        <ul className="CurrencyComponentHolder">
                          {this.state.loading ? (
                            <div className="CurrencyComponentHolderLoader">
                              <LoaderComponent />
                            </div>
                          ) : null}
                          {displayRates}
                        </ul>
                      </div>
                    </div>
                  )}
                />
                {/* <Route
                  exact
                  path="/charts"
                  render={props => <ChartsComponent {...props} data={data} />}
                /> */}
                <Route
                  path="*"
                  render={props => (
                    <EmptyStateComponent>
                      <p>
                        The route you tried to reach doesn't exist yet. Go back{" "}
                        <Link to="/">Home</Link>
                      </p>
                    </EmptyStateComponent>
                  )}
                />
              </Switch>
            </div>
          </Router>
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
