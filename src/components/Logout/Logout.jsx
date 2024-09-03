import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import css from './LogOut.module.css';
import { logout } from '../../redux/auth/operations';
import { closeLogoutModal, openLogoutModal } from '../../redux/auth/authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.auth.isLogoutModalOpen);

  const closeModal = () => dispatch(closeLogoutModal());

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    dispatch(openLogoutModal());

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
  }, [dispatch]);

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
