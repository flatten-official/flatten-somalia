import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import { AUTH_SUCCESS } from "../../backend/auth/authActions";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation("Login");
  const auth = useSelector((state) => state.auth);
  return auth.status === AUTH_SUCCESS ? (
    <Redirect to="/" />
  ) : (
    <div>
      <div className="panel-heading card-header"> {t("loginForm.title")} </div>
      <div className="panel-body card-body">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
