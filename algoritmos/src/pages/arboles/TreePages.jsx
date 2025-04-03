import React, { useState, useEffect } from "react";
import BinaryTreeComponent from "../../components/ArbolesComponent";
const NorthPage = () => {
  
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
      >
        < BinaryTreeComponent/>
      </div>
    </div>
  ); 
};

export default NorthPage;