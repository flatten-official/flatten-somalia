import React from "react";
import { useTranslation } from "react-i18next";
import { Form as FormioForm } from "react-formio";
import PropTypes from "prop-types";

/**
 *
 * @param formioForm the form defintion json
 * @param formioOptions some form options
 * @param submitHook function that is called when the form is submitted
 * @param onNextPage function that is run when the next page is selected
 */
const Form = ({ formioForm, formioOptions, submitHook, onNextPage }) => {
  const { i18n } = useTranslation();

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
  onNextPage: PropTypes.func,
};

export default Form;
