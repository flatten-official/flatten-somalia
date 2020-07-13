import React from "react";
import { useTranslation } from "react-i18next";
import { Form as FormioForm } from "react-formio";
import PropTypes from "prop-types";
import Types from "../../../surveys/actionTypes";
import { useDispatch, useSelector } from "react-redux";

/**
 *
 * @param formioForm the form defintion json
 * @param formioOptions some form options
 * @param submitHook function that is called when the form is submitted
 */
const Form = ({ formioForm, formioOptions, submitHook }) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  formioOptions = formioOptions ? formioOptions : {}; // optional prop

  if (!formioOptions.hooks) formioOptions.hooks = {};

  // add a hook to send the request to the server
  formioOptions.hooks.beforeSubmit = async (submission, next) => {
    try {
      await submitHook(submission.data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  const onNextPage = (info) => {
    dispatch({
      type: Types.ADD_PAGE_TIMING,
      payload: { pageNum: info.page, time: Date.now() },
    });
  };

  // the form localization should always be consistent with the site's
  formioOptions.i18n = i18n;
  formioOptions.language = i18n.language;

  formioOptions.breadcrumbSettings = { clickable: false };

  return (
    <div className="form">
      <FormioForm
        options={formioOptions}
        form={formioForm}
        onNextPage={onNextPage}
      />
    </div>
  );
};

Form.propTypes = {
  formioForm: PropTypes.object.isRequired,
  formioOptions: PropTypes.object,
  submitHook: PropTypes.func,
};

export default Form;
