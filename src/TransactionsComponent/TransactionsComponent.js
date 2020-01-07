import React, { Component } from "react";
import TransactionItem from "./TransactionItem/TransactionItem";
import EmptyStateComponent from "../UI/EmptyState/EmptyStateComponent";

class TransactionsComponent extends Component {
  render() {
    const displayTransactions = (() => {
      let arr = [];
      this.props.savedTransactions.forEach((item, index) => {
        arr.push(
          <TransactionItem
            key={index}
            baseCur={item["baseCur"]}
            targetCur={item["targetCur"]}
            transactionDate={item["transactionDate"]}
          />
        );
      });
      return arr;
    })();

    return (
      <div>
        {displayTransactions.length !== 0 ? (
          [
            displayTransactions,
            <div
              key="ClearAllTransactionsButton"
              className="ClearAllTransactionsButton"
              onClick={this.props.clearTransactions}
            >
              <p>Clear All Saved Transactions</p>
            </div>
          ]
        ) : (
          <EmptyStateComponent>
            <p>Your saved transactions will appear here. Start saving!</p>
          </EmptyStateComponent>
        )}
      </div>
    );
  }
}

export default TransactionsComponent;
