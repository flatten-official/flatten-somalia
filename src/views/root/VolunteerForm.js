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
import {PropTypes} from "prop-types"
import { useTranslation } from "react-i18next";

const VolunteerForm = ({
  formTitle,
  submission,
  hideComponents,
  errors,
  form,
  getForm,
  onSubmit
}) => {
  let {t, i18n} = useTranslation()
  useEffect(getForm, []);

  if (form.isActive) {
    return <Loading />;
  }

  return (
    <div>
      <h3> {t("VolunteerForm.title")} /> </h3>
      <Errors errors={errors} />
      <Form
        form={form.form}
        submission={submission}
        url={form.url}
        hideComponents={hideComponents}
        onSubmit={onSubmit}
        options={{
          noAlerts: true,
          language: i18n.language,
          i18n
        }}
      />
    </div>
  );
};

VolunteerForm.propTypes = {
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    form: selectRoot("form", selectRoot(ownProps.formName, state)),
    errors: [
      selectError("form", selectRoot(ownProps.formName, state)),
      selectError("submission", selectRoot(ownProps.formName, state)),
    ]
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
