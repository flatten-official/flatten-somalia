import React, {Component, createRef, useEffect} from "react";
import {connect} from "react-redux";
import {Form} from "react-formio";
import {push} from "connected-react-router";
import {AppConfig, AuthConfig} from "../../config";
import {submitForm} from "../../backend/backendActions";
import LoginForm from "./Login.json"

class Login extends Component {

  constructor(props) {
    super(props);

    this.formRef = createRef();
  }

  componentDidMount() {
    let formio = this.formRef.current.instance;
    // console.log(Object.entries(this.formRef.current));
    // console.log(formio.on);
    // formio.on('submit', (submission)=>console.log('submit'));
    // formio.setAlert('hello', 'hello hello');
  }
  
  render() {
    return <Form src={this.props.src}
    options={{hooks:{beforeSubmit:(submission, next)=>{
      next(Error('my error'));
    }}}} // form={LoginForm}
    onSubmit={(submission)=>console.log(submission)} onSubmitDone={()=>console.log('submit done')} onError={(error)=>console.log(error)}  ref={this.formRef} />;
  }
}

const mapStateToProps = () => ({
    src: AppConfig.projectUrl + "/" + AuthConfig.login.form,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (submission) => {
    dispatch(
      submitForm("auth", '/verify/login', submission, (_, err)=> {
        console.log('onsubmit');
        console.log(err);
        console.log(!err)
        if (!err) {
          dispatch(push("/submitted-email"));
        } else {
        }
        // stop the submission success
      })
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
