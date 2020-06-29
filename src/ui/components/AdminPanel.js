import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVolunteerList,
  changeVolunteerAccess,
  FETCH_LIST_PENDING,
  FETCH_LIST_FAILED,
  FETCH_LIST_PERMISSION_DENIED,
  VOLUNTEER_CHANGE_FAILED,
} from "../../backend/volunteer/volunteerActions";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "./Loading";

const enabled = (cell) => cell.permissions.indexOf("access") !== -1;

const AdminPanel = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVolunteerList());
  }, [dispatch]);
  const volunteer = useSelector((state) => state.volunteer);
  // why doesn't this print?
  console.log(volunteer);

  const hasAccessFormatter = (_, cell, __, volunteerData) => (
    <FontAwesomeIcon icon={enabled(cell) ? faCheck : faTimes} />
  );

  const accessButtonFormatter = (_, cell, __, volunteerData) => {
    if (cell.listStatus === FETCH_LIST_PENDING) return <Loading />;

    return (
      // todo - check that the volunteer doesnt update themselves!
      <Button
        variant={enabled(cell) ? "warning" : "primary"}
        onClick={() =>
          dispatch(changeVolunteerAccess(cell._id, !enabled(cell)))
        }
      >
        {enabled(cell) ? "Disable" : "Enable"}
      </Button>
    );
  };
  const columns = [
    { dataField: "name", text: "Volunteer Name" },
    { dataField: "email", text: "Volunteer Email" },
    {
      dataField: "hasAccess",
      text: "Volunteer Status",
      isDummyField: true,
      csvExport: false,
      formatter: hasAccessFormatter,
      formatExtraData: volunteer,
    },
    {
      dataField: "accessButton",
      text: "Enable/Disable Volunteer",
      isDummyField: true,
      csvExport: false,
      formatter: accessButtonFormatter,
      formatExtraData: volunteer,
    },
  ];

  if (volunteer.listStatus === FETCH_LIST_PENDING) return <Loading />;

  if (volunteer.listStatus === FETCH_LIST_PERMISSION_DENIED)
    return <h3>Permission denied.</h3>;

  if (volunteer.listStatus === FETCH_LIST_FAILED)
    return <h3>Error. Try refreshing the page.</h3>;

  return (
    <>
      <h3>Volunteer Management</h3> <br />
      <BootstrapTable keyField="_id" data={volunteer.list} columns={columns} />
    </>
  );
};

export default AdminPanel;
