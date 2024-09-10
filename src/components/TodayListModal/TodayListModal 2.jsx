import css from "./TodayListModal.module.css";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import TimeDropdown from "../TimeDropdown/TimeDropDown.jsx";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodayListModal } from "../../redux/water/waterSlice.js";



export const selectWaterIntake = (state) => state.water.waterIntake.amount;

export const selectUpdateTime = (state) => state.water.waterIntake.time;



export default function TodayListModal() {

    const waterActual = useSelector(selectWaterIntake);
    const currentTime = useSelector(selectUpdateTime);
    const [amount, setAmount] = useState(waterActual);
    const [selectedTime, setSelectedTime] = useState(currentTime);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        setAmount(Math.max(amount, 50) + 50);
        dispatch(setWaterIntake(amount));
    }
    
    const handleDecrement = () => {
        setAmount(Math.max(amount, 50) - 50);
        dispatch(setWaterIntak(amount));
    };

    const changeWaterAmount = (e) => {
        setAmount(Number(e.target.value));
        dispatch(updateWaterAmount(Number(e.target.value)));
    }

    const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
    
    
    const handleCloseModal = () => dispatch(toggleTodayListModal());

    const handleSubmit = () => {
        dispatch(updateTime(selectedTime),
        dispatch(updateWaterAmount(amount)));
    }

  return (      
    <div className={css.backdrop} onClick={handleCloseModal}>
      <div className={css.modal}>
      <div className={css.titlecontainer}>
        <h2 className={css.titletext}>Edit the entered amount of water</h2>
        <span className={css.closebtn} onClick={handleCloseModal}><IoCloseOutline size="24" color="407BFF" /></span>
      </div>
      <div className={css.amountofwaterContainer}>
        <svg width={23} height={32}><use href="icons.svg#icon-Glass"></use></svg>
        <p className={css.wateramount}>{waterActual}ml</p>
        <p className={css.time}>{selectedTime}</p>
      </div>      
      <h3 className={css.subtitle}>Correct entered data:</h3>
      <p className={css.signaturetext}>Amount of water:</p>
      <div className={css.waterInputcontainer}>
        <button className={css.amountButton} type="button" onClick={handleDecrement}><HiOutlineMinusSmall size="24" color="407BFF" /></button>
        <p className={css.amountWaterIncome}>{amount}ml</p>
        <button className={css.amountButton} type="button" onClick={handleIncrement}><HiOutlinePlusSmall size="24" color="407BFF" /></button>
      </div>
     
      <p className={css.signaturetext}>Recording time:</p>
      <select className={css.timeDropdown} value={selectedTime} onChange={handleTimeChange}>
        {TimeDropdown()}
      </select>
      {/* <div className={css.timeDropdown}><TimeDropdown/></div> */}
      <h3 className={css.subtitle}>Enter the value of the water used:</h3>
              <input className={css.waterAmount} type="number" value={amount} onChange={changeWaterAmount} min={0} step={50}/>
      <div className={css.footerContainer}>
        <p className={css.amountWaterIncomeFooter}>{waterActual}ml</p>
        <button className={css.saveButton} type="submit" onClick={handleSubmit}>Save</button>
      </div>
        </div>
      </div>
  );
}
