// DO NOT Modify unless you know what you're doing!!!!
const Permissions = {
  manageVolunteers: "manageVolunteers",
  submitForms: "submitForms",
  access: "access", // is the user still enabled (allowed to access the system)
};

const Surveys = {
  initialHousehold: {
    key: "initialHousehold",
    version: "1.0.7",
    enableManualLocation: true,
    customPageNames: [
      "basicinfo",
      "people",
      "deaths",
      "socialsurveyquestions",
      "followupconsent",
    ],
  },
  hospital: {
    key: "hospital",
    version: "0.1.0",
    enableManualLocation: true,
  },
  gravedigger: {
    key: "gravedigger",
    version: "0.1.0",
    enableManualLocation: false,
  },
};

Object.freeze(Permissions);

module.exports = { Permissions, Surveys };
