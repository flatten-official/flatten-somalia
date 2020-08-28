import backend from "../api/backend";
import flattenApi from "../api/api";

const addVolunteer = (volunteerData) => {
  return backend.request({
    ...flattenApi.addVolunteer,
    data: { volunteerData },
  });
};
