let PROJECT_URL = "https://jrnkhofvnfhrvsv.form.io";
let API_URL = "https://api.form.io";

let query = {};
window.location.search
  .substr(1)
  .split("&")
  .forEach(function (item) {
    query[item.split("=")[0]] =
      item.split("=")[1] && decodeURIComponent(item.split("=")[1]);
  });

if (query.token) {
  localStorage.setItem("formioToken", query.token);
  localStorage.removeItem("formioAppUser");
  localStorage.removeItem("formioUser");
  window.history.pushState(
    "",
    "",
    window.location.pathname + window.location.hash
  );
}

PROJECT_URL = query.projectUrl || PROJECT_URL;
API_URL = query.apiUrl || API_URL;

export const AppConfig = {
  projectUrl: PROJECT_URL,
  apiUrl: API_URL,
};

export const AuthConfig = {
  anonState: "/auth",
  authState: "/",
  login: {
    form: "user/login",
  },
  register: {
    form: "user/register",
  },
};

export const FormConfig = {
  volunteerForm: {
    formName: "volunteerFormSomalia",
    formTitle: "Volunteer Form Somalia",
  },
  addVolunteerForm: {
    formName: "addVolunteerSomalia",
    formTitle: "Add a new volunteer",
  },
};
