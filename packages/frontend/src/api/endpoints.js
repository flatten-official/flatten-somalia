import axios from "axios";
// (incorrectly flagged because of name collision)
// eslint-disable-next-line workspaces/require-dependency
import backend from "./backend";

const axiosClient = axios.create({ baseURL: backend, withCredentials: true });

const request = (method, url, options) =>
  axiosClient.request({ method, url, ...options });

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

const submitInitialBRASurvey = (data) =>
  request("POST", "/survey/initialBRA", { data });

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
  submitInitialBRASurvey,
  listVolunteers,
  changeVolunteerAccess,
};
