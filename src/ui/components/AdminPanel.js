import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVolunteerList,
  changeVolunteerAccess,
  FETCH_LIST_PENDING,
  VOLUNTEER_CHANGE_FAILED,
} from "../../backend/volunteer/volunteerActions";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "./Loading";

const AdminPanel = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVolunteerList());
  }, [dispatch]);
  const volunteer = useSelector((state) => state.volunteer);

  const hasAccessFormatter = (row, cell) => {
    const enabled = cell.permissions.indexOf("access") !== -1;
    return <FontAwesomeIcon icon={enabled ? faCheck : faTimes} />;
  };

  const accessButtonFormatter = (row, cell) => {
    const enabled = cell.permissions.indexOf("access") !== -1;
    return (
      <Button variant={enabled ? "warning" : "primary"}>
        {enabled ? "Disable" : "Enable"}
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
    },
    {
      dataField: "accessButton",
      text: "Enable/Disable Volunteer",
      isDummyField: true,
      csvExport: false,
      formatter: accessButtonFormatter,
    },
  ];

  if (volunteer.listStatus === FETCH_LIST_PENDING) return <Loading />;

  return (
    <>
      <h3>Volunteer Management</h3> <br />
      <BootstrapTable keyField="_id" data={volunteer.list} columns={columns} />
    </>
  );
};

export default AdminPanel;
