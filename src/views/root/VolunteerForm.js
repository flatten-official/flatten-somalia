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
import { Translate } from "react-redux-i18n";
import EN from '../../translations/en/VolunteerForm';
import SO from '../../translations/so/VolunteerForm';
import {PropTypes} from "prop-types"

const VolunteerForm = ({
  formTitle,
  submission,
  hideComponents,
  errors,
  form,
  getForm,
  onSubmit,
  locale
}) => {
  useEffect(getForm, []);

  if (form.isActive) {
    return <Loading />;
  }

  return (
    <div>
      <h3> <Translate value={"VolunteerForm.title"} /> </h3>
      <Errors errors={errors} />
      <Form
        form={form.form}
        submission={submission}
        url={form.url}
        hideComponents={hideComponents}
        onSubmit={onSubmit}
        options={{
          noAlerts: true,
          language: locale,
          i18n: {
            en: EN,
            so: SO
          }
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
    ],
    locale: state.i18n.locale
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
