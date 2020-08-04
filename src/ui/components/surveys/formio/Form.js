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

  // there exists 3 submit hooks for formio.
  // beforeSubmit, customValidation and submit.
  // beforeSubmit doesn't run the validation so doesn't work
  // submit tries to submit the form to a formio server (formio doesn't support letting the frontend manage the submission)
  // therefore, we use customValidation to ensure validation is run but to also manage the submission before formio does
  // this allows to make our own request to our backend and then redirect to a success page
  // source code: https://github.com/formio/formio.js/blob/master/src/Webform.js#L1365
  formioOptions.hooks.customValidation = async (submission, next) => {
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
