// DO NOT Modify unless you know what you're doing!!!!
const Permissions = {
  manageVolunteers: "manageVolunteers",
  submitForms: "submitForms",
  access: "access", // is the user still enabled (allowed to access the system)
};

const Surveys = {
  initialHousehold: {
    key: "initialHousehold",
    enableManualLocation: true,
  },
  hospital: {
    key: "hospital",
    enableManualLocation: true,
  },
  gravedigger: {
    key: "gravedigger",
    enableManualLocation: false,
  },
};

Object.freeze(Permissions);

module.exports = { Permissions, Surveys };
