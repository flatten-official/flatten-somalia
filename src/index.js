import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import { initAuth, Formio } from "react-formio";
import App from "./App";

import { AppConfig } from "./config";

import "./styles.scss";
import "./i18n";

Formio.setProjectUrl(AppConfig.projectUrl);
Formio.setBaseUrl(AppConfig.apiUrl);

// Initialize the current user
store.dispatch(initAuth());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
