import React from 'react';
import findCurrencyData from "../currency_data";

const BaseComponent = (props) => {   
  const baseCur = props.currency,
        baseImgUrl = "../assets/img/" + baseCur + ".png",
        baseCurInfo = findCurrencyData(baseCur);
  
  return (
    <div>
      <img alt={baseCur} src={baseImgUrl} />
      <h2>
        Base Currency: {baseCur} ({baseCurInfo["name"]})
      </h2>
      <h3>Country: {baseCurInfo["country"]}</h3>
    </div>
  );
}

export default BaseComponent;