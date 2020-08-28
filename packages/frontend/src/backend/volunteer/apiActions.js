import backend from "../api/backend";
import flattenApi from "../api/api";

export const addVolunteer = (volunteerData) =>
  backend.request({ ...flattenApi.addVolunteer, data: { volunteerData } });
