// import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import css from "./DeleteEntry.module.css";
import { deleteWaterThunk } from "../../redux/water/operations";
import { toggleDeleteEntryModal } from "../../redux/water/waterSlice";

const DeleteEntry = ({ entryId }) => {
  const dispatch = useDispatch();

  const closeModal = () => dispatch(toggleDeleteEntryModal());

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterThunk({ id: entryId })).unwrap();
      closeModal();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <div className={css.modalHeader}>
          <span className={css.modalTitle}>Delete entry</span>
          <span className={css.modalClose} onClick={closeModal}>
            <FaTimes />
          </span>
        </div>
        <h2>Are you sure you want to delete the entry?</h2>
        <div className={css.modalButtons}>
          <button className={css.cancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button className={css.deleteButton} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEntry;
