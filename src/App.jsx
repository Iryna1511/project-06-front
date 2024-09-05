import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import RestrictedRoute from "./routes/RestrictedRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ConditionalRoute from "./routes/ConditionalRoute.jsx";

import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage.jsx"));
const SighinPage = lazy(() => import("./pages/SigninPage/SigninPage.jsx"));
const SighupPage = lazy(() => import("./pages/SignupPage/SignupPage.jsx"));
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

import axios from "axios";
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

import { refreshUser } from "./redux/auth/operations.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("refreshToken");
    if (token) {
      setAuthHeader(token); // Встановлюємо токен в заголовки
      dispatch(refreshUser()); // Отримуємо поточні дані користувача
    }
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* тимчасова заглушка для лоудера */}
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<ConditionalRoute />} />
          <Route
            path="welcome"
            element={
              <RestrictedRoute component={<WelcomePage />} redirectTo="/home" />
            }
          />
          <Route
            path="home"
            element={
              <PrivateRoute component={<HomePage />} redirectTo="/signin" />
            }
          />
          <Route
            path="signin"
            element={
              <RestrictedRoute component={<SighinPage />} redirectTo="/home" />
            }
          />
          <Route
            path="signup"
            element={
              <RestrictedRoute component={<SighupPage />} redirectTo="/home" />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
