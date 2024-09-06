import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";
// import Loader from "../components/Loader/Loader.jsx";

export default function PrivateRoute({
  component: Component,
  redirectTo = "/signin",
}) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} replace />;
}
