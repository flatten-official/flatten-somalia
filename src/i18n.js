import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './i18nResources.json'

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'so',
    debug: ( process.env.NODE_ENV === 'development' ),
  });

i18n.changeLanguage('so')