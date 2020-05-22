import React from 'react';
import { push } from "connected-react-router";
import {Form as FormioForm} from "react-formio";
import backend from "../../backend/backend";
import {submitSuccess, submitFailure} from "../../backend/backendActions";
import {connect} from "react-redux";

const Form = ( props ) => {
    let {name, route, successRedir, form, formioOptions, submitSuccess, submitFailure} = props;

    if (!('hooks' in formioOptions)) {
        formioOptions.hooks = {};
    }
    formioOptions.hooks.beforeSubmit = async(submission, next) => {
        try {
          let res = await backend.post(route, submission);
          submitSuccess("auth", res);
        } catch(e) {
          submitFailure("auth", false);
          next(e);
        }
    }

    return <FormioForm options={formioOptions} form={form} />
}

const mapStateToProps = () => ({ });

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitSuccess: (submission, next) => {
      dispatch(submitSuccess(submission, next));
      dispatch(push(ownProps.successRedir));
  },
  submitFailure: (submission, next) => dispatch(submitFailure(submission, next)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);