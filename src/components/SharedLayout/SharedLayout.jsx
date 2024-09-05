import { Outlet, useLocation } from "react-router-dom";
import css from "./SharedLayout.module.css"
import Header from "../Header/Header";
import clsx from "clsx";

export default function SharedLayout() {
  const location = useLocation();

  const backgroundClass = clsx({
    [css.welcomeBackground]: location.pathname === "/welcome",
    [css.signBackground]:
      location.pathname === "/signin" || location.pathname === "/signup",
    [css.homeBackground]: location.pathname === "/home",
  });

  return (
    <div className={clsx(css.background, backgroundClass)}>
      <div className={css.container}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
