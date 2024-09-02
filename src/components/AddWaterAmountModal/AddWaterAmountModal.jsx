import css from "./AddWaterAmountModal.module.css"
// import ErrorMsg from "../ErrorMsg/ErrorMsg";
// import Loader from "../Loader/Loader.jsx"
// import { NavLink } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import TimeDropdown from "../TimeDropdown/TimeDropDown.jsx";

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


export default function AddWaterAmountModal() {
    //  const isModalOpen = useSelector(selectIsModalOpen);
    // const isError = useSelector(selectError);
    // const isLoading = useSelector(selectLoading);
//     const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchContacts())
//   }, [dispatch])

  return (
      
    <div className={css.backdrop}>
      <div className={css.modal}>
      {/* <Modal style={customStyles}> */}
      {/* {isError && <ErrorMsg/>} */}
      {/* <NavLink className={css.close}><IoCloseOutline /></NavLink> */}
      {/* {isLoading && <Loader />} */}
      <div className={css.titlecontainer}>
        <h2 className={css.titletext}>Add water</h2>
          <IoCloseOutline size="24" color="407BFF" />
      </div>    
      <h3 className={css.subtitle}>Choose a value:</h3>
      <p className={css.signaturetext}>Amount of water:</p>
      <div className={css.waterInputcontainer}>
        <button className={css.amountButton}><HiOutlineMinusSmall size="24" color="407BFF" /></button>
        <p className={css.amountWaterIncome}>250 ml</p>
        <button className={css.amountButton}><HiOutlinePlusSmall size="24" color="407BFF" /></button>
      </div>
     
      <p className={css.signaturetext}>Recording time:</p>
      <div className={css.timeDropdown}><TimeDropdown/></div>
      <h3 className={css.subtitle}>Enter the value of the water used:</h3>
      <input className={css.waterAmount} type="text" />
      <div className={css.footerContainer}>
        <p className={css.amountWaterIncomeFooter}>250 ml</p>
        <button className={css.saveButton} type="button">Save</button>
      </div>
        {/* </Modal> */}
        </div>
    </div>
   
  );
}

// to={backLinkRef.current} 

// onClick={() => dispatch(closeWindow())}