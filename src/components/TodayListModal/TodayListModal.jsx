import css from "./TodayListModal.module.css"
// import ErrorMsg from "../ErrorMsg/ErrorMsg";
// import Loader from "../Loader/Loader.jsx"
// import { NavLink } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import TimeDropdown from "../TimeDropdown/TimeDropDown.jsx";
import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

// import Modal from "react-modal";


// Modal.setAppElement('#root');

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
//   overlay: {
//     background: 'rgba(0, 0, 0, 0.8)',
//   },
// };

const initialState = { 
    modal: {
        isModalOpen: false,
        waterAmount: 0,
        enteredTime: '',
        },
}

export const getWater = state => state.water;
export const getTime = state => state.time; 
// селектор для отримання введених даних з елементу списку введеної води і часу

export const selectIsModalOpen = state => state.modal.isModalOpen;
// селектор для відкриття модального вікна




export default function TodayListModal({water: {amount, time, id}}) {
 
  // const waterAmount = useSelector(state => state.waterAmount);

  
    // const isError = useSelector(selectError);
    // const isLoading = useSelector(selectLoading);
    const dispatch = useDispatch();
   const isModalOpen = useSelector(selectIsModalOpen);
    const handleAddWaterChanges = () => dispatch(addWaterAMount(id));
    
    const handleCloseModal = () => dispatch(toggleModal());

  return (
      
    <div className={css.backdrop} onClick={handleCloseModal}>
      <div className={css.modal}>
      {/* <Modal style={customStyles}> */}
      {/* {isError && <ErrorMsg/>} */}
      {/* <NavLink className={css.close}><IoCloseOutline /></NavLink> */}
      {/* {isLoading && <Loader />} */}
      <div className={css.titlecontainer}>
        <h2 className={css.titletext}>Edit the entered amount of water</h2>
        <span className={css.closebtn} onClick={handleCloseModal}><IoCloseOutline size="24" color="407BFF" /></span>
      </div>
      {/* <p className={css.defaulttext}>No notes yet</p> */}
      <div className={css.amountofwaterContainer}>
        <svg width={23} height={32}><use href="icons.svg#icon-Glass"></use></svg>
        <p className={css.wateramount}>250 ml</p>
        <p className={css.time}>{currentTime}</p>
      </div>      
      <h3 className={css.subtitle}>Correct entered data:</h3>
      <p className={css.signaturetext}>Amount of water:</p>
      <div className={css.waterInputcontainer}>
        <button className={css.amountButton} type="button" onClick={minusWater}><HiOutlineMinusSmall size="24" color="407BFF" /></button>
        <p className={css.amountWaterIncome}>{waterAmount}</p>
        <button className={css.amountButton} type="button" onClick={plusWater}><HiOutlinePlusSmall size="24" color="407BFF" /></button>
      </div>
     
      <p className={css.signaturetext}>Recording time:</p>
      <div className={css.timeDropdown}><TimeDropdown/></div>
      <h3 className={css.subtitle}>Enter the value of the water used:</h3>
      <input className={css.waterAmount} type="text" onChange={handleWaterAmountChange}/>
      <div className={css.footerContainer}>
        <p className={css.amountWaterIncomeFooter}>{waterAmount}</p>
        <button className={css.saveButton} type="submit">Save</button>
      </div>
        {/* </Modal> */}
        </div>
    </div>
   
  );
}

// to={backLinkRef.current} 

// onClick={() => dispatch(closeWindow())}