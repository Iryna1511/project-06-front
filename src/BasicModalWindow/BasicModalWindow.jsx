import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import Icons from "../Icons/Icons";
import css from "./BasicModalWindow.module.css";

export const BasicModalWindow = ({ onOpen, children, title, onClose }) => {
  const modalWindowRoot = document.querySelector("#modal-root");

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.code === "Escape") {
        handleClose();
      }
    };

    if (onOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onOpen, handleClose]);

  if (!onOpen) {
    return null;
  }

  const ModalContentWindow = (
    <div className={css.modalBox} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeader}>
          <h2>{title}</h2>
          <div className={css.offBtn} onClick={onClose}>
            <Icons id="x-mark" width={24} height={24} className="icon-blue" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );

  return createPortal(ModalContentWindow, modalWindowRoot);
};

BasicModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isShow: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};