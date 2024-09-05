import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  redirectTo = "/signin",
}) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return <b>Refreshing...</b>; // тут буде спінер завантаження
  }

  return isLoggedIn ? Component : <Navigate to={redirectTo} replace />;
}
