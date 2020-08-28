import React from "react";
import { useTranslation } from "react-i18next";
import LoginSuccess from "./LoginSuccess";
import endpoints from "../../../api/endpoints";
import Form from "../../components/formio/Form";
import LoginFormJson from "../../../formDefinitions/others/Login.json";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import { UNAUTHENTICATED_CONTEXT } from "../../auth/authActions";

const WarningModal = () => {
  const { t } = useTranslation("Login");

  const context = useSelector((state) => state.auth.unauthenticatedContext);

  switch (context) {
    case UNAUTHENTICATED_CONTEXT.failedRequest:
      return (
        <Modal
          header={t("failedToConnectModal.header")}
          body={t("failedToConnectModal.body")}
        />
      );
    case UNAUTHENTICATED_CONTEXT.badCookie:
      return (
        <Modal
          header={t("badCookieModal.header")}
          body={t("badCookieModal.body")}
        />
      );
    case UNAUTHENTICATED_CONTEXT.expireSoon:
      return (
        <Modal header={t("expireModal.header")} body={t("expireModal.body")} />
      );
    case UNAUTHENTICATED_CONTEXT.initialPageLoad:
    case UNAUTHENTICATED_CONTEXT.userDecision:
    default:
      return null;
  }
};

const Login = () => {
  const { t } = useTranslation("Login");

  const onSubmit = async (data) => {
    await endpoints.login(data.email);
  };

  return (
    <>
      <WarningModal />
      <div className="panel-heading card-header"> {t("loginForm.title")} </div>
      <div className="panel-body card-body">
        <Form
          formioForm={LoginFormJson}
          submitHook={onSubmit}
          SuccessPage={LoginSuccess}
        />
      </div>
    </>
  );
};

export default Login;
