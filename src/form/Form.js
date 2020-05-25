import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { useTranslation } from "react-i18next";
import { Form as FormioForm } from "react-formio";
import PropTypes from "prop-types";
import backend from "../backend/backend";
import { submitSuccess, submitFailure } from "../backend/backendActions";

const Form = ({
  name,
  submitApi,
  formioForm,
  formioOptions,
  submitHook,
  successRedir,
}) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const onSubmitSuccess = (submission, next) => {
    dispatch(submitSuccess(submission, next));
    dispatch(push(successRedir));
  };

  const onSubmitFailure = (submission) =>
    dispatch(submitFailure(submission, false));

  formioOptions = formioOptions === undefined ? {} : formioOptions; // optional prop

  if (!("hooks" in formioOptions)) {
    formioOptions.hooks = {};
  }

  // add a hook to send the request to the server
  formioOptions.hooks.beforeSubmit = async (submission, next) => {
    try {
      submission = submitHook ? submitHook(submission) : submission;
      // need to actually add the submission in here!
      const res = await backend.request({ ...submitApi, data: submission });
      onSubmitSuccess(name, res);
    } catch (e) {
      onSubmitFailure(name);
      next(e);
    }
  };

  // the form localization should always be consistent with the site's
  formioOptions.i18n = i18n;
  formioOptions.language = i18n.language;

  return <FormioForm options={formioOptions} form={formioForm} />;
};

Form.propTypes = {
  name: PropTypes.string.isRequired,
  submitApi: PropTypes.object.isRequired,
  successRedir: PropTypes.string.isRequired,
  formioForm: PropTypes.object.isRequired,
  formioOptions: PropTypes.object,
  submitSuccess: PropTypes.func,
  submitFailure: PropTypes.func,
  submitHook: PropTypes.func,
};

export default Form;
