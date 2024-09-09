import css from "./AddWaterAmountModal.module.css";
import { useDispatch, useSelector } from "react-redux";
// import ErrorMsg from "../ErrorMsg/ErrorMsg";
// import Loader from "../Loader/Loader.jsx"
// import { NavLink } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import TimeDropdown from "../TimeDropdown/TimeDropDown.jsx";
import { toggleAddWaterModal } from "../../redux/water/waterSlice.js";


// function waterAmount(
//     const waterLog = useSelector(state => state.water.waterLog)
// );

// const dispatch = useDispatch();

// const handleAddwater = (amount) => {
//     dispatch(addWaterLog({ amount, time: newDate().getTime() }));
// };

export default function AddWaterAmountModal() {
    // const waterValue = useSelector(state => state.water.value);

    const dispatch = useDispatch();

    // const handleAddWater = () => dispatch(addWaterAmount(id));

    // const waterAmount = useSelector(state => state.water.notes.waterAmount);

    // const enteredTime = useSelector(state => state.water.notes.enteredTime);

    // const handleTimeChange = (event) => {
    //     dispatch(setEnteredTime(event.target.value))
    // }
    
    const handleCloseModal = () => dispatch(toggleAddWaterModal());

  return (
    //   тут ще не доробила
    <div className={css.backdrop} onClick={handleCloseModal}>
      <div className={css.modal}>
      <div className={css.titlecontainer}>
        <h2 className={css.titletext}>Add water</h2>
        <span className={css.closebtn} onClick={handleCloseModal}><IoCloseOutline size="24" color="407BFF" /></span>
      </div>    
      <h3 className={css.subtitle}>Choose a value:</h3>
      <p className={css.signaturetext}>Amount of water:</p>
      <div className={css.waterInputcontainer}>
        <button className={css.amountButton}type="button" onClick={}><HiOutlineMinusSmall size="24" color="407BFF" /></button>
        <p className={css.amountWaterIncome}>{waterAmount}</p>
        <button className={css.amountButton} type="button" onClick={}><HiOutlinePlusSmall size="24" color="407BFF" /></button>
      </div>
     
      <p className={css.signaturetext}>Recording time:</p>
      <div className={css.timeDropdown}><TimeDropdown/></div>
      <h3 className={css.subtitle}>Enter the value of the water used:</h3>
      <input className={css.waterAmount} type="text" onChange={handleWaterAmountChange}/>
      <div className={css.footerContainer}>
        <p className={css.amountWaterIncomeFooter}>{waterAmount}</p>
        <button className={css.saveButton} type="button" onClick={}>Save</button>
      </div>
          </div>
          </div>
  );
}

// to={backLinkRef.current}

// onClick={() => dispatch(closeWindow())}
