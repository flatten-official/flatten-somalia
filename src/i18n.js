import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// FORMIO CONTENT ENGLISH
import formIODefaultsEN from "./translations/en/formio/Defaults.json";
import formIOAddVolunteerEN from "./translations/en/formio/AddVolunteer.json";
import formIOInitialHouseholdSurveyEN from "./translations/en/formio/InitialVolunteerSurvey.json";
import formIOGraveDiggerSurveyEN from "./translations/en/formio/GravediggerSurvey.json";
import formIOHospitalSurveyEN from "./translations/en/formio/HospitalSurvey.json";
import formIOVolunteerLoginEN from "./translations/en/formio/VolunteerLogin.json";

// OTHER ENGLISH CONTENT
import loginEN from "./translations/en/Login.json";
import footerEN from "./translations/en/Footer.json";
import homeEN from "./translations/en/Home.json";
import loadingEN from "./translations/en/Loading.json";
import navbarEN from "./translations/en/Navbar.json";
import formIOCustomTextEN from "./translations/en/FormIoCustomText.json";
import SurveysEN from "./translations/en/Surveys.json";
import GeneralEN from "./translations/en/General.json";
import adminEN from "./translations/en/Admin.json";

// FORMIO CONTENT SOMALI
import formIODefaultsSO from "./translations/so/formio/Defaults.json";
import formIOAddVolunteerSO from "./translations/so/formio/AddVolunteer.json";
import formIOInitialHouseholdSurveySO from "./translations/so/formio/InitialVolunteerSurvey.json";
import formIOGraveDiggerSurveySO from "./translations/so/formio/GraveDiggerSurvey.json";
import formIOHospitalSurveySO from "./translations/so/formio/HospitalSurvey.json";
import formIOVolunteerLoginSO from "./translations/so/formio/VolunteerLogin.json";
import formIOCustomTextSO from "./translations/so/FormIoCustomText.json";

// OTHER SOMALI CONTENT
import loginSO from "./translations/so/Login.json";
import footerSO from "./translations/so/Footer.json";
import homeSO from "./translations/so/Home.json";
import loadingSO from "./translations/so/Loading.json";
import navbarSO from "./translations/so/Navbar.json";
import SurveysSO from "./translations/so/Surveys.json";
import GeneralSO from "./translations/so/General.json";
import adminSO from "./translations/so/Admin.json";

const resources = {
  en: {
    translation: {
      ...formIODefaultsEN,
      ...formIOAddVolunteerEN,
      ...formIOInitialHouseholdSurveyEN,
      ...formIOVolunteerLoginEN,
      ...formIOGraveDiggerSurveyEN,
      ...formIOHospitalSurveyEN,
    },
    Login: loginEN,
    Footer: footerEN,
    Home: homeEN,
    Loading: loadingEN,
    Navbar: navbarEN,
    FormIOCustomText: formIOCustomTextEN,
    Surveys: SurveysEN,
    General: GeneralEN,
    Admin: adminEN,
  },
  so: {
    translation: {
      ...formIODefaultsSO,
      ...formIOAddVolunteerSO,
      ...formIOInitialHouseholdSurveySO,
      ...formIOVolunteerLoginSO,
      ...formIOGraveDiggerSurveySO,
      ...formIOHospitalSurveySO,
    },
    Login: loginSO,
    Footer: footerSO,
    Home: homeSO,
    Loading: loadingSO,
    Navbar: navbarSO,
    FormIOCustomText: formIOCustomTextSO,
    Surveys: SurveysSO,
    General: GeneralSO,
    Admin: adminSO,
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
    fallbackLng: "en",
  });

export default i18n;
