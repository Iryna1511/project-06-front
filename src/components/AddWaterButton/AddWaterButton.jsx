//import { useState } from "react";
import css from "./AddWaterButton.module.css";
import Icons from "../Icons/Iсons";
import { toggleAddWaterModal } from "../../redux/mainWater/slice";
import { useDispatch } from "react-redux";

export default function AddWaterButton() {
  const dispatch = useDispatch();
  const openModal = () => dispatch(toggleAddWaterModal());
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const closeModal = () => {
  //  setIsModalOpen(false);
  //};

  //const openModal = () => {
  //  setIsModalOpen(true);
  // };

  return (
    <>
      <button className={css.btn} type="button" onClick={openModal}>
        <Icons id="plus-inside" width="24" height="24" className="icon-white" />
        Add Water
      </button>
    </>
  );
}
