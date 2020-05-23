import React, { useEffect } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { Translate } from "react-redux-i18n";
import EN from "../translations/en/Auth";
import SO from "../translations/so/Auth";
import { AUTH_INITIALISING, AUTH_SUCCESS, fetchAuthState } from "./authActions";
import Loading from "../containers/Loading";
import { push } from "connected-react-router";
import { Routes } from "../config";

const Auth = ({ locale, auth, getAuthState, pushToHome }) => {
  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  if (auth.status === AUTH_INITIALISING) {
    return <Loading />;
  } else if (auth.status === AUTH_SUCCESS) {
    // TODO - be more intelligent about where to go after login
    pushToHome();
    return <Loading />;
  }

  return (
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
  getAuthState: () => dispatch(fetchAuthState()),
  pushToHome: () => dispatch(push(Routes.home)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
