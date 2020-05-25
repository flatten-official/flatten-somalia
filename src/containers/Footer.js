import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container text-center" style={{ padding: "15px" }}>
        {t("Footer:builtBy")} &nbsp;
        <a href="https://flatten.ca">Flatten.ca</a>
      </div>
    </footer>
  );
};

export default Footer;
