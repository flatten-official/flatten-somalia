import React, { useEffect } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { Translate } from "react-redux-i18n";
import EN from "../translations/en/Auth";
import SO from "../translations/so/Auth";
import { AUTH_SUCCESS } from "./authActions";
import Loading from "../containers/Loading";
import { Route, Redirect } from "react-router-dom";
import { push } from "connected-react-router";
import { Routes } from "../config";

const Auth = ({ locale, auth, pushToHome }) => {
  return auth.status == AUTH_SUCCESS ? (
    <Redirect to="/" />
  ) : (
    <div>
      <div className="panel-heading card-header">
        {" "}
        <Translate value="Auth.loginForm.title" />{" "}
      </div>
      <div className="panel-body card-body">
        <Login
          options={{
            language: locale,
            i18n: { en: EN.loginForm, so: SO.loginForm },
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  locale: state.i18n.locale,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  pushToHome: () => dispatch(push(Routes.home)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
