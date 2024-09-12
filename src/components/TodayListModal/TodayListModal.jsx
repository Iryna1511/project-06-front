import css from "./TodayListModal.module.css";
import { useMemo, useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { toggleTodayListModal } from "../../redux/mainWater/slice.js";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { customStyles } from "../AddWaterAmountModal/AddWaterAmountModal.jsx";
import TimeDropdown from "../TimeDropdown/TimeDropdown.jsx";
import { getFormattedDate } from "../AddWaterAmountModal/AddWaterAmountModal.jsx";
import {
  editWaterConsumption,
  fetchTodayWater,
} from "../../redux/mainWater/operations.js";

export default function TodayListModal({ waterObj, onClose }) {
  const { _id, date, waterVolume } = useMemo(() => {
    return waterObj;
  }, [waterObj]);

  const formatTime = (time) => {
    return time.slice(11, 16);
  };
  const time = formatTime(date);

  const [buttonBlockAmount, setButtonBlockAmount] = useState(waterVolume);
  const [inputBlockAmount, setInputBlockAmount] = useState(waterVolume);

  const [amount, setAmount] = useState(waterVolume);
  const [selectedTime, setSelectedTime] = useState(time);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    setButtonBlockAmount(Math.min(5000, buttonBlockAmount + 50));
  };

  const handleDecrement = () => {
    setButtonBlockAmount(Math.max(50, buttonBlockAmount - 50));
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.value);
  };

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
    if (amount < 50) {
      toast.error(
        "Please enter the amount of water used. Amount should be more than 50 ml."
      );
      return;
    }

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

  useEffect(() => {
    setAmount(buttonBlockAmount);
  }, [buttonBlockAmount]);

  useEffect(() => {
    setAmount(inputBlockAmount);
  }, [inputBlockAmount]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };
  document.addEventListener("keydown", handleKeyDown);

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
            <use href="icons.svg#icon-glass"></use>
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
            onBlur={() => setInputBlockAmount(buttonBlockAmount)}
          >
            <HiOutlineMinusSmall size="24" color="407BFF" />
          </button>
          <p className={css.amountWaterIncome}>{buttonBlockAmount + " ml"}</p>
          <button
            className={css.amountButton}
            type="button"
            onClick={handleIncrement}
            onBlur={() => setInputBlockAmount(buttonBlockAmount)}
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
          type="text"
          value={inputBlockAmount}
          onChange={(event) => {
            const newValue = event.target.value.replace(/[^0-9]/g, " ");
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
          <p className={css.amountWaterIncomeFooter}>{amount + " ml"}</p>
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
