import css from "./HomePage.module.css";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";

// import Calendar from "../../components/Calendar/Calendar";

export default function HomePage() {
  return (
    <div className={css.tables}>
      <TodayWaterList />
      <div className={css.month}>Month stats table</div>
    </div>
  );
}
