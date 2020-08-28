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
import { useTranslation } from "react-i18next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
const { SearchBar } = Search;

const enabled = (cell) => cell.permissions.indexOf("access") !== -1;

const AdminPanel = (props) => {
  const { t } = useTranslation("AdminPanel");
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
        {enabled(cell) ? t("disable") : t("enable")}
      </Button>
    );
  };
  const columns = [
    { dataField: "name", text: t("table.name") },
    { dataField: "email", text: t("table.email") },
    {
      dataField: "hasAccess",
      text: t("table.status"),
      isDummyField: true,
      csvExport: false,
      formatter: hasAccessFormatter,
      formatExtraData: volunteer,
    },
    {
      dataField: "accessButton",
      text: t("table.statusButtons"),
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
      <ToolkitProvider
        keyField="_id"
        data={volunteer.list}
        columns={columns}
        search
      >
        {(props) => (
          <>
            <SearchBar {...props.searchProps} />
            <hr />
            <BootstrapTable
              {...props.baseProps}
              // keyField="_id"
              // data={volunteer.list}
              // columns={columns}
            />
          </>
        )}
      </ToolkitProvider>
    </>
  );
};

export default AdminPanel;
