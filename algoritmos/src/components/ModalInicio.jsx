import React, { useState, useEffect } from "react";
import gatito from "../assets/img/icons/gatito.gif";

const Modal = ({ isOpen, onClose, onStartTutorial }) => {
  const [noMostrar, setNoMostrar] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(isOpen);

  useEffect(() => {
    const noMostrarGuardado = localStorage.getItem("noMostrarTutorial") === "true";
    if (!isOpen && noMostrarGuardado) {
      setMostrarModal(false); // No mostrar el modal si se guardó la preferencia
    } else {
      setMostrarModal(isOpen); // Permitir que el botón de ayuda abra el modal
    }
  }, [isOpen]);

  if (!mostrarModal) return null;

  const handleClose = () => {
    if (noMostrar) {
      localStorage.setItem("noMostrarTutorial", "true"); // Guardar la preferencia
    }
    setMostrarModal(false); // Cierra el modal
    onClose(); // Llamar la función para cerrar desde el padre
  };

  const handleStartTutorial = () => {
    onStartTutorial(true); // Iniciar el tutorial
    setMostrarModal(false); // Cerrar el modal
    onClose(); // Llamar la función para cerrar desde el padre
  };

  return (
    <div className={`modal-overlay ${mostrarModal ? 'open' : ''}`}>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-text">
            <h2 className="modal-title" style={{ fontFamily: "'Schoolbell', cursive" }}>
              ¡Bienvenido a nuestra aplicación!
            </h2>
            <p className="modal-description">
              ¿Te gustaría realizar un recorrido guiado para conocer todas las funciones?
            </p>
            <div className="modal-buttons">
              <button className="modal-button start" onClick={handleStartTutorial}>
                Sí, mostrar tutorial
              </button>
              <button className="modal-button cancel" onClick={handleClose}>
                No, gracias
              </button>
            </div>
            <div className="modal-checkbox-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
              <input 
                type="checkbox" 
                id="noMostrarCheckbox"
                checked={noMostrar}
                onChange={() => setNoMostrar(!noMostrar)}
                style={{ width: '16px', height: '16px', transform: 'translateY(1px)' }}
              />
              <label htmlFor="noMostrarCheckbox" style={{ fontSize: '16px' }}>No volver a mostrar</label>
            </div>
            <div className="modal-gif">
              <img src={gatito} alt="Gif de bienvenida" className="gif" />
            </div>
          </div>
          <div>
            <p className="modal-description">
              O mira nuestro tutorial en video
            </p>
            <iframe
              width="530"
              height="300"
              src="https://www.youtube.com/embed/KGrVhm0rDY4?si=0LwxBWPsl2_eEld8"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;