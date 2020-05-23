import React from "react";
import { Translate } from "react-redux-i18n";

const SubmittedEmail = () => (
  <h3>
    <Translate value={"Auth.submittedEmailMessage"} />
  </h3>
);

export default SubmittedEmail;
