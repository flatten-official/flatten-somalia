import api from "./backend/api/api";
import graveDiggerSurveyJSON from "./forms/gravedigger/form.json";
import hospitalSurveyJSON from "./forms/hospital/form.json";
import initialHouseholdJSON from "./forms/initialHousehold/form.json";
import initialBRASurveyJSON from "./forms/initialBRA/form.json";
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
  initialBRASurvey: "/surveys/initialBRA",
};

const Schemas = {
  gravedigger: {
    form: "gravediggerSurvey",
    version: "0.1.0",
  },
  hospital: {
    form: "hospitalSurvey",
    version: "0.1.0",
  },
  initialHousehold: {
    form: "initialSurvey",
    version: "1.0.6",
  },
  initialBRASurvey: {
    form: "initialBRASurvey",
    version: "0.0.0",
  },
};

export const Surveys = {
  gravedigger: {
    route: Routes.gravediggerSurvey,
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
    route: Routes.hospitalSurvey,
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
    route: Routes.initialHouseholdSurvey,
    surveyKey: "initialHousehold",
    i18nTitleKey: "initialHouseholdTitle",
    api: api.volunteerForm,
    formIOJSON: initialHouseholdJSON,
    onSubmit: getInitialHouseholdSubmitter(Schemas.initialHousehold, [
      "basicinfo",
      "people",
      "deaths",
      "socialsurveyquestions",
      "followupconsent",
    ]),
    options: {
      enableManualLocation: true,
    },
  },
  initialBRA: {
    route: Routes.initialBRASurvey,
    surveyKey: "initialBRASurvey",
    i18nTitleKey: "initialBRASurvey",
    api: api.initialBRASurvey,
    formIOJSON: initialBRASurveyJSON,
    onSubmit: defaultSurveySubmitterFactory(
      api.initialBRASurvey,
      Schemas.initialBRASurvey
    ),
    options: {
      enableManualLocation: false,
    },
  },
};
