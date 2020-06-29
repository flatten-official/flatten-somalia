import {
  FETCH_LIST_PENDING,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILED,
  VOLUNTEER_CHANGE_PENDING,
  VOLUNTEER_CHANGE_SUCCESS,
  VOLUNTEER_CHANGE_FAILED,
  FETCH_LIST_PERMISSION_DENIED,
} from "./volunteerActions";
import update from "immutability-helper";

const updateVolunteerStatusById = (state, action) => {
  // todo - handle errors
  if (!action.payload) return { ...state };
  console.log(action);
  return update(state, {
    list: {
      [action.payload._id]: {
        status: { $set: action.type },
        permissions: { $set: action.payload.permissions },
      },
    },
  });
};

const volunteerReducer = (
  state = { listStatus: FETCH_LIST_PENDING },
  action
) => {
  switch (action.type) {
    case FETCH_LIST_PENDING:
      return { ...state, listStatus: FETCH_LIST_PENDING };
    case FETCH_LIST_SUCCESS:
      return update(state, {
        listStatus: { $set: FETCH_LIST_SUCCESS },
        list: {
          $set: action.payload.map((o) => ({
            ...o,
            status: FETCH_LIST_SUCCESS,
          })),
        },
      });
    case FETCH_LIST_FAILED:
    case FETCH_LIST_PERMISSION_DENIED:
      return {
        ...state,
        listStatus: action.type,
      };
    case VOLUNTEER_CHANGE_PENDING:
    case VOLUNTEER_CHANGE_FAILED:
    case VOLUNTEER_CHANGE_SUCCESS:
      return updateVolunteerStatusById(state, action);
    default:
      return state;
  }
};

export default volunteerReducer;
