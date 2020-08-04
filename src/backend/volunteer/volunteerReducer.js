import {
  FETCH_LIST_PENDING,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILED,
  VOLUNTEER_CHANGE_PENDING,
  VOLUNTEER_CHANGE_SUCCESS,
  VOLUNTEER_CHANGE_FAILED,
} from "./volunteerActions";
import update from "immutability-helper";

/**
 * Updates the state of a single volunteer in the list
 */
const updateVolunteerStatusById = (state, action) => {
  console.log(action);
  // todo - handle errors
  if (!action.payload || !action.payload._id)
    throw new Error("No id specified in VOLUNTEER_CHANGE action payload");

  const updateIndex = state.list.findIndex((v) => v._id === action.payload._id);

  // set the status
  const operation = { status: { $set: action.type } };

  // set permissions if applicable
  if (action.payload.permissions)
    operation.permissions = { $set: action.payload.permissions };

  console.log(operation);

  // returned the mutated state using the operation
  return update(state, { list: { [updateIndex]: operation } });
};

const volunteerReducer = (
  state = { listStatus: FETCH_LIST_PENDING },
  action
) => {
  switch (action.type) {
    case FETCH_LIST_SUCCESS:
      return { ...state, listStatus: FETCH_LIST_SUCCESS, list: action.payload };
    case FETCH_LIST_FAILED:
    case FETCH_LIST_PENDING:
      return { ...state, listStatus: action.type };
    case VOLUNTEER_CHANGE_PENDING:
    case VOLUNTEER_CHANGE_FAILED:
    case VOLUNTEER_CHANGE_SUCCESS:
      return updateVolunteerStatusById(state, action);
    default:
      return state;
  }
};

export default volunteerReducer;
