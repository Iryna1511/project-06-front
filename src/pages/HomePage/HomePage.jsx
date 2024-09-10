import css from "./HomePage.module.css";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
// import { useSelector } from "react-redux";
import // selectIsAddWaterMdOpen,
"../../redux/mainWater/selectors";
// import AddWaterAmountModal from "../../components/AddWaterAmountModal/AddWaterAmountModal";
import DailyNorma from "../../components/DailyNorma/DailyNorma";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";

export default function HomePage() {
  // const isAddModalOpen = useSelector(selectIsAddWaterMdOpen);

  return (
    <>
      <div className={css.generalContainer}>
        <div className={css.infoContainer}>
          <div className={css.containerWater}>
            <DailyNorma />
            <WaterRatioPanel />
          </div>
        </div>

        <div className={css.tables}>
          <TodayWaterList />
          <MonthStatsTable />
        </div>
      </div>
      {/* {isAddModalOpen && <AddWaterAmountModal />} */}
    </>
  );
}
