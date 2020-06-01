import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Home from "./root/Home";
import Auth from "./auth/Auth";
import Admin from "./admin/Admin";
import SubmissionPageContent from "./form/SubmissionPage";
import Success from "./form/Success";
import SubmittedEmail from "./auth/SubmittedEmail";
import Loading from "./containers/Loading";
import { Routes } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { permissions } from "./auth/authApi";
import {
  fetchAuthState,
  AUTH_INITIALISING,
  AUTH_UNINITIALISED,
} from "./auth/authActions";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAuthState());
  }, [dispatch]);

  return (
    <>
      <Header />

      {auth.status === AUTH_INITIALISING ||
      auth.status === AUTH_UNINITIALISED ? (
        <Loading />
      ) : (
        <div className="container" id="main">
          <PrivateRoute
            exact
            path={Routes.home}
            comp={Home}
            requiredPermission={permissions.submitForms}
          />
          <PrivateRoute
            exact
            path={Routes.submission}
            comp={SubmissionPageContent}
            requiredPermission={permissions.submitForms}
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

export default App;
