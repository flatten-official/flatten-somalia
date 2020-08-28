import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  logout,
  UNAUTHENTICATED_REASONS,
} from "../../backend/auth/authActions";

export const useExpireSoonCheck = (minutes) => {
  const expiry = useSelector((state) => state.auth.user.expiry);
  const dispatch = useDispatch();

  useEffect(() => {
    const willExpireSoon = new Date(expiry) - minutes * 60 * 1000 <= Date.now();

    if (willExpireSoon)
      dispatch(logout(true, UNAUTHENTICATED_REASONS.expireSoon));
  }, [expiry, dispatch, minutes]);
};
