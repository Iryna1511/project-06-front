import css from "./SharedLayout.module.css";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <div className={css.container}>
      <Header />
      <main className={css.mainContainer}>
        <Outlet />
      </main>
    </div>
  );
}
