import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginSuccess from "./LoginSuccess";
import backend from "../../backend/api/backend";
import flattenApi from "../../backend/api/api";
import Form from "../components/surveys/formio/Form";
import LoginFormJson from "../../forms/Login.json";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";

const DisconnectedModal = () => {
  const { t } = useTranslation("Login");

  const expectAuthenticated = useSelector(
    (state) => state.auth.expectAuthenticated
  );

  return (
    <Modal
      show={expectAuthenticated}
      header={t("disconnectedModal.header")}
      body={t("disconnectedModal.body")}
    />
  );
};

const Login = () => {
  const { t } = useTranslation("Login");
  const [didSubmit, setDidSubmit] = useState(false);

  if (didSubmit) return <LoginSuccess />;

  const onSubmit = async (data) => {
    await backend.request({ ...flattenApi.login, data: { email: data.email } });
    setDidSubmit(true);
  };

  return (
    <>
      <DisconnectedModal />
      <div className="panel-heading card-header"> {t("loginForm.title")} </div>
      <div className="panel-body card-body">
        <Form formioForm={LoginFormJson} submitHook={onSubmit} />
      </div>
    </>
  );
};

export default Login;
