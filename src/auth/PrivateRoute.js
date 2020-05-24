import React from "react";
import { AUTH_SUCCESS } from "./authActions";
import { hasPermission } from "./authApi";
import { Routes } from "../config";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ auth, requiredPermission, comp: Component, ...rest }) {
  let authed = hasPermission(auth, requiredPermission);
  // if logged in but without the right permission to use this page
  if (!authed && auth.state === AUTH_SUCCESS) {
    return <div>Unauthorised.</div>;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
