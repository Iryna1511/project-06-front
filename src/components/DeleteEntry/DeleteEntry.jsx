import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux'; 
import css from './DeleteEntry.module.css';
import { deleteWaterThunk } from '../../redux/water/operations';

const DeleteEntry = ({ entryId }) => { 
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch(); 

  const closeModal = () => setIsOpen(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterThunk({ id: entryId })).unwrap();
      setIsOpen(false);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div>
      {isOpen && (
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
              <button className={css.cancelButton} onClick={closeModal}>Cancel</button>
              <button className={css.deleteButton} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteEntry;
