import React, { useState, useEffect } from "react";
import SortComponent from "../components/SortComponent";

import '../components/sorts/SortsPage.css'; // Importamos el archivo CSS para que no se desborde la pagina aa
const NodosPage = () => {


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

      {/* Aquí pasamos showTutorial como prop para iniciar el tutorial */}
      <div
      >
        <SortComponent />
      </div>
    </div>
  );
};

export default NodosPage;