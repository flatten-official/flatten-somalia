import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "./actions";
import { LocationPicker } from "./elements/location/LocationPicker";
import Form from "../components/formio/Form";
import FormDef from "../../forms/VolunteerForm.json";
import { push } from "connected-react-router";
import { Consent } from "./elements/Consent";
import { submitForm } from "../../backend/submission";

const SubmissionPageContent = () => {
  const formData = useSelector((state) => state.volunteerForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: Types.RESTART_FORM });
  }, [dispatch]);

  if (!formData.consent) return <Consent />;

  if (!formData.location) return <LocationPicker />;

  const submitHook = async (formioData) => {
    await submitForm(formData, formioData);
    dispatch(push("/success"));
  };

  return (
    <Form
      formioForm={FormDef}
      submitHook={submitHook}
      formioOptions={{ noAlerts: false }}
    />
  );
};

const SubmissionPage = () => {
  const { t } = useTranslation("InitialSurvey");

  return (
    <>
      <h3 className="submissionPageTitle"> {t("title")} </h3>
      <SubmissionPageContent />
    </>
  );
};

export default SubmissionPage;
