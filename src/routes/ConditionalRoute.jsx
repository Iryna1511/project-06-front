import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors.js";

export default function ConditionalRoute() {
  const isAuthenticated = useSelector(selectIsLoggedIn);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  } else {
    return <Navigate to="/welcome" replace />;
  }
}
