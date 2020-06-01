import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setFollowUpId, Types } from "./FormActions";

const FollowUpIdDisplay = () => {
  const dispatch = useDispatch();
  const followUpId = useSelector((state) => state.volunteerForm.followUpId);
  const volunteerFriendlyId = useSelector(
    (state) => state.auth.user.friendlyId
  );

  useEffect(() => {
    if (!followUpId) dispatch(setFollowUpId(volunteerFriendlyId));
  }, [followUpId, dispatch, volunteerFriendlyId]);

  const onDone = () => {
    dispatch({ type: Types.NOTIFY_FOLLOW_UP_ID_RECORDED, payload: followUpId });
  };

  return (
    <>
      <h3>
        If the volunteer doesn&apos;t have a phone number to follow-up, give
        them a block with this number.
      </h3>

      <h2>{followUpId}</h2>

      <Button onClick={onDone}>Done</Button>
    </>
  );
};

export default FollowUpIdDisplay;
