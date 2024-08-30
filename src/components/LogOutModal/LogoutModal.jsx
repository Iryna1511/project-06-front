import React from 'react';
import '../LogOutModal/LogoutModal.module.css';
import { FaTimes } from 'react-icons/fa';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-title">Log out</span>
          <span className="modal-close" onClick={onClose}><FaTimes/></span>
        </div>
        <h2>Do you really want to leave?</h2>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="logout-button" onClick={onLogout}>Log out</button>
         </div>
      </div>
    </div>
  );
};

export default LogoutModal;
