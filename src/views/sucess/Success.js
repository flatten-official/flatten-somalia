import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export default () => {
  let { t, i18n } = useTranslation();
  return (
    <>
      {t('VolunteerForm:success')} <Link to="/"> {t('VolunteerForm:returnHomePrompt')} </Link>
    </>
  );
}
