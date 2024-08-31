import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// import RestrictedRoute from "./RestrictedRoute.jsx";
// import PrivateRoute from "./PrivateRoute";

// import Header from "../src/components/Header/Header.jsx";
//цей хедер буде рендеритись на різних сторінках

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const SighinPage = lazy(() => import("./pages/SigninPage/SigninPage.jsx"));
const SighupPage = lazy(() => import("./pages/SignupPage/SignupPage.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* тимчасова заглушка для лоудера */}
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signin" element={<SighinPage />} />
        <Route path="/signup" element={<SighupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;


// Підготовлені приватні і публічні маршрути

/* <Route
          path="/signin"
          element={
            <RestrictedRoute component={<SighinPage />} redirectTo="/welcome" />
          }
        /> 
      <Route
          path="/signup"
          element={
            <RestrictedRoute component={<SighupPage />} redirectTo="/home" />
          }
        /> 
      <Route
          path="/home"
          element={
            <PrivateRoute component={<HomePage />} redirectTo="/sighin" />
          }
        />  */

