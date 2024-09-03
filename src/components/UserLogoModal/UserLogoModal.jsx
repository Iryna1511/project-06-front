import { PiGear } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import styles from "./UserLogoModal.module.css";

export default function UserLogoModal({ openSettingModal, openLogoutModal, closeUserModal }) {
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalItem} onClick={openSettingModal}>
        <PiGear className={styles.PiGear} />
        <span className={styles.text}>Settings</span>
      </div>
      <div className={styles.modalItem} 
           onClick={() => {
             closeUserModal(); // Закриває UserLogoModal
             openLogoutModal(); // Відкриває Logout Modal
           }}>
        <TbLogout className={styles.TbLogout} />
        <span className={styles.text}>Log out</span>
      </div>
    </div>
  );
}