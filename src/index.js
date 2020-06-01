import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import { Components } from "formiojs";

import App from "./App";

import "./i18n";
import "./styles.scss";
import CustomFormIoComponent from "./form/CustomFormComponent";
import FollowUpId from "./form/FollowUpId";

Components.setComponents({
  customFollowUpId: CustomFormIoComponent(FollowUpId),
});

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
