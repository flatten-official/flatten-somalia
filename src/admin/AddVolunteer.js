import React from "react";
import { useTranslation } from "react-i18next";
import Form from "../form/Form";
import FormDef from "./AddVolunteer.json";
import flattenApi from "../backend/api";

const VolunteerForm = () => {
  const { t } = useTranslation("VolunteerForm");

  // TODO - fix translations here
  // TODO - add proper success redir route
  return (
    <div>
      <h3> {t("title")} </h3>
      <Form
        name="addVolunteeerForm"
        submitApi={flattenApi.addVolunteer}
        successRedir="/done"
        formioForm={FormDef}
        formioOptions={{
          noAlerts: false,
        }}
      />
    </div>
  );
};

export default VolunteerForm;
