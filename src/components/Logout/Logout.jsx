import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import css from './LogOut.module.css';
import { logout } from '../../redux/auth/operations';

const Logout = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.auth.isLogoutModalOpen);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(isOpen); // Add state management

  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    setIsLogoutModalOpen(true);

    const handleBackdropClick = (event) => {
      if (event.target.classList.contains(css.modalOverlay)) {
        closeLogoutModal();
      }
    };

    const handleEscapePress = (event) => {
      if (event.key === 'Escape') {
        closeLogoutModal();
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
      {isLogoutModalOpen && ( // Use the updated state
        <div className={css.modalOverlay}>
          <div className={css.modalContent}>
            <div className={css.modalHeader}>
              <span className={css.modalTitle}>Log out</span>
              <span className={css.modalClose} onClick={closeLogoutModal}>
                <FaTimes />
              </span>
            </div>
            <h2>Do you really want to leave?</h2>
            <div className={css.modalButtons}>
              <button className={css.cancelButton} onClick={closeLogoutModal}>Cancel</button>
              <button className={css.logoutButton} onClick={handleLogout}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
