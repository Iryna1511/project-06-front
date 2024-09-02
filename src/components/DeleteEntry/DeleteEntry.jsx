import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import css from './DeleteEntry.module.css';

const DeleteEntry = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => setIsOpen(false);

  const handleEntry = () => {
    console.log('Delete Entry!');
    setIsOpen(false);
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
              <button className={css.deleteButton} onClick={handleEntry}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteEntry;
