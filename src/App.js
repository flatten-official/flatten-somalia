import React from "react";
import { Route } from "react-router-dom";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Home from "./views/root/Home";
import Auth from "./views/auth/Auth";
import Admin from "./views/admin/Admin";
import Success from "./views/sucess/Success";
import SubmittedEmail from "./views/submitted-email/SubmittedEmail";

const App = () => (
  <>
    <Header />

    <div className="container" id="main">
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/success" component={Success} />
      <Route path="/submitted-email" component={SubmittedEmail} />
    </div>

    <Footer />
  </>
);

export default App;
