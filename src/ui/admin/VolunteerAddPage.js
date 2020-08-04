import React from "react";
import Form from "../components/surveys/formio/Form";
import formSchema from "../../forms/addVolunteerForm/form.json";
import endpoints from "../../backend/api/endpoints";

const VolunteerAddPage = () => {
  const onSubmit = async (formIoData) => {
    await endpoints.addVolunteer(formIoData);
  };

  return <Form formioForm={formSchema} submitHook={onSubmit} />;
};

export default VolunteerAddPage;
