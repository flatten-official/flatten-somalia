import React, {Component} from 'react';
import Login from './Login';

const Auth = class extends Component {
  render() {
    return <div>
              <div className="panel-heading card-header">
                Login
              </div>
              <div className="panel-body card-body">
                <Login />
              </div>
            </div>;
  }
}

export default Auth
