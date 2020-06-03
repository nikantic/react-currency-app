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
    baseInput: this.props.baseInputStore,
    targetInput: {
      raw: this.props.targetCurrency["value"],
      formatted: this.props.targetCurrency["value"]
    }
  };

  SaveTransactionHandler = () => {
    this.props.addNewNotification(
      "<div class='NotificationItemSaved'><strong>New saved transaction:</strong> " +
        this.state.baseInput.formatted +
        " " +
        this.state.baseCur.name +
        " &#x21C6; " +
        this.state.targetInput.formatted +
        " " +
        this.state.targetCur.name +
        "</div>"
    );

    return {
      baseCur: {
        [this.state.baseCur.name]: this.state.baseInput.formatted
      },
      targetCur: {
        [this.state.targetCur.name]: this.state.targetInput.formatted
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
      const newTargetRawValue = parseFloat(
        (this.state.baseInput.raw * this.props.targetCurrency["value"]).toFixed(
          2
        )
      );
      const newTargetFormattedValue = this.FormatCurrency(
        newTargetRawValue.toString()
      );
      this.setState({
        targetInput: {
          raw: newTargetRawValue,
          formatted: newTargetFormattedValue
        }
      });
    } else if (keyName === "targetInput") {
      const newBaseRawValue = parseFloat(
        (
          this.state.targetInput.raw / this.props.targetCurrency["value"]
        ).toFixed(2)
      );
      const newBaseFormattedValue = this.FormatCurrency(
        newBaseRawValue.toString()
      );
      this.setState({
        baseInput: {
          raw: newBaseRawValue,
          formatted: newBaseFormattedValue
        }
      });
    }
  };

  ChangeHandler = event => {
    const inputText = event.target.value,
      rawInputNumber = parseFloat(inputText.replace(/,/g, "")),
      inputName = event.target.name,
      isInputNumber = inputText === "" ? true : !Number.isNaN(rawInputNumber);

    if (isInputNumber) {
      // Animations
      if (event.target.name !== "baseInput") {
        this.refs.ConverterComponentBase.classList.add("Typing");
        setTimeout(() => {
          if (this.refs.ConverterComponentBase.classList.contains("Typing")) {
            this.refs.ConverterComponentBase.classList.remove("Typing");
          }
        }, 700);
      } else {
        this.refs.ConverterComponentTarget.classList.add("Typing");
        setTimeout(() => {
          if (this.refs.ConverterComponentTarget.classList.contains("Typing")) {
            this.refs.ConverterComponentTarget.classList.remove("Typing");
          }
        }, 700);
      }

      const formattedNumber = this.FormatCurrency(inputText);
      this.setState(
        {
          [inputName]: {
            raw: rawInputNumber,
            formatted: formattedNumber
          }
        },
        () => {
          this.CalcNewValues(inputName);
        }
      );
    }
  };

  componentDidMount() {
    this.CalcNewValues("baseInput");
  }

  componentWillUnmount() {
    this.props.saveInput(this.state.baseInput);
  }

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

    // update input values if currencies props change
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

  FormatNumber = inputText => {
    return inputText.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  FormatCurrency = inputText => {
    if (inputText.indexOf(".") >= 0) {
      let decimalPos = inputText.indexOf("."),
        leftSide = inputText.substring(0, decimalPos),
        rightSide = inputText.substring(decimalPos);

      leftSide = this.FormatNumber(leftSide);
      rightSide = this.FormatNumber(rightSide);

      rightSide = rightSide.substring(0, 2);
      inputText = leftSide + "." + rightSide;
    } else {
      inputText = this.FormatNumber(inputText);
    }
    return inputText;
  };

  render() {
    return (
      <div className="ConverterComponent">
        <div
          ref="ConverterComponentBase"
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
              type="text"
              name="baseInput"
              ref="ConverterComponentBaseInput"
              pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
              value={this.state.baseInput.formatted}
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
        <div
          ref="ConverterComponentTarget"
          className="ConverterComponentCurrency ConverterComponentCurrencyTarget"
        >
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
              type="text"
              name="targetInput"
              ref="ConverterComponentTargetInput"
              value={this.state.targetInput.formatted}
              pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
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

const mapStateToProps = state => {
  return {
    baseInputStore: state.baseInput
  };
};

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
      }),
    saveInput: input =>
      dispatch({
        type: actionTypes.SAVE_INPUT,
        input: input
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConverterComponent);
