import { useState, useEffect } from "react";
import Select from "react-select";
import css from "./AddWaterAmountModal.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import { toggleAddWaterModal } from "../../redux/mainWater/slice";
import { addWater } from "../../redux/mainWater/operations.js";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import TimeDropdown, {
  roundToNearestFiveMinutes,
  getCurrentTime,
} from "../TimeDropdown/TimeDropdown.jsx";
import { fetchTodayWater } from "../../redux/mainWater/operations.js";

export const customStyles = {
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

export function getFormattedDate(timeInput) {
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

  const [buttonBlockAmount, setButtonBlockAmount] = useState(50);
  const [inputBlockAmount, setInputBlockAmount] = useState(50);

  const [currentAmount, setCurrentAmount] = useState(50);
  const [currentTime, setCurrentTime] = useState(
    roundToNearestFiveMinutes(getCurrentTime())
  );

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  function handleTimeChange(event) {
    setCurrentTime(event.value);
  }

  function addMilliliters(amount = 50) {
    setButtonBlockAmount(Math.min(5000, buttonBlockAmount + amount));
  }

  function subtractMilliliters(amount = 50) {
    setButtonBlockAmount(Math.max(50, buttonBlockAmount - amount));
    // запобігаємо негативним значенням
  }

  const closeModal = () => dispatch(toggleAddWaterModal());

  function sendWaterData() {
    if (currentAmount < 50) {
      toast.error(
        "Please enter the amount of water used. Amount should be more than 50 ml."
      );
      return;
    }

    dispatch(
      addWater({
        date: getFormattedDate(currentTime),
        waterVolume: currentAmount,
      })
    );

    dispatch(toggleAddWaterModal());

    dispatch(fetchTodayWater());
    //не потрібно викликати fetchTodayWater(), так як на addWater ми вже зберігаємо в redux нові дані
  }

  useEffect(() => {
    setCurrentAmount(buttonBlockAmount);
  }, [buttonBlockAmount]);

  useEffect(() => {
    setCurrentAmount(inputBlockAmount);
  }, [inputBlockAmount]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };
  document.addEventListener("keydown", handleKeyDown);

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
            onBlur={() => setInputBlockAmount(buttonBlockAmount)}
          >
            <HiOutlineMinusSmall size="24" color="407BFF" />
          </button>
          <p className={css.amountWaterIncome}>{buttonBlockAmount + " ml"}</p>
          <button
            className={css.amountButton}
            type="button"
            onClick={() => addMilliliters()}
            onBlur={() => setInputBlockAmount(buttonBlockAmount)}
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
          value={inputBlockAmount}
          onChange={(event) => {
            const newValue = event.target.value.replace(/[^0-9]/g, "");
            if (newValue === "") {
              setInputBlockAmount(0);
            } else {
              const parcedValue = parseInt(newValue);
              if (!isNaN(parcedValue) && parcedValue <= 5000) {
                setInputBlockAmount(parcedValue);
              }
            }
          }}
          onBlur={() => setButtonBlockAmount(inputBlockAmount)}
        />
        <div className={css.footerContainer}>
          <p className={css.amountWaterIncomeFooter}>{currentAmount + " ml"}</p>
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
