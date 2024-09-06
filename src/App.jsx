import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import RestrictedRoute from "./routes/RestrictedRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ConditionalRoute from "./routes/ConditionalRoute.jsx";
import Loader from "./components/Loader/Loader.jsx";

import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage.jsx"));
const SighinPage = lazy(() => import("./pages/SigninPage/SigninPage.jsx"));
const SighupPage = lazy(() => import("./pages/SignupPage/SignupPage.jsx"));
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

import { selectIsLoading } from "./redux/auth/selectors.js";

import { refreshUser } from "./redux/auth/operations.js";

function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const checkSession = async () => {
      const token = Cookies.get("authToken"); // Перевіряємо, чи є токен у куках
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        // Оновлюємо дані користувача
        try {
          await dispatch(refreshUser()).unwrap();
        } catch (error) {
          console.error("Failed to refresh user:", error);
        }
      }
    };

    checkSession();
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
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
  );
}

export default App;
