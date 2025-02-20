import React from 'react';

import  gatito from "../assets/img/icons/gatito.gif";

const Modal = ({ isOpen, onClose, onStartTutorial }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-text">
            <h2 className="modal-title" style={{fontFamily: "'Schoolbell', cursive"}}>¡Bienvenido a nuestra aplicación!</h2>
            <p className="modal-description">
              ¿Te gustaría realizar un recorrido guiado para conocer todas las funciones?
            </p>
            <div className="modal-buttons">
              <button className="modal-button start" onClick={onStartTutorial}>Sí, mostrar tutorial</button>
              <button className="modal-button cancel" onClick={onClose}>No, gracias</button>
            </div>
          </div>
          <div className="modal-gif">
            <img src={gatito} alt="Gif de bienvenida" className="gif" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
