import endpoints from "./api/endpoints";
import graveDiggerSurveyJSON from "./formDefinitions/surveys/gravedigger/form.json";
import hospitalSurveyJSON from "./formDefinitions/surveys/hospital/form.json";
import initialHouseholdJSON from "./formDefinitions/surveys/initialHousehold/form.json";
import {
  defaultSurveySubmitterFactory,
  getInitialHouseholdSubmitter,
} from "./ui/pages/surveys/submission";

export const Routes = {
  home: "/",
  initialHouseholdSurvey: "/surveys/initialHousehold",
  gravediggerSurvey: "/surveys/gravedigger",
  hospitalSurvey: "/surveys/hospital",
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
    route: Routes.gravediggerSurvey,
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
    route: Routes.hospitalSurvey,
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
    route: Routes.initialHouseholdSurvey,
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
