import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PiUserCircleThin } from "react-icons/pi";
import { SlArrowDown } from "react-icons/sl";
import { logout } from "../../redux/auth/operations"; // Операція для виходу
import styles from "./UserAuth.module.css";
import UserLogoModal from "../UserLogoModal/UserLogoModal.jsx";
import ModalSetting from "../ModalSettings/ModalSettings.jsx";
import Logout from "../Logout/Logout.jsx";
import AuthForm from "../AuthForm/AuthForm.jsx"; // Імпортуємо AuthForm

export default function UserAuth() {
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Додаємо стан для AuthForm

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const openSettingModal = () => {
    setIsModalOpen(false);
    setIsSettingModalOpen(true);
  };

  const closeSettingModal = () => setIsSettingModalOpen(false);

  const openLogoutModal = () => {
    setIsModalOpen(false);
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleLogout = () => {
    dispatch(logout()); // Вихід користувача
    closeLogoutModal();
  };

  const getAvatarContent = () => {
    if (user.photoUrl) {
      return <img src={user.photoUrl} alt="Avatar" className={styles.FotoOfUser} />;
    }
    if (user.name || user.email) {
      const initial = (user.name || user.email).charAt(0).toUpperCase();
      return <div className={styles.avatarLetter}>{initial}</div>;
    }
    return <PiUserCircleThin className={styles.defaultAvatar} />;
  };

  return (
    <div className={styles.userSection}>
      {isLoggedIn ? (
        <>
          <div className={styles.LoinedUser} onClick={toggleModal}>
            <span className={styles.nameOfUser}>{user.name || user.email}</span>
            {getAvatarContent()}
            <button className={styles.settings}>
              <SlArrowDown />
            </button>
          </div>
          {isModalOpen && (
            <div className={styles.modal}>
              <UserLogoModal
                openSettingModal={openSettingModal}
                openLogoutModal={openLogoutModal}
              />
            </div>
          )}
          {isSettingModalOpen && (
            <ModalSetting
              isOpen={isSettingModalOpen}
              closeModal={closeSettingModal}
            />
          )}
          {isLogoutModalOpen && (
            <Logout
              isOpen={isLogoutModalOpen}
              closeModal={closeLogoutModal}
              handleLogout={handleLogout} // Додаємо функцію виходу
            />
          )}
        </>
      ) : (
        <div className={styles.userSectionUnregistredUser}>
          <button
            className={styles.signInButton}
            onClick={openAuthModal} // Відкриваємо AuthForm при кліку
          >
            Sign In
          </button>
          <div className={styles.userIconWrapper}>
            <PiUserCircleThin className={styles.userIcon} />
          </div>
        </div>
      )}
      {isAuthModalOpen && (
        <div className={styles.authModal}>
          <AuthForm closeModal={closeAuthModal} /> {/* Передаємо функцію закриття */}
        </div>
      )}
    </div>
  );
}