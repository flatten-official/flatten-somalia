import React from "react";
import { useTranslation } from "react-i18next";

const LoginSuccess = () => {
  const { t } = useTranslation("Login");
  return <h3>{t("submittedEmailMessage")}</h3>;
};

export default LoginSuccess;
