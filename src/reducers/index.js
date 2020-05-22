import { combineReducers } from "redux";
import locationReducer from "./locationReducer";
import submitReducer from "./submitReducer";
import { auth, form, forms, submission, submissions } from "react-formio";
import { i18nReducer } from "react-redux-i18n";
import { FormConfig } from "../config";

const createReducers = () => {
  let reducersObj = {
    auth: auth(),
    i18n: i18nReducer,
    form: form({ name: "form" }),
    forms: forms({ name: "forms", query: { type: "form", tags: "common" } }),
    submission: submission({ name: "submission" }),
    submissions: submissions({ name: "submissions" }),
    location: locationReducer
  };

  reducersObj[FormConfig.volunteerForm.formName] = submitReducer(FormConfig.volunteerForm.formName);

  reducersObj[FormConfig.addVolunteerForm.formName] = submitReducer(FormConfig.addVolunteerForm.formName);

  return reducersObj;
};

export default combineReducers(createReducers());