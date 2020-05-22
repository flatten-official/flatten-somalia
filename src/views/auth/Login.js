import React from 'react';
import Form from "./Form";
import LoginForm from "./Login.json"

const Login = () => {
  return <Form form={LoginForm} name="login" route="volunteer/login" successRedir="login-success" formioOptions={{}}/>;
}

export default Login;
