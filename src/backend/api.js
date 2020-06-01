export default {
  getAuth: { method: "GET", url: "/auth" },
  login: { method: "POST", url: "/auth/login" },
  logout: { method: "DELETE", url: "/auth/logout" },
  volunteerForm: { method: "POST", url: "/submit/initial" },
  addVolunteer: { method: "POST", url: "/volunteer" },
};
