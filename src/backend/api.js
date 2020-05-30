export default {
  getAuth: { method: "get", url: "/auth" },
  login: { method: "post", url: "/auth/login" },
  logout: { method: "delete", url: "/auth/logout" },
  volunteerForm: { method: "post", url: "/submit" },
  addVolunteer: { method: "post", url: "/volunteer" },
};
