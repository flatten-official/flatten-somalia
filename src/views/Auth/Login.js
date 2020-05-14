import React  from "react";
import { connect } from "react-redux";
import { Form } from "react-formio";
import { push } from "connected-react-router";
import { AppConfig, AuthConfig } from "../../config";
import { setUser } from "react-formio";

const Login = (props) => <Form {...props} />;

const mapStateToProps = () => {
  return {
    src: AppConfig.projectUrl + "/" + AuthConfig.login.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitDone: (submission) => {
      dispatch(push('/submitted-email'));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
