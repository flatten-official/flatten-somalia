import backend from "./endpoints";

const request = (method, url, options) =>
  backend.request({ method, url, ...options });

const getAuth = () => request("GET", "/auth");

const login = (email) => request("POST", "/auth/login", { data: { email } });

const logout = () => request("DELETE", "/auth/logout");

const submitVolunteerForm = (data) =>
  request("POST", "/submit/initial", { data });

const addVolunteer = (volunteerData) =>
  request("POST", "/volunteer", { data: { volunteerData } });

const submitGraveDiggerSurvey = (data) =>
  request("POST", "/survey/gravedigger", { data });

const submitHospitalSurvey = (data) =>
  request("POST", "/survey/hospital", { data });

const listVolunteers = () => request("GET", "/volunteer/list");

const changeVolunteerAccess = (access, volunteerId) =>
  request("POST", "/volunteer/changeAccess", { data: { access, volunteerId } });

export default {
  getAuth,
  login,
  logout,
  submitVolunteerForm,
  addVolunteer,
  submitGraveDiggerSurvey,
  submitHospitalSurvey,
  listVolunteers,
  changeVolunteerAccess,
};
