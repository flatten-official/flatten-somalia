import endpoints from "./api/endpoints";
import graveDiggerSurveyJSON from "./formDefinitions/surveys/gravedigger/form.json";
import hospitalSurveyJSON from "./formDefinitions/surveys/hospital/form.json";
import initialHouseholdJSON from "./formDefinitions/surveys/initialHousehold/form.json";
import {
  defaultSurveySubmitterFactory,
  getInitialHouseholdSubmitter,
} from "./ui/pages/surveys/submitters";
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
    surveyKey: "graveDigger",
    i18nTitleKey: "graveDiggerTitle",
    api: endpoints.submitGraveDiggerSurvey,
    formIOJSON: graveDiggerSurveyJSON,
    onSubmit: defaultSurveySubmitterFactory(
      endpoints.submitGraveDiggerSurvey,
      Schemas.gravedigger
    ),
    options: {
      enableManualLocation: false,
    },
  },
  hospital: {
    ...SharedSurveyRefs.hospital,
    surveyKey: "hospital",
    i18nTitleKey: "hospitalTitle",
    api: endpoints.submitHospitalSurvey,
    formIOJSON: hospitalSurveyJSON,
    onSubmit: defaultSurveySubmitterFactory(
      endpoints.submitHospitalSurvey,
      Schemas.hospital
    ),
    options: {
      enableManualLocation: true,
    },
  },
  initialHousehold: {
    ...SharedSurveyRefs.initialHousehold,
    surveyKey: "initialHousehold",
    i18nTitleKey: "initialHouseholdTitle",
    api: endpoints.submitVolunteerForm,
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
};
