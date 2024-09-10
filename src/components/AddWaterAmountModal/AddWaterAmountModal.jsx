import { useState } from "react";
import Select from "react-select";
import css from "./AddWaterAmountModal.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import { toggleAddWaterModal } from "../../redux/mainWater/slice";
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
  option: (provided) => ({
    ...provided,
    color: "#407BFF",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#407BFF",
  }),
};

export default function AddWaterAmountModal() {
  const dispatch = useDispatch();

  const [currentAmount, setCurrentAmount] = useState(250);
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
    setCurrentAmount(currentAmount - amount);
  }

  const closeModal = () => dispatch(toggleAddWaterModal());

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
          defaultValue={currentTime}
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
