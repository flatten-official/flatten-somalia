import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// FORMIO CONTENT ENGLISH
import formIODefaultsEN from "./en/formio/Defaults.json";
import formIOAddVolunteerEN from "./en/formio/AddVolunteer.json";
import formIOInitialHouseholdSurveyEN from "./en/formio/InitialVolunteerSurvey.json";
import formIOGraveDiggerSurveyEN from "./en/formio/GravediggerSurvey.json";
import formIOHospitalSurveyEN from "./en/formio/HospitalSurvey.json";
import formIOinitialBRASurveyEN from "./en/formio/initialBRASurvey.json";
import formIOVolunteerLoginEN from "./en/formio/VolunteerLogin.json";

// OTHER ENGLISH CONTENT
import loginEN from "./en/Login.json";
import footerEN from "./en/Footer.json";
import homeEN from "./en/Home.json";
import loadingEN from "./en/Loading.json";
import navbarEN from "./en/Navbar.json";
import formIOCustomTextEN from "./en/FormIoCustomText.json";
import SurveysEN from "./en/Surveys.json";
import GeneralEN from "./en/General.json";
import adminEN from "./en/Admin.json";

// FORMIO CONTENT SOMALI
import formIODefaultsSO from "./so/formio/Defaults.json";
import formIOAddVolunteerSO from "./so/formio/AddVolunteer.json";
import formIOInitialHouseholdSurveySO from "./so/formio/InitialVolunteerSurvey.json";
import formIOGraveDiggerSurveySO from "./so/formio/GraveDiggerSurvey.json";
import formIOHospitalSurveySO from "./so/formio/HospitalSurvey.json";
import formIOinitialBRASurveySO from "./so/formio/initialBRASurvey.json";
import formIOVolunteerLoginSO from "./so/formio/VolunteerLogin.json";

// OTHER SOMALI CONTENT
import loginSO from "./so/Login.json";
import footerSO from "./so/Footer.json";
import homeSO from "./so/Home.json";
import loadingSO from "./so/Loading.json";
import navbarSO from "./so/Navbar.json";
import formIOCustomTextSO from "./so/FormIoCustomText.json";
import SurveysSO from "./so/Surveys.json";
import GeneralSO from "./so/General.json";
import adminSO from "./so/Admin.json";

const resources = {
  en: {
    translation: {
      ...formIODefaultsEN,
      ...formIOAddVolunteerEN,
      ...formIOInitialHouseholdSurveyEN,
      ...formIOVolunteerLoginEN,
      ...formIOGraveDiggerSurveyEN,
      ...formIOHospitalSurveyEN,
      ...formIOinitialBRASurveyEN,
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
      ...formIOAddVolunteerSO,
      ...formIODefaultsSO,
      ...formIOAddVolunteerSO,
      ...formIOInitialHouseholdSurveySO,
      ...formIOVolunteerLoginSO,
      ...formIOGraveDiggerSurveySO,
      ...formIOHospitalSurveySO,
      ...formIOinitialBRASurveySO,
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
