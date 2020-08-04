import backend from "../api/backend";
import flattenApi from "../api/api";

export const addVolunteer = (volunteerData) =>
  backend.request({ ...flattenApi.addVolunteer, data: { volunteerData } });

export const listVolunteers = () => backend.request(flattenApi.listVolunteers);

export const changeVolunteerAccess = (access, volunteerId) =>
  backend.request({
    ...flattenApi.changeVolunteerAccess,
    data: { access, volunteerId },
  });
