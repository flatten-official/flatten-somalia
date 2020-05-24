import React from "react";
import { useTranslation } from "react-i18next";

let SubmittedEmail = () => {
  let { t } = useTranslation();
  return <h3>{t("Auth:submittedEmailMessage")}</h3>;
};

export default SubmittedEmail;
