import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVolunteerList,
  changeVolunteerAccess,
  FETCH_LIST_PENDING,
  FETCH_LIST_FAILED,
} from "../../backend/volunteer/volunteerActions";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
const { SearchBar } = Search;

const AdminPanelContent = () => {
  const { t } = useTranslation("AdminPanel");
  const volunteer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  const checkHasAccess = (cell) => cell.permissions.indexOf("access") !== -1;

  const hasAccessFormatter = (_, cell, __, ___) => (
    <FontAwesomeIcon icon={checkHasAccess(cell) ? faCheck : faTimes} />
  );

  const accessButtonFormatter = (_, cell, __, ___) => {
    const hasAccess = checkHasAccess(cell);
    return (
      // todo - check that the volunteer doesnt update themselves!
      <Button
        variant={hasAccess ? "warning" : "primary"}
        onClick={() => dispatch(changeVolunteerAccess(cell._id, !hasAccess))}
      >
        {t(hasAccess ? "disable" : "enable")}
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

  return (
    <ToolkitProvider
      keyField="_id"
      data={volunteer.list}
      columns={columns}
      search
    >
      {(props) => (
        <>
          {/* eslint-disable-next-line react/prop-types */}
          <SearchBar {...props.searchProps} />
          <hr />
          <BootstrapTable
            {
              /* eslint-disable-next-line react/prop-types */
              ...props.baseProps
            }
            // keyField="_id"
            // data={volunteer.list}
            // columns={columns}
          />
        </>
      )}
    </ToolkitProvider>
  );
};

const AdminPanel = () => {
  const dispatch = useDispatch();
  const volunteer = useSelector((state) => state.volunteer);

  useEffect(() => {
    dispatch(fetchVolunteerList());
  }, [dispatch]);

  switch (volunteer.listStatus) {
    case FETCH_LIST_PENDING:
      return <Loading />;
    case FETCH_LIST_FAILED:
      return <h3>Error. Try refreshing the page.</h3>;
    default:
      return (
        <>
          <h3>Volunteer Management</h3>
          <br />
          <AdminPanelContent />
        </>
      );
  }
};

export default AdminPanel;
