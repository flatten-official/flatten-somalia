import React, {Component} from 'react';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';
import { selectRoot } from "react-formio";

const Admin = class extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };


  render() {
    const {auth} = this.props;
    let isAdmin = (auth.is.hasOwnProperty('administrator') && auth.is.administrator)
    return (
        <div>
            {isAdmin ? 
            <div> Welcome to the admin panel! </div>
            : <div> Not authorised </div>}
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
)(Admin)