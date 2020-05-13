import React from "react";
import { Route } from "react-router-dom";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Home from "./views/Home";
import Auth from "./views/Auth/Auth";
import Admin from "./views/Admin/Admin";
import Success from "./views/Form/Success";
import SubmittedEmail from "./views/Auth/SubmittedEmail";

const App = () => (
  <div>
    <Header />

    <div className="container" id="main">
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/success" component={Success} />
      <Route path="/submitted-email" component={SubmittedEmail} />
    </div>

    <Footer />
  </div>
);

export default App;
