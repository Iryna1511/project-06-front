import css from "./SharedLayout.module.css";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <div className={css.background}>
      <div className={css.container}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// useEffect(() => {
//   if (location.pathname === "/signin") {
//     setAction("Sign In");
//   } else if (location.pathname === "/signup") {
//     setAction("Sign Up");
//   }
// }, [location.pathname]);
