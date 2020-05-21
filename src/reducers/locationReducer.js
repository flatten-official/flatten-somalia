import {LOCATION_SUCCESS, LOCATION_FAIL, LOCATION_REQUEST, LOCATION_UNITITIALISED} from "../location/locationActions";

const locationReducer = (state={}, action) => {
  switch(action.type) {
    case LOCATION_SUCCESS:
      return {...state, location: action.payload, status:LOCATION_SUCCESS};
    case LOCATION_REQUEST:
      return {...state, status:LOCATION_REQUEST};
    case LOCATION_FAIL:
      return {...state, status:LOCATION_FAIL}
    default:
      return {...state, status:state.status===undefined?LOCATION_UNITITIALISED:state.status};
  }
}

export default locationReducer;