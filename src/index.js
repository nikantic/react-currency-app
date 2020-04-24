import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./store/reducer";
import ExchangeRates from "./ExchangeComponent/ExchangeComponent";

const store = createStore(reducer);

const app = (
  <Provider store={store}>
    <div className="App">
      <ExchangeRates />
    </div>
  </Provider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
