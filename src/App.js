import React from "react";
import { Route } from "react-router-dom";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Home from "./root/Home";
import Auth from "./auth/Auth";
import Admin from "./admin/Admin";
import Success from "./form/Success";
import SubmittedEmail from "./auth/SubmittedEmail";
import { Routes } from "./config";

const App = () => (
  <>
    <Header />

    <div className="container" id="main">
      <Route exact path={Routes.home} component={Home} />
      <Route exact path={Routes.admin} component={Admin} />
      <Route path={Routes.auth} component={Auth} />
      <Route path="/success" component={Success} />
      <Route path="/submitted-email" component={SubmittedEmail} />
    </div>

    <Footer />
  </>
);

export default App;
