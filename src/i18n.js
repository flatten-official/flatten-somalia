import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// FORMIO CONTENT ENGLISH
import formIOAddVolunteerEN from "./translations/en/translation/AddVolunteer.json";
import formIODefaultsEN from "./translations/en/translation/Defaults.json";
import formIOInitialHouseholdSurveyEN from "./translations/en/translation/InitialVolunteerSurvey.json";
import formIOGraveDiggerSurveyEN from "./translations/en/translation/GravediggerSurvey.json";
import formIOHospitalSurveyEN from "./translations/en/translation/HospitalSurvey.json";
import formIOVolunteerLoginEN from "./translations/en/translation/VolunteerLogin.json";

// OTHER ENGLISH CONTENT
import adminEN from "./translations/en/Admin.json";
import loginEN from "./translations/en/Login.json";
import footerEN from "./translations/en/Footer.json";
import homeEN from "./translations/en/Home.json";
import loadingEN from "./translations/en/Loading.json";
import navbarEN from "./translations/en/Navbar.json";
import initialHouseholdSurveyEN from "./translations/en/InitialSurvey.json";
import formIOCustomTextEN from "./translations/en/FormIoCustomText.json";
import graveDiggerSurveyEN from "./translations/en/GraveDiggerSurvey.json";
import hospitalSurveyEN from "./translations/en/HospitalSurvey.json";
import SurveysEN from "./translations/en/Surveys.json";

// FORMIO CONTENT SOMALI
import formIOAddVolunteerSO from "./translations/so/translation/AddVolunteer.json";
import formIODefaultsSO from "./translations/so/translation/Defaults.json";
import formIOInitialHouseholdSurveySO from "./translations/so/translation/InitialVolunteerSurvey.json";
import formIOGraveDiggerSurveySO from "./translations/so/translation/GraveDiggerSurvey.json";
import formIOHospitalSurveySO from "./translations/so/translation/HospitalSurvey.json";
import formIOVolunteerLoginSO from "./translations/so/translation/VolunteerLogin.json";
import formIOCustomTextSO from "./translations/so/FormIoCustomText.json";

// OTHER SOMALI CONTENT
import adminSO from "./translations/so/Admin.json";
import loginSO from "./translations/so/Login.json";
import footerSO from "./translations/so/Footer.json";
import homeSO from "./translations/so/Home.json";
import loadingSO from "./translations/so/Loading.json";
import navbarSO from "./translations/so/Navbar.json";
import initialHouseholdSurveySO from "./translations/so/InitialSurvey.json";
import graveDiggerSurveySO from "./translations/so/GraveDiggerSurvey.json";
import hospitalSurveySO from "./translations/so/HospitalSurvey.json";

const resources = {
  en: {
    translation: {
      ...formIOAddVolunteerEN,
      ...formIODefaultsEN,
      ...formIOInitialHouseholdSurveyEN,
      ...formIOVolunteerLoginEN,
      ...formIOGraveDiggerSurveyEN,
      ...formIOHospitalSurveyEN,
    },
    Admin: adminEN,
    Login: loginEN,
    Footer: footerEN,
    Home: homeEN,
    Loading: loadingEN,
    Navbar: navbarEN,
    InitialSurvey: initialHouseholdSurveyEN,
    FormIOCustomText: formIOCustomTextEN,
    HospitalSurvey: hospitalSurveyEN,
    GravediggerSurvey: graveDiggerSurveyEN,
    Surveys: SurveysEN,
  },
  so: {
    translation: {
      ...formIOAddVolunteerSO,
      ...formIODefaultsSO,
      ...formIOInitialHouseholdSurveySO,
      ...formIOVolunteerLoginSO,
      ...formIOGraveDiggerSurveySO,
      ...formIOHospitalSurveySO,
    },
    Admin: adminSO,
    Login: loginSO,
    Footer: footerSO,
    Home: homeSO,
    Loading: loadingSO,
    Navbar: navbarSO,
    InitialSurvey: initialHouseholdSurveySO,
    FormIOCustomText: formIOCustomTextSO,
    HospitalSurvey: hospitalSurveySO,
    GravediggerSurvey: graveDiggerSurveySO,
  },
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .use(LanguageDetector)
  // init i18next
  .init({
    resources,
    debug: process.env.NODE_ENV === "development",
  });

export default i18n;
