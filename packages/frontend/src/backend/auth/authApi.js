const EXPIRY_WARNING = 70; // minutes prior to cookie being removed

export const checkWillExpireSoon = (auth) => {
  return new Date(auth.user.expiry) - EXPIRY_WARNING * 60 * 1000 <= Date.now();
};

export const permissions = {
  submitForms: "submitForms",
  manageVolunteers: "manageVolunteers",
  access: "access",
};
