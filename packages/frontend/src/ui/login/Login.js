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

const contextToModalTranslationMapping = {
  [UNAUTHENTICATED_CONTEXT.failedRequest]: "failedToConnectModal",
  [UNAUTHENTICATED_CONTEXT.badCookie]: "badCookieModal",
  [UNAUTHENTICATED_CONTEXT.expireSoon]: "expireModal",
};

const WarningModal = () => {
  const { t } = useTranslation("Login");

  // Get the context (reason) for why we're unauthenticated
  const context = useSelector((state) => state.auth.unauthenticatedContext);

  // Get the mapping to the appropriate modal (if any)
  const prefix = contextToModalTranslationMapping[context];

  // Not all contexts have a modal
  if (!prefix) return null;

  // If the context requires a modal return the modal
  return <Modal header={t(prefix + ".header")} body={t(prefix + ".body")} />;
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
      <WarningModal />
      <div className="panel-heading card-header"> {t("loginForm.title")} </div>
      <div className="panel-body card-body">
        <Form formioForm={LoginFormJson} submitHook={onSubmit} />
      </div>
    </>
  );
};

export default Login;
