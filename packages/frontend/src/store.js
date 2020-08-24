import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import authReducer from "./ui/appReducer";
import { form, forms, submission, submissions } from "react-formio";
import surveyReducer from "./ui/pages/surveys/reducer";
import volunteerReducer from "./ui/pages/admin/reducer";

export const history = createBrowserHistory();

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
    surveys: surveyReducer,
    form: form({ name: "form" }),
    forms: forms({ name: "forms", query: { type: "form", tags: "common" } }),
    submission: submission({ name: "submission" }),
    submissions: submissions({ name: "submissions" }),
    volunteer: volunteerReducer,
  }),
  {},
  composedEnhancers
);
