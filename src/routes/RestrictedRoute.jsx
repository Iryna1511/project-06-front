import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";

export default function RestrictedRoute({ component: Component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // console.log(isLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : Component;
}
