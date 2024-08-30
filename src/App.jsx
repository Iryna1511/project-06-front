import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../src/components/Header/Header.jsx";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import SighinPage from "./pages/SigninPage/SigninPage.jsx";
import SighupPage from "./pages/SignupPage/SignupPage.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signin" element={<SighinPage />} />
        <Route path="/signup" element={<SighupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
