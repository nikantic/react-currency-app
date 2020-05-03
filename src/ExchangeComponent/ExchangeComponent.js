import React, { Component } from "react";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import CurrencyComponent from "../CurrencyComponent/CurrencyComponent";
import LoaderComponent from "../UI/LoaderComponent/LoaderComponent";
import SidebarComponent from "../UI/SidebarComponent/SidebarComponent";
import ConverterComponent from "../ConverterComponent/ConverterComponent";
import BackToTop from "../UI/BackToTop/BackToTop";
import SearchComponent from "../SearchComponent/SearchComponent";
import Header from "../UI/Header/Header";
import NotificationComponent from "../UI/NotificationComponent/NotificationComponent";
import TransactionsComponent from "../TransactionsComponent/TransactionsComponent";
import EmptyStateComponent from "../UI/EmptyState/EmptyStateComponent";
import ChartsComponent from "../ChartsComponent/ChartsComponent";
import moment from "moment";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";

import "../styles.css";

class ExchangeRates extends Component {
  state = {
    baseAPICurrency: "EUR",
    targetCurrency: {
      name: "USD",
      value: 0,
      data: []
    },
    data: [],
    isLoading: false,
    isAnimating: false
  };

  constructor(props) {
    super(props);
    // create a ref to store the searchInput DOM element
    this.searchInput = React.createRef();
    this.componentHolder = React.createRef();
  }

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
        this.setState({ isLoading: false });
        this.props.addNewNotification(
          "<div class='NotificationItemCurrency'><strong>New base curreny:</strong> " +
            this.state.baseAPICurrency +
            "</div>"
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
      this.setState({ isAnimating: false });
    }, 300);
  };

  animateCurrencyComponentsOut = () => {
    this.setState({ isAnimating: true });
  };

  BaseClickHandler = (e, newCurrency) => {
    this.setState({ isLoading: true });
    e.stopPropagation();
    this.animateCurrencyComponentsOut();
    setTimeout(() => {
      this.scrollToTop();
    }, 100);
    setTimeout(() => {
      this.fetchAPI(newCurrency);
    }, 300);
    this.searchInput.current.value = "";
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
        let index = 0;
        for (let key in rates) {
          arr.push(
            <CurrencyComponent
              key={key}
              name={key}
              value={rates[key]}
              baseCur={data["base"]}
              clickedBase={this.BaseClickHandler.bind(this)}
              clickedTarget={this.TargetClickHandler.bind(this)}
              itemIndex={index}
              isAnimating={this.state.isAnimating}
            />
          );
          index++;
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
            <SidebarComponent />

            <div className="ContentHolder">
              <Header>
                <NotificationComponent />
              </Header>
              <BackToTop clicked={this.scrollToTop} />

              <Switch>
                <Route
                  exact
                  path="/transactions"
                  render={props => (
                    <div>
                      <TransactionsComponent />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={props => (
                    <div>
                      {this.props.chartEnabled ? (
                        <ChartsComponent
                          {...props}
                          baseData={data}
                          targetData={this.state.targetCurrency.data}
                        />
                      ) : null}
                      <ConverterComponent
                        {...props}
                        baseCurrency={data["base"]}
                        targetCurrency={this.state.targetCurrency}
                        isLoading={this.state.isLoading}
                      />
                      <div className="ExchangeRatesContent">
                        <div className="ContentTopHolder">
                          <div className="ContentTopHolderLeft">
                            <h2>Exchange Rates</h2>
                            <h4>
                              Date:{" "}
                              {moment(data["date"], "YYYYMMDD").format(
                                "MMMM Do YYYY"
                              )}
                            </h4>
                            <h5>Source: European Central Bank</h5>
                          </div>
                          <div>
                            <SearchComponent
                              searchRef={this.searchInput}
                              componentArray={componentArray}
                              componentHolder={this.componentHolder}
                            />
                          </div>
                        </div>
                        <ul
                          className="CurrencyComponentHolder"
                          ref={this.componentHolder}
                        >
                          {this.state.isLoading ? (
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

const mapStateToProps = state => {
  return {
    chartEnabled: state.chartEnabled
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewNotification: notification =>
      dispatch({
        type: actionTypes.ADD_NOTIFICATION,
        notification: notification
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeRates);
