import css from "./WaterRatioPanel.module.css";
import AddWaterButton from "../AddWaterButton/AddWaterButton";
import { useSelector } from "react-redux";
import { selectWaterConsumptionPercentage } from "../../redux/mainWater/selectors";

export default function WaterRatioPanel() {
  const todayPercent = useSelector(selectWaterConsumptionPercentage);

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.progressContainer}>
          <h2 className={css.title}>Today</h2>
          <div className={css.progressBarContainer}>
            <div className={css.progressBar}>
              <div
                className={css.progressCompleted}
                style={{ width: `${todayPercent}%` }}
              >
                <div className={css.percentageMarker}>
                  {/* <p className={css.percentageText}>{drankTodayValue}%</p> */}
                </div>
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
