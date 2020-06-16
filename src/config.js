import api from "./backend/api/api";
import graveDiggerSurveyJSON from "./forms/gravedigger/form.json";
import hospitalSurveyJSON from "./forms/hospital/form.json";
import initialHouseholdJSON from "./forms/initialHousehold/form.json";
import addVolunteerJSON from "./forms/addVolunteerForm/form.json";
import {
  defaultSurveySubmitterFactory,
  getInitialHouseholdSubmitter,
} from "./backend/submission";

export const Routes = {
  home: "/",
  auth: "/login",
  initialHouseholdSurvey: "/surveys/initialHousehold",
  gravediggerSurvey: "/surveys/gravedigger",
  hospitalSurvey: "/surveys/hospital",
  addVolunteer: "/surveys/addVolunteer",
  admin: "/admin",
  emailSubmitted: "/submitted-email",
};

const Schemas = {
  gravedigger: {
    form: "gravediggerSurvey",
    version: "1.0.0",
  },
  hospital: {
    form: "hospitalSurvey",
    version: "0.1.0",
  },
  initialHousehold: {
    form: "initialSurvey",
    version: "1.0.3",
  },
  addVolunteer: {
    form: "initialSurvey",
    version: "1.0.0",
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
    options: {
      enableManualLocation: false,
    },
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
    options: {
      enableManualLocation: true,
    },
  },
  initialHousehold: {
    surveyKey: "initialHousehold",
    i18nTitleKey: "initialHouseholdTitle",
    api: api.volunteerForm,
    formIOJSON: initialHouseholdJSON,
    onSubmit: getInitialHouseholdSubmitter(Schemas.initialHousehold),
    options: {
      enableManualLocation: true,
    },
  },
  addVolunteer: {
    surveyKey: "addVolunteer",
    i18nTitleKey: "addVolunteerTitle",
    api: api.addVolunteer,
    formIOJSON: addVolunteerJSON,
    onSubmit: defaultSurveySubmitterFactory(
      api.addVolunteer,
      Schemas.addVolunteer
    ),
    options: {
      getLocation: false,
      getConsent: false,
    }
  },
};
