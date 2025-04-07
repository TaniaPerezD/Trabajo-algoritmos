import React, { useState, useEffect } from "react";
import SortComponent from "../../components/SortComponent";

import '../../components/sorts/SortsPage.css'; // Importamos el archivo CSS para que no se desborde la pagina aa

import Modal from "../../components/ModalInicio.jsx";
import TutorialComponente from "../../components/Tutoriales/TutorialSortComponente.jsx"; // Componente separado para el tutorial

const NodosPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(
    localStorage.getItem("noMostrarTutorial") !== "true"
  );
      
  // Inicializar showTutorial en false
  const [showTutorial, setShowTutorial] = useState(false); 
      
  // Reiniciar el estado de showTutorial antes de mostrar el modal
  const openModal = () => {
    setShowTutorial(false); // Reiniciar el estado del tutorial cuando se presiona el botón
    setIsModalOpen(true); // Abrir el modal
  };
     
  const handleStartTutorial = () => {
    console.log("Iniciando tutorial...", showTutorial);
    setIsModalOpen(false); // Cierra el modal
    setShowTutorial(true); // Inicia el tutorial
    console.log("Tutorial iniciado...", showTutorial);
  };

  const handleEndTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <>
      {/* Botón flotante para abrir el tutorial */}
      <button
        onClick={openModal}
        style={{
          position: "fixed",
          top: "100px",
          right: "20px",
          transform: "translateY(-50%)",
          backgroundImage:   "url(https://i.postimg.cc/J7FzfQFq/vecteezy-pencils-and-pens-1204726.png)",
          backgroundColor: "transparent",
          backgroundSize: "cover",
          width: "65px",
          height: "100px",
          border: "none",
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out, background-color 0.3s ease-in-out",
          zIndex: 1001,
        }}
        onMouseEnter={(e) => (e.target.style.transform = "translateY(-50%) scale(1.1)")}
        onMouseLeave={(e) => (e.target.style.transform = "translateY(-50%) scale(1)")}
      ></button>

      {/* Overlay del modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            background: "rgba(255, 255, 255, 0.4)",
            zIndex: 1000,
          }}
        >
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onStartTutorial={handleStartTutorial}
          />
        </div>
      )}

      {/* Inicia el tutorial si está activo */}
      {showTutorial && <TutorialComponente showTutorial={showTutorial} onEnd={handleEndTutorial} />}

      {/* Contenido principal */}
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          maxHeight: "300vh",
          backgroundImage:
             `url('https://img.freepik.com/vector-premium/estilo-acuarela-fondo-regreso-escuela_23-2148593948.jpg?w=1060')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          margin: 0,
          padding: 0,
          overflowX: "hidden",
        }}
      >
        <SortComponent />
      </div>
    </>
  );
};

export default NodosPage