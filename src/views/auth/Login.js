import React, {Component, createRef, useEffect} from "react";
import {connect} from "react-redux";
import {Form} from "react-formio";
import {push} from "connected-react-router";
import {AppConfig, AuthConfig} from "../../config";
import LoginForm from "./Login.json"
import backend from "../../backend/backend";
import {submitSuccess, submitFailure} from "../../backend/backendActions";

class Login extends Component {

  constructor(props) {
    super(props);

  }
  
  render() {
    return <Form //src={this.props.src}
    options={{noAlerts: false,
      hooks:{beforeSubmit:async (submission, next)=>{
        try {
          let res = await backend.post(AuthConfig.login.form, submission);
          console.log(res);
          this.props.submitSuccess("auth", res);
        } catch(e) {
          this.props.submitFailure("auth", false);
          next(e);
        }
    }}}} form={LoginForm}
     />;
  }
}

const mapStateToProps = () => ({
    src: AppConfig.projectUrl + "/" + AuthConfig.login.form,
});

const mapDispatchToProps = (dispatch) => ({
  submitSuccess: (submission, next) => dispatch(submitSuccess(submission, next)),
  submitFailure: (submission, next) => dispatch(submitFailure(submission, next)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
