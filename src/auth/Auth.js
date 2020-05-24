import React, { useEffect } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { AUTH_SUCCESS } from "./authActions";
import Loading from "../containers/Loading";
import { Redirect } from "react-router-dom";
import { push } from "connected-react-router";
import { Routes } from "../config";
import { useTranslation } from "react-i18next";

const Auth = ({ locale, auth, pushToHome }) => {
  let { t } = useTranslation()
  return auth.status == AUTH_SUCCESS ? (
    <Redirect to="/" />
  ) : (
    <div>
      <div className="panel-heading card-header">
        {" "} {t('Auth:loginForm.title')} {" "}
      </div>
      <div className="panel-body card-body">
        <Login/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  pushToHome: () => dispatch(push(Routes.home)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);