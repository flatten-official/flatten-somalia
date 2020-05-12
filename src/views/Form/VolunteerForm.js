import React from "react";
import { Component } from "react";
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

const VolunteerForm = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formName: props.formName,
      formTitle: props.formTitle,
    };
  }

  componentWillMount() {
    this.props.getForm();
  }

  render() {
    const {
      submission,
      hideComponents,
      onSubmit,
      errors,
      options,
      form: { form, isActive, url },
    } = this.props;

    if (isActive) {
      return <Loading />;
    }

    return (
      <div>
        <h3>{this.state.formTitle}</h3>
        <Errors errors={errors} />
        <Form
          form={form}
          submission={submission}
          url={url}
          options={options}
          hideComponents={hideComponents}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    form: selectRoot("form", selectRoot(ownProps.formName, state)),
    errors: [
      selectError("form", selectRoot(ownProps.formName, state)),
      selectError("submission", selectRoot(ownProps.formName, state)),
    ],
    options: {
      noAlerts: true,
    },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getForm: () => dispatch(getForm(ownProps.formName)),
    onSubmit: (submission) => {
      dispatch(
        saveSubmission(
          ownProps.formName,
          submission,
          null,
          (err, submission) => {
            if (!err) {
              dispatch(resetSubmissions(ownProps.formName));
              dispatch(push("/success"));
            }
          }
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerForm);
