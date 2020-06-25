import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchVolunteerList,
  changeVolunteerAccess,
  FETCH_LIST_PENDING,
} from "../../backend/volunteer/volunteerActions";
import Loading from "./Loading";

const AdminPanel = () => {
  useEffect(() => fetchVolunteerList(), []);
  const volunteer = useSelector((state) => state.volunteer);

  if (volunteer.status === FETCH_LIST_PENDING) return <Loading />;

  return <>TODO</>;
};
