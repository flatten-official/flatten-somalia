import { useTranslation } from "react-i18next";
import React from "react";
import PropTypes from "prop-types";

const TranslatedText = ({ formioDefinition }) => {
  const { t } = useTranslation("FormIOCustomText");
  return <h4>{t(formioDefinition.i18nKey)}</h4>;
};

TranslatedText.propTypes = {
  formioDefinition: PropTypes.object,
};

export default TranslatedText;
