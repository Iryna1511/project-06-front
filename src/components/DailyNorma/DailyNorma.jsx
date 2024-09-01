import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import DailyNormaModalWindow from "../DailyNormaModalWindow/DailyNormaModalWindow";
import css from "./DailyNorma.module.css";

const DailyNorma = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dailyNorma } = useSelector(selectUser);
  const waterNorma = dailyNorma / 1000;
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
        <p className={css.normaWaterVolumeInfo}> {waterNorma} L</p>
        <button className={css.normaEditButton} type="button" onClick={openModal}>
          Edit
        </button>
        {isModalOpen && (
          <DailyNormaModalWindow onOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default DailyNorma;