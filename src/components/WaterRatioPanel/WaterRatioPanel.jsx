import css from "./WaterRatioPanel.module.css";
import AddWaterButton from "../AddWaterButton/AddWaterButton";
import { useSelector } from "react-redux";
import { selectWaterConsumptionPercentage } from "../../redux/mainWater/selectors";

export default function WaterRatioPanel() {
  const todayPercent = useSelector(selectWaterConsumptionPercentage);
  // console.log(todayPercent);

  const validatedProgress = Math.min(todayPercent, 100);

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.progressContainer}>
          <h2 className={css.title}>Today</h2>

          <div className={css.progressBarContainer}>
            <div className={css.progressBar}>
              <div
                className={css.progressBarFill}
                style={{
                  width: `${validatedProgress}%`,
                }}
              >
                <div className={css.progressBarThumb}></div>
              </div>
            </div>
            <div className={css.scaleContainer}>
              <div className={css.scaleTick}>
                <span className={css.scaleText}>0%</span>
              </div>
              <div className={css.scaleTick}>
                <span className={css.scaleTextBold}>50%</span>
              </div>
              <div className={css.scaleTick}>
                <span className={css.scaleText}>100%</span>
              </div>
            </div>
          </div>
        </div>
        <AddWaterButton />
      </div>
    </>
  );
}
