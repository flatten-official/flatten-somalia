import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {selectRoot} from "react-formio";
import VolunteerForm from "../Form/VolunteerForm"
import {FormConfig} from '../../config'

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
                    <div> Welcome to the admin panel!
                        <VolunteerForm {...FormConfig.addVolunteerForm} />
                    </div>
                    : <div> Not authorised </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: selectRoot('auth', state)
});

export default connect(mapStateToProps)(Admin)