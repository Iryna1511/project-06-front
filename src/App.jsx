import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import RestrictedRoute from "./RestrictedRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ConditionalRoute from "./ConditionalRoute.jsx";
import Loader from "./components/Loader/Loader.jsx";

import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage.jsx"));
const SighinPage = lazy(() => import("./pages/SigninPage/SigninPage.jsx"));
const SighupPage = lazy(() => import("./pages/SignupPage/SignupPage.jsx"));
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

function App() {
  return (
    <Suspense fallback={<Loader />}>
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
