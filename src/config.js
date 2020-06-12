import api from "./backend/api/api";
import graveDiggerSurveyJSON from "./forms/GraveDiggerForm.json";
import hospitalSurveyJSON from "./forms/HospitalForm.json";
import initialHouseholdJSON from "./forms/VolunteerForm.json";
import {
  defaultSurveySubmitterFactory,
  getInitialHouseholdSubmitter,
} from "./backend/submission";

// todo - fill in all of the routes
export const Routes = {
  home: "/",
  auth: "/login",
  initialHouseholdSurvey: "/surveys/initialHousehold",
  gravediggerSurvey: "/surveys/gravedigger",
  hospitalSurvey: "/surveys/hospital",
  admin: "/admin",
  success: "/success",
  emailSubmitted: "/submitted-email",
};

const Schemas = {
  gravedigger: {
    form: "gravediggerSurvey",
    version: "1.0.0",
  },
  hospital: {
    form: "hospitalSurvey",
    version: "1.0.0",
  },
  initialHousehold: {
    form: "initialSurvey",
    version: "1.0.3",
  },
};

export const Surveys = {
  gravedigger: {
    surveyKey: "graveDigger",
    i18nTitleKey: "graveDiggerTitle",
    api: api.graveDiggerSurvey,
    formIOJSON: graveDiggerSurveyJSON,
    onSubmit: defaultSurveySubmitterFactory(
      api.graveDiggerSurvey,
      Schemas.gravedigger
    ),
  },
  hospital: {
    surveyKey: "hospital",
    i18nTitleKey: "hospitalTitle",
    api: api.hospitalSurvey,
    formIOJSON: hospitalSurveyJSON,
    onSubmit: defaultSurveySubmitterFactory(
      api.hospitalSurvey,
      Schemas.hospital
    ),
  },
  initialHousehold: {
    surveyKey: "initialHousehold",
    i18nTitleKey: "initialHouseholdTitle",
    api: api.volunteerForm,
    formIOJSON: initialHouseholdJSON,
    onSubmit: getInitialHouseholdSubmitter(Schemas.initialHousehold),
  },
};
