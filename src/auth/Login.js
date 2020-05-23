import React from "react";
import Form from "../backend/Form";
import LoginForm from "./Login.json";
import flattenApi from "../backend/api";

const Login = () => {
  return (
    <Form
      formioForm={LoginForm}
      name="login"
      submitApi={flattenApi.login}
      successRedir="/submitted-email"
      formioOptions={{}}
    />
  );
};

export default Login;
