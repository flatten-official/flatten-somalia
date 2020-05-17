import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init
import SoLogin from './translations/so/Login.json';
import EnLogin from './translations/en/Login.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    detection: {
        lookupQuerystring: "lang",
        caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false,
    },
    resources: {
        en: {
            Login: EnLogin
        },
        so: {
            Login: SoLogin
        }
    }
  });


export default i18n;