import React, {Component} from 'react';
import NavLink from '../../containers/NavLink';
import Login from './Login';
import Register from './Register';
import {Route} from "react-router-dom";
import {AppConfig} from '../../config';

const Auth = class extends Component {
  render() {
    return <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="panel panel-primary login-container card">
                  <div className="panel-heading card-header">
                    Login
                  </div>
                  <div className="panel-body card-body">
                    <Login />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="panel panel-primary register-container card">
                  <div className="panel-heading card-header">
                    Register
                  </div>
                  <div className="panel-body card-body">
                    <Register />
                  </div>
                </div>
              </div>
            </div>;
  }
}

export default Auth
