import React from 'react';
import Form from "../../backend/Form";
import LoginForm from "./Login.json"

const Login = () => {
  return <Form formioForm={LoginForm} name="login" submitRoute="volunteer/login" successRedir="/submitted-email" formioOptions={{}}/>;
}

export default Login;
