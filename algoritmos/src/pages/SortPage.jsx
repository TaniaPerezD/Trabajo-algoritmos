import React, { useState, useEffect } from "react";
import GraphComponent from "../components/GraphComponent";
import SortComponent from "../components/SortComponent";
import Modal from "../components/ModalInicio"; // Import the Modal component
import TutorialComponente from "../components/TutorialComponente"; // Componente separado para el tutorial
import '../components/sorts/SortsPage.css'; // Importamos el archivo CSS para que no se desborde la pagina aa
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
    minHeight: "100vh", // permite crecer en altura si el contenido lo requiere
    backgroundImage:
      "url('https://img.freepik.com/vector-premium/estilo-acuarela-fondo-regreso-escuela_23-2148593948.jpg?w=1060')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    margin: 0,
    padding: 0,
    overflowX: "hidden", // solo bloquea el scroll horizontal
  }}
>


      <h1
        style={{
          position: "relative",
          top: "-70px",
          fontFamily: "'Schoolbell', cursive",
          color: "#000",
          fontSize: "4.5rem",
          fontWeight: "bold",
          textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
          padding: "5px 1px",
          borderRadius: "10px",
        }}
      >
        ...
      </h1>

      {/* Aquí pasamos showTutorial como prop para iniciar el tutorial */}
      <div
        style={{
          width: "90%",
          maxWidth: "1500px",
          height: "550px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-100px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <SortComponent />
      </div>
    </div>
  );
};

export default NodosPage;