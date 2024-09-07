import css from "./TodayWaterList.module.css";
import { HiOutlineTrash, HiOutlinePencilSquare } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAddWaterMdOpen } from "../../redux/water/waterSlice";

export default function TodayWaterList() {
  const dispatch = useDispatch();
  const openModalAdd = useSelector(selectIsAddWaterMdOpen);
  const handleOpen = dispatch(openModalAdd(true));
  return (
    <div className={css.container}>
      <h2 className={css.title}>Today</h2>
      <ul className={css.list}>
        <li className={css.item}>
          <svg className={css.icon} width="26" height="26">
            <use href="icons.svg#icon-glass"></use>
          </svg>
          <p className={css.amount}>250 ml</p>
          <p className={css.time}>7:00</p>
          <div className={css.buttons}></div>
          <button className={css.btnEdit} type="button">
            <HiOutlinePencilSquare />
          </button>
          <button className={css.btnDelete} type="button">
            <HiOutlineTrash />
          </button>
        </li>
        <li className={css.item}>
          <svg className={css.icon} width="26" height="26">
            <use href="icons.svg#icon-glass"></use>
          </svg>
          <p className={css.amount}>250 ml</p>
          <p className={css.time}>7:00</p>
          <div className={css.buttons}></div>
          <button className={css.btnEdit} type="button">
            <HiOutlinePencilSquare />
          </button>
          <button className={css.btnDelete} type="button">
            <HiOutlineTrash />
          </button>
        </li>
        <li className={css.item}>
          <svg className={css.icon} width="26" height="26">
            <use href="icons.svg#icon-glass"></use>
          </svg>
          <p className={css.amount}>250 ml</p>
          <p className={css.time}>7:00</p>
          <div className={css.buttons}></div>
          <button className={css.btnEdit} type="button">
            <HiOutlinePencilSquare />
          </button>
          <button className={css.btnDelete} type="button">
            <HiOutlineTrash />
          </button>
        </li>
        <li className={css.item}>
          <svg className={css.icon} width="26" height="26">
            <use href="icons.svg#icon-glass"></use>
          </svg>
          <p className={css.amount}>250 ml</p>
          <p className={css.time}>7:00</p>
          <div className={css.buttons}></div>
          <button className={css.btnEdit} type="button">
            <HiOutlinePencilSquare />
          </button>
          <button className={css.btnDelete} type="button">
            <HiOutlineTrash />
          </button>
        </li>
        <li className={css.item}>
          <svg className={css.icon} width="26" height="26">
            <use href="icons.svg#icon-glass"></use>
          </svg>
          <p className={css.amount}>250 ml</p>
          <p className={css.time}>7:00</p>
          <div className={css.buttons}></div>
          <button className={css.btnEdit} type="button">
            <HiOutlinePencilSquare />
          </button>
          <button className={css.btnDelete} type="button">
            <HiOutlineTrash />
          </button>
        </li>
        <li className={css.item}>
          <svg className={css.icon} width="26" height="26">
            <use href="icons.svg#icon-glass"></use>
          </svg>
          <p className={css.amount}>250 ml</p>
          <p className={css.time}>7:00</p>
          <div className={css.buttons}></div>
          <button className={css.btnEdit} type="button">
            <HiOutlinePencilSquare />
          </button>
          <button className={css.btnDelete} type="button">
            <HiOutlineTrash />
          </button>
        </li>
      </ul>
      <button className={css.btnAdd} onClick={handleOpen} type="button">
        <span>
          <FaPlus />
        </span>
        Add water
      </button>
    </div>
  );
}
