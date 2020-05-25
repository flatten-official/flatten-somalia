import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import { AUTH_SUCCESS } from "./authActions";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Auth = () => {
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);
  return auth.status === AUTH_SUCCESS ? (
    <Redirect to="/" />
  ) : (
    <div>
      <div className="panel-heading card-header">
        {" "}
        {t("Auth:loginForm.title")}{" "}
      </div>
      <div className="panel-body card-body">
        <Login />
      </div>
    </div>
  );
};

export default Auth;
