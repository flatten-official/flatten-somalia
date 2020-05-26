import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Form from "./Form";
import FormDef from "./VolunteerForm.json";
import { Location } from "../location/Location";
import flattenApi from "../backend/api";

const VolunteerForm = ({ consentGiven }) => {
  const { t } = useTranslation();
  const [startTime, setStartTime] = useState(0);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    setStartTime(Date.now());
  }, [setStartTime]);

  if (!location) {
    return <Location locationCallback={setLocation} />;
  }

  return (
    <div>
      <h3> {t("VolunteerForm:title")} </h3>
      <Form
        name="volunteerForm"
        submitApi={flattenApi.volunteerForm}
        successRedir="/success"
        formioForm={FormDef}
        submitHook={(submission) => {
          const endTime = Date.now();
          submission.flattenData = {
            startTime: startTime,
            endTime: endTime,
            timeToComplete: endTime - startTime,
            location,
            consentGiven,
          };
          return submission;
        }}
        formioOptions={{
          noAlerts: false,
        }}
      />
    </div>
  );
};

export default VolunteerForm;
