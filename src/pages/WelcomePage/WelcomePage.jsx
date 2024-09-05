import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater";
import WaterСonsumptionTracker from "../../components/WaterConsumptionTracker/WaterConsumptionTracker";
import css from "./WelcomePage.module.css";

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
