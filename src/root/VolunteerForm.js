import React from "react";
import { connect } from "react-redux";
import Form from "../backend/Form";
import FormDef from "./VolunteerForm.json";
import { Translate } from "react-redux-i18n";
import EN from "../translations/en/VolunteerForm";
import SO from "../translations/so/VolunteerForm";
import { PropTypes } from "prop-types";
import Location from "../location/Location";
import { LOCATION_SUCCESS } from "../location/locationActions";
import flattenApi from "../backend/api";

const VolunteerForm = ({ location, locale }) => {
  if (!(location.status === LOCATION_SUCCESS)) {
    return <Location />;
  }

  return (
    <div>
      <h3>
        {" "}
        <Translate value={"VolunteerForm.title"} />{" "}
      </h3>
      {/* <Errors errors={errors} /> */}
      <Form
        name="volunteerForm"
        submitApi={flattenApi.volunteerForm}
        successRedir="/success"
        formioForm={FormDef}
        formioOptions={{
          noAlerts: false,
          language: locale,
          i18n: {
            en: EN,
            so: SO,
          },
        }}
      />
    </div>
  );
};

VolunteerForm.propTypes = {
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    location: state.location,
    locale: state.i18n.locale,
  };
};

export default connect(mapStateToProps)(VolunteerForm);
