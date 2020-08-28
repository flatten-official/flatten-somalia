import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import { Components } from "formiojs";

import App from "./ui/App";

import "./i18n";
import "./styles/styles.scss";
import CustomFormIoComponent from "./ui/components/formio/CustomFormComponent";
import TranslatedText from "./ui/components/surveys/TranslatedText";
import { ConnectedFollowUpId } from "./ui/pages/surveys/ConnectedComponents";

Components.setComponents({
  customFollowUpId: CustomFormIoComponent(ConnectedFollowUpId),
  customText: CustomFormIoComponent(TranslatedText),
});

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
