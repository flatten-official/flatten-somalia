import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Form from "../backend/Form";
import FormDef from "./VolunteerForm.json";
import Location from "../location/Location";
import { LOCATION_SUCCESS } from "../location/locationActions";
import flattenApi from "../backend/api";

const VolunteerForm = ({ location, locale }) => {
  let { t } = useTranslation();

  if (!(location.status === LOCATION_SUCCESS)) {
    return <Location />;
  }

  return (
    <div>
      <h3> {t("VolunteerForm:title")} </h3>
      {/* <Errors errors={errors} /> */}
      <Form
        name="volunteerForm"
        submitApi={flattenApi.volunteerForm}
        successRedir="/success"
        formioForm={FormDef}
        formioOptions={{
          noAlerts: false,
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    location: state.location,
  };
};

export default connect(mapStateToProps)(VolunteerForm);
