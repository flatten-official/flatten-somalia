// DO NOT Modify unless you know what you're doing!!!!
const Permissions = {
  manageVolunteers: "manageVolunteers",
  submitForms: "submitForms",
  access: "access", // is the user still enabled (allowed to access the system)
};

const Surveys = {
  initialHousehold: {
    key: "initialHousehold",
  },
  hospital: {
    key: "hospital",
  },
  gravedigger: {
    key: "gravedigger",
  },
};

Object.freeze(Permissions);

module.exports = { Permissions, Surveys };
