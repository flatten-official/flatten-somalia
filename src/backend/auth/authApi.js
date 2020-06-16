import { AUTH_SUCCESS } from "./authActions";

const EXPIRY_WARNING = 2; // hours prior to cookie being removed

export const checkWillExpireSoon = (auth) => {
  return (
    auth.status === AUTH_SUCCESS &&
    new Date(auth.user.expiry) - EXPIRY_WARNING * 60 * 60 * 1000 <= Date.now()
  );
};

export const permissions = {
  submitForms: "submitForms",
  manageVolunteers: "manageVolunteers",
};

export const hasPermission = (auth, permission) => {
  try {
    return (
      auth.status === AUTH_SUCCESS && auth.user.permissions.includes(permission)
    );
  } catch (e) {
    console.error(e);
    return false;
  }
};
