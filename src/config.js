// let PROJECT_URL = "https://forms.flatten.ca/yordvlchrlvervl" // master
let PROJECT_URL = "https://formio-6eoeawk53a-uc.a.run.app/staging-yordvlchrlvervl"; // staging

// let API_URL = "https://forms.flatten.ca/yordvlchrlvervl"; // master
let API_URL = "https://forms.flatten.ca/staging-yordvlchrlvervl"; // staging

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
    form: "somalia/volunteer/login",
  }
};

export const FormConfig = {
  volunteerForm: {
    formName: "volunteerdatacollection",
    formTitle: "Volunteer Form Somalia",
  },
  addVolunteerForm: {
    formName: "addVolunteerSomalia",
    formTitle: "Add a new volunteer",
  },
};
