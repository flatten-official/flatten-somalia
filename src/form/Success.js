import React from "react";
import { Link } from "react-router-dom";
import { Translate } from "react-redux-i18n";

export default () => (
  <>
    <Translate value={'VolunteerForm.success'}/> <Link to="/"> <Translate value={'VolunteerForm.returnHomePrompt'}/> </Link>
  </>
);
