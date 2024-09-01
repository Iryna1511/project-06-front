import css from "./SharedLayout.module.css";
import Header from "../SharedLayout/SharedLayout";

export default function SharedLayout() {
  return (
    <div className={css.container}>
      <Header />
    </div>
  );
}
