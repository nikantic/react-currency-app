import React, { Component } from "react";
import findCurrencyData from "../currency_data";
import ExchangeArrowSVG from "../UI/ExchangeArrowSVG/ExchangeArrowSVG";
import LoaderComponent from "../UI/LoaderComponent/LoaderComponent";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";

class ConverterComponent extends Component {
  state = {
    baseCur: {
      name: this.props.baseCurrency,
      img: "../assets/img/" + this.props.baseCurrency + ".png",
      other: findCurrencyData(this.props.baseCurrency)
    },
    targetCur: {
      name: this.props.targetCurrency["name"],
      img: "../assets/img/" + this.props.targetCurrency["name"] + ".png",
      other: findCurrencyData(this.props.targetCurrency["name"])
    },
    baseInput: 1,
    targetInput: this.props.targetCurrency["value"]
  };

  SaveTransactionHandler = () => {
    this.props.addNewNotification(
      "<div class='NotificationItemSaved'><strong>New saved transaction:</strong> " +
        this.state.baseInput +
        " " +
        this.state.baseCur.name +
        " &#x21C6; " +
        this.state.targetInput +
        " " +
        this.state.targetCur.name +
        "</div>"
    );

    return {
      baseCur: {
        [this.state.baseCur.name]: parseFloat(this.state.baseInput)
      },
      targetCur: {
        [this.state.targetCur.name]: parseFloat(this.state.targetInput)
      },
      transactionDate: new Date()
    };

    // this.refs.ConverterComponentBase.classList.add("Typing");
    // setTimeout(() => {
    //   if (this.refs.ConverterComponentBase.classList.contains("Typing")) {
    //     this.refs.ConverterComponentBase.classList.remove("Typing");
    //   }
    // }, 700);
    // this.refs.ConverterComponentTarget.classList.add("Typing");
    // setTimeout(() => {
    //   if (this.refs.ConverterComponentTarget.classList.contains("Typing")) {
    //     this.refs.ConverterComponentTarget.classList.remove("Typing");
    //   }
    // }, 700);
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
    if (event.target.value >= 0) {
      if (event.target.name !== "baseInput") {
        // this.refs.ConverterComponentBase.classList.add("Typing");
        // setTimeout(() => {
        //   if (this.refs.ConverterComponentBase.classList.contains("Typing")) {
        //     this.refs.ConverterComponentBase.classList.remove("Typing");
        //   }
        // }, 700);
      } else {
        // this.refs.ConverterComponentTarget.classList.add("Typing");
        // setTimeout(() => {
        //   if (this.refs.ConverterComponentTarget.classList.contains("Typing")) {
        //     this.refs.ConverterComponentTarget.classList.remove("Typing");
        //   }
        // }, 700);
      }
      const inputName = event.target.name;
      this.setState({ [inputName]: event.target.value }, () => {
        this.CalcNewValues(inputName);
      });
    }
  };

  componentDidUpdate() {
    // base currency update
    if (this.state.baseCur["name"] !== this.props.baseCurrency) {
      // setTimeout(() => {
      //   if (this.refs.ConverterComponentBase.classList.contains("Updating")) {
      //     this.refs.ConverterComponentBase.classList.remove("Updating");
      //     this.setState({ isLoading: false });
      //   }
      // }, 200);
      // this.refs.ConverterComponentBase.classList.add("Typing");
      // setTimeout(() => {
      //   if (this.refs.ConverterComponentBase.classList.contains("Typing")) {
      //     this.refs.ConverterComponentBase.classList.remove("Typing");
      //   }
      // }, 700);
    }

    // target currency update
    // if (this.state.targetCur["name"] !== this.props.targetCurrency["name"]) {
    //   this.refs.ConverterComponentTarget.classList.add("Typing");
    //   setTimeout(() => {
    //     if (this.refs.ConverterComponentTarget.classList.contains("Typing")) {
    //       this.refs.ConverterComponentTarget.classList.remove("Typing");
    //     }
    //   }, 700);
    // }

    // update input values in case currencies props change
    if (
      this.state.baseCur["name"] !== this.props.baseCurrency ||
      this.state.targetCur["name"] !== this.props.targetCurrency["name"]
    ) {
      this.setState({
        baseCur: {
          name: this.props.baseCurrency,
          img: "../assets/img/" + this.props.baseCurrency + ".png",
          other: findCurrencyData(this.props.baseCurrency)
        },
        targetCur: {
          name: this.props.targetCurrency["name"],
          img: "../assets/img/" + this.props.targetCurrency["name"] + ".png",
          other: findCurrencyData(this.props.targetCurrency["name"])
        }
      });
      this.CalcNewValues("baseInput");
    }
  }

  render() {
    return (
      <div className="ConverterComponent">
        <div
          className={
            "ConverterComponentCurrency ConverterComponentCurrencyBase " +
            (this.props.isLoading ? "Updating" : "")
          }
        >
          <div className="ConverterComponentCurrencyTopInfo">
            <img
              alt={this.props.baseCurrency}
              src={this.state.baseCur["img"]}
            />
            {this.props.isLoading ? (
              <div className="ConverterComponentCurrencyLoader">
                <LoaderComponent />
              </div>
            ) : null}
            <div className="ConverterComponentCurrencyTopInfoContent">
              <h2>{this.props.baseCurrency}</h2>
              <h4>{this.state.baseCur["other"]["name"]}</h4>
            </div>
          </div>
          <div className="ConverterComponentInputHolder">
            <input
              type="number"
              name="baseInput"
              value={this.state.baseInput}
              onChange={this.ChangeHandler}
            />
            <span>{this.props.baseCurrency}</span>
          </div>
        </div>
        <div
          className="InvertCurrenciesButton"
          onClick={() =>
            this.props.InvertCurrencies(
              this.props.baseCurrency,
              this.props.targetCurrency["name"]
            )
          }
        >
          <ExchangeArrowSVG />
        </div>
        <div className="ConverterComponentCurrency ConverterComponentCurrencyTarget">
          <div className="ConverterComponentCurrencyTopInfo">
            <img
              alt={this.props.targetCurrency["name"]}
              src={this.state.targetCur["img"]}
            />
            <div className="ConverterComponentCurrencyTopInfoContent">
              <h2>{this.props.targetCurrency["name"]}</h2>
              <h4>{this.state.targetCur["other"]["name"]}</h4>
            </div>
          </div>
          <div className="ConverterComponentInputHolder">
            <input
              type="number"
              name="targetInput"
              value={this.state.targetInput}
              onChange={this.ChangeHandler}
            />
            <span>{this.props.targetCurrency["name"]}</span>
          </div>
        </div>
        <div
          className="ConverterComponentSaveButton"
          onClick={() =>
            this.props.saveTransaction(this.SaveTransactionHandler())
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 32 32"
          >
            <line x1="15.5" y1="1" x2="15.5" y2="25.1" />
            <line x1="24.8" y1="16.8" x2="15.5" y2="26.1" />
            <line x1="6.2" y1="16.8" x2="15.5" y2="26.1" />
            <polyline points="1,25.5 1,30.9 31,30.9 31,24.9 " />
          </svg>
          Save transaction
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveTransaction: transaction =>
      dispatch({
        type: actionTypes.SAVE_TRANSACTION,
        transaction: transaction
      }),
    addNewNotification: notification =>
      dispatch({
        type: actionTypes.ADD_NOTIFICATION,
        notification: notification
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ConverterComponent);
