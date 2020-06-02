import React from "react";
import { AUTH_SUCCESS } from "../../backend/auth/authActions";
import { hasPermission } from "../../backend/auth/authApi";
import { Routes } from "../../config";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function PrivateRoute({ requiredPermission, comp: Component, ...rest }) {
  const auth = useSelector((state) => state.auth);
  const authed = hasPermission(auth, requiredPermission);
  const { t } = useTranslation("Admin");

  if (authed) return <Route render={() => <Component />} {...rest} />;
  else {
    // if logged in but without the right permission to use this page
    if (auth.state === AUTH_SUCCESS) return <div>{t("unauthorized")}</div>;
    else
      return (
        <Route
          render={() => <Redirect to={{ pathname: Routes.auth }} />}
          {...rest}
        />
      );
  }
}

export default PrivateRoute;
