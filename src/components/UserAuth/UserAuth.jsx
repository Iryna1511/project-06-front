import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiUserCircleThin } from "react-icons/pi";
import { SlArrowDown } from "react-icons/sl";
import { logout } from "../../redux/auth/operations";
import styles from "./UserAuth.module.css";
import UserLogoModal from "../UserLogoModal/UserLogoModal.jsx";
import ModalSetting from "../ModalSettings/ModalSettings.jsx";
import Logout from "../Logout/Logout.jsx";
import closeLogoutModal from "../../components/Logout/Logout.jsx";
import openLogoutModal from "../../components/Logout/Logout.jsx";

export default function UserAuth() {
  // Що поєднує Пуджа та реакт?
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Витягуємо данні із стейту
  const { isLoggedIn } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  
  const user = useSelector((state) => state.auth.user);
  // Записуємо необхідні данні в змінні
  const avatar = user?.data?.avatar || "";
  const name = user?.data?.name || "";
  const email = user?.data?.email || "";
  // Витягуємо значення про відкритість чи закритість модального вікна з стейту
  const isLogoutModalOpen = useSelector(
    (state) => state.auth.isLogoutModalOpen
  );
  // Додаємо локальні стани для модального вікна UserLogoModal та SettingModal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  // Перемикач стану true/false для UserLogoModal
  const toggleUserModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // Відкриття SettingModal та закриття UserLogoModal
  const openSettingModal = () => {
    setIsModalOpen(false);
    setIsSettingModalOpen(true);
  };
  // Закриття SettingModal
  const closeSettingModal = () => {
    setIsSettingModalOpen(false);
  };
  // Підтягнення логаут та закриття модального вікна логаут
  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeLogoutModal());
  };
  // Отримання аватару з стейту 
  const getAvatarContent = () => {
  //  Якщо відсутні данні про юзера повертає дефолтний аватар
  if (!user) {
    return <PiUserCircleThin className={styles.defaultAvatar} />; // Потрібно змінити на синій фон та першу велику літеру імейлу
  }
  // Повертає аватар користувача
  if (avatar && avatar.trim() !== "") {
    return (
      <img src={avatar} alt="Avatar" className={styles.FotoOfUser} />
    );
  }
  // Якщо присутні данні про імя або імейл, використання  першої літери імені або імейлу
  if (name || email) {
    const letter = (name || email).charAt(0).toUpperCase();
    return <div className={styles.avatarLetter}>{letter}</div>;
  }
  // Якщо ні одна з умов не підходить повертає дефолтний аватар
  return <PiUserCircleThin className={styles.defaultAvatar} />;
};
  // Перенаправляє на сторінку входу
  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <div className={styles.userSection}>
      {isLoggedIn ? ( // Залогінений чи не залогінений користувач?
        <>
          <div className={styles.LoinedUser} onClick={toggleUserModal} >
            <span className={styles.nameOfUser}>
              {name || email} {/* Вибір між іменем та імейлом, обирається лівий, якщо відсутній правий*/}
            </span>
            {getAvatarContent()} {/*Викликається функція-обробник аватару */}
            <button className={styles.settings}>
              <SlArrowDown /> 
            </button>
          </div>
          {isModalOpen && (
            <div className={styles.modal} >
              <UserLogoModal
                openSettingModal={openSettingModal}
                openLogoutModal={() => dispatch(openLogoutModal())}
                closeUserModal={toggleUserModal}
              />
            </div>
          )}
          {isSettingModalOpen && (
            <ModalSetting
              isOpen={isSettingModalOpen}
              closeModal={closeSettingModal}
              userId={user?._id}
              token={token}
            />
          )}
          {isLogoutModalOpen && (
            <Logout
              isOpen={isLogoutModalOpen}
              closeModal={() => dispatch(closeLogoutModal())}
              handleLogout={handleLogout}
            />
          )}
        </>
      ) : (
        <div className={styles.userSectionUnregistredUser}>
          <button className={styles.signInButton} onClick={handleSignInClick}>
            Sign In
          </button>
          <div className={styles.userIconWrapper}>
            <PiUserCircleThin className={styles.userIcon} />
          </div>
        </div>
      )}
    </div>
  );
}