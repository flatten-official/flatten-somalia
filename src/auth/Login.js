import React from "react";
import Form from "../form/Form";
import LoginForm from "./Login.json";
import flattenApi from "../backend/api";

const Login = () => {
  let hook = (submission) => ({ email: submission.data.email });
  return (
    <Form
      formioForm={LoginForm}
      name="login"
      submitApi={flattenApi.login}
      submitHook={hook}
      successRedir="/submitted-email"
      formioOptions={{}}
    />
  );
};

export default Login;
