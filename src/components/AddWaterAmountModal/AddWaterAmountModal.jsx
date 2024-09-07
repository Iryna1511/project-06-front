import css from "./AddWaterAmountModal.module.css";
import { useDispatch, useSelector } from "react-redux";
// import ErrorMsg from "../ErrorMsg/ErrorMsg";
// import Loader from "../Loader/Loader.jsx"
// import { NavLink } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import TimeDropdown from "../TimeDropdown/TimeDropDown.jsx";

import { selectIsAddWaterMdOpen } from "../../redux/water/waterSlice";

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

export default function AddWaterAmountModal({ water: { amount, id } }) {
  //  const isModalOpen = useSelector(selectIsModalOpen);
  // const isError = useSelector(selectError);
  // const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsAddWaterMdOpen); // відкриття модалки
  const handleAddWaterChanges = () => dispatch(addWaterAMount(id));

  const handleClose = () => dispatch(isModalOpen(false));
  //   useEffect(() => {
  //     dispatch(fetchContacts())
  //   }, [dispatch])

  return (
    <>
      {isModalOpen && (
        <div className={css.backdrop} onClick={handleClose}>
          <div className={css.modal}>
            {/* <Modal style={customStyles}> */}
            {/* {isError && <ErrorMsg/>} */}
            {/* <NavLink className={css.close}><IoCloseOutline /></NavLink> */}
            {/* {isLoading && <Loader />} */}
            <div className={css.titlecontainer}>
              <h2 className={css.titletext}>Add water</h2>
              <span className={css.closebtn} onClick={handleClose}>
                <IoCloseOutline size="24" color="407BFF" />
              </span>
            </div>
            <h3 className={css.subtitle}>Choose a value:</h3>
            <p className={css.signaturetext}>Amount of water:</p>
            <div className={css.waterInputcontainer}>
              <button
                className={css.amountButton}
                type="button"
                onClick={minusWater}
              >
                <HiOutlineMinusSmall size="24" color="407BFF" />
              </button>
              <p className={css.amountWaterIncome}>{amount}</p>
              <button
                className={css.amountButton}
                type="button"
                onClick={plusWater}
              >
                <HiOutlinePlusSmall size="24" color="407BFF" />
              </button>
            </div>

            <p className={css.signaturetext}>Recording time:</p>
            <div className={css.timeDropdown}>
              <TimeDropdown />
            </div>
            <h3 className={css.subtitle}>Enter the value of the water used:</h3>
            <input
              className={css.waterAmount}
              type="text"
              onChange={handleWaterAmountChange}
            />
            <div className={css.footerContainer}>
              <p className={css.amountWaterIncomeFooter}>250 ml</p>
              <button
                className={css.saveButton}
                type="button"
                onClick={handleAddWaterChanges}
              >
                Save
              </button>
            </div>
            {/* </Modal> */}
          </div>
        </div>
      )}
    </>
  );
}

// to={backLinkRef.current}

// onClick={() => dispatch(closeWindow())}
