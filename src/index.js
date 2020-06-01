import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import { Components } from "formiojs";

import App from "./ui/App";

import "./i18n";
import "./styles/styles.scss";
import CustomFormIoComponent from "./ui/components/CustomFormComponent";
import FollowUpId from "./ui/initialSurvey/elements/FollowUpId";

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
