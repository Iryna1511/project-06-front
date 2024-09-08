import css from "./HomePage.module.css";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import { useSelector } from "react-redux";
import {
  // selectIsAddWaterMdOpen,
  // selectIsTodayListMdOpen,
  selectIsDeleteEntryOpen,
} from "../../redux/waterDetails/waterSelectors"; // селектор стану
// import AddWaterAmountModal from "../../components/AddWaterAmountModal/AddWaterAmountModal";
// import TodayListModal from "../../components/TodayListModal/TodayListModal";
import DeleteEntry from "../../components/DeleteEntry/DeleteEntry";

// import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";

export default function HomePage() {
  // const isAddModalOpen = useSelector(selectIsAddWaterMdOpen);
  // const isEditModalOpen = useSelector(selectIsTodayListMdOpen);
  const isDeleteModalOpen = useSelector(selectIsDeleteEntryOpen);

  return (
    <>
      <div className={css.tables}>
        <TodayWaterList />
        {/* <MonthStatsTable /> */}
      </div>
      {/* {isAddModalOpen && <AddWaterAmountModal />}
      {isEditModalOpen && <TodayListModal />} */}
      {isDeleteModalOpen && <DeleteEntry />}
    </>
  );
}
