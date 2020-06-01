import React from "react";
import { useTranslation } from "react-i18next";

const SubmittedEmail = () => {
  const { t } = useTranslation("Auth");
  return <h3>{t("submittedEmailMessage")}</h3>;
};

export default SubmittedEmail;
