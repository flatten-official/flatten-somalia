import React from "react";
import { useTranslation } from "react-i18next";

const SubmittedEmail = () => {
  const { t } = useTranslation();
  return <h3>{t("Auth:submittedEmailMessage")}</h3>;
};

export default SubmittedEmail;
