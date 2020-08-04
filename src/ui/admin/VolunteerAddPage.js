import React from "react";
import Form from "../components/surveys/formio/Form";
import formSchema from "../../forms/addVolunteerForm/form.json";
import { addVolunteer } from "../../backend/volunteer/apiActions";
import { useTranslation } from "react-i18next";

const VolunteerAddPage = () => {
  const { t } = useTranslation("Admin");

  return (
    <>
      <h3>{t("addVolunteerTitle")}</h3>
      <Form formioForm={formSchema} submitHook={addVolunteer} />
    </>
  );
};

export default VolunteerAddPage;
