import React from "react";
import { Route } from "react-router-dom";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Home from "./routes/root/Home";
import Auth from "./routes/auth/Auth";
import Admin from "./routes/admin/Admin";
import Success from "./routes/sucess/Success";
import SubmittedEmail from "./routes/submitted-email/SubmittedEmail";

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
