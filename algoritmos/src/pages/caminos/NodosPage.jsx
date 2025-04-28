import React, { useState, useEffect } from "react";
import GraphComponent from "../../components/CaminosComponent";
import Modal from "../../components/ModalInicio"; // Import the Modal component
import TutorialComponente from "../../components/Tutoriales/TutorialNorwestComponente"; // Componente separado para el tutorial

const NodosPage = () => {
  const [isHovered, setIsHovered] = useState(false);

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

  useEffect(() => {
    // Aseguramos que `showTutorial` se mantenga actualizado cuando cambia.
    console.log("Estado de showTutorial:", showTutorial);
  }, [showTutorial]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage:
          "url('https://i.pinimg.com/736x/dc/eb/52/dceb5274fa12db18876d02a1c0b772ec.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        margin: 0,
        padding: 0,
        overflow: "hidden",
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
        <button
          onClick={openModal} // Usamos la función para reiniciar el estado y abrir el modal
          style={{
            position: "absolute",
            top: "75px",
            right: "220px",
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

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onStartTutorial={handleStartTutorial} 
          videoId="KGrVhm0rDY4" 
        />

        {showTutorial && <TutorialComponente showTutorial={showTutorial} />}
      </div>

      <h1
        style={{
          position: "relative",
          top: "-70px",
          fontFamily: "'Schoolbell', cursive",
          color: "#000",
          fontSize: "4.5rem",
          fontWeight: "bold",
          textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
          padding: "20px 1px",
          borderRadius: "10px",
        }}
      >
        Dijkstra y Kruskal
      </h1>

      <div
        style={{
          width: "90%",
          maxWidth: "1500px",
          height: "550px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-80px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <GraphComponent />
      </div>
    </div>
  );
};

export default NodosPage;