import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./commonComponents/app/Header";
import Footer from "./commonComponents/app/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Loading from "./commonComponents/app/Loading";
import { Routes, Surveys } from "../config";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH_AUTHENTICATED,
  AUTH_UNINITIALISED,
  fetchAuthState,
  UNAUTHENTICATED_CONTEXT,
} from "./appActions";
import SurveyPageFactory from "./pages/surveys/SurveyPageFactory";
import PrivatePageWrapper from "./pages/PrivatePageWrapper";
import AddVolunteerPage from "./pages/admin/AddVolunteerPage";
import AdminPage from "./pages/admin/AdminPage";
import { Permissions } from "util-shared-constants";

const AuthenticatedAppContent = () => {
  const getHomePageRoute = () => (
    <Route
      exact
      path={Routes.home}
      render={() => (
        <PrivatePageWrapper
          requiredPermission={Permissions.submitForms}
          comp={Home}
        />
      )}
    />
  );

  const makePrivateRoute = (path, comp, requiredPermission, key) => (
    <Route
      exact
      path={path}
      render={() => (
        <PrivatePageWrapper
          comp={comp}
          requiredPermission={requiredPermission}
          key={key}
        />
      )}
    />
  );

  const makeSurveyRoute = (survey) =>
    makePrivateRoute(
      Routes.surveyPrefix + survey.key,
      SurveyPageFactory(survey),
      Permissions.submitForms,
      survey.key
    );

  return (
    <div className="container" id="main">
      <Switch>
        {getHomePageRoute()}
        {
          // Make a route for each survey
          Object.values(Surveys).map((survey) => makeSurveyRoute(survey))
        }
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
