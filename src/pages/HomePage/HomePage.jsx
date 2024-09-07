
import css from "./HomePage.module.css";
// import Calendar from "../../components/Calendar/Calendar";
import DailyNorma from "../../components/DailyNorma/DailyNorma";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import AddWaterButton from "../../components/AddWaterButton/AddWaterButton";

export default function HomePage() {
  return (
    <div className={css.pageContainer}>
      <div className= {css.infoContainer}>
        <DailyNorma />
        <div className={css.panelContainer}> 
        <WaterRatioPanel />
        <AddWaterButton />
        </div>

      </div>

      {/* <Calendar /> */}

    </div>
  );
}
