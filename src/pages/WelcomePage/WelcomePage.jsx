import css from "./WelcomePage.module.css";
import WaterConsumptionTracker from "../../components/WaterСonsumptionTracker/WaterСonsumptionTracker";
import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater";

//тут має бути фон і контейнер для блоків(два компоненти )
export default function WelcomePage() {
  return (
    <div className={css.pageContainer}>
      <div className={css.infoContainer}>
        <WaterConsumptionTracker />
        <WhyDrinkWater />
      </div>
    </div>
  );
}
