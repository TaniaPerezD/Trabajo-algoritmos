import React, { useState } from "react";
import GraphComponent from "../components/GraphComponent";
import Modal from "../components/ModalInicio"; // Import the Modal component


const NodosPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const explicarFuncionamiento = () => {
    setIsTutorialOpen(true); // Abre el tutorial
  };

  

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('https://img.freepik.com/vector-premium/estilo-acuarela-fondo-regreso-escuela_23-2148593948.jpg?w=1060')",
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
          //backdropFilter: "blur(1px)", 
        }}
      >
        <button>
          {/* Modal para el tutorial */}
          <Modal 
            isOpen={isTutorialOpen} 
            onClose={() => setIsTutorialOpen(false)} 
            onStartTutorial={() => {
              setIsTutorialOpen(false);
              // Aquí podrías agregar la lógica para iniciar el tutorial con Drive.js
            }}
            />
        </button>
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
            padding: "5px 1px",
            borderRadius: "10px"
        }}
        >
        Pizarra de Grafos
        </h1>

        
       <button
            onClick={explicarFuncionamiento}
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
              transition: "transform 0.2s ease-in-out, background-color 0.3s ease-in-out"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-50%) scale(1.1)";
              setIsHovered(true);
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(-50%) scale(1)";
              setIsHovered(false);
            }}
          >
            {isHovered && (
              <span
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#A8EDCB",
                  color: "black",
                  padding: "5px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  whiteSpace: "nowrap"
                }}
              >
                ¿Cómo funciona?
              </span>
            )}
          </button> 

            

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
        <GraphComponent />
      </div>

      
    </div>
  );
};

export default NodosPage;

