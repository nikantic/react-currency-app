import React from "react";
import CurrencyComponent from "../../CurrencyComponent/CurrencyComponent";
import ExchangeArrowSVG from "../../UI/ExchangeArrowSVG/ExchangeArrowSVG";
import moment from "moment";

const TransactionItem = props => {
  const baseCur = {
    name: Object.keys(props.baseCur)[0],
    value: Object.values(props.baseCur)[0]
  };

  const targetCur = {
    name: Object.keys(props.targetCur)[0],
    value: Object.values(props.targetCur)[0]
  };

  return (
    <div className="TransactionItem">
      <div
        className="TransactionItemRemove"
        onClick={() => props.removeTransaction(props.id)}
      >
        <p>Remove Transaction</p>
      </div>
      <div className="TransactionItemDate">
        {moment(props.transactionDate, "YYYYMMDD").format("LTS")}
      </div>
      <div className="TransactionItemBase">
        <CurrencyComponent
          key={baseCur.name}
          name={baseCur.name}
          value={baseCur.value}
          transactionItem
        />
      </div>
      <ExchangeArrowSVG className="TransactionItemExchangeArrowSVG" />
      <div className="TransactionItemTarget">
        <CurrencyComponent
          key={targetCur.name}
          name={targetCur.name}
          value={targetCur.value}
          transactionItem
        />
      </div>
    </div>
  );
};

export default TransactionItem;
