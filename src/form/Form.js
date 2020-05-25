import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { useTranslation } from "react-i18next";
import { Form as FormioForm } from "react-formio";
import PropTypes from "prop-types";
import backend from "../backend/backend";
import { submitSuccess, submitFailure } from "../backend/backendActions";

const Form = (props) => {
  let { i18n } = useTranslation();

  let {
    name,
    submitApi,
    formioForm,
    formioOptions,
    submitSuccess,
    submitFailure,
    submitHook,
  } = props;

  formioOptions = formioOptions === undefined ? {} : formioOptions; // optional prop

  if (!("hooks" in formioOptions)) {
    formioOptions.hooks = {};
  }

  // add a hook to send the request to the server
  formioOptions.hooks.beforeSubmit = async (submission, next) => {
    try {
      submission =
        submitHook === undefined ? submission : submitHook(submission);
      // need to actually add the submission in here!
      let res = await backend.request({ ...submitApi, data: submission });
      submitSuccess(name, res);
    } catch (e) {
      submitFailure(name, false);
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitSuccess: (submission, next) => {
    dispatch(submitSuccess(submission, next));
    dispatch(push(ownProps.successRedir));
  },
  submitFailure: (submission, next) =>
    dispatch(submitFailure(submission, next)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
