//підготовлена логіка для приватних маршрутів

// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors";
// import { Navigate } from "react-router-dom";

// export default function PrivateRoute({ component, redirectTo }) {
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   return isLoggedIn ? component : <Navigate to={redirectTo} />;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.jsx"; // Тимчасове повернення статусу авторизації

export default function PrivateRoute({
  component: Component,
  redirectTo = "/signin",
}) {
  const isLoggedIn = useAuth();

  return isLoggedIn ? Component : <Navigate to={redirectTo} replace />;
}
