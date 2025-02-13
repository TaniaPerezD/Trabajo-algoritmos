import React from "react";
import GraphComponent from "../components/GraphComponent";


const NodosPage = () => {
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
      ></div>
      <h1
        style={{
            position: "relative", 
            top: "-100px", 
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



      <div
        style={{
          width: "80%",
          maxWidth: "1200px",
          height: "450px",
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

