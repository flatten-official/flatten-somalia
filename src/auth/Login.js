import React from "react";
import Form from "../form/Form";
import LoginForm from "./Login.json";
import flattenApi from "../backend/api";
import { useDispatch } from "react-redux";
import backend from "../backend/backend";
import { push } from "connected-react-router";

const Login = () => {
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const requestBody = { email: data.email };
    await backend.request({ ...flattenApi.login, data: requestBody });
    dispatch(push("/submitted-email"));
  };

  return <Form formioForm={LoginForm} submitHook={onSubmit} />;
};

export default Login;
