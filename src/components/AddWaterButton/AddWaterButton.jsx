//import { useState } from "react";
import css from "./AddWaterButton.module.css";
import Icons from "../Icons/Iсons";
import AddWaterAmountModal from "../AddWaterAmountModal/AddWaterAmountModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddWaterModal } from "../../redux/mainWater/slice";

export default function AddWaterButton() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.water.isAddWaterModalOpen); // Отримуємо стан модального вікна з Redux
  

  const openModal = () => {
    dispatch(toggleAddWaterModal()); // Викликаємо дію для відкриття/закриття модального вікна
  };

  return (
    <>
      <button className={css.btn} type="button"  onClick={openModal}>
        <Icons id="plus-inside" width="24" height="24" className="icon-white" />
        Add Water
        {isModalOpen && <AddWaterAmountModal />}
      </button>
    </>
  );
}




