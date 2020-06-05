import Form from "./formio/Form";
import React from "react";
import PropTypes from "prop-types";

const FormPage = ({ title, submitHook, formDef }) => {
  return (
    <>
      <h3 className="submissionPageTitle">{title}</h3>
      <Form
        formioForm={formDef}
        submitHook={submitHook}
        formioOptions={{ noAlerts: false }}
      />
    </>
  );
};

FormPage.propTypes = {
  title: PropTypes.string.isRequired,
  submitHook: PropTypes.func.isRequired,
  formDef: PropTypes.object.isRequired,
};

export default FormPage;
