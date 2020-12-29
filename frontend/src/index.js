import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  //Připojení storu k aplikaci pomocí Provideru
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
