import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  redirectTo = "/signin",
}) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log(isLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} replace />;
}
