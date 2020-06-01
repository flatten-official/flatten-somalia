import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { form, forms, submission, submissions } from "react-formio";
import { connectRouter } from "connected-react-router";
import { volunteerFormReducer } from "./volunteerFormReducer";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    volunteerForm: volunteerFormReducer,
    form: form({ name: "form" }),
    forms: forms({ name: "forms", query: { type: "form", tags: "common" } }),
    submission: submission({ name: "submission" }),
    submissions: submissions({ name: "submissions" }),
  });
