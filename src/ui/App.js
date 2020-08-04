import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./home/Home";
import Login from "./login/Login";
import Loading from "./components/Loading";
import AdminPanel from "./admin/AdminPanel";
import { Routes, Surveys } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { permissions } from "../backend/auth/authApi";
import {
  AUTH_AUTHENTICATED,
  AUTH_UNINITIALISED,
  fetchAuthState,
  UNAUTHENTICATED_CONTEXT,
} from "../backend/auth/authActions";
import SurveyPageFactory from "./surveys/SurveyPageFactory";
import PrivatePage from "./components/PrivatePage";

const AuthenticatedAppContent = () => {
  const getHomePageRoute = () => (
    <Route
      exact
      path={Routes.home}
      render={() => (
        <PrivatePage requiredPermission={permissions.submitForms} comp={Home} />
      )}
    />
  );

  const makePrivateRoute = (path, comp, requiredPermission) => (
    <Route
      exact
      path={path}
      render={() => (
        <PrivatePage comp={comp} requiredPermission={requiredPermission} />
      )}
    />
  );

  const makeSurveyRoute = (survey) =>
    makePrivateRoute(
      survey.route,
      SurveyPageFactory(survey),
      permissions.submitForms
    );

  return (
    <div className="container" id="main">
      <Switch>
        {getHomePageRoute()}
        {makeSurveyRoute(Surveys.initialHousehold)}
        {makeSurveyRoute(Surveys.gravedigger)}
        {makeSurveyRoute(Surveys.hospital)}
        {makePrivateRoute(
          Routes.addVolunteer,
          SurveyPageFactory(Surveys.addVolunteer),
          permissions.manageVolunteers
        )}
        {makePrivateRoute(
          Routes.admin,
          AdminPanel,
          permissions.manageVolunteers
        )}

        <Redirect from="*" to={Routes.home} />
      </Switch>
    </div>
  );
};

const AppContent = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.state);

  // On first load, get the auth state
  useEffect(() => {
    dispatch(fetchAuthState(UNAUTHENTICATED_CONTEXT.initialPageLoad, true));
  }, [dispatch]);

  switch (authState) {
    case AUTH_UNINITIALISED:
      return <Loading />;
    case AUTH_AUTHENTICATED:
      return <AuthenticatedAppContent />;
    default:
      return <Login />;
  }
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
