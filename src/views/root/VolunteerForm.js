import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  selectRoot,
  resetSubmissions,
  saveSubmission,
  Form,
  selectError,
  Errors,
  getForm,
} from "react-formio";
import { push } from "connected-react-router";
import Loading from "../../containers/Loading";

const VolunteerForm = ({
  formTitle,
  submission,
  hideComponents,
  errors,
  form,
  getForm,
  onSubmit,
}) => {
  useEffect(getForm, []);

  if (form.isActive) {
    return <Loading />;
  }

  return (
    <div>
      <h3>{formTitle}</h3>
      <Errors errors={errors} />
      <Form
        form={form.form}
        submission={submission}
        url={form.url}
        hideComponents={hideComponents}
        onSubmit={onSubmit}
        options={{
          noAlerts: true,
        }}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    form: selectRoot("form", selectRoot(ownProps.formName, state)),
    errors: [
      selectError("form", selectRoot(ownProps.formName, state)),
      selectError("submission", selectRoot(ownProps.formName, state)),
    ],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getForm: () => dispatch(getForm(ownProps.formName)),
  onSubmit: (submission) => {
    dispatch(
      saveSubmission(ownProps.formName, submission, null, (err, _) => {
        if (!err) {
          dispatch(resetSubmissions(ownProps.formName));
          dispatch(push("/success"));
        }
      })
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerForm);
