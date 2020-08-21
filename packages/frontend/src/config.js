import graveDiggerSurveyJSON from "./formDefinitions/surveys/gravedigger/form.json";
import hospitalSurveyJSON from "./formDefinitions/surveys/hospital/form.json";
import initialHouseholdJSON from "./formDefinitions/surveys/initialHousehold/form.json";
import { initialHouseholdSubmitBodyFormatter } from "./ui/pages/surveys/submitHelpers";
import { Surveys as SharedSurveyRefs } from "util-shared-constants";

export const Routes = {
  home: "/",
  surveyPrefix: "/surveys/",
  addVolunteer: "/admin/addVolunteer",
  admin: "/admin/list",
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
};

export const Surveys = {
  gravedigger: {
    ...SharedSurveyRefs.gravedigger,
    i18nTitleKey: "graveDiggerTitle",
    formIOJSON: graveDiggerSurveyJSON,
    schema: Schemas.gravedigger,
  },
  hospital: {
    ...SharedSurveyRefs.hospital,
    i18nTitleKey: "hospitalTitle",
    formIOJSON: hospitalSurveyJSON,
    schema: Schemas.hospital,
  },
  initialHousehold: {
    ...SharedSurveyRefs.initialHousehold,
    i18nTitleKey: "initialHouseholdTitle",
    formIOJSON: initialHouseholdJSON,
    schema: Schemas.initialHousehold,
    customSubmitBodyFormatter: initialHouseholdSubmitBodyFormatter,
  },
};
