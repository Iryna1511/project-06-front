import css from "./TodayListModal.module.css";
import { useMemo, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { toggleTodayListModal } from "../../redux/mainWater/slice.js";

import Select from "react-select";
import { customStyles } from "../AddWaterAmountModal/AddWaterAmountModal.jsx";
import TimeDropdown from "../TimeDropdown/TimeDropdown.jsx";
import { getFormattedDate } from "../AddWaterAmountModal/AddWaterAmountModal.jsx";
import {
  editWaterConsumption,
  fetchTodayWater,
} from "../../redux/mainWater/operations.js";

// function createIsoDate(time) {
//   const [hours, minutes] = time.split(":").map(Number);
//   const currentDate = new Date();
//   currentDate.setHours(hours);
//   currentDate.setMinutes(minutes);
//   currentDate.setSeconds(0);
//   currentDate.setMilliseconds(null);
//   const isoString = currentDate.toISOString().slice(0, 19);
//   return `${isoString}Z`;
// }

export default function TodayListModal({ waterObj, onClose }) {
  const { _id, date, waterVolume } = useMemo(() => {
    return waterObj;
  }, [waterObj]);

  const formatTime = (time) => {
    return time.slice(11, 16);
  };
  const time = formatTime(date);

  const [amount, setAmount] = useState(waterVolume);
  const [selectedTime, setSelectedTime] = useState(time);

  // З AddWaterAmount Modal
  // const [selectedTime, setSelectedTime] = useState(
  //   roundToNearestFiveMinutes(getCurrentTime())
  // );
  const dispatch = useDispatch();

  const handleIncrement = () => {
    setAmount(Math.max(amount, 50) + 50);
  };

  const handleDecrement = (value = 50) => {
    setAmount(Math.max(0, amount - value));
  };

  // const changeWaterAmount = (e) => {
  //   setAmount(Number(e.target.value));
  // }; прибираємо при валідації інпуту

  const handleTimeChange = (event) => {
    setSelectedTime(event.value);
  };

  // З AddWaterAmount Modal
  // function handleTimeChange(event) {
  //   setSelectedTime(event.value);
  // }

  const handleCloseModal = () => {
    onClose();
    dispatch(toggleTodayListModal());
  };
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleSubmit = async () => {
    const isoDate = getFormattedDate(selectedTime);
    try {
      await dispatch(
        editWaterConsumption({
          id: _id,
          updates: {
            waterVolume: amount,
            date: isoDate,
          },
        })
      ).unwrap();
      dispatch(fetchTodayWater());
      console.log({ _id, amount, isoDate });
    } catch (error) {
      console.error("Помилка оновлення:", error);
    }
    handleCloseModal();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <div className={css.titlecontainer}>
          <h2 className={css.titletext}>Edit the entered amount of water</h2>
          <span className={css.closebtn} onClick={handleCloseModal}>
            <IoCloseOutline size="24" color="407BFF" />
          </span>
        </div>
        <div className={css.amountofwaterContainer}>
          <svg width={23} height={32}>
            <use href="icons.svg#icon-Glass"></use>
          </svg>
          <p className={css.wateramount}>{amount} ml</p>
          <p className={css.time}>{selectedTime}</p>
        </div>
        <h3 className={css.subtitle}>Correct entered data:</h3>
        <p className={css.signaturetext}>Amount of water:</p>
        <div className={css.waterInputcontainer}>
          <button
            className={css.amountButton}
            type="button"
            onClick={handleDecrement}
          >
            <HiOutlineMinusSmall size="24" color="407BFF" />
          </button>
          <p className={css.amountWaterIncome}>{amount + "ml"}</p>
          <button
            className={css.amountButton}
            type="button"
            onClick={handleIncrement}
          >
            <HiOutlinePlusSmall size="24" color="407BFF" />
          </button>
        </div>

        <p className={css.signaturetext}>Recording time:</p>
        <Select
          styles={customStyles}
          defaultValue={{ value: selectedTime, label: selectedTime }}
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
          type="number"
          value={amount}
          onChange={(event) => {
            const newValue = event.target.value.replace(/[^0-9]/g, ' ');
            const parcedValue = parseInt(newValue);
            if (!isNaN(parcedValue) && parcedValue <= 5000)
            { setAmount(parcedValue); }
          }}
        />
        <div className={css.footerContainer}>
          <p className={css.amountWaterIncomeFooter}>{amount + "ml"}</p>
          <button
            className={css.saveButton}
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
