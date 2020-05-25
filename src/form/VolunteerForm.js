import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Form from "./Form";
import FormDef from "./VolunteerForm.json";
import Location from "../location/Location";
import { LOCATION_SUCCESS } from "../location/locationActions";
import flattenApi from "../backend/api";

const VolunteerForm = ({ consentGiven }) => {
  let { t } = useTranslation();
  let location = useSelector(state=>state.location);
  let [startTime, setStartTime] = useState(0);
  useEffect(() => {setStartTime(Date.UTC())}, [setStartTime]);

  if (!(location.status === LOCATION_SUCCESS)) {
    return <Location />;
  }

  return (
    <div>
      <h3> {t("VolunteerForm:title")} </h3>
      <Form
        name="volunteerForm"
        submitApi={flattenApi.volunteerForm}
        successRedir="/success"
        formioForm={FormDef}
        submitHook={(submission)=> {
          let endTime = Date.UTC();
          submission.flattenData = {
            startTime: startTime,
            endTime: endTime,
            timeToComplete: endTime - startTime,
            location: location.location,
            consentGiven
          }
        }}
        formioOptions={{
          noAlerts: false,
        }}
      />
    </div>
  );
};

export default VolunteerForm;
