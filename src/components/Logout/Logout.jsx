import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import css from './LogOut.module.css';
import { logout } from '../../redux/auth/operations';

const Logout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();

  const closeModal = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      setIsOpen(false); 
      console.log('ggg');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally, show an error message to the user
    }
  };

  // Handle backdrop click and Escape key press
  useEffect(() => {
    const handleBackdropClick = (event) => {
      if (event.target.classList.contains(css.modalOverlay)) {
        closeModal();
      }
    };

    const handleEscapePress = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('click', handleBackdropClick);
    document.addEventListener('keydown', handleEscapePress);

    return () => {
      document.removeEventListener('click', handleBackdropClick);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, []);

  return (
    <div>
      {isOpen && (
        <div className={css.modalOverlay}>
          <div className={css.modalContent}>
            <div className={css.modalHeader}>
              <span className={css.modalTitle}>Log out</span>
              <span className={css.modalClose} onClick={closeModal}>
                <FaTimes />
              </span>
            </div>
            <h2>Do you really want to leave?</h2>
            <div className={css.modalButtons}>
              <button className={css.cancelButton} onClick={closeModal}>Cancel</button>
              <button className={css.logoutButton} onClick={handleLogout}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
