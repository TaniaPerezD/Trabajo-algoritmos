import React, { useState } from "react";
import gatito from "../assets/img/icons/gatito.gif";

const Modal = ({ isOpen, onClose, onStartTutorial }) => {
  const [noMostrar, setNoMostrar] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (noMostrar) {
      localStorage.setItem("noMostrarTutorial", "true");
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
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
              <button className="modal-button start" onClick={onStartTutorial}>
                Sí, mostrar tutorial
              </button>
              <button className="modal-button cancel" onClick={handleClose}>
                No, gracias
              </button>
            </div>
            <div>
              <input 
                type="checkbox" 
                id="noMostrarCheckbox"
                checked={noMostrar}
                onChange={() => setNoMostrar(!noMostrar)}
              />
              <label htmlFor="noMostrarCheckbox">No volver a mostrar</label>
            </div>
            <div className="modal-gif">
            <img src={gatito} alt="Gif de bienvenida" className="gif" />
          </div>
          </div>
          <div>
            <p className="modal-description">
                O mira nuestro tutorial en video
              </p>
            <iframe width="530" height="300" src="https://www.youtube.com/embed/KGrVhm0rDY4?si=0LwxBWPsl2_eEld8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;