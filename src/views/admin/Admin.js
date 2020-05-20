import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { selectRoot } from "react-formio";
import VolunteerForm from "../root/VolunteerForm";
import { FormConfig } from "../../config";

const Admin = ({ auth }) => (
  <>
    {auth.is.administrator ? (
      <>
        <h2>Welcome to the admin panel!</h2>
        <br/>
        <VolunteerForm {...FormConfig.addVolunteerForm} />
      </>
    ) : (
      <h3>Not authorised</h3>
    )}
  </>
);

Admin.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: selectRoot("auth", state),
});

export default connect(mapStateToProps)(Admin);
