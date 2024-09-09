import { useState } from "react";
import { useSelector } from "react-redux";
import { selectWaterRate } from "../../redux/auth/selectors";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import css from "./DailyNorma.module.css";

const DailyNorma = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dailyNorma = useSelector(selectWaterRate);
  const formatDailyNorma = dailyNorma / 1000;
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={css.normaContainer}>
      <h2 className={css.normaHeader}>My daily norma:</h2>
      <div className={css.normaEditContainer}>
        <p className={css.normaWaterVolumeInfo}>{formatDailyNorma} L</p>
        <button
          className={css.normaEditButton}
          type="button"
          onClick={openModal}
        >
          Edit
        </button>
        {isModalOpen && (
          <DailyNormaModal onOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default DailyNorma;
