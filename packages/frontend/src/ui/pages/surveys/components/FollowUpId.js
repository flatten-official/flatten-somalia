import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

// DO NOT MODIFY, WILL BREAK FOLLOW UP SYSTEM
const INITIAL_START_DATE = new Date(1590981168000); // Represents a fixed moment in time serving as a reference

function generateFollowUpID(volunteerFriendlyId) {
  const timeDifference = Date.now() - INITIAL_START_DATE;
  const timeDifferenceInMin = Math.round(timeDifference / (1000 * 60));
  return volunteerFriendlyId + "-" + timeDifferenceInMin;
}

export const FollowUpId = ({
  volunteerFriendlyId,
  followUpId,
  setFollowUpId,
  formioDefinition,
}) => {
  useEffect(() => {
    if (!followUpId) setFollowUpId(generateFollowUpID(volunteerFriendlyId));
  }, [followUpId, volunteerFriendlyId, setFollowUpId]);

  const { t } = useTranslation("Surveys");

  return (
    <>
      <h3>
        {formioDefinition.isReminder
          ? t("followupIDReminder")
          : t("askToGiveFollowUpId")}
      </h3>
      <h3>{followUpId}</h3>
    </>
  );
};

FollowUpId.propTypes = {
  volunteerFriendlyId: PropTypes.number,
  followUpId: PropTypes.string,
  setFollowUpId: PropTypes.func,
  formioDefinition: PropTypes.object,
};
