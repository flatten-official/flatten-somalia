import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVolunteerList,
  changeVolunteerAccess,
  FETCH_LIST_PENDING,
  VOLUNTEER_CHANGE_FAILED,
} from "../../backend/volunteer/volunteerActions";
import BootstrapTable from "react-bootstrap-table-next";

import Loading from "./Loading";

const AdminPanel = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVolunteerList());
  }, [dispatch]);
  const volunteer = useSelector((state) => state.volunteer);

  const columns = [
    { dataField: "name", text: "Volunteer Name" },
    { dataField: "email", text: "Volunteer Email" },
  ];

  console.log(volunteer.status);

  if (volunteer.listStatus === FETCH_LIST_PENDING) return <Loading />;

  return (
    <>
      <BootstrapTable
        keyField="volunteerId"
        data={volunteer.list}
        columns={columns}
      />
    </>
  );
};

export default AdminPanel;
