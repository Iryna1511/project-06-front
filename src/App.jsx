import "./App.css";
import Header from "../src/components/Header/Header.jsx";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Logout from "./components/LogOut/Logout.jsx";

function App() {
  return (
    <div>
      <Header />

      <WelcomePage />
      <Logout />
    </div>
  );
}

export default App;
