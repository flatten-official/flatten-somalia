import React from "react";
import Form from "../../components/formio/Form";
import formSchema from "../../../formDefinitions/others/addVolunteer.json";
import endpoints from "../../../api/endpoints";

const AddVolunteer = () => {
  const onSubmit = async (formIoData) => {
    await endpoints.addVolunteer(formIoData);
  };

  return <Form formioForm={formSchema} submitHook={onSubmit} />;
};

export default AddVolunteer;
