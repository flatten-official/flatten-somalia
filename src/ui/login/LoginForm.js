import React from "react";
import Form from "../components/formio/Form";
import LoginFormJson from "../../forms/Login.json";
import flattenApi from "../../backend/api/api";
import { useDispatch } from "react-redux";
import backend from "../../backend/api/backend";
import { push } from "connected-react-router";
import { Routes } from "../../config";

const LoginForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const requestBody = { email: data.email };
    await backend.request({ ...flattenApi.login, data: requestBody });
    dispatch(push(Routes.emailSubmitted));
  };

  return <Form formioForm={LoginFormJson} submitHook={onSubmit} />;
};

export default LoginForm;
