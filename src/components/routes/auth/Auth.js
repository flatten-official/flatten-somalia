import React from "react";
import Login from "./Login";
import { useTranslation } from "react-i18next";

import FormTranslations from "../../../translations/Form.json";

const Auth = () => {
  const { t, i18n } = useTranslation("Login");
  return (
    <div>
      <div className="panel-heading card-header">{t("Login")}</div>
      <div className="panel-body card-body">
        <Login options={{ language: i18n.language, i18n: FormTranslations }} />
      </div>
    </div>
  );
};

export default Auth;
