import css from "./TodayWaterList.module.css";
import { HiOutlineTrash, HiOutlinePencilSquare } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWaterToday,
  selectIsDeleteEntryOpen,
} from "../../redux/waterIrina/irinaSelectors";
import {
  toggleAddWaterModal,
  toggleTodayListModal,
  toggleDeleteEntryModal,
} from "../../redux/waterIrina/irinaSlice";
import { fetchTodayWater } from "../../redux/waterIrina/irinaOperations";
import { useEffect, useState } from "react";

import DeleteEntry from "../../components/DeleteEntry/DeleteEntry";

export default function TodayWaterList() {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const isOpen = useSelector(selectIsDeleteEntryOpen);

  useEffect(() => {
    dispatch(fetchTodayWater());
  }, [dispatch]);
  const waterData = useSelector(selectWaterToday);

  const handleOpenAdd = () => dispatch(toggleAddWaterModal());
  const handleOpenEdit = () => dispatch(toggleTodayListModal());
  const handleOpenDelete = (id) => {
    setSelectedId(id);
    dispatch(toggleDeleteEntryModal());
  };

  const formatTime = (time) => {
    return time.slice(11, 16);
  };

  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>Today</h2>
        <ul className={css.list}>
          {waterData && waterData.length > 0 ? (
            waterData.map(({ _id, date, waterVolume }) => {
              return (
                <li key={_id} className={css.item}>
                  <svg className={css.icon} width="26" height="26">
                    <use href="icons.svg#icon-glass"></use>
                  </svg>
                  <p className={css.amount}>{waterVolume}</p>
                  <p className={css.time}>{formatTime(date)}</p>
                  <button
                    className={css.btnEdit}
                    onClick={handleOpenEdit}
                    type="button"
                  >
                    <HiOutlinePencilSquare />
                  </button>
                  <button
                    className={css.btnDelete}
                    onClick={() => handleOpenDelete(_id)}
                    type="button"
                  >
                    <HiOutlineTrash />
                  </button>
                </li>
              );
            })
          ) : (
            <p>There is no enteries</p>
          )}
        </ul>
        <button className={css.btnAdd} onClick={handleOpenAdd} type="button">
          <span>
            <FaPlus />
          </span>
          Add water
        </button>
      </div>
      {selectedId && isOpen && (
        <DeleteEntry id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </>
  );
}
