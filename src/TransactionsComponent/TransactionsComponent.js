import React, { Component, Fragment } from "react";
import TransactionItem from "./TransactionItem/TransactionItem";
import Logo from "../UI/Logo/Logo";

class TransactionsComponent extends Component {
  render() {
    let displayTransactions = [];

    if (this.props.savedTransactions.length !== 0) {
      displayTransactions = (() => {
        let arr = [];
        this.props.savedTransactions.forEach((item, index) => {
          arr.push(
            <TransactionItem
              key={index}
              baseCur={item["baseCur"]}
              targetCur={item["targetCur"]}
            />
          );
        });
        return arr;
      })();
    }

    return (
      <div>
        {displayTransactions.length !== 0 ? (
          [
            displayTransactions,
            <div
              className="ClearAllTransactionsButton"
              onClick={this.props.clearTransactions}
            >
              <p>Clear All Saved Transactions</p>
            </div>
          ]
        ) : (
          <Fragment>
            <div className="TransactionsComponentEmptyState">
              {" "}
              <p>Your saved transactions will appear here. Start saving!</p>
              <Logo onlySVG />
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default TransactionsComponent;
