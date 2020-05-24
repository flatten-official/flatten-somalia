import React, { useEffect } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { AUTH_SUCCESS } from "./authActions";
import { push } from "connected-react-router";
import { Routes } from "../config";
import { useTranslation } from "react-i18next";

const Auth = ({ auth, pushToHome }) => {
  let { t } = useTranslation()

  if (auth.status === AUTH_SUCCESS) {
    pushToHome();
  }

  return (
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