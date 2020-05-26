import { combineReducers } from "redux";
import submitReducer from "./submitReducer";
import authReducer from "./authReducer";
import { form, forms, submission, submissions } from "react-formio";
import { FormConfig } from "../config";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history) => {
  const reducersObj = {
    router: connectRouter(history),
    auth: authReducer,
    form: form({ name: "form" }),
    forms: forms({ name: "forms", query: { type: "form", tags: "common" } }),
    submission: submission({ name: "submission" }),
    submissions: submissions({ name: "submissions" }),
  };

  reducersObj[FormConfig.volunteerForm.formName] = submitReducer(
    FormConfig.volunteerForm.formName
  );

  reducersObj[FormConfig.addVolunteerForm.formName] = submitReducer(
    FormConfig.addVolunteerForm.formName
  );

  return combineReducers(reducersObj);
};

export default createRootReducer;
