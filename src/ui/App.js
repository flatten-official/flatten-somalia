import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./home/Home";
import Login from "./login/Login";
import SubmissionPageContent from "./initialSurvey/SubmissionPage";
import Success from "./initialSurvey/Success";
import LoginSuccess from "./login/LoginSuccess";
import Loading from "./components/Loading";
import { Routes } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { permissions } from "../backend/auth/authApi";
import {
  fetchAuthState,
  AUTH_UNINITIALISED,
} from "../backend/auth/authActions";

const AppContent = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAuthState());
  }, [dispatch]);

  if (auth.status === AUTH_UNINITIALISED) return <Loading />;

  return (
    <center><div className="container" id="main">
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
        <Route path={Routes.auth} component={Login} />
        <Route path={Routes.success} component={Success} />
        <Route path={Routes.emailSubmitted} component={LoginSuccess} />
      </div>
    </center>
  );
};

const App = () => (
  <div className="app">
    <Header />
    <div className="appContent">
      <AppContent />
    </div>
    <Footer />
  </div>
);

export default App;
