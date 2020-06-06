import api from "./backend/api/api";
import graveDiggerSurveyJSON from "./forms/GraveDiggerForm.json";
import hospitalSurveyJSON from "./forms/HospitalForm.json";

// todo - fill in all of the routes
export const Routes = {
  home: "/",
  auth: "/login",
  initialHouseholdSurvey: "/surveys/initialHousehold",
  graveDiggerSurvey: "/surveys/graveDigger",
  hospitalSurvey: "/surveys/hospital",
  admin: "/admin",
  success: "/success",
  emailSubmitted: "/submitted-email",
};

export const Surveys = {
  graveDigger: {
    storeKey: "graveDigger",
    i18nTitleKey: "graveDiggerTitle",
    api: api.graveDiggerSurvey,
    formIOJSON: graveDiggerSurveyJSON,
  },
  hospital: {
    storeKey: "hospital",
    i18nTitleKey: "hospitalTitle",
    api: api.hospitalSurvey,
    formIOJSON: hospitalSurveyJSON,
  },
};
