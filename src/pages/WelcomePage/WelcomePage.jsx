import css from "./WelcomePage.module.css";
import WaterСonsumptionTracker from "../../components/WaterСonsumptionTracker/WaterСonsumptionTracker";
import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater";

//тут має бути фон і контейнер для блоків(два компоненти )
export default function WelcomePage() {
  return (
    <div className={css.pageContainer}>
      <div className={css.infoContainer}>
        <WaterСonsumptionTracker />
        <WhyDrinkWater />

      </div>
    </div>
  );
}
