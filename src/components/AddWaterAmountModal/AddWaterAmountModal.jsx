import { useState } from "react";
import css from "./AddWaterAmountModal.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import TimeDropdown from "../TimeDropdown/TimeDropDown.jsx";
import {
  roundToNearestFiveMinutes,
  getCurrentTime,
} from "../TimeDropdown/helpers.js";

export default function AddWaterAmountModal({
  incomeAmount,
  incomeTime,
  isUpdate,
}) {
  const [currentAmount, setCurrentAmount] = useState(incomeAmount ?? 250);
  const [currentTime, setCurrentTime] = useState(
    incomeTime ?? roundToNearestFiveMinutes(getCurrentTime())
  );

  function handleTimeChange(event) {
    console.log(event.target.value);
  }

  function addMilliliters(amount = 50) {
    setCurrentAmount(currentAmount + amount);
  }

  function subtractMilliliters(amount = 50) {
    setCurrentAmount(currentAmount - amount);
  }

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <div className={css.titlecontainer}>
          <h2 className={css.titletext}>Add water</h2>
          <span className={css.closebtn}>
            <IoCloseOutline size="24" color="407BFF" />
          </span>
        </div>
        <h3 className={css.subtitle}>Choose a value:</h3>
        <p className={css.signaturetext}>Amount of water:</p>
        <div className={css.waterInputcontainer}>
          <button
            className={css.amountButton}
            type="button"
            onClick={() => subtractMilliliters()}
          >
            <HiOutlineMinusSmall size="24" color="407BFF" />
          </button>
          <p className={css.amountWaterIncome}>{currentAmount + "ml"}</p>
          <button
            className={css.amountButton}
            type="button"
            onClick={() => addMilliliters()}
          >
            <HiOutlinePlusSmall size="24" color="407BFF" />
          </button>
        </div>
        <p className={css.signaturetext}>Recording time:</p>
        <select
          className={css.timeDropdown}
          value={currentTime}
          onChange={handleTimeChange}
        >
          {TimeDropdown()}
        </select>
        <h3 className={css.subtitle}>Enter the value of the water used:</h3>
        <input
          className={css.waterAmount}
          type="text"
          value={currentAmount}
          onChange={(event) => {
            setCurrentAmount(event.target.value);
          }}
        />
        <div className={css.footerContainer}>
          <p className={css.amountWaterIncomeFooter}>{currentAmount + "ml"}</p>
          <button className={css.saveButton} type="button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
