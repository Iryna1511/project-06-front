import css from "./WaterRatioPanel.module.css";
import AddWaterButton from "../AddWaterButton/AddWaterButton";


export default function WaterRatioPanel() {
  // const { drankToday } = useSelector();
  const drankTodayValue = 15;

  return (
    <>
      <h2 className={css.title}>Today</h2>

      <div className={css.wrapper}>
        <div className={css.progressContainer}>
          <div className={css.progressBar}>
            <div
              className={css.progressCompleted}
              style={{ width: `${drankTodayValue}%` }}
            >
              <div className={css.percentageMarker}>
                <p className={css.percentageText}>{drankTodayValue}%</p>
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
    </>
  );
}
