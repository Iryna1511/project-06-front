import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Тимчасове повернення статусу авторизації

export default function ConditionalRoute() {
  const isAuthenticated = useAuth();
  console.log(isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  } else {
    return <Navigate to="/welcome" replace />;
  }
}
