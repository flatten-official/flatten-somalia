import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import { initAuth, Formio } from "react-formio";

import {
    setLocale,
    loadTranslations,
    syncTranslationWithStore,
} from "react-redux-i18n";
import getTranslations from './translations/GetTranslations'

import App from "./App";

import "./styles.scss";

// Initialize the current user
store.dispatch(initAuth());

syncTranslationWithStore(store)
getTranslations().then((locale) => {
    store.dispatch(loadTranslations(locale))
    store.dispatch(setLocale('en'));

    render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        document.getElementById("root")
    );
});