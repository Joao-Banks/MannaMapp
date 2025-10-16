// src/components/Modal.js
import React from "react";
import ReactDOM from "react-dom";
import "./styles/Modal.css";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body // 👈 renders above everything in the DOM
  );
}

export default Modal;
