import React, { Component } from "react";
import TransactionItem from "./TransactionItem/TransactionItem";
import EmptyStateComponent from "../UI/EmptyState/EmptyStateComponent";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";

class TransactionsComponent extends Component {
  render() {
    const displayTransactions = (() => {
      let arr = [];
      this.props.savedTransactions.forEach((item, index) => {
        arr.push(
          <TransactionItem
            key={index}
            id={index}
            baseCur={item["baseCur"]}
            targetCur={item["targetCur"]}
            transactionDate={item["transactionDate"]}
            removeTransaction={this.props.removeTransaction}
          />
        );
      });
      return arr;
    })();

    return (
      <div className="TransactionItemsHolder">
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

const mapStateToProps = state => {
  return {
    savedTransactions: state.savedTransactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearTransactions: () => dispatch({ type: actionTypes.CLEAR_TRANSACTIONS }),
    removeTransaction: tranId =>
      dispatch({ type: actionTypes.REMOVE_TRANSACTION, transactionId: tranId })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsComponent);
