import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import css from "./DeleteEntry.module.css";
import { deleteWaterThunk } from "../../redux/water/operations";
import { toggleDeleteEntryModal } from "../../redux/waterDetails/waterSlice";

const DeleteEntry = ({ entryId }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.water.isDeleteEntryModalOpen);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(isOpen);

  const closeModal = () => {
    setIsDeleteModalOpen(false);
    dispatch(toggleDeleteEntryModal());
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterThunk({ id: entryId })).unwrap();
      closeModal();
    } catch (error) {
      console.error("Delete failed:", error);
      closeModal(); // Close modal even if there is an error
    }
  };

  useEffect(() => {
    setIsDeleteModalOpen(true);

    const handleBackdropClick = (event) => {
      if (event.target.classList.contains(css.modalOverlay)) {
        closeModal();
      }
    };

    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("click", handleBackdropClick);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("click", handleBackdropClick);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [dispatch]);

  return (
    <div>
      {isDeleteModalOpen && (
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
      )}
    </div>
  );
};

export default DeleteEntry;
  