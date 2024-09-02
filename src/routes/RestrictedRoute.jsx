//підготовлена логіка для публічних маршрутів

// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors";
// import { Navigate } from "react-router-dom";

// export default function RestrictedRoute({ component, redirectTo }) {
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   return isLoggedIn ? <Navigate to={redirectTo} /> : component;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx"; // Тимчасове повернення статусу авторизації

export default function RestrictedRoute({ component: Component, redirectTo }) {
  const isLoggedIn = useAuth();
  console.log(isLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : Component;
}
