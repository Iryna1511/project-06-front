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
 
    const [amount, setAmount] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const dispatch = useDispatch();

    const handleIncrement = () => {
        setAmount(Math.max(amount, 50) + 50);
        dispatch(setWaterIntake(amount));
    }
    
    const handleDecrement = () => {
        setAmount(Math.max(amount, 50) - 50);
        dispatch(setWaterIntake(amount));
    };

    const handleWaterAmountChange = (event) => {
    setAmount(event.target.value);
  };

    const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

    const handleSubmit = () => { 
        dispatch(addWaterIntake({amount, time}))
    }
    
    const handleCloseModal = () => dispatch(toggleTodayListModal());

    
  return (
    <div className={css.backdrop} onClick={handleCloseModal}>
      <div className={css.modal}>
      <div className={css.titlecontainer}>
        <h2 className={css.titletext}>Add water</h2>
        <span className={css.closebtn} onClick={handleCloseModal}><IoCloseOutline size="24" color="407BFF" /></span>
      </div>    
      <h3 className={css.subtitle}>Choose a value:</h3>
      <p className={css.signaturetext}>Amount of water:</p>
      <div className={css.waterInputcontainer}>
        <button className={css.amountButton}type="button" onClick={handleDecrement}><HiOutlineMinusSmall size="24" color="407BFF" /></button>
        <p className={css.amountWaterIncome}>{amount}</p>
        <button className={css.amountButton} type="button" onClick={handleIncrement}><HiOutlinePlusSmall size="24" color="407BFF" /></button>
      </div>
      <p className={css.signaturetext}>Recording time:</p>
      <div className={css.timeDropdown} value={selectedTime} onChange={handleTimeChange}>{TimeDropdown()}</div>
      <h3 className={css.subtitle}>Enter the value of the water used:</h3>
      <input className={css.waterAmount} type="text" onChange={handleWaterAmountChange}/>
      <div className={css.footerContainer}>
        <p className={css.amountWaterIncomeFooter}>{amount}</p>
        <button className={css.saveButton} type="button" onClick={handleSubmit}>Save</button>
      </div>
     </div>
    </div>
  );
}

