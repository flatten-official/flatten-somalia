import {
  FETCH_LIST_PENDING,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILED,
  VOLUNTEER_CHANGE_PENDING,
  VOLUNTEER_ENABLED,
  VOLUNTEER_DISABLED,
  VOLUNTEER_CHANGE_FAILED,
} from "./volunteerActions";
import update from "immutability-helper";

const updateVolunteerStatusById = (state, volunteerId, newStatus) =>
  update(state, {
    list: {
      [volunteerId]: {
        status: { $set: newStatus },
      },
    },
  });

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
      return {
        ...state,
        listStatus: FETCH_LIST_FAILED,
      };
    case VOLUNTEER_CHANGE_PENDING:
    case VOLUNTEER_CHANGE_FAILED:
    case VOLUNTEER_ENABLED:
    case VOLUNTEER_DISABLED:
      return updateVolunteerStatusById(
        state,
        action.payload.volunteerId,
        action.type
      );
    default:
      return state;
  }
};

export default volunteerReducer;
