// import Main from "../../components/Main/Main";
import css from "./WelcomePage.module.css";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";

// export default function WelcomePage() {
//   return <Main />;
// }

export default function WelcomePage() {
  return (
    <div className={css.tables}>
      <TodayWaterList />
      <div className={css.month}>Month stats table</div>
    </div>
  );
}
