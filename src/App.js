import React from 'react'
import { Route } from 'react-router-dom'
import Header from './containers/Header'
import Footer from './containers/Footer'
import Home from './views/Home'
import Auth from './views/Auth/Auth'
import Admin from './views/Admin/Admin'
import Success from './views/Form/Success'
import { AppConfig } from './config';

const App = () => (
  <div>
    <Header />

    <div className="container" id="main">
      { AppConfig.projectUrl === 'https://reactstarter.form.io' ?
        <div className="alert alert-warning">This app is still configured to use the default project. Be sure to create your own project in form.io and change the PROJECT_URL in src/config.js</div>
        : null
      }
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/success" component={Success} />
    </div>

    <Footer />
  </div>
)

export default App
