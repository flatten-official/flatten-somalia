import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./home/Home";
import Login from "./login/Login";
import LoginSuccess from "./login/LoginSuccess";
import Loading from "./components/Loading";
import { Routes, Surveys } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { permissions } from "../backend/auth/authApi";
import {
  AUTH_AUTHENTICATED,
  AUTH_UNAUTHENTICATED,
  AUTH_UNINITIALISED,
  fetchAuthState,
} from "../backend/auth/authActions";
import SurveyPageFactory from "./surveys/SurveyPageFactory";
import { PrivatePage, PageNotFound } from "./components/BasicPages";

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

  const makeSurveyRoute = (survey) => (
    <Route
      exact
      path={survey.route}
      render={() => (
        <PrivatePage
          comp={SurveyPageFactory(survey)}
          requiredPermission={permissions.submitForms}
        />
      )}
    />
  );

  return (
    <div className="container" id="main">
      <Switch>
        {getHomePageRoute()}
        {makeSurveyRoute(Surveys.initialHousehold)}
        {makeSurveyRoute(Surveys.gravedigger)}
        {makeSurveyRoute(Surveys.hospital)}

        <Route render={() => <PageNotFound />} />
      </Switch>
    </div>
  );
};

const AppContent = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.status);

  // On first load, get the app state
  useEffect(() => {
    dispatch(fetchAuthState());
  }, [dispatch]);

  switch (authState) {
    case AUTH_UNINITIALISED:
      return <Loading />;
    case AUTH_UNAUTHENTICATED:
      return <Login />;
    case AUTH_AUTHENTICATED:
      return <AuthenticatedAppContent />;
    default:
      return <PageNotFound />;
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
