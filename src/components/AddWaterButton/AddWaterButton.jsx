//import { useState } from "react";
import css from "./AddWaterButton.module.css";
import Icon from "../IconsSettings/Iсons";

export default function AddWaterButton() {
 // const [isModalOpen, setIsModalOpen] = useState(false);

 // const closeModal = () => {
  //  setIsModalOpen(false);
  //};

  //const openModal = () => {
  //  setIsModalOpen(true);
 // };

  return (
    <>
      <button className={css.btn} type="button" /*onClick={openModal}*/>
        <Icon id="plus-inside" width="24" height="24" className="icon-white" />
        Add Water
      </button>
    </>
  );
}