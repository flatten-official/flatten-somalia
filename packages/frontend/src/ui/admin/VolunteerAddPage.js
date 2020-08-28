import React from "react";
import Form from "../components/surveys/formio/Form";
import formSchema from "../../formDefinitions/addVolunteer/form.json";
import addVolunteer from "../../backend/volunteer/addVolunteer";

const VolunteerAddPage = () => {
  const onSubmit = async (formIoData) => {
    await addVolunteer(formIoData);
  };

  return <Form formioForm={formSchema} submitHook={onSubmit} />;
};

export default VolunteerAddPage;
