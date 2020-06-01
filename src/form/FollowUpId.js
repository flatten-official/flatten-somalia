import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setFollowUpId } from "./FormActions";

const FollowUpIdDisplay = (onDone) => {
  const dispatch = useDispatch();
  const followUpId = useSelector((state) => state.volunteerForm.followUpId);

  useEffect(() => {
    if (followUpId === null) dispatch(setFollowUpId());
  }, [followUpId, dispatch]);

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
