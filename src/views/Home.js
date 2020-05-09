import React, {Component} from 'react';
import { connect, createSelectorHook } from 'react-redux';
import {PropTypes} from 'prop-types';
import VolunteerForm from './Form/VolunteerForm'
import Auth from './Auth/Auth'
import { selectRoot, auth} from "react-formio";

const checkRole = (auth, role) => {
  console.log(auth);
  try {
    let id = auth.roles[role]._id;
    let index = auth.user.roles.indexOf(id);
    console.log(index);
    return index > -1;
  } catch{
    return false;
  }
}

const Home = class extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const {auth} = this.props;
    return (
      <div>
        { auth.authenticated ? (
          <div className="well text-center">
            { (auth.user && auth.user.data) ?
              (
                <div>
                  <h3>
                    You are logged in as&nbsp;
                    <strong>{ auth.user.data.email }</strong>
                    !
                  </h3>
                <VolunteerForm />
                </div>
              ) : null
            }
          </div>) :
          <Auth />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: selectRoot('auth', state)
  }
}

const mapDispatchToProps = () => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
