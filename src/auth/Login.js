import React from "react";
import Form from "../backend/Form";
import LoginForm from "./Login.json";
import flattenApi from "../backend/api";

const Login = () => {
  const onSubmitHook = (submission) => ({ email: submission.data.email });
  return (
    <Form
      formioForm={LoginForm}
      name="login"
      submitApi={flattenApi.login}
      submitHook={onSubmitHook}
      successRedir="/submitted-email"
      formioOptions={{}}
    />
  );
};

export default Login;
