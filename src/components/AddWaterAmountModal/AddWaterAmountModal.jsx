import { useState } from "react";
import Select from "react-select";
import css from "./AddWaterAmountModal.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import { toggleAddWaterModal } from "../../redux/mainWater/slice";
import { addWater, fetchTodayWater } from "../../redux/mainWater/operations.js";
import { useDispatch } from "react-redux";
import TimeDropdown, {
  roundToNearestFiveMinutes,
  getCurrentTime,
} from "../TimeDropdown/TimeDropdown.jsx";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "1px solid #D7E3FF",
    borderRadius: "6px",
    height: "44px",
    marginBottom: "24px",
  }),
  menu: (provided) => ({
    ...provided,
    scrollBehavior: "smooth",
    border: "1px solid #D7E3FF",
    borderRadius: "6px",
  }),
  option: (provided, { isSelected }) => ({
    ...provided,
    background: isSelected ? "#D7E3FF" : "#ffffff",
    color: "#407BFF",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#407BFF",
  }),
};

function getFormattedDate(timeInput) {
  const [inputHours, inputMinutes] = timeInput.split(":");

  const date = new Date();

  date.setHours(parseInt(inputHours), parseInt(inputMinutes), 0, 0);

  const year = date.getUTCFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

export default function AddWaterAmountModal() {
  const dispatch = useDispatch();

  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    roundToNearestFiveMinutes(getCurrentTime())
  );

  function handleTimeChange(event) {
    setCurrentTime(event.value);
  }

  function addMilliliters(amount = 50) {
    setCurrentAmount(currentAmount + amount);
  }

  function subtractMilliliters(amount = 50) {
    setCurrentAmount(Math.max(0, currentAmount - amount));
  }

  const closeModal = () => dispatch(toggleAddWaterModal());

  function sendWaterData() {
    dispatch(
      addWater({
        date: getFormattedDate(currentTime),
        waterVolume: currentAmount,
      })
    );
    dispatch(toggleAddWaterModal());
    dispatch(fetchTodayWater());
  }

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <div className={css.titlecontainer}>
          <h2 className={css.titletext}>Add water</h2>
          <button className={css.closebtn} onClick={closeModal}>
            <IoCloseOutline size="24" color="407BFF" />
          </button>
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
        <Select
          styles={customStyles}
          defaultValue={{ value: currentTime, label: currentTime }}
          onChange={handleTimeChange}
          options={TimeDropdown()}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
        <h3 className={css.subtitle}>Enter the value of the water used:</h3>
        <input
          className={css.waterAmount}
          type="text"
          value={currentAmount}
          onChange={(event) => {
            const newValue = event.target.value.replace(/[^0-9]/g, '');
            if (newValue === '') { setCurrentAmount(0) } else {
              const parcedValue = parseInt(newValue);
              if (!isNaN(parcedValue) && parcedValue <= 5000) { setCurrentAmount(parcedValue); }
            }
          }}
        />
        <div className={css.footerContainer}>
          <p className={css.amountWaterIncomeFooter}>{currentAmount + "ml"}</p>
          <button
            className={css.saveButton}
            type="button"
            onClick={sendWaterData}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
