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
import { openLogoutModal, closeLogoutModal } from '../../redux/auth/authSlice';

export default function UserAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoggedIn, token } = useSelector((state) => state.auth);
  const isLogoutModalOpen = useSelector((state) => state.auth.isLogoutModalOpen);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const openSettingModal = () => {
    setIsModalOpen(false); 
    setIsSettingModalOpen(true); 
  };

  const closeSettingModal = () => setIsSettingModalOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeLogoutModal()); 
  };

  const getAvatarContent = () => {
    if (user?.photoUrl) {
      return (
        <img src={user.photoUrl} alt="Avatar" className={styles.FotoOfUser} />
      );
    }
    if (user?.name || user?.email) {
      const initial = (user.name || user.email).charAt(0).toUpperCase();
      return <div className={styles.avatarLetter}>{initial}</div>;
    }
    return <PiUserCircleThin className={styles.defaultAvatar} />;
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <div className={styles.userSection}>
      {isLoggedIn ? (
        <>
          <div className={styles.LoinedUser} onClick={toggleModal}>
            <span className={styles.nameOfUser}>
              {user?.name || user?.email}
            </span>
            {getAvatarContent()}
            <button className={styles.settings}>
              <SlArrowDown />
            </button>
          </div>
          {isModalOpen && (
            <div className={styles.modal}>
              <UserLogoModal
                openSettingModal={openSettingModal}
                openLogoutModal={() => dispatch(openLogoutModal())} 
                closeUserModal={toggleModal} 
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