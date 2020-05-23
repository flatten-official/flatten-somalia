import React from "react";
import { push } from "connected-react-router";
import { Form as FormioForm } from "react-formio";
import backend from "./backend";
import { submitSuccess, submitFailure } from "./backendActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Form = (props) => {
  let {
    name,
    submitApi,
    formioForm,
    formioOptions,
    submitSuccess,
    submitFailure,
  } = props;

  formioOptions = formioOptions === undefined ? {} : formioOptions; // optional prop

  if (!("hooks" in formioOptions)) {
    formioOptions.hooks = {};
  }

  // add a hook to send the request to the server
  formioOptions.hooks.beforeSubmit = async (submission, next) => {
    try {
      // need to actually add the submission in here!
      let res = await backend.request({ ...submitApi, data: submission });
      submitSuccess(name, res);
    } catch (e) {
      submitFailure(name, false);
      next(e);
    }
  };

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
