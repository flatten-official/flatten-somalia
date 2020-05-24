import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Home from "./root/Home";
import Auth from "./auth/Auth";
import Admin from "./admin/Admin";
import SubmissionPage from "./form/SubmissionPage"
import Success from "./form/Success";
import SubmittedEmail from "./auth/SubmittedEmail";
import Loading from "./containers/Loading";
import { Routes } from "./config";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
  AUTH_INITIALISING,
  fetchAuthState,
  AUTH_SUCCESS,
  AUTH_UNINITIALISED,
} from "./auth/authActions";

const App = ({ getAuthState, auth }) => {
  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  return (
    <>
      <Header />

      {auth.status == AUTH_INITIALISING || auth.status == AUTH_UNINITIALISED ? (
        <Loading />
      ) : (
        <div className="container" id="main">
          <PrivateRoute
            exact
            path={Routes.home}
            comp={Home}
            requiredPermission="submitForms"
          />
          <PrivateRoute
            exact
            path={Routes.submission}
            comp={SubmissionPage}
            requiredPermission="submitForms"
          />
          <Route exact path={Routes.admin} component={Admin} />
          <Route path={Routes.auth} component={Auth} />
          <Route path="/success" component={Success} />
          <Route path="/submitted-email" component={SubmittedEmail} />
        </div>
      )}

      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthState: () => dispatch(fetchAuthState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
