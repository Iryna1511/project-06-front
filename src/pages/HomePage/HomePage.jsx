
import css from "./HomePage.module.css";
// import Calendar from "../../components/Calendar/Calendar";
import DailyNorma from "../../components/DailyNorma/DailyNorma";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";


export default function HomePage() {
  return (
    <div className={css.pageContainer}>

      <DailyNorma />
      <WaterRatioPanel />
      {/* <Calendar /> */}

      <p>тут буде контент для залогіненого користувача</p>
    </div>
  );
}
