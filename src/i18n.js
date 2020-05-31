import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import addVolunteerEN from "./translations/en/translation/AddVolunteer.json";
import defaultsEN from "./translations/en/translation/Defaults.json";
import IVS_EN from "./translations/en/translation/InitialVolunteerSurvey.json";
import volunteerLoginEN from "./translations/en/translation/VolunteerLogin.json";

import adminEN from "./translations/en/Admin.json";
import authEN from "./translations/en/Auth.json";
import footerEN from "./translations/en/Footer.json";
import homeEN from "./translations/en/Home.json";
import loadingEN from "./translations/en/Loading.json";
import navbarEN from "./translations/en/Navbar.json";
import volunteerFormEN from "./translations/en/VolunteerForm.json";

import addVolunteerSO from "./translations/so/translation/AddVolunteer.json";
import defaultsSO from "./translations/so/translation/Defaults.json";
import IVS_SO from "./translations/so/translation/InitialVolunteerSurvey.json";
import volunteerLoginSO from "./translations/so/translation/VolunteerLogin.json";

import adminSO from "./translations/so/Admin.json";
import authSO from "./translations/so/Auth.json";
import footerSO from "./translations/so/Footer.json";
import homeSO from "./translations/so/Home.json";
import loadingSO from "./translations/so/Loading.json";
import navbarSO from "./translations/so/Navbar.json";
import volunteerFormSO from "./translations/so/VolunteerForm.json";

const formioTranslationsEN = {};
const formioTranslationsSO = {};

Object.assign(formioTranslationsEN, addVolunteerEN);
Object.assign(formioTranslationsEN, defaultsEN);
Object.assign(formioTranslationsEN, IVS_EN);
Object.assign(formioTranslationsEN, volunteerLoginEN);

Object.assign(formioTranslationsSO, addVolunteerSO);
Object.assign(formioTranslationsSO, defaultsSO);
Object.assign(formioTranslationsSO, IVS_SO);
Object.assign(formioTranslationsSO, volunteerLoginSO);

const resources = {
  en: {
    translation: formioTranslationsEN,
    Admin: adminEN,
    Auth: authEN,
    Footer: footerEN,
    Home: homeEN,
    Loading: loadingEN,
    Navbar: navbarEN,
    VolunteerForm: volunteerFormEN,
  },
  so: {
    translation: formioTranslationsSO,
    Admin: adminSO,
    Auth: authSO,
    Footer: footerSO,
    Home: homeSO,
    Loading: loadingSO,
    Navbar: navbarSO,
    VolunteerForm: volunteerFormSO,
  },
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    debug: process.env.NODE_ENV === "development",
  });

i18n.changeLanguage("en");
