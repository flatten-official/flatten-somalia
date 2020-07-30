import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginSuccess from "./LoginSuccess";
import backend from "../../backend/api/backend";
import flattenApi from "../../backend/api/api";
import Form from "../components/surveys/formio/Form";
import LoginFormJson from "../../forms/Login.json";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";
import { UNAUTHENTICATED_CONTEXT } from "../../backend/auth/authActions";

const DisconnectedModal = () => {
  const { t } = useTranslation("Login");

  const context = useSelector((state) => state.auth.unauthenticatedContext);

  switch (context) {
    case UNAUTHENTICATED_CONTEXT.failedRequest:
      return (
        <Modal
          header={t("failedToConnect.header")}
          body={t("failedToConnect.body")}
        />
      );
    case UNAUTHENTICATED_CONTEXT.badCookie:
      return (
        <Modal
          header={t("disconnectedModal.header")}
          body={t("disconnectedModal.body")}
        />
      );
    case UNAUTHENTICATED_CONTEXT.expireSoon:
      return <Modal header={t("expire.header")} body={t("expire.body")} />;
    case UNAUTHENTICATED_CONTEXT.pageLoad:
    case UNAUTHENTICATED_CONTEXT.userDecision:
    default:
      return null;
  }
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
