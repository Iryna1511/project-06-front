import { useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { SlArrowDown } from "react-icons/sl";
import styles from "./UserAuth.module.css";

export default function UserAuth({ isUserLoggedIn, userName, userPhoto, userEmail }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getAvatarContent = () => {
    if (userPhoto) {
      return <img src={userPhoto} alt="Avatar" className={styles.FotoOfUser} />;
    }
    if (userName || userEmail) {
      const initial = (userName || userEmail).charAt(0).toUpperCase();
      return <div className={styles.avatarLetter}>{initial}</div>;
    }
    return <PiUserCircleThin className={styles.defaultAvatar} />;
  };

  const displayName = () => {
    if (userName) {
      return userName;
    }
    return userEmail;
  };

  return (
    <div className={styles.userSection}>
      {isUserLoggedIn ? (
        <>
          <div className={styles.LoinedUser} onClick={toggleModal}>
            <span className={styles.nameOfUser}>{displayName()}</span>
            {getAvatarContent()}
            <button className={styles.settings}>
              <SlArrowDown />
            </button>
          </div>
          {isModalOpen && (
            <div className={styles.modal}>
              <p>Modal content will go here</p>
            </div>
          )}
        </>
      ) : (
        <div className={styles.userSection}>
          <button className={styles.signInButton}>Sign In</button>
          <div className={styles.userIcon}>
            <PiUserCircleThin className={styles.userIcon} />
          </div>
        </div>
      )}
    </div>
  );
}