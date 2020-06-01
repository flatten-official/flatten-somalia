import { useSelector } from "react-redux";
import React from "react";

const FollowUpId = () => {
  const followUpId = useSelector((state) => state.volunteerForm.followUpId);
  return (
    <>
      <h3>
        If the volunteer doesn&apos;t have a phone number to follow-up, give
        them a block with this number.
      </h3>

      <h2>{followUpId}</h2>
    </>
  );
};

export default FollowUpId;
