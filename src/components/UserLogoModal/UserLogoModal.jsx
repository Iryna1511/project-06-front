import { useEffect, useRef } from "react";
import { PiGear } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import styles from "./UserLogoModal.module.css";

export default function UserLogoModal({
  openSettingModal,
  openLogoutModal,
  closeUserModal,
}) {
  const modalRef = useRef(null); // Створюємо реф для модального вікна

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeUserModal(); // Закриваємо модальне вікно при кліку поза ним
      }
    };

    // Додаємо обробник події
    document.addEventListener("mousedown", handleClickOutside);

    // Очищаємо обробник при демонтунні компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeUserModal]);

  return (
    <div ref={modalRef} className={styles.modalContent}>
      <div className={styles.modalItem} onClick={openSettingModal}>
        <PiGear className={styles.PiGear} />
        <span className={styles.text}>Settings</span>
      </div>
      <div
        className={styles.modalItem}
        onClick={() => {
          openLogoutModal(); // Відкриває Logout Modal
          closeUserModal(); // Закриває UserLogoModal
        }}
      >
        <TbLogout className={styles.TbLogout} />
        <span className={styles.text}>Log out</span>
      </div>
    </div>
  );
}