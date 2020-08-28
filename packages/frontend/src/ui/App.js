import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./home/Home";
import Login from "./login/Login";
import Loading from "./components/Loading";
import { Routes, Surveys } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { permissions } from "../backend/auth/authApi";
import { fetchAuthState } from "../backend/auth/authActions";
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
        {makeSurveyRoute(Surveys.initialBRA)}

        <Redirect from="*" to={Routes.home} />
      </Switch>
    </div>
  );
};

const AppContent = () => {
  const dispatch = useDispatch();
<<<<<<< HEAD:packages/frontend/src/ui/App.js
  const authState = useSelector((state) => state.auth.state);
=======
  const authUser = useSelector((state) => state.auth.user);
>>>>>>> 8097dac... Simplify auth and add modal code:src/ui/App.js

  // On first load, get the app state
  useEffect(() => {
    dispatch(fetchAuthState());
  }, [dispatch]);

  if (authUser === undefined) return <Loading />;
  else if (authUser === null) return <Login />;
  else return <AuthenticatedAppContent />;
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
