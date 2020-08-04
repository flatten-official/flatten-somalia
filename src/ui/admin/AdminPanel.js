import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVolunteerList,
  changeAccess,
  FETCH_LIST_PENDING,
  FETCH_LIST_FAILED,
  VOLUNTEER_CHANGE_PENDING,
  VOLUNTEER_CHANGE_FAILED,
} from "../../backend/volunteer/volunteerActions";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Spinner from "react-bootstrap/Spinner";
import { permissions } from "../../backend/auth/authApi";
const { SearchBar } = Search;

const checkHasAccess = (cell) => cell.permissions.includes(permissions.access);

/**
 * The enable/disable button formatter
 */
const getButtonCellFormatter = (dispatch, t) => (_, cell, __, ___) => {
  const hasAccess = checkHasAccess(cell);
  const { _id, status } = cell;

  const getVariant = () => {
    if (status === VOLUNTEER_CHANGE_FAILED) return "danger";
    if (hasAccess) return "warning";
    return "primary";
  };

  const isDisabled = () => {
    // todo - check that the volunteer doesnt update themselves
    return status === VOLUNTEER_CHANGE_FAILED;
  };

  const getContent = () => {
    if (status === VOLUNTEER_CHANGE_FAILED) return t("failed");
    if (status === VOLUNTEER_CHANGE_PENDING)
      return <Spinner animation="border" />;
    if (hasAccess) return t("disable");
    return t("enable");
  };

  return (
    <Button
      variant={getVariant()}
      disabled={isDisabled()}
      onClick={() => dispatch(changeAccess(_id, !hasAccess))}
    >
      {getContent()}
    </Button>
  );
};

/**
 * returns either a check mark or a cross
 */
const formatAsCheckMark = (_, cell, __, ___) =>
  checkHasAccess(cell) ? <>&#10004;</> : <>&#10006;</>;

const AdminPanelContent = () => {
  const { t } = useTranslation("Admin");
  const volunteer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  const columns = [
    { dataField: "name", text: t("table.name") },
    { dataField: "email", text: t("table.email") },
    {
      dataField: "hasAccess",
      text: t("table.status"),
      isDummyField: true,
      csvExport: false,
      formatter: formatAsCheckMark,
      formatExtraData: volunteer,
    },
    {
      dataField: "accessButton",
      text: t("table.statusButtons"),
      isDummyField: true,
      csvExport: false,
      formatter: getButtonCellFormatter(dispatch, t),
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
  const { t } = useTranslation("Admin");

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
          <h3>{t("managementTitle")}</h3>
          <br />
          <AdminPanelContent />
        </>
      );
  }
};

export default AdminPanel;
