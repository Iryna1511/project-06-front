import WaterConsumptionTracker from "../WaterConsumptionTracker/WaterConsumptionTracker";
import WhyDrinkWater from "../WhyDrinkWater/WhyDrinkWater";
import css from "./Main.module.css";

export default function Main() {
  return (
    <div className={css.infoContainer}>
      <WaterConsumptionTracker />
      <WhyDrinkWater />
    </div>
  );
}
