import graveDiggerSurveyJSON from "./formDefinitions/surveys/gravedigger.json";
import hospitalSurveyJSON from "./formDefinitions/surveys/hospital.json";
import initialHouseholdJSON from "./formDefinitions/surveys/initialHousehold.json";
import { initialHouseholdSubmitBodyFormatter } from "./ui/pages/surveys/submitHelpers";
import { Surveys as SharedSurveyRefs } from "util-shared-constants";

export const Routes = {
  home: "/",
  surveyPrefix: "/surveys/",
  addVolunteer: "/admin/addVolunteer",
  admin: "/admin/list",
};

export const Surveys = {
  initialHousehold: {
    ...SharedSurveyRefs.initialHousehold,
    i18nTitleKey: "initialHouseholdTitle",
    formIOJSON: initialHouseholdJSON,
    customSubmitBodyFormatter: initialHouseholdSubmitBodyFormatter,
  },
  gravedigger: {
    ...SharedSurveyRefs.gravedigger,
    i18nTitleKey: "graveDiggerTitle",
    formIOJSON: graveDiggerSurveyJSON,
    disabled: true,
  },
  hospital: {
    ...SharedSurveyRefs.hospital,
    i18nTitleKey: "hospitalTitle",
    formIOJSON: hospitalSurveyJSON,
    disabled: true,
  },
};
