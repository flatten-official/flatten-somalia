import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { initAuth, Formio } from "react-formio";
import { ConnectedRouter } from "connected-react-router";

import './i18n';
import store, { history } from "./store";
import App from "./App";
import { AppConfig } from "./config";
import "./styles.scss";

Formio.setProjectUrl(AppConfig.projectUrl);
Formio.setBaseUrl(AppConfig.apiUrl);

// Initialize the current user
store.dispatch(initAuth());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);