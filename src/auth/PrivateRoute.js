import React from "react";
import { AUTH_SUCCESS } from "./authActions";
import { hasPermission } from "./authApi";
import { Routes } from "../config";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function PrivateRoute({ requiredPermission, comp: Component, ...rest }) {
  const auth = useSelector((state) => state.auth);
  const authed = hasPermission(auth, requiredPermission);
  const { t } = useTranslation("Admin");
  // if logged in but without the right permission to use this page
  if (!authed && auth.state === AUTH_SUCCESS) {
    return <div>{t("unauthorized")}</div>;
  }
  return (
    <Route
      {...rest}
      render={() =>
        authed ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: Routes.auth,
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
