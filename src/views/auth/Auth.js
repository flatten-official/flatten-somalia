import React from "react";
import { useTranslation } from 'react-i18next';
import Login from "./Login";
const Auth = () => {
  let { t, i18n } = useTranslation()

  return (
    <div>
      <div className="panel-heading card-header"> {t('Auth:loginForm.title')} </div>
      <div className="panel-body card-body">
        <Login options={{ language: i18n.language, i18n }}/>
      </div>
    </div>
  );
};

export default Auth;
