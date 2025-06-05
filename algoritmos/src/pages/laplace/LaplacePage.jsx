import React, { useState, useEffect } from "react";

import Modal from "../../components/ModalInicio.jsx";
import TutorialComponente from "../../components/Tutoriales/TutorialNorwestComponente.jsx"; // Componente separado para el tutorial
import LaPlace from '../../assets/img/fuzzy/laplace.png'; // Importa la imagen de LaPlace

const LaplacePage = () => {
  //Para el tutorial 
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
  
  return (
    <div
    style={{
      width: "100vw",
      minHeight: "100vh",
      maxHeight: "300vh", // permite crecer en altura si el contenido lo requiere
      backgroundImage:
        "url('https://img.freepik.com/vector-premium/estilo-acuarela-fondo-regreso-escuela_23-2148593948.jpg?w=1060')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
      margin: 0,
      padding: 0,
      overflowX: "hidden", // solo bloquea el scroll horizontal
    }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.4)",
        }}
      >
      </div>
    
      {/* Aquí pasamos showTutorial como prop para iniciar el tutorial */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.4)",
          }}
      >
        <button
          onClick={openModal} // Usamos la función para reiniciar el estado y abrir el modal
          style={{
            position: "absolute",
            top: "80px",
            right: "20px",
            transform: "translateY(-50%)",
            backgroundImage: `url(https://i.postimg.cc/J7FzfQFq/vecteezy-pencils-and-pens-1204726.png)`,
            backgroundColor: "transparent",
            backgroundSize: "cover",
            width: "65px",
            height: "100px",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out, background-color 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "translateY(-50%) scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "translateY(-50%) scale(1)")}
        ></button>
      
        {/* El modal que se abre al principio */}
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onStartTutorial={handleStartTutorial}
            videoId="kf0k0P7EF58" 
          />
      
        {/* Aquí se pasa correctamente el estado showTutorial */}
        {showTutorial && <TutorialComponente showTutorial={showTutorial} />}
      </div>

      <div
      >
        <div className="container">
        <img
            src={LaPlace}
            alt="LaPlace"
            style={{
                width: "auto", // o ajusta el tamaño según lo necesites
                height: "auto",
                maxWidth: "100%",
                zIndex: 10,
                position: "relative",
            }}
            />
        </div>
      </div>
    </div>
  ); 
};

export default LaplacePage;