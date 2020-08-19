import React from "react";
import Form from "../../components/formio/Form";
import formSchema from "../../../formDefinitions/misc/addVolunteer.json";
import endpoints from "../../../api/endpoints";
import { useTranslation } from "react-i18next";

const AddVolunteerPage = () => {
  const { t } = useTranslation("Admin");

  return (
    <>
      <h3>{t("addVolunteerTitle")}</h3>
      <Form formioForm={formSchema} submitHook={endpoints.addVolunteer} />
    </>
  );
};

export default AddVolunteerPage;
