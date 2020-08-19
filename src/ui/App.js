import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Loading from "./components/Loading";
import { Routes, Surveys } from "../config";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH_AUTHENTICATED,
  AUTH_UNINITIALISED,
  fetchAuthState,
  UNAUTHENTICATED_CONTEXT,
} from "./auth/actions";
import SurveyPageFactory from "./pages/surveys/SurveyPageFactory";
import PrivatePage from "./components/PrivatePage";
import AddVolunteerPage from "./pages/admin/AddVolunteerPage";
import AdminPage from "./pages/admin/AdminPage";
import { Permissions } from "../api/constants";

const AuthenticatedAppContent = () => {
  const getHomePageRoute = () => (
    <Route
      exact
      path={Routes.home}
      render={() => (
        <PrivatePage requiredPermission={Permissions.submitForms} comp={Home} />
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
      Permissions.submitForms
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
          AddVolunteerPage,
          Permissions.manageVolunteers
        )}
        {makePrivateRoute(
          Routes.admin,
          AdminPage,
          Permissions.manageVolunteers
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
