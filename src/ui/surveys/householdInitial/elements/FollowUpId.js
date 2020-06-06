import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Types from "../../actionTypes";

// DO NOT MODIFY, WILL BREAK FOLLOW SYSTEM
const INITIAL_START_DATE = new Date(1590981168000); // Represents a fixed moment in time serving as a reference

function generateFollowUpID(volunteerFriendlyId) {
  const timeDifference = Date.now() - INITIAL_START_DATE;
  const timeDifferenceInMin = Math.round(timeDifference / (1000 * 60));
  return volunteerFriendlyId + "-" + timeDifferenceInMin;
}

const FollowUpId = () => {
  const volunteerFriendlyId = useSelector(
    (state) => state.auth.user.friendlyId
  );

  const followUpId = useSelector((state) => {
    const currentSurvey = state.surveys.activeSurvey;
    return state.surveys[currentSurvey].followUpId;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!followUpId) {
      const followUpID = generateFollowUpID(volunteerFriendlyId);

      console.log(followUpID);

      dispatch({ type: Types.SET_FOLLOW_UP_ID, payload: followUpID });
    }
  }, [dispatch, followUpId, volunteerFriendlyId]);

  const { t } = useTranslation("InitialSurvey");

  console.log(followUpId);

  return (
    <>
      <h3>{t("askToGiveFollowUpId")}</h3>
      <h3>{followUpId}</h3>
    </>
  );
};

export default FollowUpId;
