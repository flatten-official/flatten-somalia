import { AUTH_SUCCESS } from "./authActions";

export const permissions = {
  submitForms: "submitForms",
  manageVolunteers: "manageVolunteers"
}

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
