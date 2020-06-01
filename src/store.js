import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import authReducer from "./backend/auth/authReducer";
import { reducer } from "./ui/initialSurvey/reducer";
import { form, forms, submission, submissions } from "react-formio";

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    volunteerForm: reducer,
    form: form({ name: "form" }),
    forms: forms({ name: "forms", query: { type: "form", tags: "common" } }),
    submission: submission({ name: "submission" }),
    submissions: submissions({ name: "submissions" }),
  }),
  initialState,
  composedEnhancers
);
