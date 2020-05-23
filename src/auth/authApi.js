import {
  AUTH_INITIALISING,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from "./authActions";

export const hasPermission = (auth, permission) => {
  try {
    return (
      auth.status == AUTH_SUCCESS &&
      auth.user.permissions.includes("submitForms")
    );
  } catch (e) {
    console.error(e);
    return false;
  }
};
